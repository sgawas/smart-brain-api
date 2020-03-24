const handleSignIn = (req, res, db, bcrypt) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('Incorrect email/ password combination');
     }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
             return db.select('*').from('users')
             .where('email', '=', email)
             .then( user => {
                 res.json(user[0])
             })
             .catch(err => res.status(400).json('unable to get user'));
        } else {
            res.status(401).json('Incorrect email/password combination.')
        }
    })
    .catch(err => res.status(401).json('Incorrect email/password combination.'));
 }

 module.exports = {
     handleSignIn
 }