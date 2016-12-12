	var knex = require('knex')({
	  client: 'mysql',
	  connection: {
	    host     : 'localhost',
	    user     : 'root',
	    password : '',
	    database : 'iochat',
	    charset  : 'utf8'
	  }
	});
	var bookshelf = require('bookshelf')(knex);

	//Models
	function DbFunction(){
		this.Users         = require('../models/users')(bookshelf)
		this.Conversations = require('../models/conversations')(bookshelf)
		this.Messages      = require('../models/messages')(bookshelf)
		
		this.getUser = function(req, res){
			// return req
			// new this.Users({'id': '1'})
			//   	.fetch()
			//   	.then(function(model) {
			//     	return model.attributes
		 //  		});
		}
	// console.log(User.where('id', 1).fetch())
	// User.where('id', 1).fetch({withRelated: ['messages']}).then(function(user) {
	//   	console.log(user.related('posts').toJSON());
	// }).catch(function(err) {
	//   	console.error(err);
	// });	
	}

module.exports = DbFunction
