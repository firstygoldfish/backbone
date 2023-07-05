
var officersModel = Backbone.Model.extend({
    urlRoot: 'http://localhost/officers'
});

anOfficer = new officersModel();

$(document).ready(function(){
	anOfficer.fetch();
	console.log('Model Fetched');
});

