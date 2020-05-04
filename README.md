# got_search

This repo is a demo MERN stack app, it demonstrates the basic implementation of MERN app and search using mongoose js and mongoDB.

# Installation

1. Git clone this repo
1. You might need to install MongoDB
    1. sudo apt-get update
    1. sudo apt install -y mongodb
1. You might need to install node js
    1. sudo apt install nodejs
1. Install node modules
    1. cd in main dir
    1. npm install
1. Build react files and components
    1. npm run  build

# Load collections in mongoDB
Run the following command

```js
node load-data
```
# Run the server
```js
node start
```

Visit http://0.0.0.0:8000

## API end points
1. /count
2. /search?king=Robb Stark&location=Riverrun&type=siege
3. /list

### Known Issues
1. Search is not fuzzy as of now.
1. Autosuggestion dropdown sometimes overlaps with results
