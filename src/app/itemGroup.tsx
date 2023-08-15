"use client";

import styles from "./itemGroup.module.css";
import Card from "./_card";
import { useState, useContext, useEffect } from "react";
import ItemData from "./_item_data";
import itemContext from "./_context";

export default function ItemGroups({ d }: { d: ItemData[] }) {
    const {data, setData, addItem, subItem} = useContext(itemContext);

    useEffect(() => {
        setData(d);
    }, [])

    return (
        <>
            {Array.from(new Set(data.map((item) => item.Category))).map((val, index) => {
                return (
                    <div key={val}>
                        <h1>{val}</h1>
                        <div className={styles.itemGroup}>
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
