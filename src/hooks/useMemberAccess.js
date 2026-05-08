import { useState } from "react";

const storageKey = "markbuilds.memberAccess.v1";

function readStoredAccess() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) || "null");
  } catch {
    return null;
  }
}

function writeStoredAccess(email) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    storageKey,
    JSON.stringify({ email, grantedAt: new Date().toISOString() }),
  );
}

export function useMemberAccess() {
  const [memberEmail, setMemberEmail] = useState(() => {
    const stored = readStoredAccess();
    return stored?.email || "";
  });

  function grantAccess(email) {
    const normalizedEmail = email.trim().toLowerCase();
    writeStoredAccess(normalizedEmail);
    setMemberEmail(normalizedEmail);
  }

  return {
    hasAccess: Boolean(memberEmail),
    memberEmail,
    grantAccess,
  };
}
