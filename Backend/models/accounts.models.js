const mongoose = require("mongoose");

const AccountsSchema = new mongoose.Schema({
  Account: {
    type: String,
    required: true,
  },
  AcctType: {
    type: String,
    required: true,
  },
  Description:  {
    type: String,
    required: true,
  },
  Department: {
    type: String,
  },
  TypicalBal: {
    type: String,
    required: true,
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Accounts", AccountsSchema);