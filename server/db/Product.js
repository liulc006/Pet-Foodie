const conn = require('./conn');
const { STRING, UUID, UUIDV4, DECIMAL, TEXT, INTEGER, ENUM, BOOLEAN } =
  conn.Sequelize;

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  imageName: {
    type: STRING,
  },
  foodForm: {
    type: ENUM('Wet Food', 'Dry Food'),
  },
  animal: {
    type: ENUM('Dog', 'Cat'),
  },
  lifeStage: {
    type: ENUM("Baby", "Adult", "Senior"),

  },
  isBestSeller: {
    type: BOOLEAN,
  },
});

module.exports = Product;
