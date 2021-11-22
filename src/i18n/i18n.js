import Vue from 'vue'
import locale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'  // 引入i18n国际化插件
import messages from './langs'

Vue.use(VueI18n) 

// 从localStorage获取语言选择
const i18n = new VueI18n({  
    locale: localStorage.lang || 'en', 
    messages,
    // messages: {    
    //   'zh': require('@/assets/languages/zh.json'),    
    //   'en': require('@/assets/languages/en.json')  
    // }
  })
  
locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换

export default i18n;