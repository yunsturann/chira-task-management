// ** Next Imports
import Link from "next/link";
import { usePathname } from "next/navigation";

// ** Utils
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { OptionsContext } from "@/context/options-contexts";

interface NavItemProps {
  href: string;
  title: string;
  Icon: React.ReactNode;
}

const NavItem = (props: NavItemProps) => {
  const { href, title, Icon } = props;

  const { textColor } = useContext(OptionsContext);

  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link href={href} draggable>
      <li
        className={cn(
          "text-xl flex items-center gap-4 text-neutral-600 dark:text-white font-semibold p-3 rounded-lg",
          {
            "bg-blue-400 text-white dark:bg-blue-950": isActive,
            "hover:bg-blue-100 dark:hover:bg-blue-900": !isActive,
          }
        )}
        style={{ color: textColor }}
      >
        {Icon}
        {title}
      </li>
    </Link>
  );
};

export default NavItem;
