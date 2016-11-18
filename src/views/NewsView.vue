<template>
  <div class="news-view">
    <!-- item list -->
    <ul>
      <item v-for="(item, index) in items" :item="item" :index="index" :page="displayPage"></item>
    </ul>
    <!-- navigation -->
    <div class="nav" v-show="items.length > 0">
      <a v-if="params.page > 1" :href="'#/news/' + (params.page - 1)">&lt; Prev</a>
      <a :href="'#/news/' + (params.page + 1)">More...</a>
    </div>
  </div>
</template>

<script>
var Item = require('../components/Item.vue');
var store = require('../store');

module.exports = {
  name: 'NewsView',
  props: ['params'],
  data: function(){
    return {
      items: [],
      displayPage: 1 // bind sub-component props to data instance, not props got from parent component
    };
  },
  components: {
    'Item': Item
  },
  watch: {
    'params.page': 'update' // TODO: Cannot use `this.update` here, why?
  },
  methods: {
    update: function(){
      store.fetchItemsByPage(this.params.page, function(items){
        this.items = items;
        this.displayPage = this.params.page;
      }.bind(this));
    }
  },
  mounted: function(){
    store.on('update', this.update);
  },
  destroyed: function(){
    store.removeListener('update', this.update);
  }
};
</script>

<style>
</style>