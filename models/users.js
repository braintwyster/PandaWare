module.exports = function (bookshelf){

	var Users = bookshelf.Model.extend({

		tableName: 'users',
		conversations: function() {
			return this.hasMany(Conversations)
		},
		messages: function() {
		  	return this.hasMany(Messages);
		}
	});

//User.where('id', 1).fetch()//{withRelated: ['posts.tags']}).then(function(user) {
//   	console.log(user.related('posts').toJSON());
// }).catch(function(err) {
//   	console.error(err);
// });
	return Users
}