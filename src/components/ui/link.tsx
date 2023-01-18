import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React from "react";

type ExtendedLinkProps<P = {}> = {
  children?: React.ReactNode;
} & NextLinkProps;

const Link: React.FC<ExtendedLinkProps & { className?: string }> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

export default Link;
