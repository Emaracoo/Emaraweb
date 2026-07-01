"use client";
import { useTransition } from "react";

export function DeleteButton({
  action,
  label = "Delete",
}: {
  action: () => Promise<void>;
  label?: string;
}) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm("Delete this item? This cannot be undone.")) {
          start(() => action());
        }
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 9px",
        fontSize: "11px",
        fontWeight: 500,
        cursor: pending ? "not-allowed" : "pointer",
        background: "transparent",
        color: pending ? "#B0AEAA" : "#DC2626",
        border: `1px solid ${pending ? "#E5E3DF" : "#FECACA"}`,
        fontFamily: "var(--font-inter),system-ui,sans-serif",
        opacity: pending ? 0.6 : 1,
        transition: "opacity .15s",
      }}
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}
