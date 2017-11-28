var cheerio = require('cheerio');
var request = require('request');

exports.getPageInfo = function(req, res) {
	var url = req.params.url;
	var htmlVersion = "";
	var title = "";
	var headings = [];
	var hasLoginForm = false;

	request(url, function(error, response, html) {
		if (error) {
			res.status(404).json({"error" : "Invalid or unreachable URL!"});
			return;
		}
		
		if (response && response.statusCode == 200) {
			var $ = cheerio.load(html);
			title = $("title").text();

			//html version
			if (html.includes('<!DOCTYPE html>') || html.includes('<!DOCTYPE HTML>')) {
				htmlVersion = 'HTML 5';
			} else {
				htmlVersion = 'HTML <= 4';
			}

			//headings
			headings.push($('h1').length);
			headings.push($('h2').length);
			headings.push($('h3').length);
			headings.push($('h4').length);
			headings.push($('h5').length);
			headings.push($('h6').length);

			//login form
			var passwordInput = $("[type=password]");
				
			if (passwordInput[0] &&
				passwordInput[0].name == "input"	&&
				passwordInput[0].attribs.type == 'password') {
				
				hasLoginForm = true;
			}
			
			//links
			/*
			let external = []; //contains www
			let links = $('a')
			 $(links).each(function(i, link){
				 //linksList.push($(link).attr('href'))
				 if (($(link).attr('href')).indexOf('www')) {
					 external.push($(link).attr('href'));
				 }
			 });*/
		}

		res.setHeader('Content-Type', 'application/json; charset=UTF-8');
		res.send(JSON.stringify({
			"htmlVersion" : htmlVersion,
			"title" : title,
			"headings" : headings,
			"hasLoginForm" : hasLoginForm
		}));
	});
};
