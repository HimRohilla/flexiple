var constants = require(path_to_app_constants);
var db = require(constants.path_to_app_utility + 'db');
var model = require(constants.path_to_app_models);
var con = db.getConnection();

	function checkThenInsertIntoPublisherArticles(publisher_id, article_title, article_image_url, article_url) {
		valueSet = {
			publisher_id: publisher_id,
			article_title: article_title,
			article_url: article_url,
			article_image: article_image_url
		};
		return new Promise(function(resolve, reject) {
			con.query("SELECT article_id FROM publisher_articles WHERE publisher_id = ? AND article_url = ?", [publisher_id, article_url], function(err, res) {
				var obj = {};
				if(err){
					reject(err);
				}
				if(res.length >= 1) {	// row already exists
					obj.status = true;
					obj.article_id = res[0].article_id;
					model.update("publisher_articles", {'article_title': article_title, 'article_image': article_image_url}, {'publisher_id': publisher_id, 'article_url': article_url}).then(function(res1) {
						resolve(obj);
					}, function(err) {
						reject(err);
					});
				}
				else {
					con.query("INSERT INTO publisher_articles SET ?", valueSet, function(err1, res1) {
						if(err1){
							reject(err1);
						}
						obj.status = false;
						if(res1 === undefined) {
							reject(err1);
						}
						obj.article_id = res1.insertId;
						resolve(obj);
					});
				}
			});
		});
	}

module.exports = {
	checkThenInsertIntoPublisherArticles: checkThenInsertIntoPublisherArticles,
}