const theBranchProfileid = (req,res,db)=> {
	const { id } = req.params;
	
	db.select('*').from('users').where({
		id: id
	})

	.then(userresponse => {
		if(userresponse.length) {

		res.json(userresponse[0])
	} else {
		res.status(400).json('Leave! Now!')
	}
}) 
	
}

module.exports = {
	theBranchProfileid: theBranchProfileid
};