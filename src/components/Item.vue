<template>
  <div class="item">
    <span class="index">{{ _index }}.</span>
    <p>
      <a class="title" :href="href">{{ item.title }}</a>
      <span v-show="showDomain" class="domain">({{ item.url }})</span>
    </p>
    <p class="subtext">
      <span v-show="showInfo">
        {{ item.score }} points by
        <a :href="'#/user/' + item.by">{{ item.by }}</a>
      </span>
      {{ item.time }}
      <span v-show="showInfo" class="comments-link">
        | <a href="'#/item/' + item.id">comments</a>
      </span>
    </p>
  </div>
</template>

<script>
module.exports = {
  props: ['page', 'item', 'index'],
  computed: {
    _index: function(){
      if (this.page) {
        return (this.page - 1) * 30 + this.index + 1;
      }
    },
    href: function(){
      return this.item.url || ('#/item/' + this.item.id);
    },
    showInfo: function(){
      return this.item.type === 'story' || this.item.type === 'poll';
    },
    showDomain: function(){
      return this.item.type === 'story';
    }
  }
}
</script>

<style>
</style>