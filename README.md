# MemeInterest

MemeInterest is a Pinterest Clone.

Check it out here - [MemeInterest](https://meme-interest.herokuapp.com).


## Table of contents

  * [MemeInterest](#memeinterest)
  * [Table of contents](#table-of-contents)
  * [Feature List](#feature-list)
  * [Prerequisites](#prerequisites)
    * [For Developers](#for-developers)
  * [Getting Started](#getting-started)
  * [Built With](#built-with)
  * [Contributing](#contributing)
  * [Author](#author)
  * [License](#license)
  * [Acknowledgments](#acknowledgments)

## Feature List
* View all memes listed by users.
* View memes listed by a particular user.
* Authenticate yourself using twitter
* AutheAdd memes
* Delete your memes
* Like memes listed by other users


## Prerequisites
 These are what you need installed on your computer to use the application:

 - Web Browser (Chrome, or Mozilla, or Safari, or Opera, or Microsoft Edge )

 ### For Developerss:
 * Node (version, >= 7)
 * MongoDB (version, >= 3)
 * Git

## Getting Started
Follow below steps to start the app locally for the first time.

 * clone this repo
 * cd into the `MemeInterest` directory
 * Run - `npm i` to install depencies
 * Run - `cp sample.env .env`
 * Fill the **.env** file with appropriate values
 * Run - `mkdir data` to create a **db** directory
 * Run - `mongod --dbpath ./data > /dev/null &` to start mongo server
 * Run - `npm fill` to fill the database with seed values
 * Run - `npm start` to start the server

 [Note]:- You need to follow the above steps first time only.
 From next time onwards start the server by running `npm start`.

## Built With

- [Node](https://nodejs.org) - JS Runtime Environment
- [Npm](https://www.npmjs.com) - Package Manager
- [Express](https://expressjs.com/en/starter/installing.html) - Web Framework
- [MongoDB](https://www.mongodb.com) - Database
- [Mongoose](http://mongoosejs.com) - Database ORM
- [Vue](https://vuejs.org) - Frontend Library
- [Vuex](https://vuex.vuejs.org/en) - State Management Tool
- [Webpack](https://webpack.js.org) - Frontend Bundler
- [Mocha](https://mochajs.org) - Testing Framework
- [Git](https://git-scm.com) - Version Control
- [VS Code](https://code.visualstudio.com) - Code Editor
- [Heroku](www.Heroku,com) - Hosting and Continuous Deployment
- [Chrome](https://www.google.com/chrome/browser/desktop/index.html) - Browser


## Contributing

Contributions are welcome.
Please keep an eye on the Project's issue tracker and if you think you can handle an issue,
please comment on the issue page.


## Author

* [Yasser Hussain](https://github.com/yasserhussain1110)

## License

[MIT](LICENSE.md)

## Acknowledgments

* ChinguCentral Community
* Family and Friends
