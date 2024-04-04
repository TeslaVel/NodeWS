import { Request, Response } from 'express';
import Comment, { CommentCreationAttributes } from '../models/Comment';
import User from '../models/User';
import { UserAttributes } from '../types';
import { inclusion, paginate } from '../utils/inclusion'
import { returnJson } from '../utils/response'

/***
* LIST COMMENTS
**/
export async function listComments(req: Request, res: Response) {
  const page: any = req?.query?.page || 1;
  const perPage = 10;

  try {
    const comments = await Comment.findAndCountAll(
      paginate({
        page,
        perPage,
        query: {
          ...inclusion({
            model: User,
            required: false
          })
        }
      })
    );

    return returnJson(
      {
        res,
        code: 200,
        data: {
          totalItems: comments.count,
          totalPages: Math.ceil(comments.count/perPage),
          currentPage: page,
          comments: comments.rows
        }
      }
    )
  } catch (error) {
    console.error(error);
    return returnJson(
      {
        res,
        code: 500,
        message: 'An error occurred while trying to list comments.'
      }
    )
  }
}

/***
* CREATE COMMENT
**/
export async function createComment(req: Request, res: Response) {
  try {
    const {
      message
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

    const comment: CommentCreationAttributes = {
      message,
      user_id: user.id
    };

    const createdComment = await Comment.create(comment)

    return returnJson(
      {
        res,
        code: 200,
        data: { comments: createdComment }
      }
    )
  } catch (error) {
    console.error(error);
    return returnJson(
      {
        res,
        code: 500,
        message: "The comment could not be created"
      }
    )
  }
}