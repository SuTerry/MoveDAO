import React, { forwardRef, ForwardedRef } from 'react'

import { Dialog } from '@mui/material'

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'

import { DescribeChangeParams } from '..'

import 'react-markdown-editor-lite/lib/index.css'

const mdParser = new MarkdownIt()

export interface MdEditorDialogProps {
  value: string
  open: boolean
  onClose: () => void
  onChange: (props: DescribeChangeParams) => void
}

export default forwardRef((props: MdEditorDialogProps, ref: ForwardedRef<MdEditor>): JSX.Element => {

  const { value, open, onClose, onChange } = props

  return (
    <Dialog onClose={onClose} open={open} fullWidth={true} maxWidth="md">
      <MdEditor
        ref={ref}
        value={value}
        style={{ height: '500px' }}
        placeholder="请输入价值、周期、预期成果"
        renderHTML={text => mdParser.render(text)}
        onChange={onChange}
      />
    </Dialog>
  )
})