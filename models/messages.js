module.exports = function (bookshelf){

	var Messages = bookshelf.Model.extend({

		tableName: 'messages',
		user: function() {
			return this.belongToOne(Users)
		},
		conversation: function() {
		   	return this.blongsToOne(Conversations);
		}
	});

	return Messages
}