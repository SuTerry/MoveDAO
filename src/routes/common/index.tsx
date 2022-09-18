import React, { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import { lazyLoad } from '@utils/routes'

const Home = lazy(() => import('@views/Home/index'))
const List = lazy(() => import('@views/List/index'))
const Proposal = lazy(() => import('@views/Proposal/index'))

export const routes: RouteObject[] = [
  {
    index: true,
    element:lazyLoad(<Home />),
  },
  {
    path: '/list',
    element:lazyLoad(<List />),
  },
  {
    path: '/proposal',
    element:lazyLoad(<Proposal />),
  },
]