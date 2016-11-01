var tower = angular.module('tower', ['ui.router', 'ngAnimate', 'ngStorage', 'ngMaterial', 'angularUtils.directives.dirPagination', 'md.data.table', 'ngFileUpload', 'ngProgress', 'ng-sortable']);

tower.config(function($urlRouterProvider, $stateProvider, $httpProvider, $mdThemingProvider){
    // Intercept HTTP Requests
    $httpProvider.interceptors.push('httpInterceptor');
    $urlRouterProvider.otherwise('/auth/login');

    // Themes
    $mdThemingProvider.theme('undefined-toast');
    $mdThemingProvider.theme('success-toast');
    $mdThemingProvider.theme('error-toast');
    $mdThemingProvider.definePalette('controlTower', {
    '50': 'ffebee',
    '100': 'ffcdd2',
    '200': '00FF05',
    '300': 'e57373',
    '400': 'ef5350',
    '500': '26282B',
    '600': '26282B',
    '700': 'd32f2f',
    '800': 'c62828',
    '900': 'b71c1c',
    'A100': '5AD6F9',
    'A200': '5AD6F9',
    'A400': '5AD6F9',
    'A700': '5AD6F9',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100', 'A200', 'A300', 'A400'],
    'contrastLightColors': undefined
    });
    $mdThemingProvider.theme('default')
        .primaryPalette('controlTower')
        .accentPalette('controlTower');

    // Routes
    $stateProvider
    .state('auth', {
        abstract: true,
        url: '/auth',
        template: '<ui-view></ui-view>',
        controller: 'authController',
        data: {authenticate: false}
    })
    .state('auth.login', {
        url: '/login',
        templateUrl: 'app/auth/auth.login.html'
    })
    .state('auth.signup', {
        url: '/signup',
        templateUrl: 'app/auth/auth.signup.html'
    })
    .state('auth.initialize', {
        url: '/initialize',
        templateUrl: 'app/auth/auth.initialize.html',
        data: {authenticate: true}
    })
    .state('dashboard', {
        abstract: true,
        url: '/dashboard', 
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'dashboardController',
        data: {authenticate: true},
        resolve: {
            User: function(AuthService){
                return AuthService.getSession();
            },
            Application: function(ApplicationService){
                return ApplicationService.query();
            }
        }
    })
    .state('dashboard.application', {
        abstract: true,
        url: '/application',
        template: '<ui-view></ui-view>',
        controller: 'applicationController',
        resolve: {
            Application: function(ApplicationService){
                return ApplicationService.query();
            }
        }
    })
    .state('dashboard.application.preview', {
        url: '/preview',
        templateUrl: 'app/application/application.preview.html'
    })
    .state('dashboard.application.meta', {
        url: '/meta',
        templateUrl: 'app/application/application.meta.html'
    })
    .state('dashboard.pages', {
        abstract: true,
        url: '/pages',
        template: '<ui-view></ui-view>'
    })
    .state('dashboard.pages.list', {
        url: '/',
        templateUrl: 'app/pages/pages.list.html',
        controller: 'pagesController',
        resolve: {
            Pages: function(PageService){
                return PageService.fetch();
            }
        }
    })
    .state('dashboard.pages.edit', {
        url: '/:id',
        templateUrl: 'app/pages/page.edit.html',
        controller: 'pageController',
        resolve: {
            Media: function(MediaService){
                return MediaService.query();
            },
            Page: function($stateParams, PageService){
                return PageService.get($stateParams.id);
            }
        }
    })
    .state('dashboard.users', {
        url: '/users',
        templateUrl: 'app/users/users.html',
        controller: 'usersController',
        resolve: {
            Users: function(UsersService){
                return UsersService.fetch();
            }
        }
    })
    .state('dashboard.media', {
        url: '/media',
        templateUrl: 'app/media/media.gallery.html',
        controller: 'mediaController',
        resolve: {
            Media: function(MediaService){
                return MediaService.query();
            }
        }
    })
    .state('tutorial', {
        url: '/tutorial', 
        templateUrl: 'app/tutorial/tutorial.html',
        controller: 'tutorialController',
        data: {authenticate: true}
    });
});
// Run at start
tower.run(function($rootScope, $state, $mdDialog, $mdBottomSheet, $mdToast, ngProgressFactory, AuthService){
    var progress = ngProgressFactory.createInstance();
        progress.setColor('#39D5E1');

    // Session
    AuthService.getSession().then(function(response){
    }, function(err){
        $state.go('auth.login');
    });

    // Authentication
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams){
        if(toState.data.authenticate && !AuthService.session()){
            event.preventDefault();
            $state.go('auth.login');
        }
    });
    // Events
    $rootScope.$on("event:startProgress", function(args, config){
        progress.reset();
        progress.start();
    });
    $rootScope.$on("event:endProgress", function(args, response){
        progress.complete();
        $mdDialog.hide();
    });

    $rootScope.hide = function(){
        $mdBottomSheet.hide();
        return $mdDialog.hide();
    };
    $rootScope.cancel = function(){
        $mdBottomSheet.cancel();
        return $mdDialog.cancel();
    };
    $rootScope.Toast = function(text, theme){
        $mdToast.show($mdToast.simple()
            .textContent(text)
            .position('bottom right')
            .theme(theme+'-toast')
            .hideDelay(2500));
    };
});