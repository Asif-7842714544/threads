"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

function LeftSidebar() {
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

  const profileTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "replies", label: "Replies", icon: "/assets/members.svg" },
    { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
  ];

  const communityTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
  ];

  const pathname = usePathname();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div
        className="flex w-full flex-1 
       flex-col gap-6 px-6 "
      >
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              className={`leftsidebar_link 
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
              <p className="text-light-1 max-lg:hidden ">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <div
          onClick={() => signOut()}
          className="flex cursor-pointer gap-4 p-4 "
        >
          <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
          <p className="text-light-2 max-lg:hidden ">Logout</p>
        </div>
      </div>
    </section>
  );
}

export default LeftSidebar;
