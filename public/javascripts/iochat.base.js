$(function(){
	var socket 			= io.connect(),
		$messageArea 	= $('#_messageArea'),
		$messageForm 	= $('#_messageForm'),
		$message 		= $('#_message'),
		$chat			= $('#_chat'),
		$userArea		= $('#_userArea'),
		$userForm		= $('#_userForm'),
		$username		= $('#_username'),
		$users 			= $('#_users'),
		$impMsg 		= $('#_importants'),
		$sid 			= '',
		$cid 			= '',
		$uid 			= '',
		$aid 			= ''

	$userForm.submit(function(e){
		e.preventDefault()
		socket.emit('new user', $username.val(), function(data){
			if(!data.err){
				$userArea.hide()
				$messageArea.css({'display':'flex'})
			}else{
				alert(data.user+" donsn't exist")
			}
		})
		$username.val()
	})
	////CONNECTING ADMIN RESPONSE///
	socket.on('admin connect', function (data, ids) {
		$sid = ids.sid
		$uid = ids.uid
		$impMsg.html('')
		$impMsg.html('<p>' + data + '</p>')
		$impMsg.fadeIn(1000).delay(5000).fadeOut(1000)
	})

	socket.on('user connect', function (data, ids) {
		$sid = ids.sid
		$uid = ids.uid
		$impMsg.html('')
		$impMsg.html('<p>' + data + '</p>')
		$impMsg.slideDown(1000).delay(5000).slideUp(1000)
	})

	socket.on('get users', function(users){
		var html = ''
		for(i =0; i < users.length; i++){
			html += '<li class="btn btn-primary _user-chat" id="'+users[i].sid+'">'+users[i].username+'</li>'
		}
		$users.html(html)
	})


	/////SENDING & RECIEVING MESSAGES/////
	$messageForm.submit(function(e){
		e.preventDefault()
		socket.emit('send message', $message.val(), $sid, $cid, $aid)
		$message.val('')
	})

	function placeMessage(data){
		var side 	= '',
			color 	= ''

		if(data.uid === $uid){
			side 	= '_right'
			color 	= '_sent'
		}else{
			side 	= '_left'
			color 	= '_received'
		}

		var message = 	'<div class="_chatMessageContainer '+side+'">'+
		    				'<div class="well _chatMessage '+color+'">'+
		    					'<span class="_chatWords">'+data.msg+'</span>'+
		    				'</div>'+
		    			'</div>';
		return message
	}
	socket.on('new message', function(data){
		if(data.aid)
			$aid = data.aid
		$chat.append(placeMessage(data))
	})
	socket.on('update admin window', function(data){
		if(data.sid == $cid)
			$chat.append(placeMessage(data))
	})
	$users.on("click", "._user-chat", function(event){
	    socket.emit('get user data', this.id)
	})
	socket.on('user data', function(data){
		$cid = data.sid

		var msgs = data.user.messages
		$chat.html('')
		for(i =0; i < msgs.length; i++){
			$chat.append(placeMessage(msgs[i]))
		}
	})
})