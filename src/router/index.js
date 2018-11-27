import Vue from 'vue'
import Router from 'vue-router'
import menus from '~/config/menu'

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

var routes = []

menus.forEach((item) => {
  routes.push({
    index: item.id,
    path: `/${item.component}`,
    name: item.name,
    component: () => import(`~/components/${item.component}`),
    icon: item.icon,
    lang: item.lang,
    visible: item.visible,
    disable: item.disable
  })
})

export default new Router({ routes })