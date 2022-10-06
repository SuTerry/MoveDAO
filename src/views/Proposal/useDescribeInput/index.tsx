import React, { useState, useRef, useEffect } from 'react'

import { TextField } from '@mui/material'

import MdEditorDialog from './MdEditorDialog'

import MdEditor from 'react-markdown-editor-lite'

const MAX_LENGTH = 10000

interface useDescribeInputReturn {
  describe: string
  describeHtml: string
  validateDescribeEditor: () => Promise<boolean>
  renderDescribeEditor: () => JSX.Element
}

export type DescribeChangeParams = {
  html: string
  text: string
}

const useDescribeInput = (): useDescribeInputReturn => {
  const [describe, setDescribe] = useState('')
  const [describeHtml, setDescribeHTML] = useState('')
  const [describeIsValid, setDescribeIsValid] = useState(false)
  const [open, setOpen] = React.useState(false)

  const describeRef = useRef<HTMLInputElement>(null)

  const mdEditorRef = useRef<MdEditor>(null)

  const handleDescribeChange = ({ text, html }: DescribeChangeParams) => {
    setDescribe(text)
    setDescribeHTML(html)
    setDescribeIsValid(false)
  }

  const validateDescribeEditor = async (): Promise<boolean> => {
    const result = !!describe && describe.length < MAX_LENGTH
    setDescribeIsValid(!result)
    return result
  }

  const handleDescribeFocus = () => {
    Promise.resolve().then(() => {
      setOpen(true)
      describeRef.current?.blur()
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      Promise.resolve().then(() => {
        mdEditorRef.current?.nodeMdText.current.focus()
      })
    }
  }, [open])

  const renderDescribeEditor = () => {
    return (
      <>
        <h6 className='p_f_c_label p_f_c_describe'>
          <span>描述<sup>*</sup></span>
          <span className={`p_f_c_d_num ${describeIsValid ? 'p_f_c_d_error' : ''}`}>{describe.length} / {MAX_LENGTH}</span>
        </h6>
        <TextField
          sx={{
            width: '100%',
          }}
          inputRef={describeRef}
          label="描述"
          value={describe}
          error={describeIsValid}
          onFocus={handleDescribeFocus}
          required
          multiline
          rows={4}
          placeholder="请输入价值、周期、预期成果"
        />
        <MdEditorDialog ref={mdEditorRef} open={open} onClose={handleClose} value={describe} onChange={handleDescribeChange} />
      </>
    )
  }

  return { describe, describeHtml, validateDescribeEditor, renderDescribeEditor }
}

export default useDescribeInput
