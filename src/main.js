import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import VueResource from 'vue-resource'
import ElementUI  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'  // 引入i18n国际化插件

Vue.config.productionTip = false

const mock = true;
if (mock) {
  require('./mocks')
}

//开启debug模式
Vue.config.debug = true;

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueI18n) 

// 注册i18n实例并引入语言文件，文件格式等下解析
const i18n = new VueI18n({  
  locale: 'en',  
  messages: {    
    'zh': require('@/assets/languages/zh.json'),    
    'en': require('@/assets/languages/en.json')  
  }
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')


// new Vue({
//   el: '#app',
//   router,
//   store,
//   i18n,
//   render: h => h(App)
// })


