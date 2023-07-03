/*-----------------------------------IMPORTS----------------------------------*/
import fs      from "fs"
import express from "express";
//import sqlite3 from "sqlite3";
import Database from "better-sqlite3";
//sqlite3 = require('sqlite3').verbose();
/*--------------------------------CONFIGURATION-------------------------------*/
var port = 3003;
/*----------------------------CORE VARIABLES----------------------------------*/
//import {headercode, bgimg, bgimg2} from './images.js';
/*-----------------------------CORE FUNCTIONS---------------------------------*/

/*--------------------------ENDPOINT FUNCTIONS--------------------------------*/

/*-----------------------------APP INITIALISE---------------------------------*/
const app = express();
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.get('/officers', (request, response)=> {
	response.writeHead(200, {'Content-Type': 'application/json'});
    let stmt = null;
	try {
		stmt = db.prepare('SELECT * from officers');
	} catch (err) { console.log(' ' + err);  return; }
    response.write('[');
	let firstRow = true;
    for (const row of stmt.iterate()) {
        if (firstRow) { 
            response.write('{ "name" : "' + row.name + '", "id" : " ' + row.id + '" }'); 
            firstRow = false;
        } else {
            response.write(',{ "name" : "' + row.name + '", "id" : " ' + row.id + '" }');
        }
	}
	response.end(']');
});

app.post('/post', (request, response)=> {
	let data = request.body;
	response.writeHead(200, {'Content-Type': 'text/html'});
	let row = null;
	try {
		row = db.prepare('SELECT * from user_data where username=\''+data.username+'\' AND area = \'' + data.area + '\'').get();
	} catch (err) {
		response.end(' ' + err);  return;
	}
	if (row && row.username != null) { 
		try {
			db.prepare('UPDATE user_data SET return_url = \'' + data.returnURL + '\' WHERE username = \'' + data.username + '\' AND area = \'' + data.area + '\'').run();
		} catch (err) {
			response.end(' ' + err);  return;
		}
		response.end(row.url);
	} else { response.end('NO-DATA-FOUND'); }
});
/*----------------------------START HTTP SERVER-------------------------------*/

const db = new Database('my.sqlite');
if (db) { console.log('Database opened'); } else { console.log('DB ERROR - Datbase NOT available'); }

app.listen(port, () => {
  console.log('Running on port ' + port);
});
