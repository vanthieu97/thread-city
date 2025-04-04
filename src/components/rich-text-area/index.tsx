'use client'

import {useEditor, EditorContent, type EditorContentProps} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import {Color} from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import cn from '@/utils/cn'
import {forwardRef, useImperativeHandle} from 'react'

interface RichTextareaProps
  extends Omit<EditorContentProps, 'onChange' | 'editor'> {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export interface RichTextareaRef {
  reset: () => void
  getContent: () => string
}

const RichTextarea = forwardRef<RichTextareaRef, RichTextareaProps>(
  (
    {value, onChange, className, placeholder = 'Write something...', ...props},
    ref,
  ) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-blue-400 underline',
          },
        }),
        TextStyle,
        Color,
        Placeholder.configure({
          placeholder,
          emptyEditorClass: 'is-editor-empty',
        }),
      ],
      content: value,
      onUpdate: ({editor}) => {
        onChange?.(editor.getHTML())
      },
      autofocus: 'end',
    })

    const reset = () => {
      editor?.commands.clearContent()
    }

    const getContent = () => {
      return editor?.getHTML() || ''
    }

    const classes = cn(
      '[&_.ProseMirror]:outline-none',
      '[&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:text-gray-500 [&_.is-editor-empty]:before:pointer-events-none',
      '[&_.is-editor-empty]:before:absolute [&_.is-editor-empty]:before:top-0 [&_.is-editor-empty]:before:whitespace-nowrap',
      className,
    )

    useImperativeHandle(ref, () => ({
      reset,
      getContent: getContent,
    }))

    return <EditorContent editor={editor} className={classes} {...props} />
  },
)

RichTextarea.displayName = 'RichTextarea'

export default RichTextarea
