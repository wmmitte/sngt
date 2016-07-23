(function() {
    var app = angular.module('app', [
        'ngResource',
        'ui.router',
        'service',
        'controller',
        'ngMaterial',
        'ngMessages',
        'ngAria',
        'mdPickers'
    ]);


    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/voyage'); //redirection par defaut 

        $stateProvider
                .state('person',
                {
                    url: '/person',
                    templateUrl: 'views/person.html',
                    controller: 'personCtrl'
                })

                .state('form',
                {
                    url: '/form',
                    templateUrl: 'views/form.html',
                    controller: 'formCtrl'

                })

                .state('camion',
                {
                    url: '/camion',
                    templateUrl: 'views/camion.html ',
                    controller: 'camionCtrl'
                })

                .state('camionForm',
                {
                    url: '/camf',
                    templateUrl: 'views/camionForm.html ',
                    controller: 'camionFormCtrl'
                })

                .state('voyage',
                {
                    url: '/voyage',
                    templateUrl: 'views/voyage.html',
                    controller: 'voyageCtrl'
                })
                
                .state('voyageEtat',
                {
                    url: '/voyet',
                    templateUrl: 'views/voyageEtat.html',
                    controller: 'voyageEtatCtrl'
                })

                .state('voyageForm',
                {
                    url: '/voyf',
                    templateUrl: 'views/voyageForm.html',
                    controller: 'voyageFormCtrl'
                })

                .state('login',
                {
                    url: '/login',
                    templateUrl: 'views/login.html',
                    controller: 'loginCtrl'
                })

                .state('reparation',
                {
                    url: '/reparation',
                    templateUrl: 'views/reparation.html',
                    controller: 'reparationCtrl'
                })

                .state('reparationForm',
                {
                    url: '/repf',
                    templateUrl: 'views/reparationForm.html',
                    controller: 'reparationFormCtrl'
                })

                .state('acceuil',
                {
                    url: '/acceuil',
                    templateUrl: 'views/acceuil.html',
                    controller: 'acceuilCtrl'
                })

                ;
    });



})();

