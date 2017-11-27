var cheerio = require('cheerio');
var request = require('request');

exports.getPageInfo = function(req, res) {
	let url = req.params.url;
	let htmlVersion = "";
	let title = "";
	let headings = [];
	let hasLoginForm = false;

	request(url, function(error, response, html) {
		if (!error && response.statusCode == 200) {
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
			let passwordInput = $("[type=password]");
				
			if (passwordInput[0] &&
				passwordInput[0]["name"] == "input"	&&
				passwordInput[0]["attribs"]["type"] == 'password') {
				
				hasLoginForm = true;
			}
			
			//links
			/*let linksList = [];
			let external = [];
			let links = $('a')
			 $(links).each(function(i, link){
				 //linksList.push($(link).attr('href'))
				 if (($(link).attr('href')).indexOf('www')) {
					 external.push($(link).attr('href'));
				 }
			 });
			
			console.log(external + "\n");
			console.log("-------------------------------------------/n");
			let src = $('script[src]');
			//console.log(src + "\n");
			//console.log("-------------------------------------------/n");
			let css = $('link[href]');
			//console.log(css + "\n");
			///console.log("-------------------------------------------/n");*/
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