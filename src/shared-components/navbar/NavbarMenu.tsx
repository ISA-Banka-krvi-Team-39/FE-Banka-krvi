import React from "react";
import Links from "./Links";
import NavbarMenuItem from "./NavbarMenuItem";

const NavbarMenu: React.FC = () => {
  return (
    <div className="h-[98px] flex items-center mx-auto justify-between px-6">
      <div className="inline-flex w-full mx-auto">
        {Links.map((link, index) => {
          return (
            <NavbarMenuItem href={link.Href} key={index}>
              {link.text}
            </NavbarMenuItem>
          );
        })}
      </div>
      <div className="inline-flex w-full mx-auto justify-end mr-10">
            <NavbarMenuItem href="/register">
              Register
            </NavbarMenuItem>
            <NavbarMenuItem href="/login">
              Login
            </NavbarMenuItem>
      </div>
    </div>
  );
};

export default NavbarMenu;
