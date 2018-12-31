<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import datas from '@/assets/csv_data.js'
import format from 'date-fns/format';
export default {
  name: 'App',
  beforeMount(){
    let data = [];
    data = datas.map((item)=>{
      return {
        ID: item.ID,
        Name: item.Name,
        Description: item.Description,
        Amount: item.Amount,
        Date:  format(item.Date,'ddd MM, YYYY'),
      }
    });
    this.$store.commit('SET_CSV_DATA',data);
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
