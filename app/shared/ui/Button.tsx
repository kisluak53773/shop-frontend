import type { ComponentProps, FC } from "react";
import clsx from "clsx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link";
export type ButtonSize = "none" | "sm" | "md" | "icon";

export type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  fullWidth?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-surface-tint text-heading hover:bg-primary/10",
  outline:
    "border border-primary bg-white text-primary hover:bg-surface-tint",
  ghost: "text-body hover:bg-surface-tint hover:text-heading",
  link: "!p-0 text-heading hover:text-primary",
};

const sizes: Record<ButtonSize, string> = {
  // No padding: text-only buttons such as the header "Sign In" / "Cart"
  none: "",
  // Figma chip: 14px text on 18px line, 14px x 9px padding
  sm: "px-3.5 py-2.25 text-sm leading-4.5",
  md: "px-5 py-3 text-base leading-4.5",
  icon: "size-12 p-0",
};

export const buttonVariants = ({
  variant = "primary",
  size = "md",
  pill = false,
  fullWidth = false,
}: ButtonStyleProps = {}) =>
  clsx(
    "inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:pointer-events-none disabled:opacity-50",
    pill ? "rounded-full" : "rounded-[0.625rem]",
    fullWidth && "w-full",
    variants[variant],
    sizes[size],
  );

type Props = ComponentProps<"button"> & ButtonStyleProps;

export const Button: FC<Props> = ({
  variant,
  size,
  pill,
  fullWidth,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        buttonVariants({ variant, size, pill, fullWidth }),
        className,
      )}
      {...props}
    />
  );
};
