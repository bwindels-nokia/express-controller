/*jshint evil: false, bitwise:false, strict: false, undef: true, white: false, node:true */

module.exports = {
	create: function(app, routesDef) {

		var createLookupMiddleware = require('./lookup'),
			addRoutes = require('./add-routes');

		return {
			lookup: function() {
				return createLookupMiddleware(app, routesDef);
			},
			addRoutes: function(callControllerFn) {
				return addRoutes(app, routesDef, callControllerFn);
			}
		};
	}
};