import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import Footer from '@/components/footer/footer';

Vue.use(Router);
Vue.use(VueResource);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Footer',
      component: Footer
    }
  ]
});
