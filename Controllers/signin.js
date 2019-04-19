const theBranchSignin = (req,res,db,bcrypt) => {
	const {email, password} = req.body;
	if (!email || !password) {
		return res.status(400).json('Yeah thats not good');
	}




	db.select('email','hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {

			const isValid= bcrypt.compareSync(req.body.password,data[0].hash);

			if(isValid) {
				return db.select('*').from('users')
				.where('email', '=', req.body.email)
				.then(user => {
					res.json(user[0])
					console.log(req.body.email, ' Look at this nice person!')

				})
				
				.catch (err => res.status(400).json('You like fooling around dont you'))

			} else {
				console.log(req.body.email,' is a FOOOL!')
				res.status(400).json('The One Who Likes to be A Fool')
			}


		})

		.catch(err => res.status(400).json('Are you playing a game with me? I will show you what its like to mess with as server you fool!'))


}

module.exports = {

	theBranchSignin: theBranchSignin
};