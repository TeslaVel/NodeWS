export interface CommentAttributes {
  id: number;
  message: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  seen?: boolean
  comment_type?: number
  entry_id?: number;
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
  Business?: BusinessAttributes;
}

export interface InclusionOptions {
  include: [{
    model: any;
    attributes?: string[];
    where?: { [key: string]: any };
    required?: boolean;
    separated?: boolean;
  }];
  order: [[ { model: any, as: string } | string, string, string]];
  limit?: number;
  offset?: number;
  subQuery?: boolean;
}