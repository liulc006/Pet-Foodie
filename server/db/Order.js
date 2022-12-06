const conn = require('./conn');
const { DECIMAL, BOOLEAN, UUID, UUIDV4 } = conn.Sequelize;

const Order = conn.define('order', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  isCart: {
    type: BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
  orderTotal: {
    type: DECIMAL,
  },
});

module.exports = Order;
