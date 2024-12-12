'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  Code,
} from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (value: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#5ce1e6] underline',
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[150px] px-4 py-3 bg-white/5 rounded-lg border border-gray-600 prose-p:text-white prose-p:leading-relaxed prose-p:text-lg prose-headings:text-white prose-headings:font-bold prose-h1:text-4xl prose-h1:mb-8 prose-h2:text-3xl prose-h2:mb-6 prose-h3:text-2xl prose-h3:mb-4 prose-h4:text-xl prose-h4:mb-4 prose-strong:text-white prose-strong:font-bold prose-em:text-white prose-em:italic prose-ul:text-white prose-ul:list-disc prose-ol:text-white prose-ol:list-decimal prose-li:text-white prose-li:my-2 prose-code:text-[#5ce1e6] prose-code:bg-white/5 prose-code:px-1 prose-code:rounded prose-pre:bg-white/10 prose-pre:p-4 prose-pre:rounded-lg prose-blockquote:text-white prose-blockquote:border-l-4 prose-blockquote:border-[#5ce1e6] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6 prose-a:text-[#5ce1e6] prose-a:no-underline hover:prose-a:underline focus:border-[#5ce1e6] focus:ring-1 focus:ring-[#5ce1e6] transition-colors duration-200',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  const addImage = async () => {
    if (!editor) {
      console.error('Editor instance is not available.')
      toast.error('Editor not initialized.')
      return
    }

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.style.display = 'none' // Hide the input from the UI
    document.body.appendChild(input)

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0]
        const formData = new FormData()
        formData.append('image', file)

        setIsUploading(true)
        console.log('Uploading image:', file.name)
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })

          if (!response.ok) {
            const errorData = await response.json()
            console.error('Upload failed:', errorData.error)
            throw new Error(errorData.error || 'Failed to upload image')
          }

          const data = await response.json()
          editor.chain().focus().setImage({ src: data.url }).run()
          toast.success('Image uploaded successfully')
        } catch (error) {
          console.error('Image upload error:', error)
          toast.error(
            `Failed to upload image: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`
          )
        } finally {
          setIsUploading(false)
          document.body.removeChild(input) // Clean up the input element
        }
      } else {
        console.warn('No file selected for upload.')
        setIsUploading(false)
        document.body.removeChild(input) // Clean up even if no file was selected
      }
    }

    input.click()
  }

  const addLink = () => {
    if (!editor) {
      console.error('Editor instance is not available.')
      toast.error('Editor not initialized.')
      return
    }

    const url = prompt('Enter the URL')
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
      toast.success('Link added successfully')
    } else {
      console.warn('No URL provided for the link.')
    }
  }

  if (!isMounted || !editor) {
    return (
      <div className="bg-white/5 rounded-lg overflow-hidden border border-[#5ce1e6]/20 h-64 animate-pulse" />
    )
  }

  return (
    <div className="border border-[#5ce1e6]/20 rounded-md overflow-hidden">
      <div className="bg-white/5 border-b border-[#5ce1e6]/20">
        <div className="overflow-x-auto">
          <div className="flex items-center space-x-1 p-2 min-w-max">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded bg-white ${
                editor.isActive('bold') ? 'bg-white/10' : ''
              }`}
              title="Bold"
            >
              <Bold className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded bg-white ${
                editor.isActive('italic') ? 'bg-white/10' : ''
              }`}
              title="Italic"
            >
              <Italic className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded bg-white ${
                editor.isActive('bulletList') ? 'bg-white/10' : ''
              }`}
              title="Bullet List"
            >
              <List className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded bg-white ${
                editor.isActive('orderedList') ? 'bg-white/10' : ''
              }`}
              title="Ordered List"
            >
              <ListOrdered className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded bg-white ${
                editor.isActive('blockquote') ? 'bg-white/10' : ''
              }`}
              title="Quote"
            >
              <Quote className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-2 rounded bg-white ${
                editor.isActive('codeBlock') ? 'bg-white/10' : ''
              }`}
              title="Code Block"
            >
              <Code className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              type="button"
              onClick={addImage}
              disabled={isUploading}
              className={`p-2 rounded bg-white ${
                isUploading ? 'opacity-50' : ''
              }`}
              title="Add Image"
            >
              <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <div className="h-6 w-px bg-white/20 mx-1" />
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="p-2 rounded bg-white disabled:opacity-50"
              title="Undo"
            >
              <Undo className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="p-2 rounded bg-white disabled:opacity-50"
              title="Redo"
            >
              <Redo className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>

      <EditorContent 
        editor={editor} 
        className="prose-sm md:prose-base lg:prose-lg prose-invert w-full text-white"
      />

      {isUploading && (
        <div className="p-2 text-sm text-[#5ce1e6]">
          Uploading image...
        </div>
      )}

      <style jsx global>{`
        .ProseMirror {
          padding: 0.75rem;
          min-height: 150px;
          outline: none;
        }

        @media (min-width: 768px) {
          .ProseMirror {
            padding: 1rem;
            min-height: 200px;
          }
        }

        .ProseMirror > * + * {
          margin-top: 0.75em;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1em 0;
        }

        @media (max-width: 768px) {
          .ProseMirror img {
            margin: 0.75em 0;
          }
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.2em;
        }

        @media (min-width: 768px) {
          .ProseMirror ul,
          .ProseMirror ol {
            padding-left: 1.5em;
          }
        }

        .ProseMirror blockquote {
          border-left: 3px solid #5ce1e6;
          padding-left: 1em;
          margin-left: 0;
          font-style: italic;
        }

        .ProseMirror pre {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0.25rem;
          padding: 0.5em 0.75em;
          overflow-x: auto;
        }

        .ProseMirror code {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0.25rem;
          padding: 0.2em 0.4em;
        }
      `}</style>
    </div>
  )
} 