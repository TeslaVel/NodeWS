import { toMomentDate } from '../utils/timeUtils';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database';
import { PostAttributes } from '../types'
import User from './User';

export interface PostCreationAttributes extends Omit<PostAttributes, 'id' | 'updated_at' | 'created_at'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public body!: string;
  public user_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public User?: User;
  public Comments?: Comment[];

  public static alias: string = 'Posts';

  public static associate_to_many(modelObject: any, key: string, alias?: string) {
    if (alias) {
      this.hasMany(modelObject, {as: alias, foreignKey: key});
    } else {
      this.hasMany(modelObject, {foreignKey: key});
    }
  }

  public static associate_belong_to(model: any, key: string) {
    this.belongsTo(model, { foreignKey: key});
  }

  toJSON(): PostAttributes | {} {
    return {
      id: this.id,
      body: this.body,
      user_id: this.user_id,
      created_at: toMomentDate(this.created_at).format('YYYY-MM-DD hh:mm:ss'),
      user: this.User || [],
      comments: this.Comments?.map(comment => comment) || [],
    };
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    scopes: {
    },
    sequelize,
    tableName: 'posts',
    timestamps: false
  }
);

export default Post;
