import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import 'element-ui/lib/theme-chalk/index.css'; //默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './utils/directive';//拓展指令
import { messages } from './utils/i18n';//国际化
import 'babel-polyfill'

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI,{
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});


//使用钩子函数对路由进行权限控制
router.beforeEach((to,from,next) => {
    document.title = `${to.meta.title} | vue-admin-template`;
    const role = localStorage.getItem('ms_username');
    if(!role && to.path !=='/login'){
        next('./login');
    }else if(to.meta.permission){
        role === 'admin' ? next() : next('/403');
    }else {
        //判断IE10一下不能进入富文本编译器，不兼容
        if(navigator.userAgent.indexOf('MSIE') >-1 &&to.path ==='/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看','浏览器不兼容',{
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }

})

new Vue({
    router,
    i18n,
    render:h => h(App),
}).$mount('#app');
