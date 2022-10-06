import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Link, Button } from '@mui/material'

import { WalletButton } from '@components/WalletButton'

import './index.less'

export default (): JSX.Element => {

  const navigate = useNavigate()

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
          onClick={() => navigate('/proposal')}
        />
        <Button
          variant="contained"
          sx={{
            width: 300,
            height: 60,
            marginTop: 3
          }}
          onClick={() => navigate('/list')}>
          投票列表
        </Button>
      </div>
      <div className="home_link">
        <Link href="#">关于</Link>
        <Link href="#">文档</Link>
        <Link className="move_dao" href="#">MoveDAO</Link>
        <Link href="#">Github</Link>
        <Link href="#">Blog</Link>
      </div>
      <div className="home_bottom">
        <Link href="#">加入MoveDAO社区</Link>
      </div>
    </div>
  )
}
