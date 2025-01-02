import ItemData from "../_item_data";
import styles from "./_checkoutCard.module.css";
import Image from "next/image";

export default function CheckoutCard(itemData: ItemData, add: Function, sub: Function) {
    return (
        <div className={styles.card} key={itemData.ProductNum}>
            <Image src={"/" + itemData.ProductNum + ".jpeg"} alt={itemData.AltText} width={1000} height={500} />
            <div className={styles.cardContent}>
                <h4>{itemData.Name}</h4>
                {itemData.Availability == "TRUE" ? (
                    <div className={styles.spaceBetween}>
                        <h4>₹{itemData.Price}</h4>
                        <div className={styles.buttonGroup}>
                            <button onClick={() => add(itemData.ProductNum)}>+</button>
                            <h4>{itemData.Quantity}</h4>
                            <button onClick={() => sub(itemData.ProductNum)}>-</button>
                        </div>
                    </div>
                ) : (
                    <h4>Unavailable</h4>
                )}
            </div>
        </div>
    );
}
