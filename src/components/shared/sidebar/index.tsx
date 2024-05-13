// ** React Imports
import React from "react";

// ** Next.js Components
import Link from "next/link";

// ** Constants
import { navLinks } from "@/constants";

// ** Third Party Components
import { UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const Sidebar = () => {
  return (
    <aside className="bg-slate-200 w-72 h-screen hidden lg:flex flex-col justify-between gap-4 p-6 shadow-md shadow-purple-400/50">
      {/* Logo and Nav links */}
      <div>
        {/* Logo */}
        <h2>Logo</h2>
        {/* Links */}
        <ul className="mt-6 text-lg">
          {navLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <li className="text-lg">{link.title}</li>
            </Link>
          ))}
        </ul>
      </div>
      {/* Bottom Actions  */}
      <ul>
        <UserButton />
      </ul>
    </aside>
  );
};

export default Sidebar;
