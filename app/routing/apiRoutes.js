var path = require('path');
var friendlist = require('../data/friends.js');
module.exports = function(app) {
	console.log('___ENTER apiRoutes.js___');

	app.get('/api/friends', function(req, res) {
		res.json(friendlist);
		console.log(friendlist)
	});

	app.post('/api/friends', function(req, res) {
		var userInput = req.body;
		console.log(userInput)

		var userinfo = userInput.scores;
		var startVal = 10000; 
		var matchName = '';
		var matchImage = '';
		

		for (var i = 0; i < friendlist.length; i++) {
			var diff = 0;
			for (var x = 0; x < userinfo.length; x++) {
				diff += Math.abs(friendlist[i].scores[x] - userinfo[x]);
			}

			if (diff < startVal) {
				startVal = diff;
				matchName = friendlist[i].name;
				matchImage = friendlist[i].photo;
			}
		}

		friendlist.push(userInput);
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};