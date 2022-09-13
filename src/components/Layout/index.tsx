import React from 'react'

import { Outlet } from 'react-router-dom'
import Header from '@components/Header'


export default (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
