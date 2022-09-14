'use strinct';

const accountSchema = require('../models/accounts.models');
const schemasDB = require('../config/middleware/schemasAccounts');  

class AccountController {

	async all(req, res, next) {
		await accountSchema.find().then(data => res.send(data))
			.catch(error => res.status(500).send({ message: error}))
	}

	async create(req, res, next) {
		
		const body = req.body;
		
		const err = schemasDB.accountCreate.validate(body).error

		if (err) res.status(500).send({ message: err });

			await accountSchema.create(body).then( data => res.send({ data }) )
			.catch( error => res.status(500).send({ message: error }) );
	}

	async import(req, res, next) {
		
		const body = req.body;

		await accountSchema.insertMany(body)
			.then( data => res.send( data ) )
			.catch( error => { res.status(500).send({ message: error })} );

	}

	async update(req, res, next) {
		const { id } = req.params;
		if(id === "") {
			res.status(400).send({
					message: "id account is empty!",
			});
			return;
		}

		const body = req.body;

		const err = schemasDB.accountUpdate.validate(body).error;
		if (err) res.status(500).send({ message: err });

		await accountSchema.findOneAndUpdate({ Account: id }, body)
			.then( data => data ? res.send({ message: 'Account update.', data: data }) : res.send({ message: 'Account not found.' }) )
			.catch( error => res.status(500).send({ message: error }) );
	}

	async delete(req, res, next) {
		const { id } = req.params;
		if(id === "") {
			res.status(400).send({
					message: "id account is empty!",
			});
			return;
		}
		
		await accountSchema.findOneAndDelete({ Account: id })
			.then( data => data ? res.send({ message: 'Account delete.' }) : res.send({ message: 'Account not found.' }) )
			.catch( error => res.status(500).send({ message: error }) );
	}

}

module.exports = new AccountController();
