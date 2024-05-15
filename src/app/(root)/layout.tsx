// ** React Imports
import { ReactNode } from "react";

// ** Third Party Imports
import { Toaster } from "react-hot-toast";

// ** Custom Components
import Sidebar from "@/components/shared/sidebar";
import MobileNav from "@/components/shared/mobile-navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen w-full flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white lg:flex-row relative">
      {/* Toast Container */}
      <Toaster />

      {/* Sidebar */}
      <Sidebar />

      {/* MobileNav */}
      <MobileNav />

      <div className="flex-1 py-6 lg:py-12 lg:max-h-screen overflow-auto">
        <div className="max-w-6xl w-full mx-auto px-4 lg:px-8">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
