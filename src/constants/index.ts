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

export const colorPickerColors = [
  ["#f8fafc", "#e2e8f0", "#9ca3af", "#111827"],
  ["#fafafa", "#e5e5e5", "#a3a3a3", "#525252"],
  ["#fee2e2", "#fca5a5", "#dc2626", "#7f1d1d"],
  ["#fef9c3", "#fcd34d", "#f59e0b", "#9a3412"],
  ["#ecfccb", "#bbf7d0", "#4ade80", "#15803d"],
  ["#cffafe", "#bae6fd", "#38bdf8", "#0369a1"],
  ["#faf5ff", "#e9d5ff", "#c084fc", "#9333ea"],
  ["#fdf2f8", "#fbcfe8", "#f472b6", "#db2777"],
  ["#ffe4e6", "#fecdd3", "#fb7185", "#e11d48"],
];
