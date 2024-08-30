import { Request, Response } from 'express';
import Post, { PostCreationAttributes } from '../models/Post';
import Comment from '../models/Comment';
import User from '../models/User';
import { UserAttributes } from '../types';
import { paginate, inclusion } from '../utils/inclusion'
import { returnJson } from '../utils/response'

/***
* LIST PostS
**/
export async function listPosts(req: Request, res: Response) {
  const page: any = req?.query?.page || 1;
  const perPage = 10;

  try {
    const posts = await Post.findAndCountAll(
      paginate({
        page,
        perPage,
        query: {
          attributes: ['id', 'user_id', 'body', 'created_at'],
          inclusions: [{
            model: Comment,
            required: false
          }]
        }
      })
    );

    return returnJson(
      {
        res,
        code: 200,
        data: {
          totalItems: posts.count,
          totalPages: Math.ceil(posts.count/perPage),
          currentPage: page,
          post: posts.rows
        }
      }
    )
  } catch (error) {
    console.error(error);
    return returnJson(
      {
        res,
        code: 500,
        message: 'An error occurred while trying to list posts.'
      }
    )
  }
}

/***
* SHOW POST
**/
export async function showPost(req: Request, res: Response) {
  const postId = req.params.id;
  console.log('postId', postId)
  try {
    const post = await Post.findByPk(postId, {
      ...inclusion(
        [
          {
            model: User,
            attributes: ['id', 'created_at'],
            order: {
              column: 'created_at',
              order: 'ASC'
            }
          },
          {
            model: Comment,
            attributes: ['id', 'created_at', 'user_id', 'post_id'],
            order: {
              column: 'created_at',
              order: 'ASC'
            }
          },
      ]
      )
    });

    if (!post) {
      return returnJson(
        {
          res,
          code: 404,
          message: 'Post does not exits'
        }
      )
    }

    return returnJson(
      {
        res,
        code: 200,
        data: post
      }
    )

  } catch (error) {
    console.error(error);
    return returnJson(
      {
        res,
        code: 500,
        message: 'An error occurred while trying to get user.'
      }
    )
  }
}

/***
* CREATE POST
**/
export async function createPost(req: Request, res: Response) {
  try {
    const {
      body,
    } = req.body;

    const user: UserAttributes = res.locals.user;

    if (!user?.id) {
      return returnJson(
        {
          res,
          code: 404,
          message: 'User does not exits'
        }
      )
    }

    const post: PostCreationAttributes = {
      body,
      user_id: user.id
    };

    const createdPost = await Post.create(post)

    return returnJson(
      {
        res,
        code: 200,
        data: { post: createdPost }
      }
    )
  } catch (error) {
    console.error(error);
    return returnJson(
      {
        res,
        code: 500,
        message: "The post could not be created"
      }
    )
  }
}


/***
* UPDATE POST
**/
export async function updatePost(req: Request, res: Response) {
  const postId = req.params.id;

  const post = await Post.findByPk(postId);

  if (!post) {
    return returnJson(
      {
        res,
        code: 404,
        message: 'Post does not exits'
      }
    )
  }

  const { body } = req.body;

  try {
    const updated = await post.update({ body: body });

    return returnJson(
      {
        res,
        code: 200,
        message: 'Post updated',
        data: updated
      }
    );
  } catch (error) {
    console.error(error);
    return returnJson(
      {
        res,
        code: 500,
        message: 'The post could not be updated'
      }
    );
  }
}
