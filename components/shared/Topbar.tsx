"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

function Topbar() {
  const { data: session, status } = useSession();
  // const setthread = threadStore((state) => state.setThread);

  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [session]);

  const signout = () => {
    signOut();
  };

  return (
    <div className="topbar">
      <Link href="/home" className="flex items-center gap-4">
        <Image
          className="text-white"
          src="https://seeklogo.com/images/T/threads-logo-9F3F8228AC-seeklogo.com.png?v=638243212870000000"
          alt="logo"
          width={35}
          height={35}
        />
        <p
          className="text-heading3-bold
         text-light-1 max-xs:hidden"
        >
          Threads
        </p>
      </Link>

      <div className="flex items-center gap-1 ">
        <div className="block ">
          <div className="flex cursor-pointer gap-2 ">
            {session?.user && (
              <Image
                src={session?.user?.image || ""}
                alt=""
                width={35}
                height={35}
                className="rounded-full "
              />
            )}

            <Image
              className="md:hidden"
              onClick={signout}
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
