import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Card, CardContent } from '@mui/material'

import { ProsposalResponse } from '@api/proposals'

import { truncateMiddle, percentage } from '@utils/index'

import './index.less'

interface CardProps extends ProsposalResponse {
  index: number
  handle: string
}


export default ({ proposer, is_resolved, title, description, yes_votes, no_votes, abstained_votes, index, handle }: CardProps): JSX.Element => {

  const navigate = useNavigate()

  const handleCard = () => navigate(`/detail/${handle}/${index}`)

  const total = parseInt(yes_votes) + parseInt(no_votes) + parseInt(abstained_votes)

  const yesPercentage = percentage(parseInt(yes_votes), total)
  const noPercentage = percentage(parseInt(no_votes), total)

  return (
    <Card className='list_card' onClick={handleCard}>
      <CardContent className='list_card_content'>
        <div className="l_c_c_top">
          <div className="l_c_c_t_proposer">{truncateMiddle(proposer, 3, 3)} 发起</div>
          <div className="l_c_c_t_resolved">{ is_resolved ? '已结束' : '进行中' }</div>
        </div>
        <div className="l_c_c_title">{title}</div>
        <div className="l_c_c_description">
          <div className="l_c_c_d_html" dangerouslySetInnerHTML={{__html: description}}></div>
        </div>
        <div className="l_c_c_votes">
          <div className="l_c_c_v_title">
            <div className="l_c_c_v_t_left">支持</div>
            <div className="l_c_c_v_t_left">{`${yes_votes}积分 ${yesPercentage}%`}</div>
          </div>
          <div className="l_c_c_v_slider">
            <div className="l_c_c_v_s_cover" style={{width: `${yesPercentage}%`}}></div>
          </div>
        </div>
        <div className="l_c_c_votes">
          <div className="l_c_c_v_title">
            <div className="l_c_c_v_t_left">反对</div>
            <div className="l_c_c_v_t_left">{`${no_votes}积分 ${noPercentage}%`}</div>
          </div>
          <div className="l_c_c_v_slider">
            <div className="l_c_c_v_s_cover" style={{width: `${noPercentage}%`}}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
