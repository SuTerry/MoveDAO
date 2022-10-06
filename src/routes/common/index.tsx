import React, { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import { lazyLoad } from '@utils/routes'

const Home = lazy(() => import('@views/Home/index'))
const List = lazy(() => import('@views/List/index'))
const Proposal = lazy(() => import('@views/Proposal/index'))
const Detail = lazy(() => import('@views/Detail/index'))

export const routes: RouteObject[] = [
  {
    index: true,
    element: lazyLoad(<Home />),
  },
  {
    path: '/list',
    element: lazyLoad(<List />),
  },
  {
    path: '/detail/:handle/:id',
    element: lazyLoad(<Detail />),
  },
  {
    path: '/proposal',
    element: lazyLoad(<Proposal />),
  },
  
]