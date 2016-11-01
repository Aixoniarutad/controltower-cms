tower.controller('mediaController', function ($scope, $mdDialog, Application, Media, MediaService){
    $scope.Application = Application;
    $scope.Media = Media;

    $scope.uploadMedia = function(files, errFiles){
        if(errFiles[0]) return $scope.Toast(errFiles[0].$error, 'error');
        $scope.fileQueueCompleted = 0;
        $scope.fileQueue = files;
        $scope.errFiles = errFiles;
        angular.forEach(files, function(file){
            MediaService.upload(file, function(response){
                if(response.error){
                    file.status = 0;
                    return $scope.Toast(response.error, 'error');
                }
                file.status = 1;
                $scope.fileQueueCompleted++;
                $scope.Media.push(response.media);
                $scope.selected = [];
                return;
            });
        });
    };
    $scope.updateMedia = function(file){
        MediaService.update(file, function(response){
            if(response.error)
                return $scope.Toast(response.error, 'error');
            $scope.selected = [];
            return $scope.Toast('File saved.');
        });
    };
    $scope.deleteMedia = function(ev, files){
        $mdDialog.show($mdDialog.confirm()
        .title('Delete this image?')
        .textContent('This action cannot be undone.')
        .ok('Delete')
        .cancel('Go Back')
        .clickOutsideToClose(true))
        .then(function(){
            MediaService.delete(files, function(response){
                if(response.error)
                    return $scope.Toast(response.error, 'error');
                $scope.Media = response.media;
                $scope.selected = [];
                return $scope.Toast('Images deleted.');
            });
        });
    };

    // Data Table
    $scope.selected = [];
    $scope.limitOptions = [5, 10, 15];
    $scope.options = {
        rowSelection: true,
        multiSelect: true,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: true
    };
    $scope.query = {
        order: 'size',
        limit: 5,
        page: 1
    };
    $scope.reloadImages = function(){
        MediaService.query(function(media){
            $scope.Media = media;
        });
    };
});