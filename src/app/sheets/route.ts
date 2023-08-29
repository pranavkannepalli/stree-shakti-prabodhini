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
                    Image: (row_data[1] as string)
                        .slice(0, (row_data[1] as string).indexOf("/view?"))
                        .replace("file/d/", "uc?export=view&id="),
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
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: "service-account@nth-facility-395715.iam.gserviceaccount.com",
                private_key:
                    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNqECaWHBHZT2n\n/04zt+ZmCfrTd+YgSrj8zXzX7sBLUb38S29XRLnphX2ed1hLtSCuCJVwqpmSqkgK\nhqkSPVXXpfHOaoC7+S2Mjv5xLPQcjxncsuwPZu9KdXdNaw0f5zh20T3bdSbCfikA\nVchdgm9z2dF74hUeHfvu9mOuOfeTVAHXWEr0ZP2QUKgYcJBSWe2192KuvA4S/11U\nnjwREyS3WlGLnCmpvo1s5+DG00boOqlElMrWuBTqqL8EZRMtphxpkg2icTcvh/fx\n93whp1SAxjZqFKKfmiY0s/DwmfhK6XBcbHnUY3vTo4qyEkaBOq2GBEjqV+SgVjAa\n+c0jURQTAgMBAAECggEAJGy58HxcepC4YGJsH+Xg9U6sMbspM6v4YrIke/xJ660x\nKJfVww+lm/IsQx5hMZuFi71ydm+I3ryxIMgj9tqNMzIth0E+xsxF4IDNGQ98tvgz\nfO7lt36kQDxY4onk27MwwX6i5ZU0xbrhmTEYWVOKWOsJ2ta6pchqwDK8ifWzX1Du\npNkUo49WmF8TAz8XgLJqGkTsuQBLmam4pfdXJGlXJ20leolIFxHMaDQHk3Y3cRR4\njoH2mPkmXhP9sejlryiEjjLtKmtzZQOGK0gmaA8ErQNzP63kccASK3PqejfVIKkX\nym8bePPQJOTAByseWUaPBN/xE1GKDdI2VFxr+5mDuQKBgQD58ToEh+XdbJXZQvY0\nIxhL+C6D4arg9Z21IpSFDs8HkWXP2LfmTTCT50BWEa+RjFcCw/3EMoSt+vIi4BVC\n2yPIgW7e+Rk21bZStjpz98wG4pm4ubU4HdEja59T5uA/uOaDc2og6ZTHFGQwlCqe\nKgItbnY7BIXJFwE4MZbHekUTmwKBgQDSpEIJfp1yhTJeeutGUm96GA3QQfITrPNV\nH01/ZHFm2WWHL7cuNuBnmNq/J2MvGvvzoMoUjF1/PFLObcNP6ygCT4TuhM68qm5A\new+7njgMkRqFiZ6WyihJ+j/lt2CcwnBOi7hSoVvl7KvlXz0egxySlhsNFkW7b6eE\nDoKm6bB06QKBgQDFfd4iBl+S/mHJMifoOnLQVGIswvuKlYjvv0srd/AOQsz31n44\n83UW6PrlB0R69TErdkHl7ST5c/gvpnAmS5GStPMuLBXIRkWyRVsalwoXxqVAWTzg\nAm9mVXuniB5ZO3ipFWEecHKme25PFEQ4hWkDDO1O5NvxcMP96vEA3ZQHUQKBgAHJ\nevXxqQxLrP24NT7HfEKg6Z0WsiMQmI/kUBgAliW1OnNHKFqwBH9cgJ6WivTfWbvb\nZVt/RVvK+zjdHYcUC6bZXdtYLRjUqVLKuHtzAC67HGp9nGbTGDxobxpXz+4EiEdi\nUBIDZHAy7dJoWHBl1Fw6Aci+o6DPdbBdHyajXOfhAoGACYQCxg76SetBnOCY8TRc\nglZPjH76fCfCLp5qboLB22uEjTxvjI7tPv5/GD3SuFucuRJT7g6/8Dc+F880Fcd+\nEwCOfgDl8m6xlh/soUOo+7TkvX8GH1EE2xikWzxUpLCOwukxEc7XHjzsdlpi7QfL\n9TOiewGJ70xljk9/AMEKPc8=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
            },
            scopes: target
        });

        const sheets = google.sheets({ version: "v4", auth: auth });

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: "1MGK0S7GPnI72Y7f8iu7zIb4mPeJ7LYyTH6ESDYOPdgY",
            range: "OrderSheet",
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    ["Pranav K", "1x Smth", "4255331980", "pranav.kannepalli@gmail.com", "15355 NE 66th Ct Redmond WA"],
                ],
            },
        });

        return NextResponse.json({ result: "Stunning" });
    } catch (e) {
        return NextResponse.json({ result: "Not great", error: e });
    }
}

export const revalidate = 0;
