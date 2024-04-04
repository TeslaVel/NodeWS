import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database';
import { CommentAttributes } from '../types'
import User from './User';

export interface CommentCreationAttributes extends Omit<CommentAttributes, 'id' | 'updated_at' | 'created_at' | 'seen'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number;
  public message!: string;
  public comment_type!: number;
  public user_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public seen?: boolean;
  public entry_id?: number;
  public User?: User;

  public static alias: string = 'Comments';

  public static associate_belong_to(model: any, key: string) {
    this.belongsTo(model, { foreignKey: key});
  }

  toJSON(): CommentAttributes | {} {
    return {
      id: this.id,
      message: this.message,
      comment_type: this.comment_type,
      user: this.User || [],
    };
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    comment_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entry_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
      seen: {
        where: { seen: true }
      },
      unseen: {
        where: { seen: false }
      },
    },
    sequelize,
    tableName: 'comments',
    timestamps: false
  }
);

export default Comment;
