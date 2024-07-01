import { Dispatch, HTMLAttributes, SetStateAction, useRef } from "react";

// ** Hooks
import useClickOutside from "@/hooks/use-click-outside";

// ** Utils
import { cn } from "@/lib/utils";

// ** Icons
import { BsThreeDots } from "react-icons/bs";

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  actionIcon?: React.ReactNode;
  children: React.ReactNode;
  iconSize?: number;
  iconClassName?: string;
  position?: "top" | "bottom";
}

const Dropdown = (props: DropdownProps) => {
  const {
    isOpen,
    setIsOpen,
    children,
    actionIcon,
    iconSize,
    iconClassName,
    position = "bottom",
  } = props;

  // ** Refs
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
      {/* Actions Icon */}
      <div
        className={cn(
          "cursor-pointer text-xl text-blue-400 hover:text-blue-600 transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-200",
          iconClassName
        )}
        title="actions"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {actionIcon || <BsThreeDots size={iconSize} />}
      </div>

      {/* Actions Items */}
      {isOpen && (
        <ul
          className={cn(
            "absolute z-50 right-0 w-40 bg-white dark:bg-gray-500 border border-gray-400 shadow-lg p-1.5 rounded-lg space-y-1.5 text-sm tracking-tight",
            {
              "top-full mt-2": position === "bottom",
              "bottom-full mb-2": position === "top",
            }
          )}
          ref={dropdownRef}
        >
          {children}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

interface DropdownItemProps extends HTMLAttributes<HTMLLIElement> {}

export const DropdownItem = (props: DropdownItemProps) => {
  const { className, children, ...rest } = props;

  return (
    <li
      className={cn(
        "p-2 hover:bg-slate-200 hover:text-blue-400 dark:hover:bg-white rounded-md cursor-pointer transition",
        className
      )}
      {...rest}
    >
      {children}
    </li>
  );
};
