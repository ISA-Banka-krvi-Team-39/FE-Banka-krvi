import React, { useEffect } from "react";
import { getDataFromToken } from "./getToken";
import Links from "./Links";
import NavbarMenuItem from "./NavbarMenuItem";

const NavbarMenu: React.FC = () => {
  var roless : String [] = [];
  if (typeof window !== 'undefined') {
    var roles : String [] = [];
    var token = localStorage.getItem("auth")
    if(token != null)
    {
      roles = getDataFromToken(token).roles;
      roless = roles;
      console.log(roles.toString().split('"')[1]);
    }
  }
  return (
    <div className="h-[98px] flex items-center mx-auto justify-between px-6">
      <div className="inline-flex w-full mx-auto">
            <NavbarMenuItem hidden={roless.length != 0} href="/">
              Main Page
            </NavbarMenuItem>
        {Links.map((link, index) => {
          return (
            <NavbarMenuItem hidden={(link.role != roless.toString().split('"')[1])} href={link.Href} key={index}>
              {link.text}
            </NavbarMenuItem>
          );
        })}
      </div>
      
      <div className="inline-flex mx-auto justify-end mr-10">
            
            <NavbarMenuItem hidden={roless.length != 0} href="/auth/register">
              Register
            </NavbarMenuItem>
            <NavbarMenuItem hidden={roless.length != 0} href="/auth/login">
              Login
            </NavbarMenuItem>
      </div>
    </div>
  );
};

export default NavbarMenu;
