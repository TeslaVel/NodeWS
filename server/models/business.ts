import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database';
import User from './User';
import { BusinessAttributes } from '../types'

export interface BusinessCreationAttributes extends Omit<BusinessAttributes, 'id' | 'updated_at' | 'created_at'> {}

class Business extends Model<BusinessAttributes, BusinessCreationAttributes> implements BusinessAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public Users?: User[];

  public static associate_to_many(modelObject: any, key: string, alias?: string) {
    if (alias) {
      this.hasMany(modelObject, {as: alias, foreignKey: key});
    } else {
      this.hasMany(modelObject, {foreignKey: key});
    }
  }

  toJSON(): BusinessAttributes | {} {
    return {
      id: this.id,
      name: this.name,
      Users: this.Users?.map(user => user.toJSON()) || [],
    };
  }
}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
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
    sequelize,
    tableName: 'businesses',
    timestamps: false
  }
);

export default Business;
