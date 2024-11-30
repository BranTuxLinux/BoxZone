import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="grid place-content-around h-screen bg-[url('/Polygon.svg')] bg-no-repeat bg-cover grid-cols-2 place-items-center">{children}</div>;
}
