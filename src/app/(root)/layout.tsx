// ** React Imports
import { ReactNode } from "react";

// ** Third Party Imports
import { Toaster } from "react-hot-toast";

// ** Custom Components
import Sidebar from "@/components/shared/sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen w-full flex flex-col bg-white lg:flex-row">
      {/* Toast Container */}
      <Toaster />

      {/* Sidebar */}
      <Sidebar />

      {/* MobileNav */}

      <div className="flex-1 py-8 lg:py-16 lg:max-h-screen overflow-auto">
        <div className="max-w-6xl w-full mx-auto px-4 lg:px-8">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
