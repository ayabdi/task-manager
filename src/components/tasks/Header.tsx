"use client";

import { useTaskProvider } from "@/providers/tasks-provider";
import { signOut } from "next-auth/react";

const Header = () => {
  const { dict } = useTaskProvider();
  return (
    <div className="text-3xl w-full border-b pb-1 flex justify-between">
      <h1>{dict.header}</h1>
      <div
        className="text-sm mt-auto text-blue-500 cursor-pointer pb-1 hover:underline"
        onClick={() => signOut()}
      >
        {dict.signOut}
      </div>
    </div>
  );
};

export default Header;
