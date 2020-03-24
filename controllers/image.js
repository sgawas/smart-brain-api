const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'eaf0918db4d14fce90d6224e74e302b1'
   });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data) )
    .catch(err => res.status(400).json('unable to connect to api'))
}
  

const handleImage = (req,res, db) => {
    const { id } = req.body; 
    return db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        if(entries.length){
            res.json(entries[0])
        } else{
            res.status(404).json('Unable to find user')
        }
        
    })
    .catch(err=> res.status(400).json('Unable to fetch entries'));
    // let found = false;
    // database.users.forEach(user=> {
    //     if(user.id === id){
    //         user.entries++;
    //         found = true;
    //         return res.json(user.entries);
    //     }
    // })
    // if(!found){
    //     res.status(404).json("user not found");
    // }
}

module.exports = {
    handleImage,
    handleApiCall
}