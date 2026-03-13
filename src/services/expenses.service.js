const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model.js');

const createExpensesOnce = async (expense) => {
  try {
    return await Expense.create(expense);
  } catch (error) {
    throw new Error('An error occurred while creating expense');
  }
};

const getAllExpenses = async ({ userId, categories, from, to }) => {
  try {
    const filters = {};

    if (userId) {
      filters.userId = userId;
    }

    if (categories) {
      filters.category = categories;
    }

    if (from || to) {
      filters.spentAt = {};

      if (from) {
        filters.spentAt[Op.gte] = from;
      }

      if (to) {
        filters.spentAt[Op.lte] = to;
      }
    }

    return await Expense.findAll({
      attributes: [
        'id',
        'userId',
        'spentAt',
        'title',
        'amount',
        'category',
        'note',
      ],
      where: filters,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getExpense = async (id) => {
  try {
    return await Expense.findByPk(id, {
      attributes: [
        'id',
        'userId',
        'spentAt',
        'title',
        'amount',
        'category',
        'note',
      ],
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOnceExpense = async (id) => {
  try {
    return await Expense.destroy({
      where: { id },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const patchExpense = async (id, updateData) => {
  try {
    return await Expense.update(updateData, {
      where: { id },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createExpensesOnce,
  getAllExpenses,
  getExpense,
  deleteOnceExpense,
  patchExpense,
};
