"use client";

import styles from "./checkout.module.css";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/JnanaPrabodhiniLogo.png";
import ItemContext from "../_context";
import { FormEvent, useContext, useState } from "react";
import CheckoutCard from "./_checkoutCard";
import submitForm from "../_submitForm";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import menuIcon from "@iconify/icons-ion/menu";

export default function CheckoutContent() {
    const { data, setData, addItem, subItem } = useContext(ItemContext);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [error, setError] = useState("");
    const [expand, setExpand] = useState(false);

    const selectedItems = data.filter((val) => val.Quantity > 0);

    const router = useRouter();

    const calcTotal = () => {
        let s = 0;

        selectedItems.forEach((val) => {
            s += val.Quantity * val.Price;
        });

        return s;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const status = await submitForm(name, email, address, phoneNum, selectedItems);
        if (status) {
            router.push("/confirmation");
        } else {
            setError("Please try again later");
        }
    };

    return (
        <div>
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
            <section className={styles.checkout}>
                <h1>Checkout</h1>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        {selectedItems.length == 0 ? (
                            <p>No Items in the Cart</p>
                        ) : (
                            selectedItems.map((val) => CheckoutCard(val, addItem, subItem))
                        )}
                    </div>
                    <div className={styles.card}>
                        <h2>Subtotal</h2>
                        {selectedItems.length == 0 ? (
                            <p>No Items in the Cart</p>
                        ) : (
                            <div className={styles.subtotal}>
                                {selectedItems.map((val) => (
                                    <div className={styles.spaceBetween} key={val.ProductNum}>
                                        <p>
                                            {val.Name} x {val.Quantity}
                                        </p>
                                        <p>₹{val.Quantity * val.Price}</p>
                                    </div>
                                ))}
                                <div className={styles.spaceBetween}>
                                    <p>Total</p>
                                    <p>₹{calcTotal()}</p>
                                </div>
                            </div>
                        )}
                        <h2 style={{ marginTop: "20px" }}>Details</h2>
                        <form
                            className={styles.form}
                            onSubmit={async (e) => {
                                handleSubmit(e);
                            }}
                        >
                            <label htmlFor='name'>Name</label>
                            <input
                                placeholder="Ex: John Doe"
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                                id='name'
                                name='name'
                            />
                            <label htmlFor='address'>Address</label>
                            <input
                                placeholder="Ex: 308 Negra Arroya Lane, Albequerque, New Mexico, USA"
                                onChange={(e) => setAddress(e.target.value)}
                                required={true}
                                id="address"
                                name="address"
                            />
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder="Ex: johndoe@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                required={true}
                                id="email"
                                name="email"
                            />
                            <label htmlFor="phone">Phone Num (10 digits)</label>
                            <input
                                placeholder="Ex: 4255331980"
                                onChange={(e) => setPhoneNum(e.target.value)}
                                type="tel"
                                required={true}
                                id="phone"
                                name="phone"
                                pattern='[0-9]{10}'
                            />
                            <button type="submit" className={styles.button}>
                                Submit
                            </button>
                        </form>
                        <p>{error}</p>
                    </div>
                </div>
            </section>
            <section className={styles.footer}>
                <p>510, Sadashiv Peth, Pune, Maharashtra, India. Pin - 411030</p>
                <p>Phone: +919881937206, +919922296699</p>
                <p>Email: ssprabodhan@jnanaprabodhini.org</p>
            </section>
        </div>
    );
}
