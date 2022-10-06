import React, { useEffect, useState } from 'react'

import { Button } from '@mui/material'

import { useNavigate, useParams } from 'react-router-dom'

import dayjs from 'dayjs'

import { WalletButton } from '@components/WalletButton'

import message from '@components/Message'

import { proposalsApi } from '@api/index'

import { ProsposalResponse, VotesDetail } from '@api/proposals'

import { useAppSelector } from '@store/index'

import { truncateMiddle, percentage } from '@utils/index'

import './index.less'

enum ShouldPass {
  '支持'= 1,
  '反对' = 2,
  '弃权' = 3,
}

export default (): JSX.Element => {

  const [proposals, setProposals] = useState<ProsposalResponse>()

  const [voteDetail, setVoteDetail] = useState<VotesDetail[]>([])

  const [voteDisabled, setVoteDisabled] = useState(true)

  const { isAccountSet, accountAddress } = useAppSelector(state => state.wallet)

  const [total, setTotal] = useState(0)

  const navigate = useNavigate()

  const { id = '', handle = '' } = useParams()

  const getDetailData = async () => {
    try {
      const [prosposalRes, votesRes] = await Promise.all([proposalsApi.getProsposal(id, handle), proposalsApi.getTableVotes(id)])
      setProposals(prosposalRes)
      setVoteDetail(votesRes)
      setVoteDisabled(!isAccountSet || !!votesRes.find(vote => vote.proposer === accountAddress))
    } catch (error) {

    }
  }

  const handleVote = (type: number): void => {
    setVoteDisabled(true)
    proposalsApi.vote([parseInt(id), 1, type]).then(() => {
      message.success('投票成功')
      getDetailData()
    }).catch(() => {
      setVoteDisabled(false)
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
                  {
                    voteDetail.map((item, index) => {
                      return (
                        <li className="d_c_b_l_c_li" key={index}>
                          <span className="d_c_b_l_c_l_address">{truncateMiddle(item.proposer, 3, 3)}</span>
                          <span className="d_c_b_l_c_l_pass">{ShouldPass[item.should_pass]}</span>
                          <span className="d_c_b_l_c_l_num">1积分</span>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              <div className="d_c_b_right">
                <div className="d_c_b_r_title">投票</div>
                <div className="d_c_b_r_bottons">
                  <WalletButton
                    variant="contained"
                    disabled={voteDisabled}
                    text="支持"
                    sx={{
                      width: 100,
                    }}
                    onClick={() => handleVote(ShouldPass['支持'])}>
                    支持
                  </WalletButton>
                  <WalletButton
                    variant="contained"
                    disabled={voteDisabled}
                    text="反对"
                    sx={{
                      width: 100,
                    }}
                    onClick={() => handleVote(ShouldPass['反对'])}>
                    反对
                  </WalletButton>
                  <WalletButton
                    variant="contained"
                    disabled={voteDisabled}
                    sx={{
                      width: 100,
                    }}
                    text="弃权"
                    onClick={() => handleVote(ShouldPass['弃权'])}>
                    弃权
                  </WalletButton>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
