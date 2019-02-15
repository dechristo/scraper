const cheerio = require('cheerio');
const httpUtils = require('./../utils/httpUtils');

class PageInformationService {

    async getPageInformation(url) {
        const response = await this.buildPageInformation(url);
        return response;
    }

    async buildPageInformation(url) {
        let result;
        console.log('url:', url);
        try {
            result = await httpUtils.doGetRequest('http://' + url);
        } catch (err) {
            console.log('e:', err);
            return { "error": err };
        }

        const $ = cheerio.load(result);
        const links = this.getLinks($);

        let response = {
            "htmlVersion": this.getHtmlVersion(result),
            "title": this.getTitle($),
            "headings": this.getHeadings($),
            "hasLoginForm": this.hasLoginForm($),
            "internalLinks": links.internal.length,
            "externalLinks": links.external.length
        };

        return response;
    }

    getHtmlVersion(data) {
        if (data.includes('<!DOCTYPE html>') || data.includes('<!DOCTYPE HTML>')) {
            return 'HTML 5';
        }
        return htmlVersion = 'HTML <= 4';
    }

    getTitle($) {
        return $("title").text();
    }

    getHeadings($) {
        let headings = [];

        headings.push($('h1').length);
        headings.push($('h2').length);
        headings.push($('h3').length);
        headings.push($('h4').length);
        headings.push($('h5').length);
        headings.push($('h6').length);

        return headings;
    }

    hasLoginForm($) {
        const passwordInput = $("[type=password]");

        if (this.isPasswordInput(passwordInput)) {
            return true;
        }

        return false;
    }

    isPasswordInput(input) {
        if (!input) {
            return false;
        }

        return input[0] &&
            input[0].name === "input" &&
            input[0].attribs.type === 'password';
    }

    getLinks($) {
        const links = {
            internal: [],
            external: []
        };

        const pageLinks = $('a');

        $(pageLinks).each((link) => {
            if (!($(link).attr('href')))
                return;
            if ($(link).attr('href').indexOf('http') >= 0) {
                links.external.push($(link).attr('href'));
            } else {
                links.internal.push($(link).attr('href'));
            }
        });

        return links;
    }
}

module.exports = PageInformationService;