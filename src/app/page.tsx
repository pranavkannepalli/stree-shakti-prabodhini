import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import ItemGroups from "./itemGroup";
import ItemData from './_item_data';
import { ItemContextProvider } from "./_context";


export const metadata : Metadata = {
    title: 'Stree Shakti Prabodhan',
    icons: './favicon.ico',
}


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
                    <h3>Logo</h3>
                    <div className={styles.navLinks}>
                        <div className={styles.navLink}>Link</div>
                        <div className={styles.navLink}>Link</div>
                        <div className={styles.navLink}>Link</div>
                        <div className={styles.navLink}>Link</div>
                    </div>
                </div>
                <div className={styles.heroContent}>
                    <h2 className={styles.heroItem}>Jnana Prabodhini</h2>
                    <h1 className={styles.heroItem}>Stree Shakti Prabodhan</h1>
                    <h4 className={styles.heroItem}>Empowering women, one story at a time.</h4>
                </div>
            </section>
            <section className={styles.itemSection}>
                <div className={styles.itemGroups}>
                    <div>
                        <h1>Note</h1>
                        <p>For bulk orders (more than 10 items of one kind) or items that are unavailable please contact Jnana Prabodhini directly.</p>
                    </div>
                    <ItemContextProvider>
                        <ItemGroups d={data}/>
                    </ItemContextProvider>
                </div>
            </section>
        </>
    );
}
