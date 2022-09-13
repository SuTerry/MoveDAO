import React, { useEffect } from 'react'

import { useRoutes } from 'react-router-dom'

import router from '@routes/index' // 路由

import { useAppDispatch } from '@store/index'

import { setWallet } from '@store/modules/wallet'

import { isUpdatedVersion } from '@utils/wallet'

export default (): JSX.Element => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isUpdatedVersion()) {
      dispatch(setWallet())
      window.aptos?.on?.('accountChanged', () => {
        dispatch(setWallet())
      })
      window.aptos?.on?.("networkChanged", () => {
        dispatch(setWallet())
      })
    }
  }, [])

  return (
    <>
      {useRoutes(router)}
    </>
  )

}
