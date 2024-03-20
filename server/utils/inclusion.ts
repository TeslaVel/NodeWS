import { InclusionOptions } from '../types'
import { Sequelize } from 'sequelize';

export function inclusion(
  params: {
    model: any,
    attributes?: string[],
    order?: { column: string, order?: string },
    order_value?: string,
    limit?: number | 10
    condition?: {[key: string]: string | boolean} | {},
    required?: boolean
    separated?: boolean
    scopes?: string []
  },
): InclusionOptions {

  const columnValue = params?.order?.column || 'created_at';
  const columnData: any =  Sequelize.col(columnValue)
  const orderValue: string = params?.order?.order || 'ASC';
  const isRequired: boolean = typeof params.required !== 'undefined' ? params.required : true
  const isSeparated: boolean = typeof params.separated !== 'undefined' ? params.separated : true
  const limiter: number = params.limit || 10
  const scopes: string[] = params?.scopes || [];

  const model = scopes.length > 0
  ? params.model.scope(scopes)
  : params.model

  return {
    include: [{
      model: model,
      where: params.condition,
      required: isRequired,
      separated: isSeparated,
    }],
    order: [
      [
        model,
        columnData,
        orderValue
      ],
    ],
    offset: 0,
    limit: limiter,
    subQuery: false
  }
}
