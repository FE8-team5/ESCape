import {ReactNode} from "react";

export default function BoardStatusScreen({children}: {children: ReactNode}) {
  return <div className="h-dvh flex justify-center items-center text-brand-white">{children}</div>;
}