"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import "./googlebtn.css";
// import "./signin.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Signin() {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(session);

  useEffect(() => {
    if (session?.user) router.push("/home");
  }, [session]);

  return (
    <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="flex flex-col items-center justify-center p-20 h-full  ">
          <Image
            className=""
            src="/assets/logo (2).png"
            height={300}
            width={300}
            alt=""
          />

          <button
            onClick={() => signIn()}
            type="button"
            className="mt-20 login-with-google-btn"
          >
            Sign in with Google
          </button>
        </div>
      </div>

    // <div className=" waveWrapper waveAnimation">
    //   <div className="waveWrapperInner bgTop">
    //     <div
    //       style={{
    //         backgroundImage: `url('http://front-end-noobs.com/jecko/img/wave-top.png')`,
    //       }}
    //       className="wave waveTop"
    //     />
    //   </div>
    //   <div className="waveWrapperInner bgMiddle">
    //     <div
    //       className="wave waveMiddle"
    //       style={{
    //         backgroundImage: `url('http://front-end-noobs.com/jecko/img/wave-mid.png')`,
    //       }}
    //     />
    //   </div>
    //   <div className="waveWrapperInner bgBottom">
    //     <div
    //       className="wave waveBottom bg-[url('http://front-end-noobs.com/jecko/img/wave-bot.png')]"
    //       style={{
    //         backgroundImage: `url('http://front-end-noobs.com/jecko/img/wave-bot.png')`,
    //       }}
    //     />
    //   </div>
    // </div>
  );
}

export default Signin;
