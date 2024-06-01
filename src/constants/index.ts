// ** Icons
import { FaHome } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { FaUserGroup } from "react-icons/fa6";
import { LuListTodo } from "react-icons/lu";
import { FaUserAlt } from "react-icons/fa";

export const navLinks = [
  {
    title: "Home",
    href: "/",
    icon: FaHome,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: GrProjects,
  },
  {
    title: "Teams",
    href: "/teams",
    icon: FaUserGroup,
  },
  {
    title: "Todo",
    href: "/todo",
    icon: LuListTodo,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: FaUserAlt,
  },
];

export const todoStatusArray = [
  {
    label: "Todo",
    value: "todo",
  },
  {
    label: "In Progress",
    value: "in_progress",
  },
  {
    label: "Done",
    value: "done",
  },
];

export const todoPriorityArray = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
];
