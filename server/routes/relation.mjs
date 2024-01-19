import  express from 'express';
const router = express.Router();
import { Utility as util } from '../utility/utility.mjs';
//? get all of the request from the database
router.get('/api/user/requests', async (req, res) => {
    try {
        const { sender, receiver } = req.body;

        const sql = /* sql */`
            select 
                r.sender, 
                r.receiver
            from relation as r
            where sender = ? and 
                  receiver = ?
        `;

        const results = await util.getResults(sql, [sender, receiver]);

        if (results.length === 0) {
            return res.status(404).send({
                error: 'error retrieving requests',
                data: null
            });
        }

        return res.status(200).send({
            error: null,
            data: results
        });
    } catch (error) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.get('/api/user/request/send', async (req, res) => {
    try {
        const alreadyFriends = await util.alreadyFriends();
        const pending = await util.isPending();

        if (alreadyFriends) {
            res.status(400).send({
                message: 'AlreadyFriends with this user.',
                data: null
            })
        } else if (pending) {
            res.status(400).send({
                message: 'the request is pending.',
                data: null
            })
        } else {
            const { sender, receiver } = req.body;

            if (!sender || !receiver) {
                return res.status(400).send({
                    success: false,
                    message: 'sender and receiver are required'
                });
            }

            const sql = /* sql */`
                insert into relation (sender, receiver, status)
                values (?, ?, 'p');
            `;

            const results = await util.getResults(sql, [sender, receiver]);

            if (results.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: 'request not found'
                });
            }

            return res.status(200).send({
                success: true,
                message: 'successfuly canceled request',
                data: results
            })
        }
    } catch (error) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
})
module.exports = router;