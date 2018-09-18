<template>
  <div id="app">
    <mySelect></mySelect>
  </div>
</template>

<script>
import mySelect from "@/components/mySelect"
export default {
  name: 'App',
  components: {
    mySelect,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
