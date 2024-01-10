import { getResults } from "../utility/getResults";

export const createNewsletter = async  (req, res) => {
    try {
        const { email, joined_date } = req.body;

        const sql = /* sql */`
            insert into newsletter (email, joined_date)
            values (?, ?)
        `;

        const result = await getResults(sql, [email, joined_date]);

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

export const unsubscribe = async (req, res) => {};

export const bulkSendEmail = async (req, res) => {};