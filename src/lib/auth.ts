import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "./prisma";
import { authConfig } from "./auth.config";

const credentialsSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsed = credentialsSchema.safeParse(credentials);
          if (!parsed.success) { console.error("[auth] invalid credentials shape"); return null; }

          const { email, password } = parsed.data;
          console.log("[auth] attempting login for:", email);

          const user = await prisma.user.findUnique({ where: { email } });
          console.log("[auth] user found:", !!user);
          if (!user) return null;

          const valid = await bcrypt.compare(password, user.passwordHash);
          console.log("[auth] password valid:", valid);
          if (!valid) return null;

          return { id: user.id, email: user.email, name: user.name, role: user.role };
        } catch (err) {
          console.error("[auth] authorize error:", err);
          return null;
        }
      },
    }),
  ],
});
