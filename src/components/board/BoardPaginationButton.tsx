import React, {ReactNode} from "react";

interface PaginationButtonProps {
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isActive: boolean;
}

export default function BoardPaginationButton({children, onClick, isActive}: PaginationButtonProps) {
  return (
    <button onClick={onClick} className={`text-[14px] leading-[17px] font-medium ${isActive ? "text-brand-white" : "text-brand-gray-dark"}`}>
        {children}
    </button>
  )
}