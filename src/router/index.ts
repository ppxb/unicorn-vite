import { createRouter, createWebHashHistory, RouteComponent, Router, RouteRecordRaw } from 'vue-router'
import { ascending, formatFlatteningRoutes, formatTwoStageRoutes } from './utils'
import baseRouter from './modules/base'
import { buildHierarchyTree } from '@pureadmin/utils'

/**
 * auto import static router modules
 * prefixed with ! for negative patterns
 */
const modules: Record<string, any> = import.meta.glob(
  ['./modules/**/*.ts', '!./modules/**/base.ts'],
  { eager: true }
)

const routes = []

Object.keys(modules).forEach(key => {
  routes.push(modules[key].default)
})

export const constantRoutes: RouteRecordRaw[] = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes)))
)

export const constantMenus: RouteComponent[] = ascending(routes).concat(
  ...baseRouter
)

export const basePaths = Object.keys(baseRouter).map(i => baseRouter[i].path)

export const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes.concat(...(baseRouter as any)),
  strict: true,
  scrollBehavior: (_, from, savedPosition) => {
    return new Promise(resolve => {
      if (savedPosition) return savedPosition
      else {
        if (from.meta.saveScrollTop) {
          const top =
            document.documentElement.scrollTop || document.body.scrollTop
          resolve({ left: 0, top })
        }
      }
    })
  }
})

export default router
