import { Button as AriaButton } from "react-aria-components";
import { tv } from "tailwind-variants";

import type { ComponentProps, ReactNode, Ref } from "react";

const iconButton = tv({
  base: [
    "inline-flex items-center justify-center rounded-lg",
    "size-11 cursor-pointer transition-colors",
    "outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
  variants: {
    variant: {
      default: "text-navy-700 hover:bg-surface-100 pressed:bg-surface-50",
      destructive:
        "text-error-800 hover:bg-error-100 pressed:bg-error-100/60",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type IconButtonProps = {
  /** Accessible label — required for icon-only buttons */
  label: string;
  /** Phosphor icon or similar */
  children: ReactNode;
  variant?: "default" | "destructive";
  className?: string;
  ref?: Ref<HTMLButtonElement>;
} & Omit<ComponentProps<typeof AriaButton>, "children" | "className">;

export function IconButton({
  label,
  children,
  variant,
  className,
  ref,
  ...rest
}: IconButtonProps) {
  return (
    <AriaButton
      ref={ref}
      aria-label={label}
      className={iconButton({ variant, className })}
      {...rest}
    >
      {children}
    </AriaButton>
  );
}
