import express from 'express';
const router = express.Router();
import { Utility as util } from '../utility/utility.mjs';

// import * as sc from "../controllers/search.controller";
const sc = require("../controllers/search.controller");

/**
 * search for a particular user 
 * 
 * @param {string} req - request object
 * @param {string} res - response object
 */
router.get('/api/search/user/:user_id', async (req, res) => {
    try {
        const { username } = req.query;

        if (!username) {
            return res.status(400).send({
                error: 'username is required'
            });
        }

        const sql = /* sql */`
            select * from users where username like ?
        `;

        const users = await util.getResults(sql, [username]);

        if (users.length === 0) {
            return res.status(400).send({
                error: 'User not found'
            });
        }

        return res.status(200).send({
            message: 'user successfully found',
            data: users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: 'Internal Server Error'
        });
    }
});

/**
 * search for a particular category
 * 
 * @param {string} req - request object
 * @param {string} res - response object
 */
// router.get('search/category/:category_id', sc.searchCategory); 
router.get('/api/search/category/:category_id', async (req, res) => {
    try {
        const { category_name } = req.query;

        const sql = /* sql */`
            select * from category where category_name like ?
        `;

        const category = await util.getResults(sql, [category_name]);

        if (category.length === 0) {
            return res.status(404).send({
                error: 'sorry user was not found'
            })
        }
        return res.status(200).send({
            data: category
        })
    } catch (error) {
        console.error(error);

        res.status(500).send({
           error: 'Internal Server Error'
        });
    }
});
/**
 * search for a particular category
 * 
 * @param {string} req - request object
 * @param {string} res - response object
 */
// router.get('search/tags/:tag_id', sc.searchTags); 
router.get('/api/search/tags/:tag_id', async (req, res) => {
    try {
        const { tag_name } = req.query;
        
        const sql = /* sql */`
            select * from tags where tag_name like ?
        `;

        const tags = await util.getResults(sql, [tag_name]);

        if (tags.length === 0) {
            return res.status(404).send({
                error: 'sorry that tag could not be found'
            });
        }

        return res.status(200).send({
            message: 'tag successfully found',
            data: tags
        });
    } catch (error) {
        console.error(error);

        res.status(500).send({
            error: 'Internal Server Error'
         });
    }
});

/**
 * searh the database for a group based on the group name
 * 
 * @param {string} req - the request object
 * @param {string} res - the response object
 */
router.get('/api/search/groups/:group_id', async (req, res) => {
    try {
        const { group_name } = req.query;

        const sql = /* sql */`
            select g.group_name from groups as g where group_name like ?
        `;

        const group = await util.getResults(sql, [group_name]);

        if (group.length === 0) {
            return res.status(404).send({
                error: 'sorry the group was not found'
            });
        }

        return res.status(200).send({
            message: 'group successfully found',
            result: group
        });


    } catch (error) {
        console.error(error);

        res.status(500).send({
            error: 'Internal Server Error'
         });
    }
}); 

/**
 * searh video based on video_id, title, and content
 * 
 * @param {string} req - the request object
 * @param {string} res - the response object
 */
router.get('/api/search/videos/:video_id', async (req, res) => {
    try {
        const { title, description } = req.query;

        const sql = /* sql */`
            select
                v.title,
                v.description
            from videos as v
            where title like ? or
            description like ?
        `;

        const video = await util.getResults(sql, [title, description]);

        if (video.length === 0) {
            return res.status(404).send({
                error: 'No videos found'
            });
        }

        return res.status(200).send({
            message: 'videos successfully found',
            data: video
        });
    } catch (error) {
        console.error(error);

        res.status(500).send({
            error: 'Internal Server Error'
        });
    }
});

/**
 * search for a particular note
 * @param {string} req - the request object
 * @param {string} res - the response object
 */
router.get('/api/search/notes/:notes_id', async (req, res) => {
    try {
        const { title, content } = req.query;

        const sql = /* sql */`
            select *
            from notes
            where title like ? or content like ?
        `;

        const notes = await util.getResults(sql, [title, content]);

        if (notes.length === 0) {
            return res.status(404).send({
                error: 'No notes found',
                data: null
            });
        }

        return res.status(200).send({
            message: 'successfully found your notes',
            data: notes
        });
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            error: 'Internal Server Error'
        })
    }
});

module.exports = router;