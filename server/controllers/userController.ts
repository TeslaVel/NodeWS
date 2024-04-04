import { Request, Response } from 'express';
import User, { UserCreationAttributes } from '../models/User';
import Comment from '../models/Comment';
import Business from '../models/Business';
import { UserAttributes } from '../types'
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils'
import { returnJson } from '../utils/response'

/***
* LIST USER
**/
export async function listUsers(req: Request, res: Response) {
  console.log('Users listUsers',)
  try {
    const users = await User.findAll({
      attributes: ['id', 'business_id', 'first_name', 'email', 'username', 'password_digest', 'created_at'],
      include: [{
        model: Comment,
      },
      {
        model: Business,
      }
      ]
    });

    return returnJson(
      {
        res,
        code: 200,
        data: {
          count: users.length,
          users: users
        }
      }
    )

  } catch (error) {
    console.error(error);
    return returnJson(
      {
        res,
        code: 500,
        message: 'An error occurred while trying to list users.'
      }
    )
  }
}

/***
* CREATE USER
**/
export async function createUser(req: Request, res: Response) {
  try {
    const {
      first_name,
      last_name,
      business_id,
      username,
      email,
      password } = req.body;

    const user: UserCreationAttributes = {
      first_name,
      last_name,
      business_id,
      username,
      email,
      password_digest: password
    };

    const createdUser = await User.create(user);

    return returnJson(
      {
        res,
        code: 200,
        data: { user: createdUser }
      }
    )
  } catch (error) {
    console.error(error);
    return returnJson(
      {
        res,
        code: 500,
        message: 'An error occurred while trying to create a user.'
      }
    )
  }
}

/***
* LOGIN USER
**/
export async function loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return returnJson(
          {
            res,
            code: 404,
            message: 'User not found.'
          }
        )
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_digest);

      if (!isPasswordValid) {
        return returnJson(
          {
            res,
            code: 401,
            message: 'Invalid credentials.'
          }
        )
      }

      const token = generateToken({ userId: user.id }, '1h');

      return returnJson(
        {
          res,
          code: 200,
          data: {
            token: token,
            id: user.id,
            last_name: user.last_name,
            first_name: user.first_name,
            email: user.email
          }
        }
      )
    } catch (error) {
      console.error(error);
      return returnJson(
        {
          res,
          code: 500,
          message: 'Error al iniciar sesión'
        }
      )
    }
}


/***
* UPDATE USER
**/
export async function updateUser(req: Request, res: Response) {
  try {

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

    const {
      first_name,
      last_name,
      business_id,
      username,
      email,
      password } = req.body;

    const data = {
      first_name,
      last_name,
      business_id,
      username,
      email,
      password
    }

    const updated = await User.update(
      data,
      { where: { id: user.id } }
    );

    return returnJson(
      {
        res,
        code: 200,
        message: 'User updated'
      }
    )
  } catch (error) {
    console.error(error);
    return returnJson(
      {
        res,
        code: 500,
        message: 'The user could not be created'
      }
    )
  }
}