<template>
  <div class="item-view">

  </div>
</template>

<script>
  var Item = require('../components/Item.vuew');
  var store = require('../store');

  module.exports = {
    name: 'ItemView',
    props: ['params'],
    data: function(){
      return {
        item: null,
        comments: [],
        pollOpts: []
      }
    },
    watch: {
      'params.userId': 'update'
    },
    methods: {
      update: function(){
        store.fetchItem(this.params.userId, function(item){
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
      'Item': Item
    }
  }
</script>

<style>
</style>


