import type { NextApiRequest, NextApiResponse } from "next";

const AC_API_URL = process.env.ACTIVE_CAMPAIGN_API_URL;
const AC_API_KEY = process.env.ACTIVE_CAMPAIGN_API_KEY;
const AC_LIST_ID = process.env.ACTIVE_CAMPAIGN_LIST_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email } = req.body;

    if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const contactResponse = await fetch(`${AC_API_URL}/api/3/contact/sync`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Api-Token": AC_API_KEY!,
            },
            body: JSON.stringify({
                contact: { email },
            }),
        });

        const contactData = await contactResponse.json();

        if (!contactResponse.ok) {
            return res.status(contactResponse.status).json(contactData);
        }

        const contactId = contactData.contact.id;

        const listResponse = await fetch(`${AC_API_URL}/api/3/contactLists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Api-Token": AC_API_KEY!,
            },
            body: JSON.stringify({
                contactList: {
                    list: AC_LIST_ID,
                    contact: contactId,
                    status: 1,
                },
            }),
        });

        const listData = await listResponse.json();

        if (!listResponse.ok) {
            return res.status(listResponse.status).json(listData);
        }

        return res.status(200).json({ success: true, contactId });
    } catch (error) {
        return res.status(500).json({ success: false, error: String(error) });
    }
}