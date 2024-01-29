import { Utility as utility } from '../utility/utility.mjs';

export const searchUsers = async (req, res) => {
    try {
        const { username } = req.query;

        const sql = /* sql */`
            select * from users where username LIKE ?
        `;

        const users = await utility.getResults(sql, [username]);

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

export const searchCategory = async (req, res) => {
    try {
        const { category_name} = req.query;

        const sql = /* sql */`
            select * from category where category_name like ?
        `;
        const category = await utility.getResults(sql, [category_name]);

        return res.status(200).send({
            data: category
        });
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            error: 'internal server error'
        });
    }
};

export const searchTags = async (req, res) => {
    try {
        const { tag_name } = req.query;

        const sql = /* sql */`
            select * from tags where tag_name like ?
        `;

        const tags = await utility.getResults(sql, [tag_name]);

        return res.status(200).send({
            data: tags
        });
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            error: 'internal server error'
        });
    }
};

export const searchNotes = async (req, res) => {
    try {
        const { title, content } = req.query;

        const sql = /* sql */`
            select * from notes where title like ? or content like ?
        `;

        const notes = await utility.getResults(sql, [title, content]);


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

export const searchGroups = async (req, res) => {
    try {
        const { group_name } = req.query;

        const sql = /* sql */`
            select * from groups where group_name like ?
        `;

        const groups = await utility.getResults(sql, [group_name]);

        return res.status(200).send({
            data: groups
        });
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            error: 'internal server error'
        });
    }
};

export const searchVideos = async (req, res) => {
    try {
        const {title, description } = req.query.searchTerm;

        const sql = /* sql */`
            select * from videos where title like ? or description like ?
        `;

        const videos = await utility.getResults(sql, [title, description]);

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