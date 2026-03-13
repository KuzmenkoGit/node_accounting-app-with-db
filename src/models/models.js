const { User } = require('./User.model.js');
const { Expense } = require('./Expense.model.js');

User.hasMany(Expense, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Expense.belongsTo(User, { foreignKey: 'userId' });

User.addHook('beforeBulkDestroy', (options) => {
  if (options.truncate) {
    options.cascade = true;
  }
});

module.exports = { models: { User, Expense } };
