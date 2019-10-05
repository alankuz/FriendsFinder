var path = require('path');
var friendlist = require('../data/friends.js');
module.exports = function (app) {

	app.get('/api/friends', function (req, res) {
		res.json(friendlist);
	});
	// This posts the information to a page that will be used later to display friend 
	app.post('/api/friends', function (req, res) {
		var userInput = req.body;
		var userinfo = userInput.scores;
		var matchName = '';
		var matchImage = '';
		var startVal = 1995;
		// This figures out if you have a match 
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
		// This pushes the information to the popup
		friendlist.push(userInput);
		res.json({
			status: 'OK',
			matchName: matchName,
			matchImage: matchImage
		});
	});
};