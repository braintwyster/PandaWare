module.exports = function (bookshelf){

	var Conversations = bookshelf.Model.extend({

		tableName: 'conversations',
		messages: function(){
		   	return this.hasMany(Messages)
		},
		users: function(){
			return this.hasMany(Users)
		}
	})

	return Conversations
}