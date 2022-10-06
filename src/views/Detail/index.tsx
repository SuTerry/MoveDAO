import React, { useEffect, useState } from 'react'

import { Button } from '@mui/material'

import { useNavigate, useParams } from 'react-router-dom'

import dayjs from 'dayjs'

import message from '@components/Message'

import { proposalsApi } from '@api/index'

import { ProsposalResponse } from '@api/proposals'

import { truncateMiddle, percentage } from '@utils/index'

import './index.less'

export default (): JSX.Element => {

  const [proposals, setProposals] = useState<ProsposalResponse>()

  const [total, setTotal] = useState(0)

  const navigate = useNavigate()

  const { id = '', handle = '' } = useParams()

  const getDetailData = async () => {
    try {
      const res = await proposalsApi.getProsposal(id, handle)
      setProposals(res)
    } catch (error) {

    }
  }

  const handleVote = (type: number): void => {
    proposalsApi.vote([parseInt(id), 1, type]).then(() => {
      message.success('投票成功')
      getDetailData()
    })
  }

  useEffect(() => {
    getDetailData()
  }, [])

  useEffect(() => {
    if (proposals) setTotal(parseInt(proposals.yes_votes) + parseInt(proposals.no_votes) + parseInt(proposals.abstained_votes))
  }, [proposals])

  return (
    <div className='detail'>
      <div className="detail_back">
        <Button
          variant="contained"
          sx={{
            width: 100,
          }}
          onClick={() => navigate('/list')}>
          返回
        </Button>
      </div>

      {
        proposals && (
          <div className="detail_container">
            <div className="detail_container_top">
              <div className="d_c_t_left">
                <div className="d_c_t_l_title">{proposals.title}</div>
                <div className="d_c_t_l_sub_title">
                  <div className="d_c_t_l_s_resolved">{proposals.is_resolved ? '已结束' : '进行中'}</div>
                  <div className="d_c_t_l_s_proposer">{truncateMiddle(proposals.proposer, 3, 3)} 发起</div>
                </div>
                <div className="d_c_t_l_description">
                  <div className="d_c_t_l_d_title">提案内容</div>
                  <div className="d_c_t_l_d_content">
                    <div className="d_c_t_l_d_c_html" dangerouslySetInnerHTML={{ __html: proposals.description }}></div>
                  </div>
                </div>
              </div>
              <div className="d_c_t_right">
                <div className="d_v_t_r_date">
                  <div className="d_v_t_r_d_left">
                    <div className="d_v_t_r_d_l_title">开始投票日期</div>
                    <div className="d_v_t_r_d_l_date">{dayjs(parseInt(proposals.start_time)).format('MM/DD/YYYY')}</div>
                  </div>
                  <div className="d_v_t_r_d_right">
                    <div className="d_v_t_r_d_r_title">结束投票日期</div>
                    <div className="d_v_t_r_d_r_date">{dayjs(parseInt(proposals.end_time)).format('MM/DD/YYYY')}</div>
                  </div>
                </div>
                <div className="d_v_t_r_bottom">
                  <div className="d_v_t_r_b_title">投票结果</div>
                  <div className="d_v_t_r_b_votes">
                    <div className="d_v_t_r_b_v_title">
                      <div className="d_v_t_r_b_v_t_left">支持</div>
                      <div className="d_v_t_r_b_v_t_left">{`${proposals.yes_votes}积分 ${percentage(parseInt(proposals.yes_votes), total)}%`}</div>
                    </div>
                    <div className="d_v_t_r_b_v_slider">
                      <div className="d_v_t_r_b_v_s_cover" style={{ width: `${percentage(parseInt(proposals.yes_votes), total)}%` }}></div>
                    </div>
                  </div>
                  <div className="d_v_t_r_b_votes">
                    <div className="d_v_t_r_b_v_title">
                      <div className="d_v_t_r_b_v_t_left">反对</div>
                      <div className="d_v_t_r_b_v_t_left">{`${proposals.no_votes}积分 ${percentage(parseInt(proposals.no_votes), total)}%`}</div>
                    </div>
                    <div className="d_v_t_r_b_v_slider">
                      <div className="d_v_t_r_b_v_s_cover" style={{ width: `${percentage(parseInt(proposals.no_votes), total)}%` }}></div>
                    </div>
                  </div>
                  <div className="d_v_t_r_b_votes">
                    <div className="d_v_t_r_b_v_title">
                      <div className="d_v_t_r_b_v_t_left">弃权</div>
                      <div className="d_v_t_r_b_v_t_left">{`${proposals.abstained_votes}积分 ${percentage(parseInt(proposals.abstained_votes), total)}%`}</div>
                    </div>
                    <div className="d_v_t_r_b_v_slider">
                      <div className="d_v_t_r_b_v_s_cover" style={{ width: `${percentage(parseInt(proposals.abstained_votes), total)}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="detail_container_bottom">
              <div className="d_c_b_left">
                <div className="d_c_b_l_title">投票详情</div>
                <ul className="d_c_b_l_content">
                  <li></li>
                </ul>
                <div className="d_c_b_l_button">
                  <Button
                    variant="contained"
                    disabled
                    sx={{
                      width: 100,
                    }}
                    onClick={() => navigate('/list')}>
                    显示更多
                  </Button>
                </div>
              </div>
              <div className="d_c_b_right">
                <div className="d_c_b_r_title">投票</div>
                <div className="d_c_b_r_bottons">
                  <Button
                    variant="contained"
                    sx={{
                      width: 100,
                    }}
                    onClick={() => handleVote(1)}>
                    支持
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      width: 100,
                    }}
                    onClick={() => handleVote(2)}>
                    反对
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      width: 100,
                    }}
                    onClick={() => handleVote(3)}>
                    弃权
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
