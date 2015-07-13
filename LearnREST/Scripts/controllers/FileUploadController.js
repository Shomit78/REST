myApp.controller('FileUploadController', ['$scope', '$location', 'SharePointService', '$routeParams', function ($scope, $location, SharePointService, $routeParams) {
    SP.SOD.executeOrDelayUntilScriptLoaded(OnLoad, "SP.js");
    function OnLoad() {

        var imgElem;

        $scope.uploadFile = function () {
            imgElem = document.getElementById('rest-image');
            $scope.getBase64Image(imgElem);
        };

        $scope.drawCanvas = function () {
            imgElem = document.getElementById('rest-image');
            var canvas = document.getElementById("rest-canvas");
            canvas.width = imgElem.clientWidth;
            canvas.height = imgElem.clientHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(imgElem, 0, 0);
        };

        $scope.getBase64Image = function (imgElem) {
            var canvas = document.getElementById("rest-canvas");
            var dataURL = canvas.toDataURL("image/png");
            dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
            //var theData = JSON.stringify(dataURL);
            SharePointService.addFileToFolder(dataURL, "/sites/rest/Shared%20Documents",
                "test.png", $scope.onSuccess, $scope.onFailure);
        };

        $scope.onSuccess = function (jsonObject) {
            console.log("on success");
        };

        $scope.onFailure = function (jsonObject) {
            console.error("on failure");
        };

    }
}]);