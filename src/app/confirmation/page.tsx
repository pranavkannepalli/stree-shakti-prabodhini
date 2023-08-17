"use client";

import styles from "./confirmation.module.css";
import Link from "next/link";
import Logo from "../../../public/JnanaPrabodhiniLogo.png";
import ItemContext from "../_context";
import Image from "next/image";
import { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import menuIcon from "@iconify/icons-ion/menu";

export default function Confirmation() {
    const { data } = useContext(ItemContext);
    const [expand, setExpand] = useState(false);

    return (
        <>
            <div className={styles.invisible}>
                <Image src={Logo} alt="Logo" />
                <div className={styles.menu} onClick={() => setExpand(!expand)}>
                    <Icon icon={menuIcon} height={30} width={30} />
                </div>
                <div className={expand ? styles.navLinks : styles.collapse}>
                    {Array.from(new Set(data.map((item) => item.Category))).map((val, index) => (
                        <Link className={styles.navLink} key={val} href={"/#" + val}>
                            <p>{val}</p>
                        </Link>
                    ))}
                    <Link className={styles.navLink} href={"/"}>
                        <p>Back Home</p>
                    </Link>
                </div>
            </div>
            <div className={styles.center}>
                <h1>Thank you for your interest.</h1>
                <h4>Please check your email for confirmation and next steps.</h4>
            </div>
            <section className={styles.footer}>
                <p>510, Sadashiv Peth, Pune, Maharashtra, India. Pin - 411030</p>
                <p>Phone: +919881937206, +919922296699</p>
                <p>Email: ssprabodhan@jnanaprabodhini.org</p>
            </section>
        </>
    );
}
