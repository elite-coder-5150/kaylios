import { Utility as utility } from "../utility/getResults";
import nodemailer from 'node-notdemailer';
import dotenv from 'dotenv';
dotenv.config();

export const subscribe = async  (req, res) => {
    try {
        const { name, email, joined_date } = req.body;

        const sql = /* sql */`
            insert into newsletter (name, email, joined_date)
            values (?, ?, ?);
        `;

        const result = await utility.getResults(sql, [name, email, joined_date]);

        if (!result) {
            return res.status(400).send({
                message: 'error executing query'
            })
        }

        return res.status(200).send({
            message: 'successfuly created nerwsletter subscription',
            data: result
        })
    } catch (error) {
        console.error(error);

        res.status(500).send({
            message: 'internal server error'
        })
    }
};

export const unsubscribe = async (req, res) => {
    try {
        const { name, email } = req.body;

        const sql = /* sql */`
            delete from newsletter where name = ? and email = ?
        `;

        const result = await utility.getResults(sql, [name, email]);

        return res.status(200).send({
            message: 'successfully unsubscribed from the mailing list',
            data: result
        })
    } catch (error) {
        console.error(error);

        res.status(500).send({
            message: 'internal server error'
        })
    }
};

// this is my code not AI generated.
// export const bulkSendEmail = async (req, res) => {
//     try {
//         const { emailAddr } = req.body;

//         const sql = /* sql */`
//             select * from newsletter
//         `;

//         const emails = await utility.getResults(sql, [emailAddr]);

//         emails.forEach((email) => {
//             sendEmails(email);
//         })
//     } catch (error) {
//         console.error(error);

//         res.status(500).send({
//             message: 'internal server error'
//         })
//     }
// };

export const bulkSendEmail = async (req, res) => {
    try {
        const { subject, message } = req.body;
        const sql = /*sql*/`
            select email from newsletter
        `;

        const results = await utility.getResults(sql);

        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE_PROVIDER,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            subject: subject,
            text: message
        };

        for (const row of results) {
            mailOptions.to = row.email;
            await transporter.sendMail(mailOptions);
        }

        return res.status(200).send({
            message: 'bulk emails sent successfully',
            data: results
        })
    } catch (error) {
        console.error(error);

        res.status(500).send({
            message: 'internal server error'
        })
    }
};