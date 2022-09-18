import React, { useState, ChangeEvent } from 'react'

import { TextField } from '@mui/material'

interface useDescribeInputReturn {
  describe: string
  validateDescribeInput: () => Promise<boolean>
  renderDescribeTextField: () => JSX.Element
}

const MAX_LENGTH = 10000

const useDescribeInput = (): useDescribeInputReturn => {
  const [describe, setDescribe] = useState('')
  const [describeIsValid, setDescribeIsValid] = useState(false)
  const [describeLength, setDescribeLength] = useState(0)

  const handleDescribeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setDescribe(value)
    setDescribeIsValid(false)
    setDescribeLength(value.length)
  }

  const validateDescribeInput = async (): Promise<boolean> => {
    const result = !!describe && describe.length < MAX_LENGTH
    setDescribeIsValid(!result)
    return result
  }

  const renderDescribeTextField = (): JSX.Element => {
    return (
      <TextField
        sx={{
          width: '100%',
        }}
        error={describeIsValid}
        required
        label="描述"
        multiline
        minRows={5}
        value={describe}
        placeholder="价值、周期、预期成果"
        helperText={`${describeLength} / ${MAX_LENGTH}`}
        onChange={handleDescribeChange}
      />
    )
  }

  return { describe, validateDescribeInput, renderDescribeTextField }
}

export default useDescribeInput
