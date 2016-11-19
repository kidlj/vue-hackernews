<template>
  <div id="wrapper">
    <!-- header -->
    <div id="header">
      <a id="yc" href="http://www.ycombinator.com">
        <img src="https://news.ycombinator.com/y18.gif">
      </a>
      <h1>Hacker News</h1>
      <span class="source">
        Built with <a href="http://vuejs.org" target="_blank">Vue.js</a>
      </span>
    </div>
    <!-- main view -->
    <component :is="currentView" :params="params"></component>
  </div>
</template>

<script>
var NewsView = require('./views/NewsView.vue');
var ItemView = require('./views/ItemView.vue');
var UserView = require('./views/UserView.vue');

module.exports = {
  el: '#app',
  data: {
    currentView: '',
    params: {
      page: 1,
      userId: null,
      itemId: null
    }
  },
  components: {
    'NewsView': NewsView,
    'ItemView': ItemView,
    'UserView': UserView
  }
};
</script>

<style>
</style>
