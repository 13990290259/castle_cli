<template>
  <router-view></router-view>
</template>

<script lang='ts'>
import Vue from "./vue";
import Component from "vue-class-component";
import { Getter, Action } from "vuex-class";
import { RouterPath } from "./router/index";
@Component({
  components: {
    // Menu
  }
})
export default class App extends Vue {}
</script>
<style>
</style>
