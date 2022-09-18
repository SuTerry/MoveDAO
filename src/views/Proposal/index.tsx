import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'

import useTitleInput from './hooks/useTitleInput'
import useDescribeInput from './hooks/useDescribeInput'
import useDatePicker from './hooks/useDatePicker'

import './index.less'

export default (): JSX.Element => {

  const navigate = useNavigate()

  const {
    title,
    validateTitleInput,
    renderTitleTextField
  } = useTitleInput()

  const {
    describe,
    validateDescribeInput,
    renderDescribeTextField
  } = useDescribeInput()

  const {
    startDate,
    endDate,
    validateDatePicker,
    renderDatePicker
  } = useDatePicker()


  const handleSubmit = async () => {
    const validTitle = await validateTitleInput()
    const validDescribe = await validateDescribeInput()
    const validDate = await validateDatePicker()



    title
    describe
    startDate
    endDate
    validTitle
    validDescribe
    validDate

    // console.log(title, 'title')
    // console.log(describe, 'describe')
    // console.log(startDate?.valueOf(), 'startDate')
    // console.log(endDate?.valueOf(), 'endDate')

    // console.log(validTitle, 'validTitle')
    // console.log(validDescribe, 'validDescribe')
    // console.log(validDate, 'validDate')

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
            {renderDescribeTextField()}
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
