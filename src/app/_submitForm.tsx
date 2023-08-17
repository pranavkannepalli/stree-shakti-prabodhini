import ItemData from "./_item_data";

export default async function submitForm(name: string, email: string, selectedItems: ItemData[]) {
    console.log(email);

    var formData = new FormData();

    formData.append("email", email);
    formData.append("name", name);
    var items = `<table><tr><th>Name</th><th>Quantity</th><th>Price</th><th>Total</th></tr>${selectedItems.map(
        (val) =>
            `<tr><td>${val.Name}</td><td>${val.Quantity}</td><td>${val.Price}</td><td>${
                val.Quantity * val.Price
            }</td></tr>`
    )}<table>`;
    formData.append('items', items);
    
    console.log(formData.toString());

    const res = await fetch('https://stree-shakti-prabodhan.vercel.app/email', {body: formData, mode: 'no-cors', method: 'POST', headers: {"Content-Type": 'multipart/formdata'}});

    console.log(res.json());
}