const Joi = require('joi');

const account =  Joi.object().keys({
    AcctType: Joi.string().required(),
    Account: Joi.string().required(),
    Description: Joi.string().required(),
    Department: Joi.string(),
    TypicalBal: Joi.string().required(),
})

module.exports = {
    accountCreate: account,
    accountUpdate: account,
    accountImport: Joi.array().items(account)
};