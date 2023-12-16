"use client";

import Link from "next/link";
import style from "./navLink.module.css";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={
        path.startsWith(href) ? `${style.link} ${style.active}` : style.link
      }
    >
      {children}
    </Link>
  );
}
