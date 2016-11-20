// happy coding :)

var Firebase = require('firebase');
var api = new Firebase('https://hacker-news.firebaseio.com/v0');
var EventEmitter = require('events').EventEmitter;
var store = module.exports = new EventEmitter();
var storiesPerPage = 30;
var cachedStoryIds = [];
var cachedStories = [];

api.child('topstories').on('value', function(snapshot){
    cachedStoryIds = snapshot.val();
    store.emit('update');
});

store.fetchItem = function(id, cb){
    api.child('item/' + id).once('value', function(snapshot){
        cb(snapshot.val());
    });
};

store.fetchUser = function(id, cb){
    if (cachedStories[id]) {
        cb(cachedStories[id]);
    } else {
        api.child('user/' + id).once('value', function(snapshot){
            var story = snapshot.val();
            cachedStories[id] = story;
            cb(story);
        });
    }
};

store.fetchItems = function(ids, cb){
    if (!ids || !ids.length) return cb([]);
    var items = [];
    ids.forEach(function(id){
        store.fetchItem(id, addItem);
    });
    function addItem (item) {
        items.push(item);
        if (items.length >= ids.length) {
            cb(items);
        }
    }
};

store.fetchItemsByPage = function(page, cb){
    var start = (page - 1) * storiesPerPage;
    var end = page * storiesPerPage;
    var ids = cachedStoryIds.slice(start, end);
    store.fetchItems(ids, cb);
};