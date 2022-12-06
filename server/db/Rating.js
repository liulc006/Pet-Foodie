const conn = require('./conn');
const { STRING, UUID, UUIDV4, INTEGER, TEXT} = conn.Sequelize;

const Rating = conn.define('rating', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    star: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 1,
            max: 5,
        }
    },
    comment: {
        type: TEXT,
        allowNull: true,
    }
});

module.exports = Rating;