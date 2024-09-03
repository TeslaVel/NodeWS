import { Router } from 'express';

import { createComment, listComments } from './CommentController';

const router = Router();

/***
* COMMENTS Routes
**/
router.get('/', listComments);
router.post('/', createComment);


module.exports = router;