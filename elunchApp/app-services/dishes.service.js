(function () {
    'use strict';

    angular
        .module('app')
        .factory('DishesService', DishesService);

    DishesService.$inject = ['$http', 'SessionService'];
    function DishesService($http, SessionService) {
        var service = {};
        var base_url = 'http://113.160.225.76:8989/elunch/';

        service.GetDishes = GetDishes;
        service.GetVoteForDishes = GetVoteForDishes;
        service.voteForDishes = voteForDishes;
        return service;

        function GetDishes() {
            return $http.get(base_url + 'dishes/').then(handleSuccess, handleError);
        }

        function GetVoteForDishes(user_id) {
            return $http.get(base_url + 'user/'+ user_id + '/vote_dishes').then(handleSuccess, handleError);
        }

        function voteForDishes(data) {
            return $http({
                method: 'POST',
                url: base_url + 'vote',
                data : data,
                headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
            }).then( handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            console.log("response: " + res);
            return res.data;
        }

        function handleError(res) {
            SessionService.expiredSession(res);
        }
    }

})();
