import Link from "next/link";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";

interface props {
  children: ReactNode;
  href: string;
}

const NavbarMenuItem: React.FC<props> = (props: props) => {
  const router = useRouter();
  const isActive =
    router.pathname === props.href ? "border-b border-emerald-200" : "";

  const style = classNames(
    isActive,
    "ml-10 text-2xl font-bold text-emerald-200"
  );
  return (
    <Link href={props.href} className={style}>
      {props.children}
    </Link>
  );
};

export default NavbarMenuItem;
