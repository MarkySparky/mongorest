'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	createdby: { type: String },
	itemcount: { type: Number },
	created: { type: Date , default: Date.now } 
};

var pubSchema = new Schema(fields);

module.exports = mongoose.model('Pub', pubSchema);