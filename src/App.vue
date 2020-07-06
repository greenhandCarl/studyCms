<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import TeacherList from './views/TeacherList.vue'

@Component({
  components: { TeacherList }
})
export default class App extends Vue {
  data = {}
}
</script>

<style lang="scss">
body,html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
