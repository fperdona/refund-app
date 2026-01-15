import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number;
}

export default function Icon({
  svg: SvgComponent,
  size = 24,
  className,
  ...props
}: IconProps) {
  return (
    <SvgComponent width={size} height={size} className={className} {...props} />
  );
}
