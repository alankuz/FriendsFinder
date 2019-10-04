var path = require('path');

var friendList = require("../data/friends.js")
module.exports = function(app) {
	app.get('/api/friendlist', function(req, res) {
		res.json(friendlist);
	});
    app.post('/api/friendlist', function(req, res) {
		var userInput = req.body;
		var userResponses = userInput.scores;

		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; 

		for (var i = 0; i < friendList.length; i++) {

			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friendList[i].scores[j] - userResponses[j]);
			}
			if (diff < totalDifference) {
				totalDifference = diff;
				matchName = friendList[i].name;
				matchImage = friendList[i].photo;
			}
		}

		friendList.push(userInput);

		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};

