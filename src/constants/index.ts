// ** Icons
import { FaHome } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { FaUserGroup } from "react-icons/fa6";
import { LuListTodo } from "react-icons/lu";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const navLinks = [
  {
    title: "Home",
    href: "/",
    icon: FaHome,
    isPublic: true,
  },
  // {
  //   title: "Projects",
  //   href: "/projects",
  //   icon: GrProjects,
  // },
  // {
  //   title: "Teams",
  //   href: "/teams",
  //   icon: FaUserGroup,
  // },
  {
    title: "Boards",
    href: "/todo",
    icon: LuListTodo,
  },
  {
    title: "Feedback",
    href: "/contact",
    icon: MdEmail,
    isPublic: true,
  },
  // {
  //   title: "Profile",
  //   href: "/profile",
  //   icon: FaUserAlt,
  // },
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

export const lightColorList = [
  ["#ffffff", "#e2e8f0", "#cbd5e1", "#94a3b8"],
  ["#fee2e2", "#fecaca", "#fca5a5", "#ef4444"],
  ["#ffedd5", "#fed7aa", "#fdba74", "#fb923c"],
  ["#fef9c3", "#fef08a", "#fde047", "#facc15"],
  ["#bbf7d0", "#86efac", "#4ade80", "#22c55e"],
  ["#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6"],
  ["#f5d0fe", "#d8b4fe", "#e879f9", "#d946ef"],
  ["#fbcfe8", "#f9a8d4", "#f472b6", "#ec4899"],
  ["#fecdd3", "#fda4af", "#fb7185", "#f43f5e"],
];

export const darkColorList = [
  ["#1a202c", "#2d3748", "#4a5568", "#718096"],
  ["#f56565", "#fc8181", "#f6ad55", "#ed8936"],
  ["#f6e05e", "#ecc94b", "#d69e2e", "#b7791f"],
  ["#68d391", "#48bb78", "#38a169", "#2f855a"],
  ["#6ee7b7", "#3bb17f", "#319795", "#2c7a7b"],
  ["#63b3ed", "#4299e1", "#3182ce", "#2b6cb0"],
  ["#a3bffa", "#7f9cf5", "#667eea", "#5a67d8"],
  ["#f687b3", "#ed64a6", "#d53f8c", "#b83280"],
  ["#fbb6ce", "#f687b3", "#ed64a6", "#d53f8c"],
];
