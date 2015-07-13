myApp.service('SharePointService', function ($q, $http) {

    this.GetLists = function ($scope) {
        var deferred = $.Deferred();
        JSRequest.EnsureSetup();
        appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);
        hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
        var restQueryUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists?@target='" + hostweburl + "'";
        var executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: restQueryUrl,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data, textStatus, xhr) {
                deferred.resolve(JSON.parse(data.body));
            },
            error: function (xhr, textStatus, errorThrown) {
                deferred.reject(JSON.stringify(xhr));
            }
        });
        return deferred;
    };

    this.GetListById = function ($scope, listId) {
        var deferred = $.Deferred();
        JSRequest.EnsureSetup();
        appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);
        hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
        var restQueryUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists(guid'" + listId + "')?@target='" + hostweburl + "'";
        var executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: restQueryUrl,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data, textStatus, xhr) {
                deferred.resolve(JSON.parse(data.body));
            },
            error: function (xhr, textStatus, errorThrown) {
                deferred.reject(JSON.stringify(xhr));
            }
        });
        return deferred;
    };

    this.GetListByIdWithCollection = function ($scope, listId, collection) {
        var deferred = $.Deferred();
        JSRequest.EnsureSetup();
        appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);
        hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
        var restQueryUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists(guid'" + listId + "')/" + collection + "?@target='" + hostweburl + "'";
        var executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: restQueryUrl,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data, textStatus, xhr) {
                deferred.resolve(JSON.parse(data.body));
            },
            error: function (xhr, textStatus, errorThrown) {
                deferred.reject(JSON.stringify(xhr));
            }
        });
        return deferred;
    };

    this.createFolder = function (listName, metadata, success, failure) {

        JSRequest.EnsureSetup();
        hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
        appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);
        var restQueryUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/folders?@target='" + hostweburl + "'";

        var item = $.extend({
            "__metadata": { "type": "SP.Folder" }
        }, metadata);

        $.ajax({
            url: restQueryUrl,
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(item),
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                success(data);
            },
            error: function (data) {
                failure(data);
            }
        });

    }

    this.addFileToFolder = function addFileToFolder(arrayBuffer, folderUrl, fileName, success, failure) {

        JSRequest.EnsureSetup();
        hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
        appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);

        var deCoded = atob(arrayBuffer);

        var fileCollectionEndpoint = appweburl + "/_api/SP.AppContextSite(@target)/web/getfolderbyserverrelativeurl('" + folderUrl + "')/files" +
            "/add(overwrite=true, url='" + fileName + "')?$expand=ListItemAllFields&@target='" + hostweburl + "'";

        $.ajax({
            url: fileCollectionEndpoint,
            type: "POST",
            data: deCoded,
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-length": deCoded.byteLength
            },
            success: function (data) {
                success(data);
            },
            error: function (data) {
                failure(data);
            }
        });
    };

});