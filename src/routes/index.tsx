import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import ExplorerRoutes from '@components/ExplorerRoutes'
import Layout from '@components/Layout'

import { routes as common } from './common'

interface Rules {
  isConnected: boolean
}

export const routerRules: Record<string, Rules> = {
  '/proposal': {
    isConnected: true,
  },
}


const router: RouteObject[] = [
  {
    path: '/',
    element: <ExplorerRoutes children={<Layout />} />,
    children: [
      ...common,
      {
        path: '*',
        element: <Navigate to='/' />,
      },
    ]
  }
]

export default router