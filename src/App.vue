<template>
  <div id="#app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
const defaultLayout = 'main'
export default {
  name: 'app',
  computed: {
    layout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }

}
</script>

<style>
</style>
