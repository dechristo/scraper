# Scraper

# 1. Solution description
The application was developed with Angular 1.x for frontend and Karma-Jasmine for tests. The backend was implemented with Node.js using **Express** and **Cheerio**. The router was decoupled from the server script (app.js) so as the controller. The controller gatters all the data using **requests** and **cheerio** modules. For testing the modules used were: **mocha**, **chai** and **node_mocks_http**.

The application was developed and tested on a Linux Mint OS.
# 2. Instructions
## 2.1 Install dependecies
### 2.1.1 Karma and Grunt clients globally
If you prefer you can install **Karma** and **Grunt** clients globally with:
`npm install -g karma-cli` and
`npm install -g grunt-cli`

## 2.2 Building the application
Just type `make build` at the project root folder (where the Makefile is located)

## 2.3 Testing
### 2.3.1 Frontend
Type `tests-frontend`
The output should looks like:

	28 11 2017 11:20:35.483:INFO [karma]: Karma v1.7.1 server started at http://0.0.0.0:9876/
	28 11 2017 11:20:35.485:INFO [launcher]: Launching browser PhantomJS with unlimited concurrency
	28 11 2017 11:20:35.489:INFO [launcher]: Starting browser PhantomJS
	28 11 2017 11:20:35.683:INFO [PhantomJS 2.1.1 (Linux 0.0.0)]: Connected on socket 4y095j8t1Tpmw7nnAAAA with id 87564755

 	 App controller
    ✓ should be defined.
    ✓ should contains url var.
    ✓ should contains errorMsg var.
    ✓ should contains pageInfo object defined.
    ✓ should contains showError var.
    ✓ should contains showResult var.
    ✓ should contains showLoader var.
    ✓ should contains scrap() function defined.
    scrap()
      ✓ should retrieve correct data from backend

	PhantomJS 2.1.1 (Linux 0.0.0): Executed 9 of 9 SUCCESS (0.046 secs / 0.026 secs)
	TOTAL: 9 SUCCESS
	
### 2.3.2 Backend
Type `tests-backend`
The output should looks like:

	Server started on port 2000.
	  Page Info Controller
    	✓ GET /scrap/analize/:url should return page info for valid url (1472ms)
    	✓ GET /scrap/analize/:url should return error for invalid url

  	Router endpoints
    	✓ GET / should redirect to home
    	✓ GET /scrap/analize/:search should return json (1283ms)


  	4 passing (3s)

### 2.3.3 All tests
In order to run all the tests type: `make tests-all`

