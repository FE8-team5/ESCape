import classNames from "classnames";
import { Button } from "flowbite-react";
import { PropsWithChildren } from "react";

interface PrimaryButtonProps {
  active: boolean;
  onClick?: () => void;
}

export default function PrimaryButton({
  children,
  active,
  onClick,
}: PropsWithChildren<PrimaryButtonProps>) {
  //active에 boolean값을 넣어주세요
  return (
    <Button
      //active가 true일때만 실행
      onClick={active ? onClick : undefined}
      className={classNames(
        "w-full h-[50px] md:h-[55px] xl-[65px] focus:ring-0",
        active ? "bg-gradation" : "bg-unactive"
      )}
    >
      <span className="h-full flex items-center font-semibold text-lg">
        {children}
      </span>
    </Button>
  );
}
