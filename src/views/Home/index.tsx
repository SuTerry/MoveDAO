import React from 'react'

import { Link } from '@mui/material'

import { WalletButton } from '@components/WalletButton'

import './index.less'

export default (): JSX.Element => {
  return (
    <div className='home'>
      <div className="home_banner">
        <h1>MoveDAO</h1>
        <h1>现在，发起你的社区提案</h1>
        <WalletButton
          size="large"
          sx={{
            marginTop: 4,
            width: 300,
            height: 60
          }}
          text="发起提案"
        />
      </div>
      <div className="home_link">
        <Link href="#">关于</Link>
        <Link href="#">文档</Link>
        <Link href="#">Github</Link>
        <Link href="#">Blog</Link>
      </div>
    </div>
  )
}
