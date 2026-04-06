const express = require('express');
const router = express.Router();
const validateForm = require('./controllers/validateForm');

const pool = require("../db");
const bcrypt = require('bcrypt');

router
      .route("/login")
             .get(async (req, res) => {
                 if (req.session.user && req.session.user.username) {
                     res.json({loggedIn:true, username:req.session.user.username});
                 } else {
                     res.json({loggedIn:false});
                 }
             })
             .post( async (req, res) => {
                    validateForm(req, res);
                    
                    
                    const poterntialUser = await pool.query('SELECT id, username,password FROM users u WHERE u.username = $1 ' , [req.body.username]);
       
                    //if usrname does not exist
                    if (poterntialUser.rows.Count > 0){
                     //comparing the input  password with the hash in the database
                    const isPass = await bcrypt.compare(req.body.password,
                                                         poterntialUser.rows[0].password 
                    ); 
                    if( isPass){
                    //login
                    req.session.user = {username: req.body.username,
                                       id: poterntialUser.rows[0].id} ;           
                    res.json({loggedIn:true, username:req.body.username});              
                    } else {
                    //wrong password
                    res.json({loggedIn:false, status:"Wrong username or password"})
                    console.log("not good")
}       
                    } else {
                    //user does not exist
                    res.json({loggedIn:false, status:true,message:"Wrong username or password"})
             }

});
router.post('/signup', async (req, res) => {
   validateForm(req, res)
   //check if user exists
            const existingUser = await  pool.query('SELECT username FROM users WHERE username = $1', [req.body.username]);
             if(existingUser.rows.length === 0){
                 //register
                 const hashedPass = await bcrypt.hash(req.body.password, 10);
                 const newUser = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username', [req.body.username, hashedPass]);
                 req.session.user = {username : req.body.username,
                                    id: newUser.rows[0].id} ;           
                 res.json({loggedIn:true, username:req.body.username});          
             } else {
                   res.json({loggedIn:false,status:"User already exists"});}
});
module.exports = router;