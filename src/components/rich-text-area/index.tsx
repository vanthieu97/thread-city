'use client'

import {useEditor, EditorContent, type EditorContentProps} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import {Color} from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import cn from '@/utils/cn'

interface RichTextareaProps
  extends Omit<EditorContentProps, 'onChange' | 'editor'> {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

const RichTextarea = ({
  value,
  onChange,
  className,
  placeholder = 'Write something...',
  ...props
}: RichTextareaProps) => {
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
        // Optional: customize the placeholder style
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: value,
    onUpdate: ({editor}) => {
      onChange?.(editor.getHTML())
    },
  })

  const classes = cn(
    '[&_.ProseMirror]:outline-none',
    '[&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:text-gray-500 [&_.is-editor-empty]:before:pointer-events-none',
    '[&_.is-editor-empty]:before:absolute [&_.is-editor-empty]:before:top-0 [&_.is-editor-empty]:before:whitespace-nowrap',
    className,
  )

  return <EditorContent editor={editor} className={classes} {...props} />
}

export default RichTextarea
