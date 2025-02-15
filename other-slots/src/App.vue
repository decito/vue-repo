<template>
  <div id="app">
    <hello-world #default="{ user, favorites }">
      <p>Hello, {{ user.name }}</p>
      <p>I guess you like {{ favorites[0] }}, {{ favorites[1] }} and {{ favorites[2] }}</p>
    </hello-world>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
