'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Button } from './ui/button'
import { useState } from 'react'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

// Custom resizable image extension
const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: 'auto',
        renderHTML: attributes => ({
          width: attributes.width,
          style: `width: ${attributes.width}; max-width: 100%;`,
        }),
      },
      height: {
        default: 'auto',
        renderHTML: attributes => ({
          height: attributes.height,
          style: `height: ${attributes.height};`,
        }),
      },
      alt: {
        default: null,
        renderHTML: attributes => ({
          alt: attributes.alt,
        }),
      },
      title: {
        default: null,
        renderHTML: attributes => ({
          title: attributes.title,
        }),
      },
      loading: {
        default: 'lazy',
        renderHTML: attributes => ({
          loading: attributes.loading,
        }),
      },
    }
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement('div')
      const wrapper = document.createElement('div')
      const img = document.createElement('img')

      // Set up container
      container.style.position = 'relative'
      container.style.display = 'inline-block'
      container.contentEditable = 'false'
      container.draggable = true
      container.style.margin = '5px'

      // Set up wrapper
      wrapper.style.position = 'relative'
      wrapper.style.display = 'inline-block'
      wrapper.style.width = node.attrs.width || 'auto'
      wrapper.style.cursor = 'pointer'

      // Set up image
      img.src = node.attrs.src
      img.alt = node.attrs.alt || ''
      img.title = node.attrs.title || ''
      img.loading = 'lazy'
      img.style.width = '100%'
      img.style.height = 'auto'
      img.draggable = false

      // Create resize handles
      const handles = ['nw', 'ne', 'sw', 'se'].map(position => {
        const handle = document.createElement('div')
        handle.style.position = 'absolute'
        handle.style.width = '10px'
        handle.style.height = '10px'
        handle.style.backgroundColor = '#4f46e5'
        handle.style.border = '1px solid white'
        handle.style.borderRadius = '50%'
        handle.style.cursor = `${position}-resize`

        switch (position) {
          case 'nw':
            handle.style.top = '-5px'
            handle.style.left = '-5px'
            break
          case 'ne':
            handle.style.top = '-5px'
            handle.style.right = '-5px'
            break
          case 'sw':
            handle.style.bottom = '-5px'
            handle.style.left = '-5px'
            break
          case 'se':
            handle.style.bottom = '-5px'
            handle.style.right = '-5px'
            break
        }

        return handle
      })

      // Add resize functionality
      handles.forEach(handle => {
        let startX: number
        let startY: number
        let startWidth: number
        let startHeight: number

        handle.addEventListener('mousedown', (e: MouseEvent) => {
          e.preventDefault()
          startX = e.clientX
          startY = e.clientY
          startWidth = wrapper.offsetWidth
          startHeight = wrapper.offsetHeight

          const handleMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - startX
            const dy = e.clientY - startY
            const newWidth = startWidth + dx
            const aspectRatio = img.naturalWidth / img.naturalHeight
            const newHeight = newWidth / aspectRatio

            if (newWidth >= 100) {
              wrapper.style.width = `${newWidth}px`
              wrapper.style.height = 'auto'

              if (typeof getPos === 'function') {
                editor.commands.updateAttributes('image', {
                  width: `${newWidth}px`,
                  height: 'auto',
                })
              }
            }
          }

          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
          }

          document.addEventListener('mousemove', handleMouseMove)
          document.addEventListener('mouseup', handleMouseUp)
        })
      })

      // Add alt text edit functionality
      const editAltText = () => {
        const alt = window.prompt('Enter alt text for image:', node.attrs.alt || '')
        if (alt !== null && typeof getPos === 'function') {
          editor.commands.updateAttributes('image', {
            alt: alt,
            title: alt // Also update title for tooltip
          })
        }
      }

      // Add alt text button
      const altButton = document.createElement('button')
      altButton.innerHTML = 'Alt Text'
      altButton.style.position = 'absolute'
      altButton.style.top = '-30px'
      altButton.style.left = '0'
      altButton.style.backgroundColor = '#4f46e5'
      altButton.style.color = 'white'
      altButton.style.padding = '4px 8px'
      altButton.style.borderRadius = '4px'
      altButton.style.fontSize = '12px'
      altButton.style.display = 'none'
      altButton.onclick = editAltText

      wrapper.appendChild(altButton)

      // Update hover effect to show alt button
      wrapper.addEventListener('mouseover', () => {
        handles.forEach(handle => handle.style.display = 'block')
        altButton.style.display = 'block'
        wrapper.style.outline = '2px solid #4f46e5'
      })

      wrapper.addEventListener('mouseout', (e) => {
        if (!wrapper.contains(e.relatedTarget as Node)) {
          handles.forEach(handle => handle.style.display = 'none')
          altButton.style.display = 'none'
          wrapper.style.outline = 'none'
        }
      })

      // Initially hide handles
      handles.forEach(handle => {
        handle.style.display = 'none'
        wrapper.appendChild(handle)
      })

      wrapper.appendChild(img)
      container.appendChild(wrapper)

      return {
        dom: container,
        destroy: () => {
          // Cleanup event listeners if needed
        },
      }
    }
  },
})

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  onSubmit?: () => void
  showSubmitButton?: boolean
  submitButtonText?: string
}

export function RichTextEditor({ 
  content,
  onChange,
  onSubmit,
  showSubmitButton = false,
  submitButtonText = 'Create Post'
}: RichTextEditorProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const { url } = await response.json()
      
      // Prompt for alt text
      const alt = window.prompt('Enter alt text for image:', file.name)
      
      editor?.chain().focus().insertContent({
        type: 'image',
        attrs: {
          src: url,
          alt: alt || file.name,
          title: alt || file.name
        }
      }).run()

    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizableImage,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none',
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b bg-muted/50 p-2">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'bg-muted' : ''}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'bg-muted' : ''}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'bg-muted' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'bg-muted' : ''}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'bg-muted' : ''}
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const url = window.prompt('Enter URL')
              if (url) {
                editor.chain().focus().setLink({ href: url }).run()
              }
            }}
            className={editor.isActive('link') ? 'bg-muted' : ''}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.accept = 'image/*'
              input.onchange = async (e) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                if (file) {
                  await handleImageUpload(file)
                }
              }
              input.click()
            }}
            disabled={isUploading}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <EditorContent editor={editor} className="prose max-w-none p-4" />
      
      {showSubmitButton && (
        <div className="border-t bg-muted/50 p-2 flex justify-end">
          <Button
            onClick={onSubmit}
            disabled={isUploading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isUploading ? 'Uploading...' : submitButtonText}
          </Button>
        </div>
      )}
    </div>
  )
} 