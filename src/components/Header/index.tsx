import React from 'react'

import { WalletButton } from '../WalletButton'

import './index.less'

export default (): JSX.Element => {
  return (
    <div className='header'>
      <div className="header_logo">MoveDAO</div>
      <div className="header_button">
        <WalletButton />
      </div>
    </div>
  )
}
