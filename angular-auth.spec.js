describe('auth', function () {
  var $rootScope, $state, auth;

  beforeEach(function() {

    module('boundstate.auth');

    module(function ($stateProvider) {
      $stateProvider
        .state('login', {});
    });

    inject(function (_$rootScope_, _$state_, _auth_, $injector, localStorageService) {
      $rootScope = _$rootScope_;
      $state = _$state_;
      auth = _auth_;

      localStorageService.clearAll();
      auth.initialize();
    });
  });

  describe('login', function() {

    it('sets user and token and emits "auth.login" event', inject(function () {
      var loginEvent = jasmine.createSpy();
      $rootScope.$on('auth.login', loginEvent);

      auth.login('example-token', {name: 'Jon Snow'});
      expect(loginEvent.calls.count()).toEqual(1);
      expect(auth.getToken()).toEqual('example-token');
      expect(auth.getUser().name).toEqual('Jon Snow');
    }));

  });

  describe('logout', function() {

    it('clears user and token, emits "auth.logout" event, and redirects to "login" state', inject(function () {
      var logoutEvent = jasmine.createSpy();
      $rootScope.$on('auth.logout', logoutEvent);
      spyOn($state, 'transitionTo');

      auth.login('example-token', {name: 'Jon Snow'});
      auth.logout();
      expect(auth.getToken()).toBeFalsy();
      expect(auth.getUser()).toEqual({});
      expect(logoutEvent.calls.count()).toEqual(1);
      expect($state.transitionTo.calls.mostRecent().args[0]).toEqual('login');
    }));

  });

  describe('updateUser', function() {

    it('updates user data', inject(function () {
      auth.login('example-token', {name: 'Jon Snow'});
      auth.updateUser({name: 'Bill'});
      expect(auth.getUser().name).toEqual('Bill');
    }));

  });

  describe('isGuest', function() {

    it('returns true if user is not logged in', inject(function() {
      expect(auth.isGuest()).toEqual(true);
      auth.login('example-token', {name: 'Jon Snow'});
      expect(auth.isGuest()).toEqual(false);
    }));

  });

  describe('hasRole', function() {

    it('returns true if the user object contains the role', inject(function() {
      auth.login('example-token', {name: 'Jon Snow', roles: ['president']});
      expect(auth.hasRole('president')).toEqual(true);
      expect(auth.hasRole('secretary')).toEqual(false);
    }));

  });

  describe('hasAnyRole', function() {

    it('returns true if the user object contains any role', inject(function() {
      auth.login('example-token', {name: 'Jon Snow', roles: ['president']});
      expect(auth.hasAnyRole(['janitor'])).toEqual(false);
      expect(auth.hasAnyRole(['president', 'janitor'])).toEqual(true);
    }));

  });

});