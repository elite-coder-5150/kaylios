import { db } from '../server.mjs';
export class  Utility {
    getResults = (sql, values) => {
        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    /**
     * 
     */
    alreadyFriends = async ()  => {
        try {
            const { sender, receiver } = req.body;

            if (!sender || !receiver) {
                return res.status(400).send({
                    success: false,
                    message: 'sender and receiver are required'
                });
            }
            const sql = /* sql */` 
                SELECT * 
                FROM relation 
                WHERE sender=? AND receiver=? AND status='f'
            `;

            const results = await getResults(sql, [sender, receiver]);

            return (results.affectedRows === 0) ? true : false;
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Server error" });
        }
    }

    isPending = async () => {
        try {
            const { sender, receiver } = req.body;
            
            if (!sender || !receiver) {
                return res.status(400).send({
                    success: false,
                    message: 'sender and receiver are required'
                })
            }
            const sql = /* sql */`
                SELECT * FROM relation
                WHERE (
                    status = 'p' AND sender=? AND receiver=?
                ) OR (
                    status = 'p' AND receiver=? AND sender=?
                )
            `;

            const results = await getResults(sql, [sender, receiver, receiver, sender]);

            return (results.affectedRows === 0) ? true : false;
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Server error" });
        }
    }
}