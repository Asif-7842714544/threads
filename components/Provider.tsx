"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface props {
  children: ReactNode;
}

const Providers = (props: props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default Providers;
