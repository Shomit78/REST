myApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', { templateUrl: 'index.html', controller: 'IndexController' })
    .when('/Lists', { templateUrl: 'Lists/GetLists.html', controller: 'ListsController' })
    .when('/Lists/:ID', { templateUrl: 'Lists/List.html', controller: 'ListController' })
    .when('/Upload', { templateUrl: 'FileUpload.html', controller: 'FileUploadController' })
    .otherwise({ redirectTo: '/' });
});