import Link from "next/link";
import style from "./page.module.css";
import ImageSlideshow from "@/components/imageSlider/ImageSlider";

export default function Home() {
  return (
    <>
      <header className={style.header}>
        <div className={style.slideshow}>
          <ImageSlideshow />
        </div>
        <div>
          <div className={style.hero}>
            <h1>High-Class Food for High-Class foodies</h1>
            <p>Taste & share food all over the world</p>
          </div>
          <div className={style.cta}>
            <Link href="/community">Join the community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={style.section}>
          <h2>How it works</h2>
          <p>
            High-Class Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            High-Class Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={style.section}>
          <h2>Why High-Class Food?</h2>
          <p>
            High-Class Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            High-Class Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}
