import { complete, notes, user } from "../../assets/images";

export const navLinks = [
  {
    title: "Notes",
    src: notes,
    to: "/",
  },
  {
    title: "Complete",
    src: complete,
    to: "/tasks/complete",
  },
  {
    title: "Profile",
    src: user,
    to: "/users/profile",
  },
  {
    title: "Login",
    src: user,
    to: "/login",
  },
];
