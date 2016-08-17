angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })

      .state('app.activity', {
          url: '/activity',
          parent: "app",
          views: {
              'menuContent': {
                  templateUrl: 'templates/activity.html',
                  controller: 'ActivityCtrl'
              },
              'fabContent': {
                  template: '',
                  controller: function ($timeout) {
                      $timeout(function () {
                          // document.getElementById('fab-activity').classList.toggle('on');
                      }, 200);
                  }
              }
          }
      })

      .state('app.cloud', {
          url: '/cloud',
          parent: "app",
          views: {
              'menuContent': {
                  templateUrl: 'templates/cloud.html',
                  controller: 'CloudCtrl'
              },
              'fabContent': {
                  template: '',
                  controller: function ($timeout) {
                      $timeout(function () {
                          // document.getElementById('fab-friends').classList.toggle('on');
                      }, 900);
                  }
              }
          }
      })
      .state('app.camera', {
          url: '/camera',
          parent: "app",
          views: {
              'menuContent': {
                  templateUrl: 'templates/camera.html',
                  controller: 'CameraCtrl'
              },
              'fabContent': {
                  template: '',
                  controller: function ($timeout) {
                      $timeout(function () {
                          // document.getElementById('fab-friends').classList.toggle('on');
                      }, 900);
                  }
              }
          }
      })

      .state('app.storage', {
          url: '/storage',
          parent: "app",
          views: {
              'menuContent': {
                  templateUrl: 'templates/storage.html',
                  controller: 'StorageCtrl'
              },
              'fabContent': {
                  template: '',
                  controller: function ($timeout) {
                      $timeout(function () {
                          // document.getElementById('fab-friends').classList.toggle('on');
                      }, 900);
                  }
              }
          }
      })

      .state('app.gallery', {
          url: '/gallery',
          parent: "app",
          views: {
              'menuContent': {
                  templateUrl: 'templates/gallery.html',
                  controller: 'GalleryCtrl'
              },
              'fabContent': {
                  template: '',
                  controller: function ($timeout) {
                      $timeout(function () {
                          // document.getElementById('fab-gallery').classList.toggle('on');
                      }, 600);
                  }
              }
          }
      })

      .state('app.album', {
          url: '/album/:id',
          parent: "app",
          views: {
              'menuContent': {
                  templateUrl: 'templates/album.html',
                  controller: 'albumCtrl'
              },
              'fabContent': {
                  template: '',
                  controller: function ($timeout) {
                      $timeout(function () {
                          // document.getElementById('fab-gallery').classList.toggle('on');
                      }, 600);
                  }
              }
          }
      })

      .state('app.login', {
          url: '/login',
          views: {
              'menuContent': {
                  templateUrl: 'templates/login.html',
                  controller: 'LoginCtrl'
              },
              'fabContent': {
                  template: ''
              }
          }
      })

      .state('app.profile', {
          url: '/profile',
          parent: "app",
          views: {
              'menuContent': {
                  templateUrl: 'templates/profile.html',
                  controller: 'ProfileCtrl'
              },
              'fabContent': {
                  template: '',
                  controller: function ($timeout) {
                      /*$timeout(function () {
                          document.getElementById('fab-profile').classList.toggle('on');
                      }, 800);*/
                  }
              }
          }
      })

      .state('app.newmedia', {
          url: '/newmedia/:id',
          parent: "app",
          cache: false,
          views: {
              'menuContent': {
                  templateUrl: 'templates/newmedia.html',
                  controller: 'NewMediaCtrl'
              },
              'fabContent': {
                  template: '',
                  controller: function ($timeout) {
                      /*$timeout(function () {
                          document.getElementById('fab-profile').classList.toggle('on');
                      }, 800);*/
                  }
              }
          }
      })

      .state('app.editmedia', {
          url: '/editmedia/:id',
          parent: "app",
          cache: false,
          views: {
              'menuContent': {
                  templateUrl: 'templates/editmedia.html',
                  controller: 'EditMediaCtrl'
              },
          }
      })

      .state('app.3dvision', {
          url: '/3dvision/:url',
          parent: "app",
          cache: false,
          views: {
              'menuContent': {
                  templateUrl: 'templates/3dvisionContain.html',
                  controller: 'StereoVisionCtrl'
              },
          }
      })

      .state('app.editalbum', {
          url: '/3dvision/:id',
          parent: "app",
          cache: false,
          views: {
              'menuContent': {
                  templateUrl: 'templates/editalbum.html',
                  controller: 'EditAlbumCtrl'
              },
          }
      })

      .state('app.newalbum', {
          url: '/newalbum',
          parent: "app",
          views: {
              'menuContent': {
                  templateUrl: 'templates/newalbum.html',
                  controller: 'NewAlbumCtrl'
              },
          }
      })
      ;

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/login');




});
