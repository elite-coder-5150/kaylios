import { getResults } from '../utility/getResults';
const bcrypt = require('bcrypt');

export const getAllUsers = async (req, res) => {
    try {
        const sql = /* qql */`
            select * from users
        `;

        const result = await getResults(sql);

        return res.status(200).send({
            message: 'successfully retrieved all users',
            data: result``
        })
    } catch (error) {
        console.error(error);

        res.status(500).send({
            message: 'internal server error',
        });
    }
};

export const geSingletUsers = async (req, res) => {
     try {
        const { user_id } = req.params.user_id;

        if (!user_id) {
            return res.status(400).send({
                message: 'user id is requiredc'
            });
        }

        const sql = /* sql */`
            select * from users where u_id=?
        `;

        const user = getResults(sql, [user_id]);

        if (!user) {
            return res.status(400).send({
                message: 'user not found'
            });
        }

        return res.status(200).send({
            message: 'successfully retrieved user',
            data: user
        })
     } catch (error) {
        console.error(error);

        return res.status(500).send({
            message: 'internal server error',
        })
     }
};

export const registerUser = async (req, res) => {
    try {
        const { user_name, email} = req.body;

        const hashPass = await bcrypt.hash(pasword, 10);

        const sql = /* sql */`
            insert into users (user_name, password, email)
            values (?, ?, ?);
        `;

        const result = await getResults(sql, [user_name, hashPass, email]);

         return res.status(200).send({
            message: 'successfully registered user',
            data: result
         })
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            messasge: 'internal server error',
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params.user_id;
        const { 
            user_name, email, pass_hash,  bio, 
            profille_picture_url, joined_date 
        } = req.body;

        if (!user_id) {
            return res.status(403).send({
                message: 'user id is required'
            })
        }
        const sql = /* sql */`
            update users
            where user_name = ? and email = ? and hash_pass = ? and 
            bio = ? and profille_picture_url = ? and joined_date = ?
        `;

        const results = await getResults(sql, [
            user_name, email, pass_hash,  bio, 
            profille_picture_url, joined_dat]);

        if (results.affectedRows === 0) {
            return res.status(404).send({
                message: 'user not found'
            });
        }

        return res.status(200).send({
            message: 'successfully updated user',
            data: results
        })
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            messasge: 'internal server error',
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params.user_id;
      
        
        const sql = /* sql */`
            delete from users
            where user_id = ?
        `;

        const results = await getResults(sql, [user_id]);

        return res.status(200).send({
            message: 'successfully deleted user',
        });
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            messasge: 'internal server error',
        });
    }
};