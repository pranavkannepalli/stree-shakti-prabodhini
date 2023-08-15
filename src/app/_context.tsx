"use client";

import { createContext, useState } from "react";
import ItemData from "./_item_data";

const ItemContext = createContext<{ data: ItemData[]; setData: Function; addItem: Function; subItem: Function }>({
    data: [],
    setData: () => {},
    addItem: () => {},
    subItem: () => {},
});

export const ItemContextProvider = ({ children }: { children: any }) => {
    const [data, setData] = useState<ItemData[]>([]);

    const addItem = (productNum: string) => {
        let new_data = [...data];
        let i = new_data.find((val) => val.ProductNum == productNum);

        if (i) {
            i.Quantity += 1;
            if (i.Quantity > 10) {
                i.Quantity = 10;
            }
        }

        setData(new_data);
    };

    const subItem = (productNum: string) => {
        let new_data = [...data];
        let i = new_data.find((val) => val.ProductNum == productNum);

        if (i) {
            i.Quantity -= 1;
            if (i.Quantity < 0) {
                i.Quantity = 0;
            }
        }

        setData(new_data);
    };

    const value = {
        data,
        setData,
        addItem,
        subItem,
    };

    return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export default ItemContext;
