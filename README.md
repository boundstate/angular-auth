# Angular Auth

AngularJS authorization for [ui-router](https://github.com/angular-ui/ui-router).

## Installation

[![Build Status](https://travis-ci.org/boundstate/angular-auth.svg)](https://travis-ci.org/boundstate/angular-auth)

## Installation

```js
bower install boundstate-angular-auth
```

Include `angular-auth.js` and the libraries it depends on in your HTML:

```html
<script src="bower_components/angular-local-storage/dist/angular-local-storage.js"></script>
<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<script src="bower_components/angular-auth/angular-auth.js"></script>
```
    
Then load the module in your application by adding it as a dependent module:

```js
angular.module('app', ['boundstate.auth']);
```

## Usage

Configure authorization of your app states by setting the allowed roles for each state:

```js
$stateProvider.state('app.account', {
  url: '/account',
  controller: 'AccountCtrl',
  templateUrl: 'partials/account.html',
  data: {
    // Allow authenticated users
    roles: ['@']
  }
})
```
    
There are three special roles:

-  `*`: any user, including both anonymous and authenticated users.
-  `?`: anonymous users.
-  `@`: authenticated users.

Custom roles (e.g. `admin`) can be specified and will match against the authenticated user's `roles` property.

Initialize the `auth` service at `run` so that it can handle state changes:

```js
.run(['auth', function(auth) {
  auth.initialize();
}]);
```
    
Once your app authenticates a user, provide the user object and token to the `auth` service:

```js
auth.login(token, user);
```
    
The token and user object will be stored in local storage so they can be reloaded on a page refresh.

The token will be automatically passed in all subsequent requests according to the 
[OAuth Bearer Token specifications](http://tools.ietf.org/html/rfc6750).
    
When a user logs out, simply call `logout()`:

```js
auth.logout();
```

## Inspiration

* [Angular ui-router login authentication - Stack Overflow](http://stackoverflow.com/a/22540482)

* [Yii Access Control Filter](http://www.yiiframework.com/doc/guide/1.1/en/topics.auth#access-control-filter)
