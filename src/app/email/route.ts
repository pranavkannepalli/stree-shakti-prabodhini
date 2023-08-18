import sendgrid from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ result: "Hi world" });
}

export async function POST(request: Request) {
    const req = await request.formData();

    sendgrid.setApiKey("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");
    const msg = {
        to: [`${req.get("email")}`, "ssprabodhan@jnanaprabodhini.org"], // Change to your recipient
        from: "streeshaktiprabodhan@gmail.com", // Change to your verified sender
        subject: "Stree Shakti Prabodhini Order",
        html: `
        <html>
        <body>
          <p>Hello ${req.get("name")},</p>
          <p>Thank you for your order. Listed below are your order details:</p>
          <table style="text-align: left; border-collapse: collapse;" border='1'>
            <tr style="background-color: #EE9595;" >
            <th style='padding: 3px;'>
            Name
            </th>
            <th style='padding: 3px;'>
            Quantity
            </th>
            <th style='padding: 3px;'>
            Price
            </th>
            <th style='padding: 3px;'>
            Total Price
            </th>
            </tr>
            ${req.get('items')}
          </table>
          <p>Delivery address: ${req.get('address')}<br/>Phone Number: ${req.get('phoneNum')}</p>
          <p>Thank you for your interest, <br/> Stree Shakti Prabodhan</p>
        </body>
      </html>`,
    };
    const s = await sendgrid
        .send(msg)
        .then(() => {
            return NextResponse.json({ status: "Success" });
        })
        .catch((error: any) => {
            return NextResponse.json({ status: "Failure" });
        });

    return s;
}
