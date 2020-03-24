const handleProfileGet  = (req, res, db) =>{
    const { id } = req.params;
    
    db.select('*').from('users').where({id})
       .then(user=>{
           if(user.length){
               res.json(user[0])
           } else {
               res.status(404).json('user not found');
           }
       })
       .catch(error=> res.status(400).json('Error connecting database'));
}

module.exports = {
    handleProfileGet
}