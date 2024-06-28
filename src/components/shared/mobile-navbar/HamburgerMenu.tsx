"use client";
// ** React Imports
import React from "react";

// ** Custom Components
import NavItem from "../sidebar/NavItem";
import Logo from "../logo";
import ThemeSwitcher from "../sidebar/ThemeSwitcher";
import Sheet from "@/components/ui/Sheet";

// ** Constants
import { navLinks } from "@/constants";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu = (props: HamburgerMenuProps) => {
  return (
    <Sheet {...props} header={<Logo size="medium" />}>
      <ul className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <NavItem
            key={link.title}
            href={link.href}
            title={link.title}
            Icon={<link.icon />}
          />
        ))}
        <li className="pl-2 py-3">
          <ThemeSwitcher textClass="text-xl text-neutral-600" />
        </li>
      </ul>
    </Sheet>
  );
};

export default HamburgerMenu;

//  <>
//       {/* overlay */}
//       {isOpen ? (
//         <div
//           className="z-10 fixed top-0 left-0 w-full h-screen bg-black/50"
//           onClick={onClose}
//         ></div>
//       ) : null}
//       {/* content */}

//       <nav
//         className={cn(
//           "z-20 fixed h-screen top-0 bottom-0 right-0 w-[70%] sm:w-[360px] bg-white dark:bg-gray-800 p-6 flex flex-col gap-y-8 shadow-md shadow-purple-200/50 transform translate-x-full transition-transform duration-300",
//           {
//             "translate-x-0": isOpen,
//           }
//         )}
//         // onClick={(e) => e.stopPropagation()}
//       >
//         {/* Head */}
//         <div className="flex justify-between items-center">
//           <Logo size="medium" />
//           <div
//             className="text-lg cursor-pointer hover:opacity-50 transition duration-300"
//             onClick={onClose}
//           >
//             <FaX />
//           </div>
//         </div>
//         {/* Body */}
// <ul className="flex flex-col gap-2">
//   {navLinks.map((link) => (
//     <NavItem
//       key={link.title}
//       href={link.href}
//       title={link.title}
//       Icon={<link.icon />}
//     />
//   ))}
//   <li className="pl-2 py-3">
//     <ThemeSwitcher textClass="text-xl text-neutral-600" />
//   </li>
// </ul>
//       </nav>
//     </>
