<template>
  <div>
    <admin-header></admin-header>
    <admin-footer></admin-footer>
  </div>
</template>

<script>
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'
export default {
  name: 'Admin',
  components: {
    AdminHeader,
    AdminFooter
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
