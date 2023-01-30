import { dbConfig } from "../config/db.config";
import { expenseUser } from "../expenseuser.model";

const { DataTypes, Model } = require("sequelize");
const Sequelize = require("sequelize");

class User extends Model {
  otherPublicField;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: false,
    updatedAt: "updateTimeStamp",
  }
);

const user = new User({ id: 2 });
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    define: {
      timestamps: false,
    },
    freezeTableName: true,
    logging: true,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idel: dbConfig.pool.idle,
    },
  }
);

sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    defaultValue: "John doe",
  },
});

const db = {};
db.Sequelize = Sequelize;

db.expenseuser = expenseUser(sequelize, Sequelize);

export default db;
