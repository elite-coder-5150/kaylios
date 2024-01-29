import  express from 'express';
const router = express.Router();
import { Utility as util } from '../utility/utility.mjs';

import {
    getRequests,
    sendRequest,
    accept,
    cancel,
    getUsers,
    getFriends,
    block,
    unblock
} from '../controllers/relation.controller';
//? get all of the request from the database
router.get('/api/user/requests', getRequests);

router.get('/api/user/request/send',sendRequest);
router.get('/api/user/request/accept', accept);
router.post('/api/user/request/cancel', cancel);

router.get('/api/user/', getUsers);
router.get('/api/user/friends', getFriends);

router.post('/api/user/block/:block_id', block);
router.delete('/api/user/block/:block_id', unblock);

module.exports = router;