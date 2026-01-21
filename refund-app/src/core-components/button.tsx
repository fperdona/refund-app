import { cva, type VariantProps } from "class-variance-authority";
import Text from "./text";

export const buttonVariants = cva(
  `
    flex items-center justify-center cursor-pointer
    transition rounded-lg
    w-full text-sm font-bold
  `,
  {
    variants: {
      variant: {
        primary: "bg-green-100 hover:bg-green-200",
        danger: "bg-red-100 hover:bg-red-200",
        secondary: "group bg-white border border-green-100 hover:border-green-200",
        ghost: "bg-transparent",
      },
      size: {
        md: "h-14 py-4 px-5",
      },
      disabled: {
        true: "opacity-30 pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
    },
  }
);

interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "size" | "disabled">,
  VariantProps<typeof buttonVariants> { }

export default function Button({
  variant,
  size,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ className, disabled, size, variant })}
      disabled={disabled === true}
      {...props}
    >
      <Text className={`flex items-center ${variant === "secondary" || variant === "ghost" ? "text-green-100 group-hover:text-green-200 [&>svg]:fill-green-100 [&>svg]:group-hover:fill-green-200" : "text-white"}`}>
        {children}
      </Text>
    </button>
  );
}
