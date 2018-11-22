<template>
  <div id="#app">
    <div class="container">
      <admin-header></admin-header>
        <router-view></router-view>
      <admin-footer></admin-footer>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'app',
  components: {
    AdminHeader: Header,
    AdminFooter: Footer
  }
}
</script>

<style>
</style>
