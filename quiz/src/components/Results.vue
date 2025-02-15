<template>
  <div class="result">
    <div class="title">
      {{ results[resultIndex].title }}
    </div>
    <div class="desc">
      {{ results[resultIndex].desc }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
      default: () => []
    },
    totalCorrect: {
      type: Number,
      default: 0
    }
  },
  computed: {
    resultIndex() {
      let index = 0
      this.results.forEach((cur, i) => {
        if(cur.min <= this.totalCorrect && cur.max >= this.totalCorrect)
          index = i
      })
      return index
    }
  }
}
</script>
