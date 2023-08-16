import ItemData from "../_item_data";
import styles from "./_checkoutCard.module.css";

export default function CheckoutCard(itemData: ItemData, add: Function, sub: Function) {
    return (
        <div className={styles.card} key={itemData.ProductNum}>
            <img src={itemData.Image} alt={itemData.AltText} />
            <div className={styles.cardContent}>
                <h3>{itemData.ProductNum + ") " + itemData.Name}</h3>
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
