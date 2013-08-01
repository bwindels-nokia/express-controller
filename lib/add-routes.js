/*jshint evil: false, bitwise:false, strict: false, undef: true, white: false, node:true */

module.exports = function(app, routesDef, callControllerFn) {
    // Iterate over all the routes and call corresponding controllers
    Object.keys(routesDef).forEach(function(route) {
        var routeOptions = routesDef[route];

        routeOptions.forEach(function(optionSet) {
            var httpMethod = optionSet.httpMethod || 'get';
            if (!app[httpMethod]) {
                throw Error("app doesn't recognize the HTTP method: " + httpMethod);
            }
            app[httpMethod](route, callControllerFn);
        });
    });
};