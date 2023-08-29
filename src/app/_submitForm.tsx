import ItemData from "./_item_data";

export default async function submitForm(name: string, email: string, address: string, phoneNum: string, selectedItems: ItemData[]) {
    var formData = new FormData();

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

    const calcTotal = () => {
        let s = 0;

        selectedItems.forEach((val) => {
            s += val.Quantity * val.Price;
        });

        return s;
    };

    var subtotal = `
    <tr>
        <td style='padding: 3px;'>
            Total
        </td>
        <td style='padding: 3px;'>
            --
        </td>
        <td style='padding: 3px;'>
            --
        </td>
        <td style='padding: 3px;'>
            ${calcTotal()}
        </td>
    </tr>`;

    var items = text.join(' ');

    var item_list = selectedItems.map((val) => `
        ${val.Name} x${val.Quantity}
    `)

    formData.append("email", email);
    formData.append("name", name);
    formData.append('itemlist', item_list.join(', '));
    formData.append('items', items);
    formData.append('address', address);
    formData.append('phoneNum', phoneNum);
    formData.append('total', "" + calcTotal())
    formData.append('date', new Date().toLocaleDateString("en-US"))
    
    const res = await fetch('https://stree-shakti-prabodhan.vercel.app/email', {body: formData, mode: 'no-cors', method: 'POST', headers: {"Content-Type": 'multipart/formdata'}});
    const res2 = await fetch('https://stree-shakti-prabodhan.vercel.app/sheets', {body: formData, mode: 'no-cors', method: 'POST', headers: {"Content-Type": 'multipart/formdata'}});
    
    if (res.status == 200 && res2.status == 200) {
        return true;
    }
    else {
        return false;
    }
}
