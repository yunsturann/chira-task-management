// ** React Imports
import React from "react";

// ** Next.js Components
import Link from "next/link";

// ** Constants
import { navLinks } from "@/constants";

// ** Third Party Components
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// ** Custom Components
import NavItem from "./NavItem";
import Logo from "../logo";
import ThemeSwitcher from "./ThemeSwitcher";

const Sidebar = () => {
  return (
    <aside className="dark:bg-gray-800 w-72 h-screen hidden lg:flex flex-col gap-4 p-6 shadow-md shadow-purple-200/50">
      {/* Logo */}
      <Logo />
      {/* Links */}
      <div className="flex-1 flex flex-col justify-between gap-y-4 py-4">
        <SignedIn>
          <ul className="text-lg flex flex-col gap-y-2">
            {navLinks.map((link) => (
              <NavItem
                key={link.title}
                href={link.href}
                title={link.title}
                Icon={<link.icon />}
              />
            ))}
          </ul>

          {/* Bottom Actions  */}
          <div className="space-y-8 dark:dark">
            <ThemeSwitcher />

            <UserButton afterSignOutUrl="/" showName />
          </div>
        </SignedIn>

        {/* SignOut */}
        <SignedOut>
          <ul className="text-lg flex flex-col gap-y-2">
            {navLinks.map((link) => {
              if (link.isPublic)
                return (
                  <NavItem
                    key={link.title}
                    href={link.href}
                    title={link.title}
                    Icon={<link.icon />}
                  />
                );
            })}
          </ul>
          <div className="flex flex-col gap-y-8">
            <ThemeSwitcher />
            <Link
              href="/sign-in"
              className="text-xl text-center text-white font-semibold p-3 rounded-lg bg-blue-500 dark:bg-blue-900 hover:opacity-70 transition duration-300"
            >
              Login
            </Link>
          </div>
        </SignedOut>
      </div>
    </aside>
  );
};

export default Sidebar;
