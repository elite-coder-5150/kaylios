const express = require('express');
const router = express.Router();

import * as uc from '../controllers/user.controller';

router.get('/', uc.getAllUsers)
router.get('/user/:user_id', uc.geSingletUsers);
router.post('/user/register', uc.registerUsers);
router.put('/user/:user_id', uc.updateUsers);
router.delete('/user/:user_id', uc.deleteUsers);

module.exports = router;