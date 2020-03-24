const { validate} = require('email-validator');
const passwordValidator = require('password-validator');

let schema = new passwordValidator();

schema
.is().min(6)
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces(); 

const handleRegister = (req, res, db, bcrypt) =>{

    const { email, password, name } = req.body;
    
    if(!validate(email)){
        return res.status(400).json('Invalid Email address');
    }

    if(!schema.validate(password)){
        return res.status(400).json(`Password should be min 6 chars.
        It should have uppercase, lowercase, digits and not space allowed.`);
    }

    if(!email || !password || name.trim().length < 1){
       return res.status(400).json('no details submitted');
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    db.transaction(trx => {
        trx
        .insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            }).
            then(user=>{
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=> res.status(400).json('Unable to register user'));
   
}

module.exports = {
    handleRegister
};