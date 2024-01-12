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

export const searchNotes = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;

        const sql = /* sql */`
            select * from notes where title like ? or content like ?
        `;

        const notes = await getResults(sql, ['%${searchTerm}%', '%${searchTerm}%']);


        return res.status(200).send({
            data: notes
        })
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            error: 'Internal Server Error'
        })
    }
};

export const searchGroups = async (req, res) => {};

export const searchVideos = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;

        const sql = /* sql */`
            select * from videos where title like ? or description like ?
        `;

        const videos = await getResults(sql, ['%${searchTerm}%','%${searchTerm}%']);

        return res.status(200).send({
            data: videos
        });
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            error: 'internal server error'
        });
    }
};