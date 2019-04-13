<template>
  <div id="app">
    <router-view/>
    <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" 		    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 		    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
  </div>
  
</template>

<script>
export default {
  name: 'App',
  beforeMount(){
    this.$store.dispatch('getData');
  },
}
</script>

<style>
html,body{
  height:100%;
  width:100%;
  margin:0;
  padding:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  width:100%;
}

.el-dropdown-menu__item {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display:flex;
  justify-content: space-between;
  align-items:center;
}
</style>
