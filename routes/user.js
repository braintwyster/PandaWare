var express = require('express');
var router 	= express.Router();
// var db 		= require("../dataCore/bookshelf")
// var Users 	= require('../models/users')(db)
// var Bookshelf 	= new db()


// console.log(Bookshelf.getUser("Users"))
// var data = db("iochat","braintwyster","lemonade23")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', {title: "User Testing"});
});

module.exports = router;
