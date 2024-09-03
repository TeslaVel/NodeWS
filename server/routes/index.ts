require('dotenv').config();

const version = process.env.API_VERSION ?? '1'

import '../models/Relations';

const basePath = `../api/v${version}/`;

const comments = require(`${basePath}/comments/routes`);
const business = require(`${basePath}/business/routes`);
const posts = require(`${basePath}/posts/routes`);
const users = require(`${basePath}/users/routes`);
const session = require(`${basePath}/session/routes`);

import { sessionMiddleWare } from '../middlewares/sessionMiddleWare'

import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('got the point');
});

router.use('/users', sessionMiddleWare);
router.use('/comments', sessionMiddleWare);
router.use('/businesses', sessionMiddleWare);
router.use('/posts', sessionMiddleWare);
router.use(session);

router.use('/users', users);
router.use('/posts', posts);
router.use('/businesses', business);
router.use('/comments', comments);

export default router