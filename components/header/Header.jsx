"use client";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import style from "./header.module.css";
import MainHeaderBackground from "./MainHeaderBackground";
import NavLink from "./NavLink";

export default function Header() {
  return (
    <>
      <MainHeaderBackground />
      <header className={style.header}>
        <Link href="/" className={style.logo}>
          {/* <Image src={logoImg.src} width={100} height={100} alt="logo" /> */}
          <Image src={logoImg} alt="logo" priority />
          High-Class Food
        </Link>

        <nav className={style.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
