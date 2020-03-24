const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-trapezoidal-11177',
      user : 'sgawas',
      password : '',
      database : 'smart-brain'
    }
  });

// db.select('*').from('smart-brain');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{
    db.select('*').from('users')
        .then(users=>{
            res.json(users);
    })
    .catch(err=> res.status(400).json('error connecting database'));
});

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt));

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) =>{ profile.handleProfileGet(req, res, db)})

app.put('/image', (req,res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})

// const saltRounds = 10 // increase this if you want more iterations  
// const userPassword = 'supersecretpassword'  
// const randomPassword = 'fakepassword'
// const storeUserPassword = (password, salt) =>  
//   bcrypt.hash(password, salt).then(storeHashInDatabase)
 
// const storeHashInDatabase = (hash) => {  
//    // Store the hash in your password DB
//    return hash // For now we are returning the hash for testing at the bottom
// }
 
// // Returns true if user password is correct, returns false otherwise
// const checkUserPassword = (enteredPassword, storedPasswordHash) =>  
//   bcrypt.compare(enteredPassword, storedPasswordHash)
 
 
// // This is for demonstration purposes only.
// storeUserPassword(userPassword, saltRounds)  
//   .then(hash =>
//     // change param userPassword to randomPassword to get false
//     checkUserPassword(userPassword, hash)
//   )
//   .then(console.log)
//   .catch(console.error)


// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     console.log(hash);
// });

// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     console.log(result);
    
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//     console.log(result);
// });
// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'sam',
//             email: 'sam@gmail.com',
//             password: 'mango',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '234',
//             name: 'john',
//             email: 'john@yahoo.com',
//             password: 'banana',
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }

// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';