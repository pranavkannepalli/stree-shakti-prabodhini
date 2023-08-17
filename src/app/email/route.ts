import sendgrid from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ result: "Hi world" });
}

export async function POST(req: NextRequest) {
    const data = await req.json();

    sendgrid.setApiKey("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");
    const msg = {
        to: "pranav.kannepalli@gmail.com", // Change to your recipient
        from: "streeshaktiprabodhan@gmail.com", // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    const s = await sendgrid.send(msg)
        .then(() => {
            return NextResponse.json({ status: "Success" });
        })
        .catch((error: any) => {
            return NextResponse.json({ status: "Failure" });
        });
}
