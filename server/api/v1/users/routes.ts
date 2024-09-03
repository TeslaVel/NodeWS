import { Router } from 'express';

import { listUsers, updateUser, showUser } from './UserController';

const router = Router();

/***
* USER Routes
**/
router.get('/', listUsers);
router.get('/:id', showUser);
router.post('/update', updateUser);

// export default router;
module.exports = router;