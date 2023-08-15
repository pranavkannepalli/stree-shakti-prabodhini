import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import ItemGroups from "./_itemGroup";
import ItemData from "./_item_data";
import { ItemContextProvider } from "./_context";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Stree Shakti Prabodhan",
    icons: "./favicon.ico",
};

export default async function Home() {
    const data = await fetch("https://stree-shakti-prabodhan.vercel.app/sheets", { next: { revalidate: 60 } }).then(
        async (val) => {
            return (await val.json()) as ItemData[];
        }
    );

    return (
        <>
            <section className={styles.heroSection}>
                <div className={styles.navContainer}>
                    <img src='../../public/JnanaPrabodhiniLogo.png' alt='Logo'/>
                    <div className={styles.navLinks}>
                        {Array.from(new Set(data.map((item) => item.Category))).map((val, index) => (
                            <Link className={styles.navLink} key={val} href={"#" + val}>
                                {val}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={styles.heroContent}>
                    <h2 className={styles.heroItem}>Jnana Prabodhini</h2>
                    <h1 className={styles.heroItem}>Stree Shakti Prabodhan</h1>
                    <h4 className={styles.heroItem}>Empowering women, one story at a time.</h4>
                </div>
            </section>
            <section className={styles.itemSection}>
                <ItemContextProvider>
                    <ItemGroups d={data} />
                </ItemContextProvider>
            </section>
            <section className={styles.footer}>
                <p>
                    510, Sadashiv Peth, Pune, Maharashtra, India. Pin - 411030
                </p>
                <p>
                    Phone: +91-20-24207000, +91-20-24477691
                </p>
                <p>
                    Email:contact@jnanaprabodhini.org
                </p>
            </section>
        </>
    );
}
