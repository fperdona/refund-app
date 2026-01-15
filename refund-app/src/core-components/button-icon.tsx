import { cva, type VariantProps } from "class-variance-authority";
import Icon from "../core-components/icon";

interface ButtonIconProps
  extends Omit<React.ComponentProps<"button">, "disabled" | "size">,
    VariantProps<typeof buttonVariants>,
    VariantProps<typeof buttonIconVariants> {
  icon: React.ComponentProps<typeof Icon>["svg"];
}

export const buttonVariants = cva(
  "bg-green-100 h-12 w-12 rounded flex justify-center items-center",
  {
    variants: {
      disabled: {
        true: "opacity-30 pointer-events-none",
        false: "hover:bg-green-200 cursor-pointer",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export const buttonIconVariants = cva("transition hover:fill-white", {
  variants: {
    variant: {
      primary: "fill-white",
    },
    size: {
      sm: "w-6 h-6",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
  },
});

export default function ButtonIcon({
  variant,
  size,
  disabled,
  className,
  icon,
  ...props
}: ButtonIconProps) {
  return (
    <button
      {...props}
      className={buttonVariants({ disabled })}
      disabled={disabled === true}
    >
      <Icon className={buttonIconVariants({ size, variant })} svg={icon} />
    </button>
  );
}
