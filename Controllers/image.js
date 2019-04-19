const Clarifai = require ('clarifai');


              const app = new Clarifai.App({
               apiKey: '51efb45790e847bdab80b923e6baf4b5'
              });


const apiCall = (req,res) => {

app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch (err => res.status(400).json('Man you are tiring me out with this errors'))
}

const theBranchImage = (req,res,db) => {
	const { id } = req.body;
		  db('users ').where('id', '=', id)
			  .increment('entries', 1)
			  .returning('entries')
			  .then(entries => {
			  	res.json(entries[0]);
			  })

			  .catch (err => res.status(400).json('You keep messing up!'))
			  
			 

			}

module.exports = {

	theBranchImage,
	apiCall
	
}

