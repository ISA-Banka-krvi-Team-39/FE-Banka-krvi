import React, { useEffect, useState } from "react";
import { getDataFromToken } from "./getToken";
import Links from "./Links";
import NavbarMenuItem from "./NavbarMenuItem";



const NavbarMenu: React.FC = () => {
  const [role,setRole] = useState('All');
  useEffect(() => {
    var rolee = localStorage.getItem("role");
    if(rolee == null)
    {
      setRole("All");
    }
    else
    {
      setRole(rolee.toString().split('"')[1]);
    }
    
  },[]);
  function logout()
  {
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    window.location.href = "/";
  }
  return (
    <div className="h-[98px] flex items-center mx-auto justify-between px-6">
      <div className="inline-flex w-full mx-auto">
            <NavbarMenuItem hidden={false} href="/">
                Main Page
            </NavbarMenuItem>
            <NavbarMenuItem hidden={false} href="/centers">
                Centers
            </NavbarMenuItem>
        {Links.map((link, index) => {
          return (
            <NavbarMenuItem hidden={link.role != role} href={link.Href} key={index}>
              {link.text}
            </NavbarMenuItem>
          );
        })}
      </div>
      
      <div className="inline-flex mx-auto justify-end mr-10">
            
            <NavbarMenuItem hidden={role != "All"} href="/auth/register">
              Register
            </NavbarMenuItem>
            <NavbarMenuItem hidden={role != "All"} href="/auth/login">
              Login
            </NavbarMenuItem>
            <NavbarMenuItem hidden={role == "All"} onClick={()=>{logout()}}>
              Logout
            </NavbarMenuItem>
      </div>
    </div>
  );
};

export default NavbarMenu;