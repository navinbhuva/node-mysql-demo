export const dbConfig = {
  HOST: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "learner",
  dialect: "mysql",
  freezeTableName: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
