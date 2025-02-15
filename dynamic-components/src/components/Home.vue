<template>
  <h1>Home page</h1>
</template>

<script>
export default {
  unmounted() {
    console.log('Home component has been unmounted.')
  },
  activated() {
    console.log('Home component has been activated.')
  },
  deactivated() {
    console.log('Home component has been deactivated.')
  },
}
</script>