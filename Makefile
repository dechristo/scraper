tests-frontend:
	karma start

tests-backend:
	npm test

tests-all:
	karma start || npm test

build:
	npm install && grunt
