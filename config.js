module.exports = {
  database: {
    host: "localhost",
    port: 4000,
    user: "root",
    password: "12345678",
    database: "sequelize-db",
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
