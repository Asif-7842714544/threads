"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Bottombar() {
  const sidebarLinks = [
    {
      imgURL: "/assets/home.svg",
      route: "/home",
      label: "Home",
    },
    {
      imgURL: "/assets/search.svg",
      route: "/search",
      label: "Search",
    },
    {
      imgURL: "/assets/heart.svg",
      route: "/activity",
      label: "Activity",
    },
    {
      imgURL: "/assets/create.svg",
      route: "/create-thread",
      label: "Create Thread",
    },
    {
      imgURL: "/assets/community.svg",
      route: "/communities",
      label: "Communities",
    },
    {
      imgURL: "/assets/user.svg",
      route: "/profile",
      label: "Profile",
    },
  ];
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              className={`bottombar_link 
               ${isActive && "bg-primary-500 "}`}
              href={link.route}
              key={link.label}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-subtle-medium text-light-1 max-sm:hidden ">{link.label.split(/\s+/)[0]}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
