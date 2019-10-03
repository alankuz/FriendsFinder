var path = require('path');

var friendList = require("../data/friends.js")
module.exports = function(app) {
	app.get('/api/friendslist', function(req, res) {
		res.json(friendslist);
	});
    app.post('/api/friends', function(req, res) {
		var userInput = req.body;
		var userResponses = userInput.scores;

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friendList.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friendList[i].scores[j] - userResponses[j]);
			}
			// console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				// console.log('Closest match found = ' + diff);
				// console.log('Friend name = ' + friends[i].name);
				// console.log('Friend image = ' + friends[i].photo);

				totalDifference = diff;
				matchName = friendList[i].name;
				matchImage = friendList[i].photo;
			}
		}

		// Add new user
		friendList.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};

