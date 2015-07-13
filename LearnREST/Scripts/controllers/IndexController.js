myApp.controller('IndexController', ['$scope', '$location', function ($scope, $location) {
    SP.SOD.executeOrDelayUntilScriptLoaded(OnLoad, "SP.js");
    function OnLoad() {
        $scope.initialised = "Controller initialised";

        $scope.goTo = function (path) {
            $location.path(path);
        }
    }
}]);