import sendgrid from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ result: "Hi world" });
}

export async function POST(request: Request) {
    const req = await request.formData()

    sendgrid.setApiKey("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");
    const msg = {
        to: `${req.get('email')}`, // Change to your recipient
        from: "streeshaktiprabodhan@gmail.com", // Change to your verified sender
        subject: "Stree Shakti Prabodhini Order",
        html: `<div><p>Hello ${req.get('name')},<p><br/><p>Thank you for your order! Enclosed are your order details:</p><br/>${req.get('items')}<br/><p>Thank you!</p></div>`,
    };
    const s = await sendgrid.send(msg)
        .then(() => {
            return NextResponse.json({ status: "Success" });
        })
        .catch((error: any) => {
            return NextResponse.json({ status: "Failure" });
        });
    
    return s;
}
