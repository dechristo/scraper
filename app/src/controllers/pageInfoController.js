const cheerio = require('cheerio');
const request = require('request');

const getPageInfo = async (uri) => {
    const url = uri;
    let result;
    
    try {
        result = await doGetRequest(url);
    } catch (err) {
        return {"error": "Invalid or unreachable URL!"};
    }

    const $ = cheerio.load(result);
    const links = getLinks($);

    let responseObj = {
        "htmlVersion": getHtmlVersion(result),
        "title": getTitle($),
        "headings": getHeadings($),
        "hasLoginForm": hasLoginForm($),
        "internalLinks": links.internal.length,
        "externalLinks": links.external.length
    };
    return responseObj;
};

const getHtmlVersion = (data) => {
    if (data.includes('<!DOCTYPE html>') || result.includes('<!DOCTYPE HTML>')) { 
        return 'HTML 5';
    }
    return htmlVersion = 'HTML <= 4';
};

const getTitle = ($) => {
    return $("title").text();
};

const getHeadings = ($) => {
    let headings = [];

    headings.push($('h1').length);
    headings.push($('h2').length);
    headings.push($('h3').length);
    headings.push($('h4').length);
    headings.push($('h5').length);
    headings.push($('h6').length);

    return headings;
};

const hasLoginForm = ($) => {
    let passwordInput = $("[type=password]");
    let hasLoginForm = false;

    if (passwordInput[0] &&
        passwordInput[0].name === "input" &&
        passwordInput[0].attribs.type === 'password') {

        hasLoginForm = true;
    }
};

const getLinks = ($) => {
    let links = {
        internal: [],
        external: []
    };

    let pageLinks = $('a');

    $(pageLinks).each(function (i, link) {
        if (!($(link).attr('href')))
            return;
        if (!$(link).attr('href').indexOf('http')) {
            links.external.push($(link).attr('href'));
        } else {
            links.internal.push($(link).attr('href'));
        }
    });

    return links;
};

const doGetRequest = (url) => {
    return new Promise((resolve, reject) => {
        request.get(url, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body)
            }
        });
    });
};

module.exports = {
    getPageInfo
};