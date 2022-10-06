import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'

import InfiniteScroll from 'react-infinite-scroll-component'

import useProposals from './useProposals'

import Card from './Card'

import './index.less'

export default (): JSX.Element => {

  const navigate = useNavigate()

  const { table, total, tableHandle, getNextTables } = useProposals()

  const requestList = () => {
    setTimeout(async () => {
      getNextTables()
    }, 1000)
  }

  return (
    <div className='list' id="list">
      <div className="list_back">
        <Button
          variant="contained"
          sx={{
            width: 100,
          }}
          onClick={() => navigate('/')}>
          返回
        </Button>
      </div>

      <div className="list_container">
        <div className="list_container_title">提案列表</div>
        <InfiniteScroll
          scrollableTarget="list"
          dataLength={table.length}
          next={requestList}
          hasMore={table.length < total}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          loader={<h4>Loading...</h4>}
        >
          {
            table.map((item, index) => (
              <Card key={index} index={total - index - 1} handle={tableHandle} {...item} />
            ))
          }
        </InfiniteScroll>

      </div>
    </div>
  )
}
