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

### Newsletter controller

#### Methods
1. subscribe - this method is designed to handler requests from the 
   users that want to subscribe to the newsletter. It interacts
   with the databae to add a user record based on the name, email,
   and joined date.


2. unsubscribe - this method is designed to handle requests from users 
   who wish to unsubscribe from the mailing list. It interacts with the
   database to delete user records based on their provided name and email.


#### Usage

#### Code
```js
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
```

3. bulkSendEmails - this functions is responsible for sending emails
   to everybody on the mailing list. It used the nodemailer package

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
```javascript
    router.get('/relation/unfriend/:user_id', rc.unfriend);
```

---

### Function
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

---

2. block - this function is reponsible for blocking a relationship between two entities by inserting a new record into the relation table with the status of 'b'. This function is based on a simple  condigional check of the `blocked` variable, assuming it is always set to `true`.

#### Input parameters
- req (object): the request object with the friendship removal details in the request body.
    - req.body (object) an object with:
        - from (string): identifier of the entity initializing the unfriend action.
        - to (string): identifier of the entity to be unfriended.
- res (object):  the respomse object to semnd the result back to the client.

####  Operations
If the `blocked` variable is true, the function performs the following steps:
    1. `SQL Query Execution` - inserts a new record into the relation table with the  specified to. from. and a status of 'b'
    2. `response handling` - returns a 200 ok status with the query result and a success message inticating that the blocking was successful.

### Return value:
- returns a 200 ok status with the query result and success message if the blocking was successful.

### Function
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
### Example usage:
```javascript
router.post('/relation/block/:receiver_id', rc.block);
```

3. unblock - This function is reponsible for removing the blocking status between two entities  in the `relation` table of a database. it execu tes a SQL query to delete the specific blocking record based on the provided identifiers. The function returns a successful message along with the query result.

#### Input parameters
- req (object): the request object with the friendship removal details in the request body.
    - req.body (object) an object with:
        - from (string): identifier of the entity initializing the unfriend action.
        - to (string): identifier of the entity to be unfriended.
- res (object):  the respomse object to semnd the result back to the client.

#### operations:
1. `SQL query execution` - executes and SQL query to delete records from the `relation` table where the `from` and `to` fields match the specified identifiers. and the status 'b'
2. `response handling` - returns a 200 status code with a success message and the query result.

#### Example usage:
```js
router.post('/relation/unblock/:receiver_id', nc.unblock);
```

### function.

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
---

4. getFriends - this function is responsible for ret rieving a user's friends and blocked entities based on a specific status from the `relation` table in a database

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