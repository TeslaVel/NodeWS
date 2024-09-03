import { Request, Response } from 'express';
import Business, { BusinessCreationAttributes } from '../../../models/Business';
import User from '../../../models/User';
import { returnJson } from '../../../utils/response'

/***
* LIST BUSINESSES
**/
export async function listBusinesses(req: Request, res: Response) {
  try {
    const businesses = await Business.findAll({
      attributes: ['id', 'name', 'description', 'created_at'],
      include: [{
        model: User,
        as: User.alias,
        required: false,
      }],
    });

    return returnJson({
      res,
      code: 200,
      data: {
        count: businesses.length,
        businesses: businesses
      }
    })
  } catch (error) {
    console.error(error);
    return returnJson({
      res,
      code: 500,
      message: 'An error occurred while trying to list businesses.'
    })
  }
}

/***
* CREATE BUSINESS
**/
export async function createBusiness(req: Request, res: Response) {
  try {
    const {
      name,
      description
    } = req.body;

    const existingBusiness = await Business.findOne({ where: { name: name } });

    if (existingBusiness) {
      return returnJson({
        res,
        code: 404,
        message: 'The business already exists'
      })
    }

    const business: BusinessCreationAttributes = {
      name,
      description
    };

    const createdBusiness = await Business.create(business)

    return returnJson({
      res,
      code: 200,
      data: {businesses: createdBusiness}
    })
  } catch (error) {
    console.error(error);
    return returnJson({
      res,
      code: 500,
      message: "The business could not be created"
    })
  }
}

