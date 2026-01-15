import { cva, type VariantProps } from "class-variance-authority";
import Text from "./text";

export const buttonVariants = cva(
  `
    flex items-center justify-center cursor-pointer
    transition rounded-lg
    w-full text-sm font-bold
    bg-green-100 hover:bg-green-200
  `,
  {
    variants: {
      size: {
        md: "h-14 py-4 px-5",
      },
      disabled: {
        true: "opacity-30 pointer-events-none",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "size" | "disabled">,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  size,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ className, disabled, size })}
      disabled={disabled === true}
      {...props}
    >
      <Text className="text-white">{children}</Text>
    </button>
  );
}
