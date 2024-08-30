export interface CommentAttributes {
  id: number;
  message: string;
  user_id: number;
  post_id: number;
  created_at: Date;
  updated_at: Date;
  seen?: boolean
  comment_type?: number
  entry_id?: number;
  User?: UserAttributes;
  Post?: PostAttributes;
}

export interface PostAttributes {
  id: number;
  body: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  User?: UserAttributes;
}

export interface BusinessAttributes {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  Users?: UserAttributes[];
}

export interface UserAttributes {
  id: number;
  business_id: number;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
  password_digest: string;
  email: string;
  username: string;
  Comments?: CommentAttributes[];
  Posts?: PostAttributes[];
  Business?: BusinessAttributes;
}

export interface InclusionOptionsOut {
  include: Inclusion[];
  order: InclusionOrders['order'][];
  // limit?: number;
  // offset?: number;
  distinct?: boolean;
  // subQuery?: boolean;
}

export interface Inclusion {
  model: any;
  attributes?: string[];
  where?: { [key: string]: any };
  required?: boolean;
  separated?: boolean;
  limit?: number;
}

export interface InclusionOrders {
  order: [ ({ model: any, as: string } | string), any, string]
}

export interface InclusionOptionsInput {
  model: any,
  attributes?: string[],
  order?: { column: string, order?: string },
  order_value?: string,
  limit?: number
  condition?: {[key: string]: string | boolean} | {},
  required?: boolean
  separated?: boolean
  scopes?: string []
}