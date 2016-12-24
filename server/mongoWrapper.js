'use strict';
module.exports = class MongoWrapper {
    constructor() {
        this.client = require('mongodb').MongoClient;
        this.dbURL = 'mongodb://localhost:27017/bathroomStats';
    }

    connect() {
        this.client.connect(
            this.dbURL,
            (error, db) => {
                if (!error) {
                    // Do stuff
                } 
            }
        );
    }
}