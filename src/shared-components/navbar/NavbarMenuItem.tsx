import Link from "next/link";
import React, { MouseEventHandler, ReactNode } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";

interface props {
  children: ReactNode;
  href?: string;
  hidden:boolean;
  onClick?:MouseEventHandler<HTMLButtonElement>;
}

const NavbarMenuItem: React.FC<props> = (props: props) => {
  const router = useRouter();
  const isActive =
    router.pathname === props.href ? "border-b border-emerald-200" : "";
  const style = classNames(
    isActive,
    "ml-6 text-md font-bold text-emerald-200"
  );
  if(props.href !=undefined)
  return (
    <Link hidden={props.hidden} href={props.href} className={style}>
      {props.children}
    </Link>
  );
  else if(props.onClick != undefined)
    return(<button hidden={props.hidden} className="ml-6 text-md font-bold text-emerald-200" onClick={props.onClick}>{props.children}</button>);
  return<></>;

};

export default NavbarMenuItem;
