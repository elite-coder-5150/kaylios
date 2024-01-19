import express from 'express';
const router = express.Router();
import { Utility as util } from '../utility/utility.mjs';
const bcrypt = require('bcrypt');

// router.get('', uc.getAllUsers)
// router.get(':user_id', uc.geSingletUsers);
// router.post('register', uc.registerUsers);
// router.put(':user_id', uc.updateUsers);
// router.delete(':user_id', uc.deleteUsers);

router.get('/api/users', async (req, res) => {
    try {
        const sql = /* sql */`
            select * from users
        `;

        const result = await util.getResults(sql);

        return res.status(200).send({
            data: result
        })
    } catch (error) {
        console.error(error);

        res.status(500).send({
            error: 'Internal Server Error'
        });
    }
});

/**
 * retrieve a single user from the database based on the
 * user_id.
 * 
 * @param {string} req - the request object
 * @param {string} res - the response object
 */
router.get('/api/user/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params.user_id;
        
        if (!user_id) {
            return res.status(400).send({
                error: 'user id is required'
            });
        }

        const sql = /* sql */`
            select * from users where user_id = ?
        `;

        const user = await util.getResults(sql, [user_id]);

        if (user.length > 0) {
            return res.status(200).send({
                message: 'successfully retrieved user',
                data: user
            });
        }
    } catch (error) {
        console.error(error);

        res.status(500).send({
            error: 'Internal Server Error'
        });
    }
}); 

/**
 * register a new user
 * 
 * @param {String} req - the request object
 * @param {String} res - the response object
 */
router.post('/api/user/create', async (req, res) => {
    try {
        const { user_name, password, email } = req.body;

        const hashPass = await bcrypt.hash(password, 10);

        const sql = /* sql */`
            insert into users (user_name, password, email)
            values (?, ?, ?)
        `
        const results = await util.getResults(sql, [user_name, hashPass, email]);
        
        if (results.length === 0) {
            return res.status(404).send({
                message: 'error creating user account',
                data: null
            });
        }

        return res.status( 200).send({
            message: 'successfuly created user account',
            data: results
        });
    } catch (error) {
        console.error(error);

        res.status(500).send({
            error: 'Internal Server Error'
        });
    }
});

router.put('/api/:user_id', async (req, res) => {
    try {
        
    } catch (error) {
        console.error(error);

        res.status(500).send({
            error: 'Internal Server Error'
         });
    }
});

router.delete('/api/user/:user_id', uc.deleteUser);
module.exports = router;