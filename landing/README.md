# Solid

A landing page template.

* [Getting started](#getting-started)

## Getting started
* First, ensure that node.js & npm are both installed. If not, choose your OS and installation method from [this page](https://nodejs.org/en/download/package-manager/) and follow the instructions.
* This template requires Node 14 to work. You can handle multiple node versions with [NVM](https://github.com/nvm-sh/nvm) 
* Next, use your command line to enter your project directory.
* This template comes with a ready-to-use package file called `package-sample.json`. You just need to rename it to `package.json`, then run `npm install` to install all of the dependencies into your project.

You're ready to go! Run any task by typing `npm run task` (where "task" is the name of the task in the `"scripts"` object). The most useful task for rapid development is `watch`. It will start a new server, open up a browser and watch for any SCSS or JS changes in the `src` directory; once it compiles those changes, the browser will automatically inject the changed file(s)!


# Dev

Requirements

node v14

	nvm use 14
	npm install
	npm run build
	npm run watch

	cd ../public
	rm -rf *
	wget -r -l1 -np -nd -E -k -p -A.html,.css,.js,.jpg,.png,.gif, .svg http://localhost:3000
	cp index.html ../src/assets/landing/index.html

