import {ReactNode} from "react";

export default function PaginationSection({children}: {children: ReactNode}) {
  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 inline-flex gap-4 bg-brand-black-medium rounded-xl border-[1px] border-solid border-brand-black-light p-4">
      {children}
    </div>
  )
}