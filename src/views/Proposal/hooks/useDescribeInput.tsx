// import React, { useState, ChangeEvent } from 'react'

// import { TextField } from '@mui/material'

// interface useDescribeInputReturn {
//   describe: string
//   validateDescribeInput: () => Promise<boolean>
//   renderDescribeTextField: () => JSX.Element
// }

// const MAX_LENGTH = 10000

// const useDescribeInput = (): useDescribeInputReturn => {
//   const [describe, setDescribe] = useState('')
//   const [describeIsValid, setDescribeIsValid] = useState(false)
//   const [describeLength, setDescribeLength] = useState(0)

//   const handleDescribeChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value
//     setDescribe(value)
//     setDescribeIsValid(false)
//     setDescribeLength(value.length)
//   }

//   const validateDescribeInput = async (): Promise<boolean> => {
//     const result = !!describe && describe.length < MAX_LENGTH
//     setDescribeIsValid(!result)
//     return result
//   }

//   const renderDescribeTextField = (): JSX.Element => {
//     return (
//       <TextField
//         sx={{
//           width: '100%',
//         }}
//         error={describeIsValid}
//         required
//         label="描述"
//         multiline
//         minRows={5}
//         value={describe}
//         placeholder="价值、周期、预期成果"
//         helperText={`${describeLength} / ${MAX_LENGTH}`}
//         onChange={handleDescribeChange}
//       />
//     )
//   }

//   return { describe, validateDescribeInput, renderDescribeTextField }
// }

// export default useDescribeInput

import React, { useState } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'

import 'react-markdown-editor-lite/lib/index.css'

const MAX_LENGTH = 10000

const mdParser = new MarkdownIt()

interface useDescribeInputReturn {
  describe: string
  validateDescribeEditor: () => Promise<boolean>
  renderDescribeEditor: () => JSX.Element
}

const useDescribeInput = (): useDescribeInputReturn => {
  const [describe, setDescribe] = useState('')

  type DescribeChangeParams = {
    html: string
    text: string
  }

  const handleDescribeChange = ({ html }: DescribeChangeParams) => {
    setDescribe(html)
  }

  const validateDescribeEditor = async (): Promise<boolean> => {
    const result = !!describe && describe.length < MAX_LENGTH
    // setDescribeIsValid(!result)
    return result
  }

  const renderDescribeEditor = () => {
    return <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} onChange={handleDescribeChange} />
  }

  return { describe, validateDescribeEditor, renderDescribeEditor }
}

export default useDescribeInput
