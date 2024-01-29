const getResults = require('../utility/getResults');

//? unfriend a user.
export const unfriend = async (req, res) => {
    try {
        const { from, to } = req.body;

        const sql = /* sql */`
            delete from relation where (
                status = 'f' and from = ? and to = ?
            ) or (
                status = 'f' and from = ? and to = ?
            )
        `;

        const result = await getResults(sql, [from, to]);

        if (result.affectedRows === 0) {
            return res.status(400).send({
                message: 'error executing query'
            });
        }

        return true;
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            message: 'internal server error'
        });
    }
};

//? block a user
export const block = async (req, res) => {
    const { from, to } = req.body;
    const blocked = true;

    if (blocked) {
        const sql = /* sql */`
            insert relation (from, to, status)
            values (?, ?, 'b')
        `;

        const result = await getResults(sql, [from, to]);

        return res.status(200).send({
            data: result,
            message: 'successfully blocked'
        })
    }
};

//? unblock user
export const unblock = async (req, res) => {
    const { from, to } = req.body;

    const sql = /* sql */`
        delete from relation where from = ? and to = ? and status = 'b'
    `;

    const result = await getResults(sql, [from, to]);

    return res.status(200).send({
        message: 'success',
        data: result
    });

    return true;
};

//? get friends list.
export const getFriends = async (req, res) => {
    try {
        let friends = ["friend" = [], "blocked" = []]

        const sql = /* sql */`
            select * from relations where \`status\` = 'f' and \`from\` = ?
        `;
        
        const results = await getResults(sql, [friends]);

        if (results.length === 0) {
            return res.status(404).send({
                message: 'No results found'
            });
        } else {
            return res.status(200).send({
                message: "successfully retrieved your friends list",
                data: results
            });
        }

    } catch (error) {
        console.error(error);

        return res.status(500).send({
            message: 'internal server error'
        });
    }
};

//? get new requests
export const getRequests = async (req, res) => {
    try {
        let _req = ["in" = [], "out" = []];
        const { user_id } = req.params.user_id;

        const sql = /* sql */`
            select * from relations where \`status\` = ? and \`to\` = ?
        `;

        const result = await getResults(sql, [user_id]);

        if (result.length === 0) {
            return res.status(404).send({ 
                message: 'no new request found'
             });
        } else {
            return res.status(200).send({
                message: 'success retrieved requests',
                data: result
            });
        }

        return _req;
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            message: 'internal server error'
        });
    }
};

//? send a request to another user.
export const sendRequest = async (req, res) => {
    try {
        const pending = await isPending();
        const alreadyFriends = await alreadyFriends();

        if (pending) {
            res.status(400).send({
                success: false,
                message: 'The request is pending.'
            });
        } else if (alreadyFriends) {
            res.status(400).send({
                success: false,
                message: 'You are already friends with this person.'
            });
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

            const results = await getResults(sql, [sender, receiver]);

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
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'internal server error'
        });
    }
};






//? accept the request
export const accept = async (req, res) => {
    try {
        const { sender, receiver } = req.body;

        if (!sender || !receiver) {
            return res.status(400).send({
                success: false,
                message: 'sender and receiver are required'
            });
        }

        const sql = /* sql */`
            update relation
            set status = 'f'
            where sender=? and receiver=? and status='p'
        `;

        const results = await getResults(sql, [requestId]);

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
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'internal server error'
        });
    }
};

//? cancene the request
export const cancel = async (req, res) => {
    try {
        const { requestId } = req.params;

        if (!requestId) {
            return res.status(400).send({
                success: false,
                message: 'requestId is required'
            });
        }

        const sql = /* sql */`
            delete from relations where requestid = ?
        `;

        const results = await getResults(sql, [requestId]);

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
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'internal server error'
        });
    }
}

export const getUsers = async (req, res) => {
    try {
        const sql = /* sql */`
            select * from users
        `;

        const result = await getResults(sql);

        if (result.length === 0) {
            return res.status(404).send({
                message: 'no results found'
            })
        } else {
            return res.status(200).send({
                data: result,
                message: 'successfully retrieved users'
            })
        }
    } catch (error) {
        
    }
  
}