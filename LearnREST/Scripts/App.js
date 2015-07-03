'use strict';

//Create an AngularJS application - ng-app reference in /Pages/default.aspx
var myApp = angular.module('myApp', ['ui.bootstrap', 'ngSanitize', 'ngRoute', 'ngResource']);

//2 variables to store the SharePoint host web url and the application web url - used for REST/OData queries
//Application Manifest uses the query string to pass these values
var hostweburl;
var appweburl;