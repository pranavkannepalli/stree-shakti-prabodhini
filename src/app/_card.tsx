import styles from "./_card.module.css";
import ItemData from './_item_data';

export default function Card(itemData: ItemData, add: Function, sub: Function) {
    return (
        <div className={styles.card} key={itemData.ProductNum}>
            <div className={styles.imgContainer}>
                <img src={itemData.Image} alt={itemData.AltText} />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.spaceBetween}>
                    <h3>{itemData.ProductNum + ') ' + itemData.Name}</h3>
                    <h4>₹{itemData.Price}</h4>
                </div>
                <p>{itemData.Description}</p>
                <p>Dimensions: {itemData.Dimensions}</p>
                {itemData.Availability == 'TRUE' ? (
                    <div className={styles.spaceBetween}>
                        <h4>Available</h4>
                        <div className={styles.buttonGroup}>
                            <button onClick={() => add(itemData.ProductNum)}>+</button>
                            <h4>{itemData.Quantity}</h4>
                            <button onClick={() => sub(itemData.ProductNum)}>-</button>
                        </div>    
                    </div>
                ) : <h4>Unavailable</h4>}
            </div>
        </div>
    );
}
