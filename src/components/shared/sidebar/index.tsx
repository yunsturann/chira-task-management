"use client";
// ** React Imports
import React, { useState } from "react";

// ** Next.js Components
import Link from "next/link";

// ** Constants
import { darkColorList, lightColorList, navLinks } from "@/constants";

// ** Third Party Components
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// ** Custom Components
import NavItem from "./NavItem";
import Logo from "../logo";
import ThemeSwitcher from "./ThemeSwitcher";
import Sheet from "@/components/ui/Sheet";
import ColorPicker from "@/components/ui/ColorPicker";

// ** Icons
import { FaGear } from "react-icons/fa6";

// ** Utils
import { cn } from "@/lib/utils";
import { OptionsContext } from "@/context/options-contexts";

const Sidebar = () => {
  // ** States
  const [showOptions, setShowOptions] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");

  return (
    <OptionsContext.Provider
      value={{ bgColor, setBgColor, textColor, setTextColor }}
    >
      <aside
        className={cn(
          `dark:bg-gray-800 w-72 h-screen hidden lg:flex flex-col gap-4 p-6 shadow-lg shadow-purple-500/50`
        )}
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
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

              <button
                className="flex pl-0.5 items-center text-lg font-semibold"
                onClick={() => setShowOptions(true)}
              >
                <div className="text-base flex items-center gap-4 dark:text-white">
                  <FaGear size={24} />
                  Options
                </div>
              </button>

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
      <Sheet
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
        hasOverlay={false}
        header={
          <div>
            <h2 className="text-xl font-semibold">Options</h2>
            <p className="opacity-80">Edit the sidebar options here.</p>
          </div>
        }
        className="border-l border-slate-400"
      >
        <div className="space-y-4">
          {/* Update Background */}
          <ColorPicker
            colorList={lightColorList}
            label="Background Color"
            color={bgColor}
            setColor={setBgColor}
            position="bottom"
          />

          {/* Text Color */}
          <ColorPicker
            colorList={darkColorList}
            label="Text Color"
            color={textColor}
            setColor={setTextColor}
            position="bottom"
          />
        </div>
      </Sheet>
    </OptionsContext.Provider>
  );
};

export default Sidebar;
