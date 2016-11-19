<template>
  <div class="user-view" v-show="user">
    <ul>
      <li><span class="label">user: </span>{{ user.id }}</li>
      <li><span class="label">create: </span>{{ user.created }}</li>
      <li><span class="label">karma: </span>{{ user.karma }}</li>
      <li>
        <span class="label">about: </span>
        <div class="about" v-html="user.about"></div>
      </li>
    </ul>
  </div>
</template>

<script>
var store = require('../store');

module.exports = {
  name: 'UserView',
  props: ['params'],
  data: function(){
    return {
      user: {}
    }
  },
  watch: {
    'params.userId': function(){
      this.update();
    }
  },
  mounted: function(){
    this.update();
  },
  methods: {
    update: function(){
      store.fetchUser(this.params.userId, function(user){
        this.user = user;
      }.bind(this));
    }
  }
}
</script>

<style>
</style>