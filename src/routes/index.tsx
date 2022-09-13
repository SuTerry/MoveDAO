import React from 'react'
import { RouteObject } from 'react-router-dom'
import ExplorerRoutes from '@components/ExplorerRoutes'
import Layout from '@components/Layout'

import { routes as common } from './common'

interface Rules {
  isConnected: boolean
}

export const routerRules: Record<string, Rules> = {
  '/': {
    isConnected: false,
  },
  '/list': {
    isConnected: true,
  }
}


const router: RouteObject[] = [
  {
    path: '/',
    element: <ExplorerRoutes children={<Layout />} />,
    children: [
      ...common
    ]
  }
]

export default router