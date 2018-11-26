<template>
    <header class="">

        <nav class="navbar navbar-expand-md navbar-light">
            <a class="navbar-brand" href="/">SEAT PICKER</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="">home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/#/admin/roundtable/list">RoundTables</a>
                    </li>
                </ul>
                <user-logged-in></user-logged-in>
            </div>
        </nav>
    </header>
</template>
<script>
import UserLoggedIn from '@/components/UserLoggedIn'
export default {
  components: {
    UserLoggedIn
  }
}
</script>


<style>
header {
    margin-bottom: 20px;
}
.navbar-brand {
    font-size: 1.5em;
}
</style>
