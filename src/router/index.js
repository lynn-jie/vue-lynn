import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/page/login';
import Home from '@/components/common/Home';
import DashBoard from '@/components/page/DashBoard';
import equipment from '@/components/page/equipment';
import FormLayouts from '@/components/page/FormLayouts';
import BasicTables from '@/components/page/BasicTables';
import customer from '@/components/page/customer';
import organization from '@/components/page/organization';
import space from '@/components/page/space';
import member from '@/components/page/member';

import test from '@/components/page/test';

Vue.use(Router)

export default new Router({
  mode:'history',
  base:__dirname,
  routes: [
    {
      path: '/',
      component: Home,
      children:[
        {
          path:'',
          component:DashBoard
        },{
          path:'/DashBoard',
          component:DashBoard
        },{
          path:'/customer',
          component:customer,
          children: [
            { path: '/customer/organization', component: organization}
        ]
    		},{
          path:'/equipment',
          component:equipment
        },{
          path:'/FormLayouts',
          component:FormLayouts
        },{
          path:'/BasicTables',
          component:BasicTables
        },{
          path:'/space',
          component:space
        },{
          path:'/member',
          component:member
        },{
          path:'/test',
          component:test
        }
        
        
      ]
    }
  ]
})


//children: [
//          { path: '/main', component: Main, name: '主页', hidden: true },  
//      ]
//  },