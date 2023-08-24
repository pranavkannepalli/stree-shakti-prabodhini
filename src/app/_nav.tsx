"use client";

import Link from "next/link";
import Logo from "../../public/JnanaPrabodhiniLogo.png";
import Image from "next/image";
import styles from "./_nav.module.css";
import { useContext, useRef, useState } from "react";
import ItemContext from "./_context";
import { useIsVisible } from "./_isVisible";
import { Icon } from "@iconify/react";
import bagOutline from "@iconify/icons-ion/bag-outline";
import menuIcon from "@iconify/icons-ion/menu";
import StreeShakti from '../../public/StreeShakti.jpg';

export default function NavHero() {
    const { data } = useContext(ItemContext);
    const ref = useRef<HTMLDivElement | null>(null);
    const isVisible = useIsVisible(ref);
    const [expand, setExpand] = useState(false);

    return (
        <>
            <div className={styles.heroSection} ref={ref}>
                <div className={styles.heroContent}>
                    <h2 className={styles.heroItem}>Jnana Prabodhini</h2>
                    <h1 className={styles.heroItem}>Stree Shakti Prabodhan</h1>
                    <h4 className={styles.heroItem}>Empowering women, one story at a time.</h4>
                </div>
            </div>
            {!isVisible && <div className={styles.box}></div>}
            <div className={isVisible ? styles.invisible : styles.stickyNav}>
                <Image src={Logo} alt="Logo" height={64}/>
                <Image src={StreeShakti} alt="Alt Logo" height={64}/>
                <div className={styles.menu} onClick={() => setExpand(!expand)}>
                    <Icon icon={menuIcon} height={30} width={30} />
                </div>
                <div className={expand ? styles.navLinks : styles.collapse}>
                    {Array.from(new Set(data.map((item) => item.Category))).map((val, index) => (
                        <Link className={styles.navLink} key={val} href={"#" + val}>
                            <p>{val}</p>
                        </Link>
                    ))}
                    <Link className={styles.navLink} href={"checkout"}>
                        <Icon icon={bagOutline} height={30} width={30} />
                    </Link>
                </div>
            </div>
        </>
    );
}
