import ItemData from "./_item_data";

export default async function submitForm(name: string, email: string, address: string, phoneNum: string, selectedItems: ItemData[]) {
    var formData = new FormData();

    formData.append("email", email);
    formData.append("name", name);
    var text = selectedItems.map((val) => `
    <tr>
        <td style='padding: 3px;'>
            ${val.Name}
        </td>
        <td style='padding: 3px;'>
            ${val.Quantity}
        </td>
        <td style='padding: 3px;'>
            ${val.Price}
        </td>
        <td style='padding: 3px;'>
            ${val.Quantity * val.Price}
        </td>
    </tr>
    `);

    var items = text.join(' ');

    formData.append('items', items);
    formData.append('address', address);
    formData.append('phoneNum', phoneNum);
    
    const res = await fetch('https://stree-shakti-prabodhan.vercel.app/email', {body: formData, mode: 'no-cors', method: 'POST', headers: {"Content-Type": 'multipart/formdata'}});

    if (res.status == 200) {
        return true;
    }
    else {
        return false;
    }
}
