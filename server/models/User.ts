import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database';
import Business from './Business';
import Comment from './Comment';
import { UserAttributes } from '../types'
import bcrypt from 'bcrypt';

export interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'updated_at' | 'created_at'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public business_id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public username!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public password_digest!: string;
  public Business?: Business;
  public Comments?: Comment[];

  public static alias: string = 'Users';

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


  toJSON(): UserAttributes | {}  {
    return {
      id: this.id,
      email: this.email,
      business_id: this.business_id,
      password_digest: this.password_digest,
      comments: this.Comments?.map(comment => comment) || [],
      businesses: this.Business
    };
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false
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
    hooks : {
      beforeCreate : (record) => {
        record.dataValues.password_digest = bcrypt.hashSync(record.dataValues.password_digest, 11);
      },
      beforeUpdate : (record) => {
        record.dataValues.updated_at = new Date();
        record.dataValues.password_digest = bcrypt.hashSync(record.dataValues.password_digest, 11);
      }
    },
    sequelize,
    tableName: 'users',
    timestamps: false
  }
);

export default User;
