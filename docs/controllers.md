# documentation for the controllers.
### Follow System Controller

#### Methods
1. follow - 

2. unfollow - 

3. getFollowers - 

---

### Notes Controller

#### Methods
1. getAllNotesByUser -

2. getSingleNote -

3. createNote - 

4. updateNote - 

5. deleteNote - 

---

### Relation Controller

#### Methods
1. unfriend - the `unfriend` function handles the removal of the friendship between two entities. It uses an SQL query to delete records from the `relation` table bnased on speicific criteria.

#### Input parameters
- req (object): the request object with the friendship removal details in the request body.
    - req.body (object) an object with:
        - from (string): identifier of the entity initializing the unfriend action.
        - to (string): identifier of the entity to be unfriended.
- res (object):  the respomse object to semnd the result back to the client.

#### SQL Query:
deletes records from the `relation` table where status is 'f'   and the specified entities
involved in the relationship.

### Usage:
```js
    router.get('/relation/unfriend/:user_id', rc.unfriend);
```

```js
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
```

2. block - 

```js
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
```

3. unblock - 

```js
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
```

4. getFriends -

```js
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
```

5. getRequests - 

```js
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
```

6. sendRequest - 

```js
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
```

7. isPending - 

```js
export const isPending = async (req, res) => {
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

        if (results.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'no pending requests were found'
            });
        }

        return res.status(200).send({
            success: true,
            data: results
        })
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    }
};
```

8. alreadyFriends - 

```js
export const alreadyFriends = async (req, res) => {
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

        if (results.affectedRows === 0) {
            return res.status(400).send({
                success: false,
                message: 'the users are not found'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'you are already friends with this person',
            data: results
        });
    } catch (err) {
        console.error(error);

        return res.status(500).send({
            message: 'internal server error'
        });
    }
}
```

9. accept - 

```js
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
```

10. cancel - 

```js
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
```

11. getUsers -

```js
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
```