websiteModel = Backbone.Model.extend({
	defaults: {
		name: 'Backbone app tut1',
		barcode: 98765
	},
	initialize: function() {
		console.log('Model websiteModel init');
		this.bindevents();
	},
	bindevents: function() {
		this.on('change:barcode', function(model){
			console.log('Barcode changed ' + model.get('barcode'));
		});		
	}
});



$(document).ready(function(){
	var page1 = new websiteModel();
	console.log('Page name = ' + page1.get('name') + ' barcode = ' + page1.get('barcode'));
	page1.set({barcode: 45678});
	page1.set({barcode: 98765});
});
