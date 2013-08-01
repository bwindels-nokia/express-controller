/*jshint evil: false, bitwise:false, strict: false, undef: true, white: false, node:true */

var _ = require('underscore');

module.exports = function(app, routesDef) {
	return function(req, res, next) {
		var method = req.method.toLowerCase(),
			routes = app.routes[method] || [];

		var matchedRoute = _.find(routes, function(route) {
			return route.regexp.test(req.path);
		});

		if(!matchedRoute) {
			return next();
		}
		//path like declared in routeDef
		var routePath = matchedRoute.path;
		//look for matching 
		var controllerDefsForPath = routesDef[routePath] || [];
		var controllerDef = controllerDefsForPath.filter(function(controllerDef) {
			return (controllerDef.httpMethod || 'get').toLowerCase() === method;
		});

		if(controllerDef.length) {
			req.controllerOptions = _.defaults(controllerDef[0], {action: 'index'});
		}
		return next();
	};
};