import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Chat from '@/components/Chat'
import Home from '@/components/Home'

Vue.use(VueRouter)
Vue.config.productionTip = false


const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/chat',
    name: 'Chat',
    component: Chat, 
    props: true
  }, {
    path: '/',
    name: 'Home',
    component: Home
  }]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

