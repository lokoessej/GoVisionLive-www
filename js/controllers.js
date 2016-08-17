angular.module('app.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, $state, $log) {

    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    $scope.user = null;

    $scope.currentMedia = null;

    $scope.openCamera = function(){
      CoolPlugin.showToast("Open Camera JS click called");
      $state.go('app.camera');
      $scope.hasTabs(false);
    };
    if (!auth.currentUser) {
        $state.go('app.login');
    }
    $scope.goProfile = function(){
      $state.go('app.profile');
      $scope.hasTabs(false);
    }
    $scope.goActivity = function(){
      $state.go('app.activity');
      $scope.hasTabs(true);

    }
    $scope.goMediaAct = function(id){
        console.log('gomediaact', id);
        $state.go('app.editmedia', { id: id });
    }
    $scope.goNewMediaAct = function(){
        $state.go('app.newmedia');
    }
    $scope.goNewAlbumAct = function(){
        console.log('goNewalbumact');
        $state.go('app.newalbum');
    }
    $scope.goEditAlbumAct = function(id){
        console.log('goEditAlbum', id);
        $state.go('app.editalbum', {id: id});
    }
    $scope.goAlbumAct = function(id){
        console.log('goAlbum', id);
        $state.go('app.album', {id: id});
    }
    $scope.goGalleryAct = function(id){
        console.log('gogallery', id);
        $state.go('app.gallery', {id: id});
    }
    $scope.hasTabs = function(bool){
      if(bool){
        document.getElementsByTagName('ion-tabs')[0].style.display = 'block';
      }else{
        document.getElementsByTagName('ion-tabs')[0].style.display = 'none';

      }
    }
    auth.onAuthStateChanged(function(user) {
      $scope.user = user;
      // $state.go('app.activity');
    }, function(error) {
          // OnAuth error.
          $state.go('app.login');

          console.log(error);
    });
    // var navIcons = document.getElementsByClassName('ion-navicon');
    // for (var i = 0; i < navIcons.length; i++) {
    //     navIcons.addEventListener('click', function() {
    //         this.classList.toggle('active');
    //     });
    // }
    // $scope.sayHello = function() {
    //     var name = 'Ty';
    //     exec(sayHelloSuccess, sayHelloFailure, "SayHelloPlugin", "sayHello", [name]);
    // }
    // function sayHelloSuccess(data){
    //     WL.SimpleDialog.show(
    //         "Response from plug-in", data,
    //   [{text: "OK", handler: function() {WL.Logger.debug("Ok button pressed");}}]
    //     );
    // }
    //
    // function sayHelloFailure(data){
    //     WL.SimpleDialog.show(
    //   "Response from plug-in", data,
    //   [{text: "OK", handler: function() {WL.Logger.debug("Ok button pressed");}}]
    //     );
    // }
    // $scope.sayHello();
    $scope.logOut = function() {
      auth.signOut();
      $state.go('app.login');
    }


    auth.onAuthStateChanged(function(user) {
                  console.log(user);


        // User is logged in. Assign vars.
        email = user.email;
        uid = user.uid;

                console.log("email", email);
                console.log("uid", uid);



            refMedia = db.ref("Media/"+uid);
                console.log("refMedia", refMedia);

            // Get Media.
            refMedia.orderByChild('dateCreated').on('value', function(snap){
                myMedia = snap.val();
                console.log("myMedia", myMedia);
                $scope.myMedia = myMedia;
                // Assign Album reference.
                refAlbums = db.ref("Album/"+uid);
                // Get Albums.
                refAlbums.on('value', function(snap){
                    myAlbums = snap.val();
                    console.log("myAlbums", myAlbums);
                    $scope.myAlbums = myAlbums;

                    var mediaIds = [];
                    for (var keyMedia in myMedia) {
                        var media = myMedia[keyMedia];
                        if (!media.albumIds){
                            mediaIds.unshift(keyMedia);
                        }
                    }
                    myHome = myAlbums;
                    myHome[0] = {
                        'name': 'Recent Media',
                        'description': 'Your recent media which has not been included in an album.',
                        'mediaIds': mediaIds
                    };
                    $scope.myHome = myHome;
                    console.log('myHome', myHome);

                    // Assign Cloud reference.
                    refCloud = db.ref("Cloud/"+uid);
                    refCloud.on('value', function(snap){
                        myCloud = snap.val();
                        // User doesn't have Cloud - set to default.
                        if (!myCloud){
                            myCloud = {
                                'planId': 0,
                                'planName': "Free",
                                'storageRemaining': 1e10,
                                'storageTotal': 1e10,
                                'storageUsed': 0,
                                'token': null
                            };
                        }
                        console.log("myCloud", myCloud);
                        $scope.myCloud = myCloud;
                    });
                });
            });


        }, function(error) {

          console.log(error);
      });
    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    $scope.hideHeader();

    $scope.prettyBytes = function (bytes){
        bytes = parseInt(bytes);
        if (bytes>=1e9)
            bytes = (bytes/1e9).toFixed(2)+' GB';
        else if (bytes>=1e6)
            bytes = (bytes/1e6).toFixed(2)+' MB';
        else if (bytes>=1e3)
            bytes = (bytes/1e3).toFixed(2)+' KB';
        else if (bytes>1)
            bytes = bytes+' B';
        else
            bytes = bytes+' B';
        return bytes;
    }
})

.controller('LoginCtrl', function($scope, $timeout, $state, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.hideHeader();
    $scope.$parent.hasTabs(false);
    $scope.loginEmail = function() {
        // here use signInWithEmailAndPassword with the form's input values
    };

    $scope.loginJesse = function() {
        auth.signInWithEmailAndPassword('jesse@type2designs.com', 'kil0ows').then(function(data){
            $state.go('app.activity');
        }, function (err){
            console.error(err);
        });
    };

    $scope.loginGoogle = function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        auth.signInWithRedirect(provider).then(function(result) {
          $state.go('app.activity');
        }, function(error) {
          console.error(error);
        });
    };

    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();
    ionicMaterialInk.displayEffect();
})

.controller('CloudCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
  $scope.$parent.hasTabs(true);

    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);

    // Set Header
    // $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(false);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {


    // Set Header
    $timeout(function() {
        $scope.$parent.hideHeader();
          // $scope.$parent.hasTabs(true);
    }, 0);
    $scope.$parent.clearFabs();


    // $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    // $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    // $scope.userP = $scope.$parent.user;
    // var auth = firebase.auth();
    // var storage = firebase.storage().ref();
    // var db = firebase.database();
    // var email, uid, token;
    // var refMedia, refCloud, refAlbums;
    // var myMedia, myAlbums, myCloud, myRecentMedia;

    // $scope.userMedia = Array();
// Add Media to view.
// $scope.addMedia = function (id, mediaToAdd){
//     console.log("addMedia", mediaToAdd);
//     $scope.userMedia.push(mediaToAdd);

// };
    $scope.checkValue = function(value){
        if(value.type == 'video/mp4'){
            return true;
        }else{false}
    };
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000,
            selector: '.card'
        });
    }, 700);
    $scope.triggerAnimate = function(){
      ionicMaterialMotion.fadeSlideInRight({
          startVelocity: 3000,
          selector: '.card'
      });
    }
    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

    $scope.isVideo = function(value){
        if(value.type == 'video/mp4'){
            return true;
        }else{false}
    };

$scope.$parent.hasTabs(true);
  $timeout(function() {
      $scope.$parent.hideHeader();
        $scope.$parent.hasTabs(true);
  }, 0);
  // $scope.$parent.clearFabs();

  $scope.getAlbumSize = function(){
    var size = 0;
    var media;
    for (media in myMedia){
      size+=media.size+"";
    }
    console.log('return'+size);
    return size;
  }

  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);
  $scope.isVideo = function(value){
    if(value.type == 'video/mp4'){
        return true;
    }else{
      return false;
    }
  }
      // Set Ink
      ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
  // $scope.$parent.hasTabs(true);

  $scope.albumId = 0;
  $scope.album = myAlbums[0];

    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.isVideo = function(value){
      if(value.type == 'video/mp4'){
          return true;
      }else{
        return false;
      }
    }
    $scope.isNotVideo = function(value){
      return !$scope.isVideo(value);
    }
    $scope.getAlbumSize = function(){
      var size = 0;
      for (media in myMedia){
        size+=media.size;
      }
      return size;
    }
    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: ''
    });

})


.controller('CameraCtrl', function($scope,$timeout,$state, $sce) {
  // $scope.$parent.hasTabs(false);
  $timeout(function() {
      // $scope.$parent.hasTabs(false);
  }, 0);
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
}
  // document.getElementsByTagName('ion-tabs')[0].style.display = 'none';
  // $scope.openCamera = function(){
  //
  //   CoolPlugin.showToast("Open Camera JS click called");
  //
  // };
})

.controller('albumCtrl', function($scope,$timeout,$stateParams,$state, ionicMaterialMotion, ionicMaterialInk, $sce) {
  $scope.$parent.hasTabs(true);


  $scope.isVideo = function(value){
    if(value.type == 'video/mp4'){
        return true;
    }else{
      return false;
    }
  }



  console.log("albumctrl is called!");
  var id = $stateParams.id;
  $scope.albumId = id;
  $scope.$parent.hasTabs(false);
  console.log('params', $scope.albumId);
  $scope.album = myAlbums[$scope.albumId];

        // Set Ink
        ionicMaterialInk.displayEffect();

  // $scope.saveMedia = function() {
  //     var id = $scope.mediaId;
  //     var name =  $('#EditMediaName').val();
  //     // Null names defaults to Untitled
  //     if (name == '') name = "Untitled";
  //     var desc = $('#EditMediaDescription').val();
  //     var albumIds;
  //     if ($('#EditMediaAlbumArray').val()){
  //         albumIds = JSON.parse($('#EditMediaAlbumArray').val());
  //     } else {
  //         albumIds = [];
  //     }
  //     // Is the image hosted on the cloud?
  //     // var clouded = urlCloud != '';
  //     // if (urlLocal == ''){
  //     //     alert("A file must be provided!");
  //     //     return;
  //     // }
  //     var dateNow = new Date().toJSON();
  //     var newMediaData = {
  //         'name': name,
  //         'clouded': true,
  //         'albumIds': albumIds,
  //         'description': desc,
  //         'dateModified': dateNow
  //     };
  //     console.log("newMediaData", newMediaData);
  //     var editMediaRef = db.ref("Media/"+uid+"/"+id);
  //     var editedMedia = editMediaRef.update(newMediaData);
  //     console.log("editMedia", editedMedia);
  //     if (albumIds){
  //         console.log("shouldUpdateAlbums", albumIds);
  //         for (var key in albumIds){
  //             // Get the albumId
  //             var albumId = albumIds[key];
  //             var refThisAlbum = db.ref("Album/"+uid+"/"+albumId);
  //             var mediaIds = [];
  //             refThisAlbum.once('value', function(snap) {
  //                 var album = snap.val();
  //                 if (album.mediaIds){
  //                     mediaIds = album.mediaIds;
  //                     mediaIds.unshift(id);
  //                 } else {
  //                     mediaIds = [id];
  //                 }
  //                 console.log("albumSaved", albumId);
  //                 refThisAlbum.update({'mediaIds': mediaIds});
  //             });
  //         }
  //     }
  //     $state.go('app.activity');
  // }
  //
  // $scope.deleteMedia = function() {
  //     var id = $scope.mediaId;
  //     var deleteMediaRef = db.ref("Media/"+uid+"/"+id);
  //     var deletedMedia = deleteMediaRef.remove();
  //     $state.go('app.activity');
  //     console.log("deletedMedia", deletedMedia);
  // }







})

.controller('cloudCtrl', function($scope,$timeout) {
  $scope.$parent.hasTabs(false);

})
.controller('loginCtrl', function($scope,$timeout) {
  $scope.$parent.hasTabs(false);

})

.controller('signupCtrl', function($scope,$timeout) {
  $scope.$parent.hasTabs(false);

})
.controller('StorageCtrl', function($scope,$timeout) {
    $scope.$parent.hasTabs(false);

})
.controller('EditMediaCtrl', function($scope, $stateParams, $state) {
    console.log("EditMediaCtrl is called!");
    var id = $stateParams.id;
    $scope.mediaId = id;
    // $scope.$parent.hasTabs(false);
    console.log('params', $scope.mediaId);
    $scope.media = myMedia[$scope.mediaId];

    console.log('scope.media', $scope.media);

    $scope.mediaName = $scope.media.name;
    $scope.mediaSize = $scope.$parent.prettyBytes($scope.media.size);

    $scope.go3d = function(){
        $state.go('app.3dvision', {url: encodeURIComponent($scope.media.urlCloud)});
    }

    // $scope.albumChange = function() {
    //     console.log('AlbumChange');
    //     var albumId = $('#MediaEditAlbum').val();
    //     console.log('Album', albumId);
    //     var albumArray;
    //     if (albumId == "0"){
    //         albumArray = '';
    //     } else {
    //         albumArray = "[\""+albumId+"\"]";
    //     }
    //     $('#EditMediaAlbumArray').val(albumArray);
    // }

    changeAlbum = function(){
        console.log('mediaName', $scope.mediaName);
        console.log('AlbumChange');
        var albumId = $('#EditMediaAlbum').val();
        console.log('Album', albumId);
        var albumArray;
        if (albumId == "0"){
            albumArray = '';
        } else {
            albumArray = "[\""+albumId+"\"]";
        }
        $('#EditMediaAlbumArray').val(albumArray);
    }
    document.getElementById('EditMediaAlbum').addEventListener('change', changeAlbum, false);

    // $ionicPopover.fromTemplateUrl('album-popover.html', {
    //     scope: $scope
    // }).then(function(popover) {
    //     $scope.popover = popover;
    // });
    // $scope.openPopover = function($event) {
    //     $scope.popover.show($event);
    // };
    // $scope.closePopover = function() {
    //     $scope.popover.hide();
    // };
    // // Perform Action on destroy
    // $scope.$on('$destroy', function() {
    //     $scope.popover.remove();
    // });
    // // Perform action on hide popover
    // $scope.$on('popover.hidden', function() {
    //     // Perform action
    // });
    // // Perform action on remove popover
    // $scope.$on('popover.removed', function() {
    //     // Perform action
    // });

    $scope.saveMedia = function() {
        var id = $scope.mediaId;
        var name =  $('#EditMediaName').val();
        // Null names defaults to Untitled
        if (name == '') name = "Untitled";
        var desc = $('#EditMediaDescription').val();
        var albumIds;
        if ($('#EditMediaAlbumArray').val()){
            albumIds = JSON.parse($('#EditMediaAlbumArray').val());
        } else {
            albumIds = [];
        }
        // Is the image hosted on the cloud?
        // var clouded = urlCloud != '';
        // if (urlLocal == ''){
        //     alert("A file must be provided!");
        //     return;
        // }
        var dateNow = new Date().toJSON();
        var newMediaData = {
            'name': name,
            'clouded': true,
            'albumIds': albumIds,
            'description': desc,
            'dateModified': dateNow
        };
        console.log("newMediaData", newMediaData);
        var editMediaRef = db.ref("Media/"+uid+"/"+id);
        var editedMedia = editMediaRef.update(newMediaData);
        console.log("editMedia", editedMedia);
        if (albumIds){
            console.log("shouldUpdateAlbums", albumIds);
            for (var key in albumIds){
                // Get the albumId
                var albumId = albumIds[key];
                var refThisAlbum = db.ref("Album/"+uid+"/"+albumId);
                var mediaIds = [];
                refThisAlbum.once('value', function(snap) {
                    var album = snap.val();
                    if (album.mediaIds){
                        mediaIds = album.mediaIds;
                        mediaIds.unshift(id);
                    } else {
                        mediaIds = [id];
                    }
                    console.log("albumSaved", albumId);
                    refThisAlbum.update({'mediaIds': mediaIds});
                });
            }
        }
        $state.go('app.activity');
    }

    $scope.deleteMedia = function() {
        var id = $scope.mediaId;
        var deleteMediaRef = db.ref("Media/"+uid+"/"+id);
        var deletedMedia = deleteMediaRef.remove();
        $state.go('app.activity');
        console.log("deletedMedia", deletedMedia);
    }

    $scope.favoriteMedia = function() {
        var id = $scope.mediaId;
        var favMediaRef = db.ref("Media/"+uid+"/"+id);
        var favedMedia = favMediaRef.update({'favorited': !$scope.media.favorited});
        console.log("favmed", favedMedia);
        $scope.media.favorited = !$scope.media.favorited;
    }

})
.controller('NewMediaCtrl', function($scope,$timeout,$state) {
    $scope.$parent.hasTabs(false);

    $state.thumbUri = "";

    $scope.pushMedia = function() {
        console.log('pushMedia Called!');
        var name =  $('#NewMediaName').val();
        if (name == '') name = "Untitled";
        var desc = $('#NewMediaDescription').val();
        //var urlLocal = $('#mediaNewUrlLocal').val();
        var urlLocal = "";
        var urlCloud = $('#NewMediaUrlCloud').val();
        var size = $('#NewMediaSize').val();
        var type = $('#NewMediaType').val();
        // LAZY WAY FOR NOW!!!!
        if (urlCloud == ''){
            alert("A file must be provided!");
            return;
        }
        var dateNow = new Date().toJSON();
        var newMediaData = {
            'name': name,
            'albumIds': [],
            'description': desc,
            'size': size,
            'clouded': false,
            'favorited': false,
            'type': type,
            'urlLocal': urlLocal,
            'urlCloud': urlCloud,
            'dateCreated': dateNow,
            'dateModified': dateNow
        };
        console.log("newMediaData", newMediaData);
        var newMedia = refMedia.push(newMediaData);
        console.log("newMedia", newMedia);
        $state.go('app.activity');
    }

    // // handle input changes
    // function handleFileSelect(evt) {
    //     evt.stopPropagation();
    //     evt.preventDefault();
    //     // Upload a file once it has been selected.
    //     var file = evt.target.files[0];
    //     var fileSize = file.size;
    //     var fileType = file.type;
    //     console.log(file);
    //     var metadata = {
    //         'contentType': fileType
    //     };
    //     var pathType = "images";
    //     // pathType can be 'images' or 'videos'
    //     if (fileType.indexOf('video') != -1){
    //         pathType = "videos";
    //     }
    //     // Throw random string in there because that's the cool thing to do.
    //     var randomString = Math.random().toString(36).substring(4,12);
    //     // Concat a path to upload at.
    //     var path = pathType + '/' +
    //         uid + '/' +
    //         randomString + '-' +
    //         file.name;
    //     // Begin uploading!
    //     var uploadTask = storage.child(path).put(file, metadata);
    //     uploadTask.on('state_changed', function(progress){
    //         // Called periodically when upload progresses.
    //         console.log("uploadChanged", progress);
    //         var percentComplete = parseInt((progress.b / progress.h)*100);
    //         console.log("percentComplete", percentComplete);
    //         $('#NewMediaProgress').html(percentComplete+"%");
    //     }, function(error) {
    //         console.error('Upload failed:', error);
    //     }, function() {
    //         // Upload completed.
    //         console.log('Uploaded', uploadTask.snapshot.totalBytes, 'bytes.');
    //         console.log(uploadTask.snapshot.metadata);
    //         var url = uploadTask.snapshot.metadata.downloadURLs[0];
    //         $('#NewMediaUrlCloud').val(url);
    //         $('#NewMediaType').val(fileType);
    //         $('#NewMediaSize').val(fileSize);
    //         $('#NewMediaProgress').html('');
    //     });
    // }
    // document.getElementById('NewMediaFile').addEventListener('change', handleFileSelect, false);

    $("#NewMediaFile").change(function() {
        var file = this.files[0];
        var fileSize = file.size;
        var fileType = file.type;
        console.log(file);
        // generate a new FileReader object
        var reader = new FileReader();
        // inject an image with the src url
        reader.onload = function(event) {
            var uri = event.target.result;
            $state.thumbUri = uri;
            var metadata = {
                'contentType': fileType
            };
            var pathType = "images";
            // pathType can be 'images' or 'videos'
            if (fileType.indexOf('video') != -1){
                pathType = "videos";
            }
            // Throw random string in there because that's the cool thing to do.
            var randomString = Math.random().toString(36).substring(4,12);
            // Concat a path to upload at.
            var path = pathType + '/' +
                uid + '/' +
                randomString + '-' +
                file.name;
            if (file.type.indexOf('video') !== -1){
                console.log('IsVideo');
                $('#NewMediaInfo').html('Creating video.');
                $('#NewMediaPreview').html("<video id=\"videoPreview\"><source src=\""+ uri + "\" type=\""+file.type+"\"></video><canvas id=\"previewCanvas\"></canvas>");
                document.getElementById('videoPreview');
                var video = document.getElementById('videoPreview');
                var canvas = document.getElementById('previewCanvas');
                $('#NewMediaInfo').html('Playing video.');
                video.play();
                video.muted = true;
                video.addEventListener('loadeddata', function() {
                    $('#NewMediaInfo').html('Video data loaded.');
                    this.currentTime = 0;
                    setTimeout(function(){
                        $('#NewMediaInfo').html('Drawing image.');
                        // get the canvas context for drawing
                		var context = canvas.getContext('2d');
                		// draw the video contents into the canvas x, y, width, height
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                		// get the image data from the canvas object
                        var dataURL = canvas.toDataURL();
                        $('#NewMediaInfo').html('Converting to uri.');
                		// set the source of the img tag
                        console.log('Got data url!');
                        $scope.thumbUri = dataURL;
                		$('#NewMediaPreview').html("<img src='" + dataURL + "' />");
                        $('#NewMediaInfo').html('Thumbnail done.');
                        video.pause();
                        // Begin uploading!
                        var uploadTask = storage.child(path).put(file, metadata);
                        uploadTask.on('state_changed', function(progress){
                            // Called periodically when upload progresses.
                            console.log("uploadChanged", progress);
                            var percentComplete = parseInt((progress.b / progress.h)*100);
                            console.log("percentComplete", percentComplete);
                            $('#NewMediaProgress').html(percentComplete+"%");
                        }, function(error) {
                            console.error('Upload failed:', error);
                        }, function() {
                            // Upload completed.
                            console.log('Uploaded', uploadTask.snapshot.totalBytes, 'bytes.');
                            console.log(uploadTask.snapshot.metadata);
                            var url = uploadTask.snapshot.metadata.downloadURLs[0];
                            $('#NewMediaUrlCloud').val(url);
                            $('#NewMediaType').val(fileType);
                            $('#NewMediaSize').val(fileSize);
                            $('#NewMediaProgress').html('');
                        });
                    }, 100);
                }, false);
            } else {
                console.log('IsImage');
                $('#NewMediaPreview').html("<img src='" + uri + "' />");
                // Begin uploading!
                var uploadTask = storage.child(path).put(file, metadata);
                uploadTask.on('state_changed', function(progress){
                    // Called periodically when upload progresses.
                    console.log("uploadChanged", progress);
                    var percentComplete = parseInt((progress.b / progress.h)*100);
                    console.log("percentComplete", percentComplete);
                    $('#NewMediaProgress').html(percentComplete+"%");
                }, function(error) {
                    console.error('Upload failed:', error);
                }, function() {
                    // Upload completed.
                    console.log('Uploaded', uploadTask.snapshot.totalBytes, 'bytes.');
                    console.log(uploadTask.snapshot.metadata);
                    var url = uploadTask.snapshot.metadata.downloadURLs[0];
                    $('#NewMediaUrlCloud').val(url);
                    $('#NewMediaType').val(fileType);
                    $('#NewMediaSize').val(fileSize);
                    $('#NewMediaProgress').html('');
                });
            }
        }
        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(file);
    });

    // function onSuccess(imageData) {
    //     var image = document.getElementById('NewMediaPreview');
    //     image.src = "data:image/jpeg;base64," + imageData;
    // }
    // function onFail(message) {
    //     alert('Failed because: ' + message);
    // }
    // $scope.pictureFromPhoneCamera = function(){
    //     var folder = false;
    //     var options = {
    //         quality: 90,
    //         destinationType: Camera.DestinationType.FILE_URI,
    //         sourceType: folder ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA
    //     };
    //     navigator.camera.getPicture(onSuccess, onFail, options);
    // }
    // $scope.pictureFromPhoneLibrary = function(){
    //     var folder = true;
    //     var options = {
    //         quality: 90,
    //         destinationType: Camera.DestinationType.FILE_URI,
    //         sourceType: folder ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA
    //     };
    //     navigator.camera.getPicture(onSuccess, onFail, options);
    // }


})
.controller('StereoVisionCtrl', function($scope, $stateParams, $state, $sce) {
          document.getElementsByClassName('hide-me')[0].style.display = 'none';
    console.log("StereoVisionCtrl is called!");
    var url = $sce.$stateParams.url;
    console.log('SVURL', url);
    //var iframeUrl = "/templates/elevr/index.html?video="+url;
    var iframeUrl = "/templates/3dvision.html?v="+url;
    //var iframeUrl = "http://player.elevr.com/?autoplay=1&video="+encodeURIComponent(url);
    console.log('IFRAMEURL', url);
    $('#iframe3dvision').prop('src', iframeUrl);
    $scope.$parent.hasTabs(false);
})
.controller('NewAlbumCtrl', function($scope, $stateParams, $state) {
    $scope.$parent.hasTabs(false);

    $scope.pushAlbum = function () {
        var name =  $('#NewAlbumName').val();
        if (name == '') name = "Untitled";
        var desc = $('#NewAlbumDescription').val();
        var dateNow = new Date().toJSON();
        var newAlbumData = {
            'name': name,
            'description': desc,
            'clouded': false,
            'favorited': false,
            'dateCreated': dateNow,
            'dateModified': dateNow
        };
        console.log("newAlbumData", newAlbumData);
        var newAlbum = refAlbums.push(newAlbumData);
        console.log("newAlbum", newAlbum);
        $state.go('app.activity');
    }

})
.controller('EditAlbumCtrl', function($scope, $stateParams, $state) {
    console.log('params', $stateParams)
    var id = $stateParams.id;
    $scope.albumId = id;
    console.log('id', id);
    console.log('myAlbums', myAlbums);
    $scope.album = myAlbums[id];
    console.log('album2', $scope.album);
    //$scope.$parent.hasTabs(false);


    $scope.updateAlbum = function() {
        var id = $scope.albumId;
        var name =  $('#EditAlbumName').val();
        // Null names defaults to Untitled
        if (name == '') name = "Untitled";
        var desc = $('#EditAlbumDescription').val();
        var dateNow = new Date().toJSON();
        var mediaIds;
        // if ($('#albumEditMedia').val() != ''){
        //     mediaIds = JSON.parse($('#albumEditMedia').val());
        // } else {
        //     mediaIds = '';
        // }
        var newAlbumData = {
            'name': name,
            'description': desc,
            /*'mediaIds': mediaIds,*/
        };
        console.log("newAlbumData", newAlbumData);
        var editAlbumRef = db.ref("Album/"+uid+"/"+id);
        var editedAlbum = editAlbumRef.update(newAlbumData);
        console.log("editedAlbum", editedAlbum);
        // Check if mediaIds has changed.
        var oldMediaIds = myAlbums[id].mediaIds;
        $state.go('app.album', {id: $scope.albumId});
        // if (mediaIds != oldMediaIds){
        //     // It has changed - change the albums to include this media.
        //     for (var key in mediaIds){
        //         // Get the albumId
        //         var mediaId = mediaIds[key];
        //         var refThisMedia = db.ref('Media/'+uid+'/'+mediaId);
        //         var newAlbumIds = [id];
        //         refThisMedia.update({'albumIds': newAlbumIds});
        //         $state.go('app.activity');
        //     }
        // }
    }

})



;
