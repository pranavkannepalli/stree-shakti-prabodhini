import Image from "next/image";
import styles from "./_card.module.css";

interface ItemData {
    ProductNum: string;
    Image: string;
    AltText: string;
    Name: string;
    Description: string;
    Price: number;
    Dimensions: string;
    Availability: string;
    Category: string;
    Quantity: number;
}

export default function Card(itemData: ItemData) {
    return (
        <div className={styles.card}>
            <img src={itemData.Image.replace("file/d/", "uc?export=view&id=").replace("/view?usp=sharing", "")} alt={itemData.AltText} />
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
                            <button>+</button>
                            <h4>{itemData.Quantity}</h4>
                            <button>-</button>
                        </div>    
                    </div>
                ) : <h4>Unavailable</h4>}
            </div>
        </div>
    );
}
