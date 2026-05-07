import Link from "next/link";
import React, { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useLoadingAnimation } from "./loading-animation";

interface LinkWithLoaderProps {
  children: ReactNode;
  className?: string;
  href: string;
}

export const LinkWithLoader: FC<LinkWithLoaderProps> = (props) => {
    const [loadingAnimation, activateLoadingAnimation] = useLoadingAnimation();
  const pathname = usePathname();
  const onClick = () => {
    if (pathname !== props.href) {
      activateLoadingAnimation();
    }
  };

  return (
    <>
      {loadingAnimation}
      <Link className={props.className} href={props.href} onClick={onClick}>
        {props.children}
      </Link>
    </>
  );
};
