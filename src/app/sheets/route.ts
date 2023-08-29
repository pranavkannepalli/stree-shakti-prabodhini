import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
        const auth = google.auth.fromAPIKey("AIzaSyDVmj279LmlTooCkalTcwH8QnGNhAy0xpQ");

        const sheets = google.sheets({ version: "v4", auth: auth });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: "1MGK0S7GPnI72Y7f8iu7zIb4mPeJ7LYyTH6ESDYOPdgY",
            range: "ItemSheet",
        });

        const rows = response.data.values;
        let data = [];
        if (rows) {
            const table_headers = rows[0] as string[];
            for (var i = 1; i < rows.length; i++) {
                let row_data = rows[i];
                var new_data = {
                    ProductNum: row_data[0] as string,
                    Image: (row_data[1] as string).slice(0, (row_data[1] as string).indexOf('/view?')).replace("file/d/", "uc?export=view&id="),
                    AltText: row_data[2] as string,
                    Name: row_data[3] as string,
                    Description: row_data[4] as string,
                    Price: row_data[5] as number,
                    Dimensions: row_data[6] as string,
                    Availability: row_data[7] as string,
                    Category: row_data[8] as string,
                    Quantity: 0,
                };
                data.push(new_data);
            }
        }
        return NextResponse.json(data);
    } catch (err) {
        console.log(err);
    }
}

export async function POST(request: NextRequest) {
    try {
        const target = ["https://www.googleapis.com/auth/spreadsheets"];
        const auth = google.auth.fromAPIKey("AIzaSyDVmj279LmlTooCkalTcwH8QnGNhAy0xpQ");

        const sheets = google.sheets({ version: "v4", auth: auth });

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: "1MGK0S7GPnI72Y7f8iu7zIb4mPeJ7LYyTH6ESDYOPdgY",
            range: "OrderSheet",
            requestBody: {
                values: [
                    ["Pranav K", "1x Smth", "4255331980", "pranav.kannepalli@gmail.com", "15355 NE 66th Ct Redmond WA"]
                ]
            }
        })

        return NextResponse.json({result : 'Stunning'})
    }
    catch (e) {
        return NextResponse.json({result : 'Not great', error: e})
    }
}

export const revalidate = 0;