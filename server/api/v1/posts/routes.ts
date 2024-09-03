import { Router } from 'express';

import { listPosts, createPost, updatePost, showPost } from './PostController';

const router = Router();

/***
* POSTS Routes
**/
router.get('/', listPosts);
router.post('/', createPost);
router.get('/:id', showPost);
router.post('/:id/update', updatePost);

// export default router;
module.exports = router;