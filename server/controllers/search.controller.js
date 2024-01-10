import { getResults } from '../utility/getResults';

export const searchUsers = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;

        const sql = /* sql */`
            select * from users where username LIKE ?
        `;

        const users = await getResults(sql, ['%${searchTerm}%']);

        if (users.length === 0) {
            return res.status(404).send({
                message: 'User not found'
            });
        }

        return res.status(200).send({
            message: 'User successfully found',
            data: users
        });
    } catch (error) {
        console.error(error);

        res.status(500).send({
            error: 'Internal Server Error'
        });
    }
};

export const searchCategory = async (req, res) => {};

export const searchTags = async (req, res) => {};

export const searchNotes = async (req, res) => {};

export const searchGroups = async (req, res) => {};

export const searchVideos = async (req, res) => {};