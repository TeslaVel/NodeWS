import './server/models/Relations';
import { Router, Request, Response, Express } from 'express';
import { sessionMiddleWare } from './server/middlewares/sessionMiddleWare'

 /***
  * Controller Methods
  **/
import { createComment, listComments } from './server/controllers/commentController';
import { createUser, loginUser, listUsers, updateUser } from './server/controllers/userController';
import { createBusiness, listBusinesses } from './server/controllers/businessController';


export default (app: Express) => {
  const router = Router();

  // Protected routes,
  app.use('/users', sessionMiddleWare);
  app.use('/comments', sessionMiddleWare);
  app.use('/businesses', sessionMiddleWare);

  router.get('/', (req: Request, res: Response) => {
    res.send('Initial Page')
  });

  /***
  * USER Routes
  **/
  router.get('/users', listUsers);
  router.post('/signup', createUser);
  router.post('/login', loginUser);
  router.post('/users/update', updateUser);

  /***
  * COMMENT Routes
  **/
  router.get('/comments', listComments);
  router.post('/comments', createComment);

  /***
  * BUSINESS Routes
  **/
  router.get('/businesses', listBusinesses);
  router.post('/businesses', createBusiness);
  
  return router;
};






