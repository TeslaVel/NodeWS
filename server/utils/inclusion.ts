import { PaginateOut, Inclusion, InclusionOrders, InclusionOptionsOut, InclusionOptionsInput } from '../types'
import { Sequelize } from 'sequelize';

function build_inclusion(inclusion: InclusionOptionsInput) {
  const isRequired: boolean = typeof inclusion.required !== 'undefined' ? inclusion.required : true
  const isSeparated: boolean = typeof inclusion.separated !== 'undefined' ? inclusion.separated : true
  const scopes: string[] = inclusion?.scopes || [];

  const model = scopes.length > 0
  ? inclusion.model.scope(scopes)
  : inclusion.model


  let data: Inclusion = {
    model: model,
    where: inclusion.condition,
    required: isRequired,
    separated: isSeparated,
  };

  if (inclusion.limit) data.limit = inclusion.limit;
  if (inclusion.attributes) data.attributes = inclusion.attributes;

  return data;
}

function build_orders(inclusion: InclusionOptionsInput): InclusionOrders['order'] {
  const columnValue = inclusion?.order?.column || 'created_at';
  const columnData: any =  Sequelize.col(columnValue)
  const orderValue: string = inclusion?.order?.order || 'ASC';

  const scopes: string[] = inclusion?.scopes || [];

  const model = scopes.length > 0
  ? inclusion.model.scope(scopes)
  : inclusion.model

  return [
    model,
    columnData,
    orderValue
  ];
}

export function inclusion(
  inclusions: InclusionOptionsInput[],
): InclusionOptionsOut {

  const data_inclusions: Inclusion[] = inclusions.map( (ic) => build_inclusion(ic));
  const data_orders: InclusionOrders['order'][] = inclusions.map( (ic) => build_orders(ic));

  return {
    include: data_inclusions,
    order: data_orders,
    distinct: true
  }
}

export function paginate(options: { page: any, perPage: number, query?: {[key: string]: any}}): PaginateOut {

  const { page, perPage, query } = options;
  const inclusions = query?.inclusions || []
  const currentPage = parseInt(page);
  const pg = currentPage > 0
    ? currentPage - 1
    : 0

  const offset = pg * perPage;

  let returnData: PaginateOut = {
    limit: perPage,
    offset
  }

  if (query) {
    returnData = {
      ...query,
      ...returnData
    }
  }

  if (inclusions && inclusions.length > 0 ) {
    returnData = {
      ...returnData,
      ...inclusion(inclusions)
    }
  }

  return returnData;
}
