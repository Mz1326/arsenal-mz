app.get("/example/d", function(req, res) {
	var ua = req.get("user-agent");
	if (!!ua && ua.toLowerCase().match(/android|ipad|iphone|ipod/)) {
		console.log("this is mb");
		res.redirect("http://m.browser.baidu.com/mb");
	} else {
		console.log("This is pc");
		res.redirect("http://m.browser.baidu.com/pc");
	}
});