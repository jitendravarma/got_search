const fs = require('fs')
const path = require('path');
const csv = require('csv-parser')
const mongoose = require('mongoose')

const User = require('../core/models/models')

var count = 0
var results = [];
const fileName = process.argv.slice(2)[0];

if (!fileName) {
	console.log("Please enter file name")
	console.log("Exiting...")
	process.exit(404)
}

const filePath = path.join(__dirname, '..', 'data', fileName);

async function getConnection() {
	mongoose.connect('mongodb://localhost/got').then((reponse) => {
		console.log('Connection with mongoDB established');
	}).then(() => readCSV()).catch((error) => {
		if (error) throw error;
	})
}

async function readCSV() {
	fs.createReadStream(filePath)
		.pipe(csv())
		.on('data', (data) => {
			results.push(data)
			count += 1;
			if (results.length % 20 === 0) {
				User.insertMany(results)
				results = []
			}
		}
		).on('end', () => {
			User.insertMany(results)
			console.log("Ingested " + count + " in mongoDB");
			process.exit()
		});
}

getConnection()