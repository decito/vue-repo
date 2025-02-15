<template>
  <p v-if="age > 25">{{ msg }}</p>
  <p v-else>You must be older than 25 years old to see this message.</p>
</template>

<script>
  export default {
    name: 'Greeting',
    props: ['age'],
    data() {
      return {
        msg: 'Hello World',
      }
    }
  }
</script>

<style scoped lang="scss">
$color: red;

p {
  color: $color;
}
</style>