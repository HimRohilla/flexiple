var constants = require(path_to_app_constants);
var models = require(constants.path_to_app_models);

	function sendResponse(res, json) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(JSON.stringify(json));
		res.end();
	}

	function insertIntoPublisherAndArticlesAndTopics(err, body, url, id) {
		return new Promise(function(resolve, reject) {
			var arr = getMetaTagTopicsImageTitle(body);
			var topicsArray = arr.topicsArray;
			var image_url = arr.image_url
			var title = arr.title;
			// first check whether that particular publisher is there in db or not
			publishers.checkIfPublisherExists(id).then(function(status) {
				if(status) {
					articles.checkThenInsertIntoPublisherArticles(id, title, image_url, url).then(function(obj) {
						var article_id = obj.article_id;
						if(!obj.status) {
							for (var i = topicsArray.length - 1; i >= 0; i--) {
								topics.checkAndInsertIntoTopics(topicsArray[i].trim()).then(function(obj1) {
									articles.insertIntoPublisherArticleTopics(article_id, obj1.topic_id);
								}, function(err1) {
									reject(err1);
								});
							}
						}
						var obj = {status: true, article_id: article_id};
						return resolve(obj);
					}, function(err) {
						reject(err);
					});
				}
				else {
					var obj = {status: false}
					return resolve(obj);
				}
			}, function(err) {
				reject(err);
			});			
		})
	}

module.exports = {
	sendResponse: sendResponse,
	insertIntoPublisherAndArticlesAndTopics: insertIntoPublisherAndArticlesAndTopics
}