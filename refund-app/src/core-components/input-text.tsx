import { cva, cx, type VariantProps } from "class-variance-authority";

export const inputTextVariants = cva(
  `border border-gray-300 rounded-lg bg-transparent outline-none 
  h-12 px-4 text-gray-200 placeholder:text-gray-200 w-full transition-colors`,
  {
    variants: {
      size: {
        md: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface InputTextProps
  extends VariantProps<typeof inputTextVariants>,
    Omit<React.ComponentProps<"input">, "size"> {
  label?: string;
}

export default function InputText({
  size,
  className,
  label,
  ...props
}: InputTextProps) {
  return (
    <div className="flex flex-col gap-2 group">
      {label && (
        <label className="text-2xs font-semibold uppercase tracking-wide text-gray-200 group-focus-within:text-green-100">
          {label}
        </label>
      )}
      <input
        className={cx(
          inputTextVariants({ size }),
          "focus:border-green-100",
          className
        )}
        {...props}
      />
    </div>
  );
}
