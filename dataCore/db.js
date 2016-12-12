//Access DB Functions and Data
function AccessDB(){
	this.file 	= require("./db.json");
	this.core	= this.file.core;
	
	var _sltBD; 
	var _db;
	var _tables;
	var _users;

	var DBlogin = function (data, db){
		for(i=0;i<db.length;i++){
			if(data.db === db[i].name){
				for(j=0;j<db[i].mods.length;j++){
					if(db[i].mods[j].username === data.user && db[i].mods[j]._pwd === data.pwd){
						_db = db[i]
						_tables = _db.tables
						return true
					}
				}
			}
		}
		return false
	}

///////////////////////////
	
	//Connect to DB
	this.connect = function(data){
		// console.log(req)
		if(DBlogin(data, this.core)){
			console.log("Connected to %s", _db.name)
			return true
		}
		return false
	}

	//Connect User
	this.connectUser = function(data){
		_users = _tables.users
		for (var i = 0; i < _users.length; i++) {
			if(data === _users[i].username){
				console.log('User - %s - found', _users[i].username)
				return _users[i]
			}
		}
		return false
	}

	this.saveData = function(data){

	}
}

module.exports = AccessDB




