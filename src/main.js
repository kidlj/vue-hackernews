// happy coding :)

var Vue = require('vue');
var Router = require('director/build/director').Router; // issue #332
var router = new Router();

var App = require('./App.vue');
var app = new Vue(App);

router.on('/news/:page', function(page){
  app.currentView = 'NewsView';
  app.params.page = +page; // `+` matters
});

router.on('/item/:id', function(id){
  app.currentView= 'ItemView';
  app.params.itemId = id;
});

router.on('/user/:id', function(id){
  app.currentView = 'UserView';
  app.params.userId = id;
});

router.configure({
  notfound: function(){
    router.setRoute('/news/1');
  }
});

router.init('/news/1');
