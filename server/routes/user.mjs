const express = require('express');
const router = express.Router();

import * as uc from '../controllers/user.controller';

// router.get('', uc.getAllUsers)
// router.get(':user_id', uc.geSingletUsers);
// router.post('register', uc.registerUsers);
// router.put(':user_id', uc.updateUsers);
// router.delete(':user_id', uc.deleteUsers);

router.get('/', uc.getAllUsers);

router.get('/:user_id', uc.getSingleUser); 

router.post('/create', uc.createUser);

router.put('/:user_id', uc.updateUser);

router.delete('/:user_id', uc.deleteUser);
module.exports = router;