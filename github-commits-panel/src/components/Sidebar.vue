<script setup>
import * as gData from '../assets/json/trimmed-dataset.json'

/*
const listYears = () => {
  const dates = gData.map((d) => d.created_at)

  for (let i = 0; i < dates.length; i += 1) {
    dates[i] = dates[i].slice(0, 4)
  }

  let years = [...new Set(dates)]

  years = dates.reduce((acc, cur) => {
    if (acc.indexOf(cur) < 0) acc.push(cur)
    return acc
  }, [])

  return years
}
  *
  */

/* Notes:
 *
 * The function listYears() above
 * generates the years based only
 * on the years present in json.
 *
 * The function getYearRange() plus
 * listYearRange() are used to generate
 * a range from the latest data to
 * the earliest data present in json.
 *
 * The functions below are not optimized.
 * If I choose to follow using them, I should
 * turn them into one and use spread array
 * to make it more performatic.
 *
 */

let minYear = 0
let maxYear = 0

const getYearRange = () => {
  const dates = gData.map((d) => d.created_at)

  for (let i = 0; i < dates.length; i += 1) {
    dates[i] = dates[i].slice(0, 4)

    if (dates[i] < minYear || minYear === 0) {
      minYear = dates[i]
    }

    if (dates[i] > maxYear || maxYear === 0) {
      maxYear = dates[i]
    }
  }
}

const listYearRange = () => {
  getYearRange()

  const range = Math.abs(maxYear - minYear)
  const min = maxYear - range
  const years = []

  for (let i = maxYear; i >= min; i -= 1) {
    years.push(i)
  }

  return years
}
</script>

<template>
  <ul>
    <li v-for="year in listYearRange()" :key="year">
      <a href="#">{{ year }}</a>
    </li>
  </ul>
</template>

<style>
li {
  list-style: none;
}
a {
  color: #fff;
}
</style>
