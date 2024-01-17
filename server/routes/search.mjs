const express = require('express');
const router = express.Router();

import * as sc from "../controllers/search.controller";

router.get('search/user/:user_id', sc.searchUsers); 
router.get('search/category/:category_id', sc.searchCategory); 
router.get('search/tags/:tag_id', sc.searchTags); 
router.get('search/groups/:group_id', sc.searchGroups); 
router.get('search/videos/:video_id', sc.searchVideos);
router.get('search/notes/:notes_id', sc.searchNotes);

module.exports = router;