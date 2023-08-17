"use client";

import styles from './confirmation.module.css';
import Link from 'next/link';
import Logo from '../../../public/JnanaPrabodhiniLogo.png';
import ItemContext from '../_context';
import Image from 'next/image';
import { useContext } from 'react';

export default function Confirmation() {
    const {data} = useContext(ItemContext);

    return (
        <>
            <div className={styles.navContainer}>
                    <Image src={Logo} alt="Logo" />
                    <div className={styles.navLinks}>
                        {Array.from(new Set(data.map((item) => item.Category))).map((val, index) => (
                            <Link className={styles.navLink} key={val} href={"/#" + val}>
                                <p>{val}</p>
                            </Link>
                        ))}
                        <Link className={styles.navLink} href={"/"}>
                            <p>Back</p>
                        </Link>
                    </div>
                </div>
            <div className={styles.center}>
                <h1>Thank you for your interest.</h1>
                <p>Please check your email for confirmation and next steps.</p>
            </div>
        </>
    );
}
