myApp.controller('ListsController', ['$scope', '$location', 'SharePointService', function ($scope, $location, SharePointService) {
    SP.SOD.executeOrDelayUntilScriptLoaded(OnLoad, "SP.js");
    function OnLoad() {
        $scope.initialised = "Controller initialised";

        $scope.goTo = function (path) {
            $location.path(path);
        }

        $scope.lists = [];

        $.when(SharePointService.GetLists($scope))
        .done(function (jsonObject) {
            angular.forEach(jsonObject.d.results, function (list) {
                $scope.lists.push({
                    id: list.Id,
                    title: list.Title,
                    description: list.Description,
                    hidden: list.Hidden,
                    items: list.ItemCount
                });
                //$scope is not updating so force with this command
                if (!$scope.$$phase) { $scope.$apply(); }
            });
        })
        .fail(function (err) {
            console.error(JSON.stringify(err));
        });
    }
}]);