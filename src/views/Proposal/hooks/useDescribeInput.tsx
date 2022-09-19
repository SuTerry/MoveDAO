import React, { useState, useRef } from 'react'
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
  const [describeIsValid, setDescribeIsValid] = useState(false)

  const editorRef = useRef(null)

  type DescribeChangeParams = {
    html: string
    text: string
  }

  const handleDescribeChange = ({ html }: DescribeChangeParams) => {
    setDescribe(html)
    setDescribeIsValid(false)
  }

  const validateDescribeEditor = async (): Promise<boolean> => {
    const result = !!describe && describe.length < MAX_LENGTH
    setDescribeIsValid(!result)
    return result
  }

  const className = describeIsValid ? 'rc-md-editor-error' : ''

  const renderDescribeEditor = () => {
    return (
      <>
        <h6 className='p_f_c_label'>描述<sup>*</sup></h6>
        <MdEditor
          ref={editorRef}
          className={className}
          style={{ height: '300px' }}
          placeholder="描述"
          renderHTML={text => mdParser.render(text)}
          onChange={handleDescribeChange}
        />
      </>
    )
  }

  return { describe, validateDescribeEditor, renderDescribeEditor }
}

export default useDescribeInput
