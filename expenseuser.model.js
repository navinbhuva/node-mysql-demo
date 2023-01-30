export const expenseUser = (sequelize, Sequelize) => {
  const ExpenseName = sequelize.define(
    "expense_user",
    {
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      type: {
        type: Sequelize.BOOLEAN,
      },
      created: {
        type: Sequelize.DATE,
      },
    },
    { tableName: "expense_user" }
  );
  return ExpenseName;
};
