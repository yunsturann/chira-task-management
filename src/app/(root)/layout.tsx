// ** React Imports
import { ReactNode } from "react";

// ** Third Party Imports
import { Toaster } from "react-hot-toast";

// ** Custom Components
import Sidebar from "@/components/shared/sidebar";
import MobileNav from "@/components/shared/mobile-navbar";
import Footer from "@/components/shared/footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen w-full flex flex-col bg-white text-black dark:bg-gray-800 dark:text-white lg:flex-row relative">
      {/* Toast Container */}
      <Toaster />

      {/* Sidebar */}
      <Sidebar />

      {/* MobileNav */}
      <MobileNav />

      <div className="flex-1 flex flex-col justify-between lg:max-h-screen overflow-auto">
        {children}
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
