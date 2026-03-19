import * as React from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type Size = "default" | "sm" | "lg" | "icon";

const variantStyles: Record<Variant, string> = {
  default: "bg-accent text-white hover:bg-accent/90",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  outline:
    "border border-border bg-transparent hover:bg-bg-elevated text-text-primary",
  secondary: "bg-bg-elevated text-text-primary hover:bg-bg-elevated/80",
  ghost: "hover:bg-bg-elevated text-text-primary hover:text-accent",
  link: "text-accent underline-offset-s-4 hover:underline",
};

const sizeStyles: Record<Size, string> = {
  default: "h-s-36 px-s-16 py-s-8 has-[>svg]:px-s-12",
  sm: "h-s-32 rounded-s-8 gap-s-6 px-s-12 has-[>svg]:px-s-10",
  lg: "h-s-48 rounded-s-12 px-s-32 text-s-16 has-[>svg]:px-s-16",
  icon: "w-s-36 h-s-36 rounded-s-8",
};

export function buttonVariants({
  variant = "default",
  size = "default",
  className = "",
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-s-8 whitespace-nowrap rounded-s-8 text-s-14 font-medium transition-all focus-visible:outline-none focus-visible:ring-s-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:w-s-16 [&_svg:not([class*='size-'])]:h-s-16 shrink-0",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const classes = buttonVariants({ variant, size, className });

    if (asChild) {
      // Native Slot implementation to avoid relying on @radix-ui/react-slot
      const child = React.Children.only(
        props.children,
      ) as React.ReactElement<any>;
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
        ...props,
        ref: ref || (child as any).ref,
      } as any);
    }

    return (
      <button data-slot="button" className={classes} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button };
