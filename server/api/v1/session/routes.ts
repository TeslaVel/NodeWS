import { Router } from 'express';

import { createUser, loginUser } from '../users/UserController';

const router = Router();

/***
* Session Routes
**/

router.post('/signup', createUser);
router.post('/login', loginUser);

// export default router;
module.exports = router;