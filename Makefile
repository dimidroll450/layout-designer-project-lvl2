install:
	npm install

lint:
	npx stylelint ./src/scss/**/*.scss
	npx htmlhint ./src/*.html

watch:
	gulp watch

deploy:
	npx surge ./src/