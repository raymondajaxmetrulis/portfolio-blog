require('dotenv').config();

const CONFIGURATION = {
	"development": {
    	"dialect": "postgres",
    	"username": "postgres",
    	"password": process.env.LOCAL_DB_PW,
    	"host": "localhost",
    	"port": 1234,
    	"database": "postgres"
    },
  	"production": {
    	"dialect": "postgres",
    	"username": process.env.HEROKU_DB_USER,
    	"password": process.env.HEROKU_DB_PW,
    	"host": process.env.HEROKU_DB_HOST,
    	"port": 5432,
    	"database": process.env.HEROKU_DB_NAM
  	}
}

const env = process.env.NODE_ENV || "development";

module.exports = CONFIGURATION[env]
