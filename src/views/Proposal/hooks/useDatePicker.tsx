import React, { useState } from 'react'

import { TextField } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

import { Dayjs } from 'dayjs'

interface useDatePickerReturn {
  startDate: Dayjs | null
  endDate: Dayjs | null
  validateDatePicker: () => Promise<boolean>
  renderDatePicker: () => JSX.Element
}

const useDatePicker = (): useDatePickerReturn => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [startDateValid, seStartDateIsValid] = useState(false)

  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [endDateValid, setEndDateIsValid] = useState(false)

  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue)
    seStartDateIsValid(false)
  }

  const handleEndDateChange = (newValue: Dayjs | null) => {
    setEndDate(newValue)
    setEndDateIsValid(false)
  }

  const validateDatePicker = async (): Promise<boolean> => {
    let startDateResult = !!startDate
    let endDateResult = !!endDate

    if (endDate && startDate) {
      startDateResult = endDateResult = (endDate.valueOf() - startDate.valueOf()) > -1
    }

    seStartDateIsValid(!startDateResult)
    setEndDateIsValid(!endDateResult)
    return startDateResult && endDateResult
  }

  const renderDatePicker = (): JSX.Element => {
    return (
      <>
        <h6 className='p_f_c_label'>开始投票日期<sup>*</sup></h6>
        <h6 className='p_f_c_label p_f_c_l_right'>结束投票日期<sup>*</sup></h6>
        
        <div className="p_f_c_d_data">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="开始投票日期"
              inputFormat="MM/DD/YYYY"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={params => <TextField {...params} required error={startDateValid} />}
              maxDate={endDate || undefined}
            />
          </LocalizationProvider>
          <div className="p_f_c_d_box">至</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="结束投票日期"
              inputFormat="MM/DD/YYYY"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={params => <TextField {...params} required error={endDateValid} />}
              minDate={startDate || undefined}
            />
          </LocalizationProvider>
        </div>
      </>
    )
  }

  return { startDate, endDate, validateDatePicker, renderDatePicker }
}

export default useDatePicker
