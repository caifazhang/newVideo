import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vant from './vant.config.js'
import VueAxios from 'vue-axios'
import axios from "axios"
import 'lib-flexible/flexible'

Vue.config.productionTip = false
Vue.use(vant)
Vue.use(VueAxios,axios)

Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

// axios.defaults.baseURL = 'http://api.kele8.cn/agent/https://app.vmovier.com/apiv3'

// axios拦截器,在发起请求之前执行
axios.interceptors.request.use((config) => {
  // 处理post请求参数(string格式转json格式),进行参数序列化
  if (config.method == "post") {
    //序列化POST请求参数
    let paramsString = "";
    for (let key in config.data) {
      paramsString += `${key}=${config.data[key]}&`;
    }
    // 重新赋值config.data 截取最后一个&
    config.data = paramsString.slice(0, -1);
  }
  // 必须返回config
  return config;
});

Vue.filter('TimeMinutes',(v)=> {
  return  parseInt(v / 60) >= 10 ? + parseInt(v / 60) : "0" + parseInt(v / 60);
})

Vue.filter('TimeSeconds',(v)=> {
  return  (v % 60) >= 10 ? + (v % 60) : "0" + (v % 60);
})

Vue.filter('TimeHours',(v)=> {
  return Math.round(v / 1000 * 60 * 60) 
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
