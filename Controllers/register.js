const theBranchRegister = (req,res,db, bcrypt) => {
	const {email,username,password} = req.body;

	if (!email || !username || !password) {
		return res.status(400).json('Yeah thats not good');
	}
	
	const hash = bcrypt.hashSync(password);

	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then (loginemail => {

		return trx('users')
				.returning('*')
				.insert({
				email: loginemail[0],
				username: username,
				joined: new Date()

				}).then(userresponse => {

				res.json(userresponse[0]);

			})

	  })

		.then(trx.commit)
		.catch(trx.rollback)
	})



	.catch(err => res.status(400).json('unable to register'))

	

}

module.exports = {
	theBranchRegister: theBranchRegister
};