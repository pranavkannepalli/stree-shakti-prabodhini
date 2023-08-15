"use client";

import styles from "./_itemGroup.module.css";
import Card from "./_card";
import { useState, useContext, useEffect } from "react";
import ItemData from "./_item_data";
import itemContext from "./_context";

export default function ItemGroups({ d }: { d: ItemData[] }) {
    const { data, setData, addItem, subItem } = useContext(itemContext);

    useEffect(() => {
        setData(d);
    }, []);

    return (
        <>
            <div className={styles.itemGroup}>
                <h1>Note</h1>
                <p>
                    For bulk orders (more than 10 items of one kind) or items that are unavailable please contact Jnana
                    Prabodhini directly.
                </p>
            </div>
            {Array.from(new Set(data.map((item) => item.Category))).map((val, index) => {
                return (
                    <div key={val} className={styles.itemGroup} id={val}>
                        <h1>{val}</h1>
                        <div className={styles.items}>
                            {data
                                .filter((point) => point.Category == val)
                                .map((item) => {
                                    return Card(item, addItem, subItem);
                                })}
                        </div>
                    </div>
                );
            })}
        </>
    );
}
