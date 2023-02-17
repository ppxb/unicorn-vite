import { buildHierarchyTree, isAllEmpty } from '@pureadmin/utils'
import { RouteRecordRaw } from 'vue-router'

export const ascending = (arr: any[]) => {
  arr.forEach((v, i) => {
    if (handRank(v)) v.meta.rank = i + 2
  })
  return arr.sort(
    (a: { meta: { rank: number } }, b: { meta: { rank: number } }) =>
      a?.meta.rank - b?.meta.rank
  )
}

const handRank = (route: any) => {
  const { name, path, parentId, meta } = route
  return isAllEmpty(parentId)
    ? isAllEmpty(meta?.rank) ||
    (meta?.rank === 0 && name !== 'Home' && path !== '/')
    : false
}

export const formatTwoStageRoutes = (routesList: RouteRecordRaw[]) => {
  if (routesList.length === 0) return routesList
  const newRoutesList: RouteRecordRaw[] = []
  routesList.forEach(i => {
    if (i.path === '/') {
      newRoutesList.push({
        name: i.name,
        component: i.component,
        path: i.path,
        redirect: i.redirect,
        meta: i.meta,
        children: []
      })
    } else {
      newRoutesList[0]?.children.push({ ...i })
    }
  })
  return newRoutesList
}

export const formatFlatteningRoutes = (routesList: RouteRecordRaw[]) => {
  if (routesList.length === 0) return routesList
  let hierarchyList = buildHierarchyTree(routesList)
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children, hierarchyList.slice(i + 1))
    }
  }
  return hierarchyList
}
