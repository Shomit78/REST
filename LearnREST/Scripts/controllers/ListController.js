myApp.controller('ListController', ['$scope', '$location', 'SharePointService', '$routeParams', function ($scope, $location, SharePointService, $routeParams) {
    SP.SOD.executeOrDelayUntilScriptLoaded(OnLoad, "SP.js");
    function OnLoad() {

        $scope.listId = $routeParams.ID;
        $scope.contentTypes = [];
        $scope.fields = [];

        $scope.goTo = function (path) {
            $location.path(path);
        };

        $.when(SharePointService.GetListById($scope, $scope.listId))
        .done(function (jsonObject) {
            angular.forEach(jsonObject, function(list) {
                $scope.title = list.Title;
                $.when(SharePointService.GetListByIdWithCollection($scope, $scope.listId, 'ContentTypes'))
                .done(function (jsonObject) {
                    angular.forEach(jsonObject.d.results, function (contentType) {
                        $scope.contentTypes.push({
                            id: contentType.StringId,
                            description: contentType.Description,
                            name: contentType.Name
                        });
                    });
                    //$scope is not updating so force with this command
                    if (!$scope.$$phase) { $scope.$apply(); }
                })
                .fail(function (err) {
                    console.error(JSON.stringify(err));
                });
                $.when(SharePointService.GetListByIdWithCollection($scope, $scope.listId, 'Fields'))
                .done(function (jsonObject) {
                    angular.forEach(jsonObject.d.results, function (field) {
                        $scope.fields.push({
                            id: field.Id,
                            internalName: field.InternalName,
                            title: field.Title,
                            type: field.TypeAsString
                        });
                    });
                    //$scope is not updating so force with this command
                    if (!$scope.$$phase) { $scope.$apply(); }
                })
                .fail(function (err) {
                    console.error(JSON.stringify(err));
                });
            });
            //$scope is not updating so force with this command
            if (!$scope.$$phase) { $scope.$apply(); }
        })
        .fail(function (err) {
            console.error(JSON.stringify(err));
        });

        $scope.createFolder = function () {
            var metadata = { 'ServerRelativeUrl': '/sites/rest/shared documents/test' }
            SharePointService.createFolder2('Documents', metadata, $scope.successOnCreate, $scope.failureOnCreate);
        };

        $scope.successOnCreate = function (jsonObject) {
            console.info("success");
        }

        $scope.failureOnCreate = function (jsonObject) {
            console.error("failure");
        }
    }
}]);