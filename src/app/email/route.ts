import sendgrid from '@sendgrid/mail';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
        sendgrid.setApiKey('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');
        const msg = {
            to: 'pranav.kannepalli@gmail.com', // Change to your recipient
            from: "streeshaktiprabodhan@gmail.com", // Change to your verified sender
            subject: "Sending with SendGrid is Fun",
            text: "and easy to do anywhere, even with Node.js",
            html: "<strong>and easy to do anywhere, even with Node.js</strong>",
        };
        sendgrid
            .send(msg)
            .then(() => {
                console.log("Email sent");
            })
            .catch((error: any) => {
                console.error(error);
            });
}