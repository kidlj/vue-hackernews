<template>
  <li v-show="comment.text">
    <div class="comment-head">
      <a class="toggle" @click="toggleOpen">{{ open ? '[-]' : '[+]' }}</a>
      <a :href="'#/user/' + comment.by">{{ comment. by }}</a>
      {{ comment.time }}
    </div>
    <div class="comment-content" v-html="comment.text" v-show="open"></div>
    <ul class="child-comments" v-if="comment.kids" v-show="open">
      <comment v-for="comment in childComments" :comment="comment"></comment>
    </ul>
  </li>
</template>

<script>
  var store = require('../store');

  module.exports = {
    name: "Comment",
    props: {
      comment: Object
    },
    data: function(){
      return {
        open: true,
        childComments: []
      };
    },
    methods: {
      toggleOpen: function(){
        this.open = !this.open;
      }
    },
    created: function(){
      if (this.comment.kids) {
        store.fetchItems(this.comment.kids, function(comments){
          this.childComments = comments;
        }.bind(this));
      }
    }
  }
</script>

<style>
</style>