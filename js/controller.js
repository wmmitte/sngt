(function() {
    var person = {};
    var camion = {};
    var voyage = {};
    var reparation = {};
    var app = angular.module('controller', []);




    /*
     __                .__  .__                 
     ____  ____   _____/  |________  ____ |  | |  |   ___________  
     _/ ___\/  _ \ /    \   __\_  __ \/  _ \|  | |  | _/ __ \_  __ \ 
     \  \__(  <_> )   |  \  |  |  | \(  <_> )  |_|  |_\  ___/|  | \/ 
     \___  >____/|___|  /__|  |__|   \____/|____/____/\___  >__|    
     \/           \/                                  \/     
     
     */
    /*
     _                  __  __                
     | |                / _|/ _|               
     ___| |__   __ _ _   _| |_| |_ ___ _   _ _ __ 
     / __| '_ \ / _` | | | |  _|  _/ _ \ | | | '__|
     | (__| | | | (_| | |_| | | | ||  __/ |_| | |   
     \___|_| |_|\__,_|\__,_|_| |_| \___|\__,_|_| 
     
     */

    app.controller('personCtrl', function($rootScope, $scope, $state, personSrv, $mdDialog, $mdMedia) {
        $rootScope.app = {};


        $rootScope.app.path = " CHAUFFEURS ::::: Liste des chauffeurs";


        //$scope.date = $moment().format('MM/DD/YYYY');
        //recuperation des donnees des chaufeur 
        function getAll() {
            $scope.datas = personSrv.query();
        }
        ;
        getAll(); //execution de la fonction en meme tems 



        //fonction de redirection socker dans le scope pour faire un ajout 
        $scope.add = function() {
            $rootScope.app.path = " CHAUFFEURS ::::: Nouveau/Ajouter";
            person = {};//mettre la variable gobal a vide 
            $state.go('form');//chargement de la ppage form avec sa methode simpplier venan de url router 
        };


        //redirection de edit une personne
        $scope.edit = function(data) {
            $rootScope.app.path = " CHAUFFEURS ::::: Mise a jour /Modifier";
            person = data;
            $state.go('form');
        };


        //fonction de suppression ,redirection d'une suppression d'une personne 
        $scope.remove = function(ev, id) {

            var confirm = $mdDialog.confirm()
                    .title('voullez vous supprimer ce chauffeur ?')
                    .textContent('La suppression est definitive.')
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .ok('oK supprimer')
                    .cancel('Non ');
            //
            $mdDialog.show(confirm).then(function() {
                //then success 

                //function delected wtih ressource deleted camion by id 
                personSrv.delete({id: id}, function() {
                    getAll();
                });


            },
                    //then error 
                            function() {
                                //reload camion
                                //getAll();

                            }
                    );


                };









        //redirection vers la page camion 
        $scope.camion = function() {
            $state.go('camion');
        };
        $scope.voyage = function() {
            $state.go('voyage');
        };

    });

    /*
     __                .__  .__                 
     ____  ____   _____/  |________  ____ |  | |  |   ___________  
     _/ ___\/  _ \ /    \   __\_  __ \/  _ \|  | |  | _/ __ \_  __ \ 
     \  \__(  <_> )   |  \  |  |  | \(  <_> )  |_|  |_\  ___/|  | \/ 
     \___  >____/|___|  /__|  |__|   \____/|____/____/\___  >__|    
     \/           \/                                  \/     
     
     
     */

    //formuaire de gestion d'une personne 
    app.controller('formCtrl', function($scope, $state, personSrv, $mdDialog) {
        $scope.myValue = false;
        $scope.post = person;

        $scope.back = function() {
            $state.go('person');
        };

        $scope.save = function() {
            if ($scope.post.id_chauf === undefined) {
                personSrv.save($scope.post, function() {
                    $scope.post = '';
                    // alert('Sauvegarde reussi ');


                    $mdDialog.show(
                            $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Statu ')
                            .textContent('Enregistrement effectue!')
                            .ariaLabel('Left to right demo')
                            .ok('ok !')
                            // You can specify either sting with query selector
                            .openFrom('#left')
                            // or an element
                            .closeTo(angular.element(document.querySelector('#right')))
                            );
                    //$scope.myValue=true;
                    $state.go('person');
                });
            } else {
                personSrv.update($scope.post, function() {
                    //alert('Mise a  jour reussi');
                    $mdDialog.show(
                            $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Mise a  jour')
                            .textContent('Enregistrement effectue!')
                            .ariaLabel('Left to right demo')
                            .ok('ok !')
                            // You can specify either sting with query selector
                            .openFrom('#left')
                            // or an element
                            .closeTo(angular.element(document.querySelector('#right')))
                            );

                    $state.go('person');
                });
            }
        };
    });
    /*
     __                .__  .__                 
     ____  ____   _____/  |________  ____ |  | |  |   ___________  
     _/ ___\/  _ \ /    \   __\_  __ \/  _ \|  | |  | _/ __ \_  __ \ 
     \  \__(  <_> )   |  \  |  |  | \(  <_> )  |_|  |_\  ___/|  | \/    
     \___  >____/|___|  /__|  |__|   \____/|____/____/\___  >__|    
     \/           \/                                  \/     
     */
    /*
     (_)            
     ___ __ _ _ __ ___  _  ___  _ __  
     / __/ _` | '_ ` _ \| |/ _ \| '_ \ 
     | (_| (_| | | | | | | | (_) | | | |
     \___\__,_|_| |_| |_|_|\___/|_| |_|
     
     */

//formuaire de gestion d'un camion
    app.controller('camionCtrl', function($rootScope, $scope, $state, camionSrv, $mdDialog, $mdMedia) {

        $rootScope.app = {};
        $rootScope.app.path = " CAMIONS ::::: Liste des camions";
        //fonction de recuperation des donees des camions 
        function getAllC() {
            $scope.postCamion = camionSrv.query();
        }
        ;

        getAllC();

        $scope.newCamion = function() {
            $rootScope.app.path = " CAMIONS ::::: Nouveau/Ajouter";

            camion = {};
            $state.go('camionForm');
        };
        //redirection vers la page de chauffeur 
        $scope.person = function() {
            $state.go('person');
        };


        $scope.editCamion = function(data) {
            $rootScope.app.path = " CAMIONS ::::: Mise a jour /Modifier";

            camion = data;
            $state.go('camionForm');
        };




        $scope.removeCamion = function(id, ev) {


            var confirm = $mdDialog.confirm()
                    .title('voullez vous supprimer ce camion ?')
                    .textContent('La suppression est definitive.')
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .ok('oK supprimer')
                    .cancel('Non ');
            //
            $mdDialog.show(confirm).then(function() {
                //then success 

                //function delected wtih ressource deleted camion by id 
                camionSrv.delete({id: id}, function() {
                    getAllC();

                });


            },
                    //then error 
                            function() {
                                //reload camion
                                //getAllC();

                            }
                    );

                }

    });
    /*
     __                .__  .__                 
     ____  ____   _____/  |________  ____ |  | |  |   ___________  
     _/ ___\/  _ \ /    \   __\_  __ \/  _ \|  | |  | _/ __ \_  __ \ 
     \  \__(  <_> )   |  \  |  |  | \(  <_> )  |_|  |_\  ___/|  | \/    
     \___  >____/|___|  /__|  |__|   \____/|____/____/\___  >__|    
     \/           \/                                  \/     
     
     
     */
    app.controller('camionFormCtrl', function($rootScope, $scope, $state, camionSrv, $mdDialog) {

        //fonction de recuperation des donees des camions 
        //function getAllC(){ $scope.postCamion =camionSrv.query();  };


        $scope.postCamion = camion;

        $scope.backCamion = function() {
            $state.go('camion');
        };

        $scope.saveCamion = function() {
            if ($scope.postCamion.id_veh === undefined) {

                camionSrv.save($scope.postCamion, function() {
                    $scope.postCamion = '';
                    //alert('Sauvegarde reussi ');

                    $mdDialog.show(
                            $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Statu ')
                            .textContent('Enregistrement effectue!')
                            .ariaLabel('Left to right demo')
                            .ok('ok !')
                            // You can specify either sting with query selector
                            .openFrom('#left')
                            // or an element
                            .closeTo(angular.element(document.querySelector('#right')))
                            );

                    $state.go('camion');
                });
            }
            else {
                //alert('Sauvegarde reussi ');
                camionSrv.update($scope.postCamion, function() {
                    //alert('Mise a jour reussi ');

                    $mdDialog.show(
                            $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Mise a  jour')
                            .textContent('Enregistrement effectue!')
                            .ariaLabel('Left to right demo')
                            .ok('ok !')
                            // You can specify either sting with query selector
                            .openFrom('#left')
                            // or an element
                            .closeTo(angular.element(document.querySelector('#right')))
                            );

                    $state.go('camion');
                });

            }
        };



    });

    /*
     __                .__  .__                 
     ____  ____   _____/  |________  ____ |  | |  |   ___________  
     _/ ___\/  _ \ /    \   __\_  __ \/  _ \|  | |  | _/ __ \_  __ \ 
     \  \__(  <_> )   |  \  |  |  | \(  <_> )  |_|  |_\  ___/|  | \/    
     \___  >____/|___|  /__|  |__|   \____/|____/____/\___  >__|    
     \/           \/                                  \/     
     */

    /*
     __   _____  _   _  __ _  __ _  ___ 
     \ \ / / _ \| | | |/ _` |/ _` |/ _ \
     \ V / (_) | |_| | (_| | (_| |  __/
     \_/ \___/ \__, |\__,_|\__, |\___|
     __/ |       __/ |     
     |___/       |___/
     
     */

    app.controller('voyageCtrl', function($rootScope, $scope, $state, voyageSrv, personSrv, camionSrv, $mdDialog, $mdMedia) {

        $rootScope.app = {};
        $rootScope.app.path = " VOYAGE ::::: Liste des voyages";
        $rootScope.app.monai = "CFA";


        $scope.camion = function() {
            $state.go('camion');
        };
        $scope.voyage = function() {
            $state.go('voyage');
        };
        $scope.person = function() {
            $state.go('person');
        };

        function getAllV() {
            $scope.postVoyage = voyageSrv.query();
        }
        ;
        getAllV();

        //recuperation des donnees des chaufeur 
        //formulaire de voyage reuperer les information des chauffeurs 
        function getAll() {
            $scope.formulaireVoyage = personSrv.query();
        }
        ;
        getAll(); //execution de la fonction en meme tems 

        //fonction de recuperation des donees des camions 
        function getAllC() {
            $scope.formulaireCamion = camionSrv.query();
        }
        ;
        getAllC();


        //editer voyage enregistrer
        $scope.editVoyage = function(data) {
            $rootScope.app.path = " VOYAGE ::::: Mise a jour /Modifier";
            voyage = data;

            $state.go('voyageForm');
        };



        //supprimer un voyage 
        $scope.removeVoyage = function(id,ev) {

            var confirm = $mdDialog.confirm()
                    .title('voullez vous supprimer ce Voyage ?')
                    .textContent('La suppression est definitive.')
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .ok('oK supprimer')
                    .cancel('Non ');
            //
            $mdDialog.show(confirm).then(function() {
                //then success 

                //function delected wtih ressource deleted voyage by id 
                voyageSrv.delete({id: id}, function() {
                    getAllV();

                });


            },
                    //then error 
                            function() {
                                //reload voyage
                                //getAllV();

                            }
                    );



                };





        //ajouter un voyage 
        $scope.newVoyage = function() {
            $rootScope.app.path = " VOYAGE ::::: Nouveau/Ajouter";
            voyage = {};
            $state.go('voyageForm');
        };

        //retour au voyage 
        $scope.backVoyage = function() {
            getAllV();
            $state.go('voyage');

        };



    });



    app.controller('voyageEtatCtrl', function($rootScope, $scope, $state, voyageSrv, personSrv, camionSrv, $mdDialog, $mdMedia) {

        $rootScope.app = {};
        $rootScope.app.path = " VOYAGE ::::: Etat des voyages";
        $rootScope.app.monai = "CFA";


        $scope.camion = function() {
            $state.go('camion');
        };
        $scope.voyage = function() {
            $state.go('voyage');
        };
        $scope.person = function() {
            $state.go('person');
        };

        function getAllV() {
            $scope.postVoyage = voyageSrv.query();
        }
        ;
        getAllV();


        //supprimer un voyage 
        $scope.search = function() {

            var confirm = $mdDialog.confirm()
                    .title('voullez vous supprimer ce Voyage ?')
                    .textContent('La suppression est definitive.')
                    .ariaLabel('Lucky day')
                  //  .targetEvent(ev)
                    .ok('oK supprimer')
                    .cancel('Non ');

            $mdDialog.show(confirm).then(function() {

                //function delected wtih ressource deleted voyage by id 
                voyageSrv.delete({id: id}, function() {
                    getAllV();

                });


            },
                    function() {


                    }
            );



        };

        //ajouter un voyage 
        $scope.newVoyage = function() {
            $rootScope.app.path = " VOYAGE ::::: Nouveau/Ajouter";
            voyage = {};
            $state.go('voyageForm');
        };

        //retour au voyage 
        $scope.backVoyage = function() {
            getAllV();
            $state.go('voyage');

        };



    });

    /*
     __                .__  .__                 
     ____  ____   _____/  |________  ____ |  | |  |   ___________  
     _/ ___\/  _ \ /    \   __\_  __ \/  _ \|  | |  | _/ __ \_  __ \ 
     \  \__(  <_> )   |  \  |  |  | \(  <_> )  |_|  |_\  ___/|  | \/    
     \___  >____/|___|  /__|  |__|   \____/|____/____/\___  >__|    
     \/           \/                                  \/     
     */


    app.controller('voyageFormCtrl', function($scope, $state, voyageSrv, personSrv, camionSrv, $mdpDatePicker, $mdpTimePicker, $mdDialog) {

        $scope.postVoyage = voyage;

        $scope.listeChauffeur = personSrv.query();
        $scope.listeCamion = camionSrv.query();

        $scope.backVoyage = function() {
            getAllV();
            $state.go('voyage');

        };




        this.showDatePicker = function(ev) {
            $mdpDatePicker($scope.postVoyage.date_dep_voy, {
                targetEvent: ev
            }).then(function(selectedDate) {
                $scope.postVoyage.date_dep_voy = selectedDate;
            });
            ;
        };

        this.showDatePicker = function(ev) {
            $mdpDatePicker($scope.postVoyage.date_arr_voy, {
                targetEvent: ev
            }).then(function(selectedDate) {
                $scope.postVoyage.date_arr_voy = selectedDate;
            });
            ;
        };



        $scope.openFromLeft = function() {
            $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Opening from the left')
                    .textContent('Closing to the right!')
                    .ariaLabel('Left to right demo')
                    .ok('Nice!')
                    .openFrom('#left')
                    .closeTo(angular.element(document.querySelector('#right')))
                    );
        };

        $scope.saveVoyage = function() {



            if ($scope.postVoyage.id_voy === undefined) {



                voyageSrv.save($scope.postVoyage, function() {
                    $scope.postVoyage = '';


                    //alert('Sauvegarde reussi ');
                    $mdDialog.show(
                            $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Statu ')
                            .textContent('Enregistrement effectue!')
                            .ariaLabel('Left to right demo')
                            .ok('ok !')
                            // You can specify either sting with query selector
                            .openFrom('#left')
                            // or an element
                            .closeTo(angular.element(document.querySelector('#right')))
                            );



                    $state.go('voyage');
                });
            }
            else {



                voyageSrv.update($scope.postVoyage, function() {
                    // alert('Mise a jour reussi ');

                    $mdDialog.show(
                            $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Mise a  jour')
                            .textContent('Enregistrement effectue!')
                            .ariaLabel('Left to right demo')
                            .ok('ok !')
                            // You can specify either sting with query selector
                            .openFrom('#left')
                            // or an element
                            .closeTo(angular.element(document.querySelector('#right')))
                            );


                    $state.go('voyage');


                });

            }
        };

        $scope.backVoyage = function() {
            $state.go('voyage');
        };

    });




    /*
     __                .__  .__                 
     ____  ____   _____/  |________  ____ |  | |  |   ___________  
     _/ ___\/  _ \ /    \   __\_  __ \/  _ \|  | |  | _/ __ \_  __ \ 
     \  \__(  <_> )   |  \  |  |  | \(  <_> )  |_|  |_\  ___/|  | \/    
     \___  >____/|___|  /__|  |__|   \____/|____/____/\___  >__|    
     \/           \/                                  \/     
     */
    /*
     _   _             
     | | (_)            
     _ __ ___ _ __   __ _ _ __ __ _| |_ _  ___  _ __  
     | '__/ _ \ '_ \ / _` | '__/ _` | __| |/ _ \| '_ \ 
     | | |  __/ |_) | (_| | | | (_| | |_| | (_) | | | |
     |_|  \___| .__/ \__,_|_|  \__,_|\__|_|\___/|_| |_|
     | |                                      
     |_| 
     */
    app.controller('reparationCtrl', function($rootScope, $scope, $state, voyageSrv, personSrv, camionSrv, reparationSrv, $mdDialog, $mdMedia) {
        $rootScope.app = {};
        $rootScope.app.path = " REPARATION ::::: Liste des reparations";
        function getAllR() {
            $scope.postReparation = reparationSrv.query();
        }
        ;

        getAllR();

        $scope.addReparation = function() {
            $rootScope.app.path = " REPARATION ::::: Nouveau/Ajouter";
            reparation = {};
            $state.go('reparationForm');

        };


        //editer
        $scope.editReparation = function(data) {
            $rootScope.app.path = " REPARATION ::::: Mise a jour /Modifier";
            reparation = data;

            $state.go('reparationForm');
        };




        $scope.removeReparation = function(id, ev) {
            var confirm = $mdDialog.confirm()
                    .title('voullez vous supprimer ce Voyage ?')
                    .textContent('La suppression est definitive.')
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .ok('oK supprimer')
                    .cancel('Non ');
            //
            $mdDialog.show(confirm).then(function() {
                //then success 

                //function delected wtih ressource deleted by id 
                reparationSrv.delete({id: id}, function() {
                    getAllR();

                });


            },
                    //then error 
                            function() {
                                //reload 
                                //getAllR();

                            }
                    );











                };

    });


    /*
     __                .__  .__                 
     ____  ____   _____/  |________  ____ |  | |  |   ___________  
     _/ ___\/  _ \ /    \   __\_  __ \/  _ \|  | |  | _/ __ \_  __ \ 
     \  \__(  <_> )   |  \  |  |  | \(  <_> )  |_|  |_\  ___/|  | \/    
     \___  >____/|___|  /__|  |__|   \____/|____/____/\___  >__|    
     \/           \/                                  \/     
     */

    app.controller('reparationFormCtrl', function($scope, $state, voyageSrv, personSrv, camionSrv, reparationSrv, $mdDialog) {

        $scope.backReparation = function() {
            $state.go('reparation');
        };

        $scope.postReparation = reparation;

        $scope.listeCamion = camionSrv.query();

        $scope.saveReparation = function() {
            if ($scope.postReparation.id_rep === undefined) {



                reparationSrv.save($scope.postReparation, function() {
                    $scope.postReparation = '';
                    //alert('Sauvegarde reussi ');
                    $mdDialog.show(
                            $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Statu ')
                            .textContent('Enregistrement effectue!')
                            .ariaLabel('Left to right demo')
                            .ok('ok !')
                            // You can specify either sting with query selector
                            .openFrom('#left')
                            // or an element
                            .closeTo(angular.element(document.querySelector('#right')))
                            );

                    $state.go('reparation');
                });
            }
            else {



                reparationSrv.update($scope.postReparation, function() {
                    //alert('Mise a jour reussi ');

                    $mdDialog.show(
                            $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Mise a  jour')
                            .textContent('Enregistrement effectue!')
                            .ariaLabel('Left to right demo')
                            .ok('ok !')
                            // You can specify either sting with query selector
                            .openFrom('#left')
                            // or an element
                            .closeTo(angular.element(document.querySelector('#right')))
                            );

                    $state.go('reparation');
                });

            }
        };


        /*
         __                .__  .__                 
         ____  ____   _____/  |________  ____ |  | |  |   ___________  
         _/ ___\/  _ \ /    \   __\_  __ \/  _ \|  | |  | _/ __ \_  __ \ 
         \  \__(  <_> )   |  \  |  |  | \(  <_> )  |_|  |_\  ___/|  | \/    
         \___  >____/|___|  /__|  |__|   \____/|____/____/\___  >__|    
         \/           \/                                  \/     
         */

        app.controller('acceuilCtrl', function($scope, $state, voyageSrv, personSrv, camionSrv, reparationSrv) {

            $scope.camionView = function() {
                $state.go('camion');
            };
            $scope.voyageView = function() {
                $state.go('voyage');
            };
            $scope.reparationView = function() {
                $state.go('reparation');
            };
            $scope.chauffeurView = function() {
                $state.go('person');
            };

        });






    });











})();