import Vue from 'vue'
import Router from 'vue-router'
import HomePage	from '../pages/homepage'
import DataTableView from '../pages/new-datatable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },{
      path:'/new',
      name:'Datatable',
      component : DataTableView
    }
  ]
})
