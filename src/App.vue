<template>
  <div class="custom-titlebar">
    <div class="title">
      <div class="main-title">My App</div>
      <div class="subtitle">副标题</div>
    </div>
    <div class="controls">
      <button @click="minimize">-</button>
      <button @click="maximize">+</button>
      <button @click="close">X</button>
    </div>
  </div>
  <HelloWorld />
</template>

<script lang="js" setup>
import HelloWorld from "./components/HelloWorld.vue"
import {onMounted} from 'vue'
import {ipcRenderer} from 'electron'

const minimize = () => {
  ipcRenderer.send('window-control', 'minimize')
}

const maximize = () => {
  ipcRenderer.send('window-control', 'maximize')
}

const close = () => {
  ipcRenderer.send('window-control', 'close')
}

onMounted(() => {
  ipcRenderer.on('is-maximized', (event, isMaximized) => {
    // 处理窗口最大化状态变化
  })
})
</script>

<style>
.custom-titlebar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 0 10px;
  height: 40px; /* 增加高度以适应副标题 */
}

.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-title {
  font-size: 16px;
}

.subtitle {
  font-size: 12px;
  color: #aaa; /* 副标题颜色 */
}

.controls button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: 5px;
}

.controls button:hover {
  background-color: #555;
}
</style>
