import { cva, type VariantProps } from "class-variance-authority";

export const navLinkVariants = cva(
  "text-sm transition-colors cursor-pointer font-semibold",
  {
    variants: {
      active: {
        true: "text-green-100",
        false: "text-gray-200 hover:text-green-100",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

interface NavLinkProps
  extends VariantProps<typeof navLinkVariants>,
    Omit<React.ComponentProps<"a">, "children"> {
  children: string;
}

export default function NavLink({
  active,
  className,
  children,
  ...props
}: NavLinkProps) {
  return (
    <a className={navLinkVariants({ active })} {...props}>
      {children}
    </a>
  );
}
