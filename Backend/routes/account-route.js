const account = require("../controllers/accounts.controller");

const urlBase = "/account"

module.exports = app => {
  app.get(`${urlBase}/`, account.all);
  app.post(`${urlBase}/create`, account.create);
  app.post(`${urlBase}/import`, account.import);
  app.put(`${urlBase}/update/:id`, account.update);
  app.delete(`${urlBase}/delete/:id`, account.delete);
};