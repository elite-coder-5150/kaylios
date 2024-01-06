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
        
    } catch (error) {
        
    }
};

export const deleteUser = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};