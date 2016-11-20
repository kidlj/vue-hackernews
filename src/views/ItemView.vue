<template>
  <div class="item-view" v-show="item">
    <item :item="item"></item>
    <ul class="poll-options" v-if="pollOpts">
      <li v-for="option in pollOpts">
        <p>{{ option.text }}</p>
        <p class="subtext">{{ option.score }} points</p>
      </li>
    </ul>
    <ul class="comments" v-if="comments">
      <comment v-for="comment in comments" :comment="comment"></comment>
    </ul>
    <p v-show="!comments.length">No comments yet.</p>
  </div>
</template>

<script>
  var Item = require('../components/Item.vue');
  var Comment = require('../components/Comment.vue');
  var store = require('../store');

  module.exports = {
    name: 'ItemView',
    props: ['params'],
    data: function(){
      return {
        item: {}, // initialize item to an object to avoid warnings. (upstream 4b92c0bf13a)
        comments: [],
        pollOpts: null
      }
    },
    watch: {
      'params.itemId': 'update'
    },
    mounted: function(){
      this.update();
    },
    methods: {
      update: function(){
        store.fetchItem(this.params.itemId, function(item){
          this.item = item;
          this.fetchComments();
          if (item.type === 'poll') {
            this.fetchPollOpts();
          }
        }.bind(this));
      },
      fetchComments: function(){
        var ids = this.item.kids;
        store.fetchItems(ids, function(comments){
          this.comments = comments;
        }.bind(this));
      },
      fetchPollOpts: function(){
        var ids = this.item.parts;
        store.fetchItems(ids, function(options){
          this.pollOpts = options;
        }.bind(this));
      }
    },
    components: {
      'Item': Item,
      'Comment': Comment
    }
  }
</script>

<style>
.item-view
  .item
    .index {
      display: none;
    }

.item-view
  .item
    .comments-link {
      display: none;
    }
</style>


