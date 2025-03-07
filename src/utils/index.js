import { useLocation } from "react-router-dom";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function maskEmail(email) {
  const [name, domain] = email.split("@");
  if (name.length > 2) {
    const maskedName = name.slice(0, 2) + "*".repeat(name.length - 2);
    return `${maskedName}@${domain}`;
  }
  return email;
}
