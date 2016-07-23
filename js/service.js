(function () {
    var app = angular.module('service', []);

    app.factory('personSrv',function ($resource){
         return $resource('./Backend/person/:id', {id: '@id_chauf'}, {'update': {method: 'PUT'}});
    });

    

    app.factory('camionSrv',function($resource){
    	return $resource('./Backend/camion/:id' , {id: '@id_veh'}, {'update' :{method: 'PUT'}});
    });



 	app.factory('voyageSrv',function($resource){
    	return $resource('./Backend/voyage/:id' , {id: '@id_voy'}, {'update' :{method: 'PUT'}});
    });

	 app.factory('reparationSrv',function($resource){
    	return $resource('./Backend/reparation/:id' , {id: '@id_rep'}, {'update' :{method: 'PUT'}});
    });

	 app.factory('loginSrv',function($resource){
    	return $resource('./Backend/login/:login :pass' , {login: '@login_user',pass:'@password_user'}, {'update' :{method: 'PUT'}});
    });


    //fonction de filtre 
    app.filter('brDateFilter', function() {
        return function(dateSTR) {
            var o = dateSTR.replace(/-/g, "/"); // Replaces hyphens with slashes
            return Date.parse(o + " -0000"); // No TZ subtraction on this sample
        }
    });


})();