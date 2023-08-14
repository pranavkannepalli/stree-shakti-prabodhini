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

export default function Card(itemData : ItemData ) {
    return (
        <div>
            {itemData.Image}
        </div>
    );
}