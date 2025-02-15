<template>
  <div>
    <a-row v-for="i in 7" :key="i">
      <a-col v-for="j in 24" :key="j" :span="1">a</a-col>
    </a-row>
  </div>
</template>
