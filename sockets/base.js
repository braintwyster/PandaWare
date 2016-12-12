module.exports = function (io) { 
    
    var db = require('../dataCore/db'),
   		creds = {db:"iochat", user:"braintwyster",pwd:"lemonade23"};
    
    DB = new db;
    DB.connect(creds)


	users = []
	connections = []
	rooms = []
	admins = []
	io.sockets.on('connection', function(socket){
		connections.push(socket)
		console.log('connected: %s sockets connected', connections.length)

		//disconnect
		socket.on('disconnect', function (data) {
			if(socket.user)
				if(socket.user.role == 'user')
					users.splice(users.indexOf(socket.user), 1)
				else
					admins.splice(admins.indexOf(socket.user), 1)
			connections.splice(connections.indexOf(socket), 1)
			console.log("disconnected: %s sockets connected", connections.length)
		})

		//ADDING USERS
		socket.on('new user', function(data, callback){
			var user = DB.connectUser(data)	
			if(user){
				callback({err:false, user:data})	
				
				
				if(user.role == 'admin'){
					socket.user = {
									id:user._id, 
									username: user.username, 
									role: user.role
								}; 
					admins.push({sid:socket.id, username:user.username})
					socket.emit('admin connect', 'you have connected to your admin channel', {sid:socket.id, uid:user._id});
					updateUsersForAdmin(users)
				}
				if(user.role == 'user'){
					socket.user = {
									id:user._id, 
									username: user.username, 
									role: user.role,
									messages:user.messages,
									connectedAdmin:0
								}; 
					users.push({sid:socket.id, username:user.username})
					socket.emit('user connect', 'you are being connected to our Team', {sid:socket.id, uid:user._id});
					updateUsersForAdmin(users)
				}

			}
		});
		
		function updateUsersForAdmin(users){
			if(admins.length > 0){
				io.to(admins[0].sid).emit('get users', users)
			}
		}
		function updateAdminForUsers(user, admins){
			socket.emit('update user', user, admins)
		}
		//////SENDING & RECIEVING MESSAGING
		socket.on('send message', function(message, sid, cid, aid){
			var sender,
				client
			if(cid != ''){
				sender = socket.user
				client = io.sockets.connected[cid].user
			}
			else{	
				client = sender = socket.user
			}
			
			client.messages.push({uid:sender.id, dateTime: Date.now(), msg:message, read:false}) 
	        
	        socket.emit('new message', {msg: message, sid:sid, uid:sender.id})
	        console.log(aid)
	        if(aid != '')
		        io.to(aid).emit('update admin window', {msg: message, sid:sid, uid:sender.id})
	        
	        if(cid != ''){
	        	aid = socket.id
		        io.to(cid).emit('new message', {msg: message, sid:sid, uid:sender.id, aid:aid})	
	        }
		})

		socket.on('get user data', function(sid){
			var socketUser = io.sockets.connected[sid].user
			socket.emit('user data', {user:socketUser, sid:sid })
		})
	})

}




















