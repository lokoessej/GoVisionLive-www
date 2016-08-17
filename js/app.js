// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myApp = angular.module('starter', ['ionic', 'ionic-material', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'WifiServices', 'ionMdInput', 'firebase', 'ui.router'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    ionic.Platform.fullScreen(true,false);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      // $scope.coolPlugin = CoolPlugin;
      // CoolPlugin.showToast("Doh! I'm a Toast!");
      // cordova.plugins.CoolPlugin.showToast("Doh! I'm a Toast!");
      // coolPlugin;
      // cordova.plugins.CoolPlugin;
      // cordova.plugins.CoolPlugin.showToast('test');
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
}).config(['$ionicConfigProvider', function($ionicConfigProvider) {
    // $sceProvider.enabled(false);
    // $ionicConfigProvider.tabs.position('bottom'); // other values: top
    $ionicConfigProvider.platform.android.tabs.position('bottom');

}]).config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    '**'
  ]);
});
