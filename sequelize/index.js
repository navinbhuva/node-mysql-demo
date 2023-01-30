import { DataType, Op, Model } from "sequelize";
import Sequelize from "sequelize";
const sequelize = require("sqlite::memory");

class User extends Model {
  static classLevelMethod() {
    return "Foo";
  }
  instanceLevelMethod() {
    return "bar";
  }
  getFullName() {
    return [this.firstName, this.lastName].join(" ");
  }
}

User.init(
  {
    firstName: Sequelize.TEXT,
    lastName: Sequelize.TEXT,
  },
  { sequelize }
);

const user1 = await User.create(
  {
    username: "alice1230",
    isAdmin: true,
  },
  { fields: ["username"] }
);

const users = await User.findAll();
users.every((user) => user instanceof User);
JSON.stringify(users, null, 2);

Model.findAll({
  attributes: [
    "foo",
    [sequelize.fn("COUNT", sequelize.col("hats"), "n_hats")],
    "bar",
  ],
});

User.findAll({
  where: {
    [Op.and]: [{ authorId: 2 }, { status: "Active" }],
  },
});
// SELECT * FROM User WHERE authorId=12 AND status="active"

User.findAll({
  where: {
    [Op.or]: [{ authorId: 2 }, { status: "active" }],
  },
});
// SELECT * FROM User WHERE authorId=2 OR status="active"

User.destroy({
  where: {
    authorId: {
      [Op.or]: [12, 19],
    },
  },
});
// DELETE FROM User WHERE authorId=12 OR authorId=19

User.findAll({
  where: {
    rank: {
      [Op.lt]: 1000,
      [Op.eq]: null,
    },
  },
});

const { count, rows } = await User.findAndCountAll({
  where: {
    title: {
      [Op.like]: "foo%",
    },
  },
  offset,
  limit,
});

// (async () => {
//   await sequelize.sync({ force: true });
// })();
console.log(User.classLevelMethod());
const user = User.build({ firstName: "navin", lastName: "bhuva" });
console.log(user.instanceLevelMethod());
console.log(user.getFullName());
