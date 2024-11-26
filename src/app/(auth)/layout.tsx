import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="grid place-content-center h-screen">{children}</div>;
}
