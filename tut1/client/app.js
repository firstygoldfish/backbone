
var officersModel = Backbone.Model.extend({
    urlRoot: 'localhost:3003/officers'
});


$(document).ready(function(){
	var anOfficer = new officersModel({id: 'abcd1234'});
	anOfficer.fetch();
});
