import React from "react";

interface TextProps {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export default function Text({
  as = "span",
  className = "",
  children,
  ...props
}: TextProps) {
  return React.createElement(
    as,
    {
      className: `font-sans text-gray-200 ${className}`,
      ...props,
    },
    children
  );
}
