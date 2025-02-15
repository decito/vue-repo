<template>
  <a-layout>
    <a-layout-content>
      <Board />
      <List />
    </a-layout-content>
    <a-layout-sider>
      <Sidebar />
    </a-layout-sider>
  </a-layout>
</template>

<script setup>
import Board from './components/Board.vue'
import List from './components/List.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<style>
.ant-layout-sider {
  color: #333;
  line-height: 30px;
  background: #666;
}
.ant-layout-content {
  min-height: 120px;
  color: #eee;
  line-height: 30px;
  background: #333;
}
</style>
