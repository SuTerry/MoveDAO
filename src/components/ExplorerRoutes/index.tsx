import React, { ReactNode } from 'react'

import { useLocation, Navigate } from 'react-router-dom'

import { useAppSelector } from '@store/index'

import { routerRules } from '@routes/index'

interface IProps {
  children: ReactNode
}

export default ({ children }: IProps): JSX.Element => {

  const location = useLocation()

  const { isAsyncFinish, isConnected } = useAppSelector(state => state.wallet)

  const routerRule = routerRules[location.pathname]

  const canAccess = routerRule ? routerRule['isConnected'] : false

  return (
    <>{
      isAsyncFinish ?
        canAccess ?
          isConnected ?
            children
            : <Navigate to="/" />
          : children
        : <></>
    } </>
  )
}

