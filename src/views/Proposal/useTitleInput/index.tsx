import React, { useState, ChangeEvent } from 'react'

import { TextField } from '@mui/material'

interface useTitleInputReturn {
  title: string
  validateTitleInput: () => Promise<boolean>
  renderTitleTextField: () => JSX.Element
}

const useTitleInput = (): useTitleInputReturn => {
  const [title, setTitle] = useState('')
  const [titleIsValid, setTitleIsValid] = useState(false)

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    setTitleIsValid(false)
  }

  const validateTitleInput = async (): Promise<boolean> => {
    const result = !!title
    setTitleIsValid(!result)
    return result
  }

  const renderTitleTextField = (): JSX.Element => {
    return (
      <>
        <h6 className='p_f_c_label'>标题<sup>*</sup></h6>
        <TextField
          sx={{
            width: '100%',
          }}
          value={title}
          error={titleIsValid}
          required
          label="标题"
          placeholder="请输入标题"
          onChange={handleTitleChange}
        />
      </>
    )
  }

  return { title, validateTitleInput, renderTitleTextField }
}

export default useTitleInput
