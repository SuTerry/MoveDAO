import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'

import { proposalsApi } from '@api/index'

import useTitleInput from './useTitleInput'
import useDescribeInput from './useDescribeInput'
import useDatePicker from './useDatePicker'

import message from '@components/Message'

import './index.less'

export default (): JSX.Element => {

  const navigate = useNavigate()

  const { title, validateTitleInput, renderTitleTextField } = useTitleInput()

  const { describe, validateDescribeEditor, renderDescribeEditor } = useDescribeInput()

  const { startDate, endDate, validateDatePicker, renderDatePicker } = useDatePicker()


  const handleSubmit = async () => {

    const validTitle = await validateTitleInput()
    const validDescribe = await validateDescribeEditor()
    const validDate = await validateDatePicker()

    if (validTitle && validDescribe && validDate) {
      proposalsApi.createProposal([title, describe, startDate!.valueOf(), endDate!.valueOf()]).then(() => {
        message.success('提案提交成功')
        navigate('/')
      })
    }
  }

  return (
    <div className='proposal'>
      <div className="proposal_back">
        <Button
          variant="contained"
          sx={{
            width: 100,
          }}
          onClick={() => navigate('/')}>
          返回
        </Button>
      </div>
      <div className="proposal_form">
        <h1 className="proposal_form_title">发起提案</h1>
        <h6 className="proposal_form_subTitle">您需要持有至少100个积分才可以发起提案</h6>
        <div className="proposal_form_context">
          <div className="p_f_c_title">
            {renderTitleTextField()}
          </div>
          <div className="p_f_c_description">
            {renderDescribeEditor()}
          </div>
          <div className='p_f_c_date'>
            {renderDatePicker()}
          </div>
          <div className="p_f_c_button">
            <p>每一份提案均会上传Aptos区块链</p>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                height: 50
              }}
              onClick={handleSubmit}>
              提交
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
