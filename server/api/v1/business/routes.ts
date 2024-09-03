import { Router } from 'express';

import { createBusiness, listBusinesses } from './BusinessController';

const router = Router();

/***
* BUSINESS Routes
**/
router.get('/', listBusinesses);
router.post('/', createBusiness);

// export default router
module.exports = router;