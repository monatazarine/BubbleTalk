
const express = require('express');
const router = express.Router();
const validateForm = require('../controllers/validateForm');
const { handleLogin ,AttemptLogin,AttemptSignup} = require('../controllers/authController');
const { rateLimiter } = require('../controllers/rateLimiter');

//routes for login 
router
      .route("/login")
             .get(handleLogin)
             .post(validateForm,AttemptLogin );

//route for signup
router.post('/signup',validateForm, rateLimiter, AttemptSignup);
module.exports = router;