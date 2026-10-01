import type { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = "",
  ...props
}) => {
  return (
    <button
      className={clsx(
        "w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
