import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import ItemGroups from "./_itemGroup";
import ItemData from "./_item_data";
import NavHero from './_nav';

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

    const smth = await fetch('https://stree-shakti-prabodhan.vercel.app/email', )

    return (
        <>
            <section>
                <NavHero/>
            </section>
            <section className={styles.itemSection}>
                <ItemGroups d={data} />
            </section>
            <section className={styles.footer}>
                <p>510, Sadashiv Peth, Pune, Maharashtra, India. Pin - 411030</p>
                <p>Phone: +919881937206, +919922296699</p>
                <p>Email: ssprabodhan@jnanaprabodhini.org</p>
            </section>
        </>
    );
}
