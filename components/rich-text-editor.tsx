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
                class: 'prose max-w-none focus:outline-none min-h-[150px] px-4 py-3 bg-white rounded-lg border border-gray-600 prose-p:text-black prose-p:leading-relaxed prose-p:text-lg prose-headings:text-black prose-headings:font-bold prose-h1:text-4xl prose-h1:mb-8 prose-h2:text-3xl prose-h2:mb-6 prose-h3:text-2xl prose-h3:mb-4 prose-h4:text-xl prose-h4:mb-4 prose-strong:text-black prose-strong:font-bold prose-em:text-black prose-em:italic prose-ul:text-black prose-ul:list-disc prose-ol:text-black prose-ol:list-decimal prose-li:text-black prose-li:my-2 prose-code:text-[#5ce1e6] prose-code:bg-black/5 prose-code:px-1 prose-code:rounded prose-pre:bg-black/5 prose-pre:p-4 prose-pre:rounded-lg prose-blockquote:text-black prose-blockquote:border-l-4 prose-blockquote:border-[#5ce1e6] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6 prose-a:text-[#5ce1e6] prose-a:no-underline hover:prose-a:underline focus:border-[#5ce1e6] focus:ring-1 focus:ring-[#5ce1e6] transition-colors duration-200 [&_.is-editor-empty]:text-gray-500',
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
                        `Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'
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
        <div className="bg-black/5 rounded-lg overflow-hidden border border-[#5ce1e6]/20">
            <div className="flex space-x-2 p-2 bg-black/20">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded bg-white ${editor.isActive('bold') ? 'bg-white/10' : ''
                        }`}
                    title="Bold"
                >
                    <Bold className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded bg-white ${editor.isActive('italic') ? 'bg-white/10' : ''
                        }`}
                    title="Italic"
                >
                    <Italic className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 rounded bg-white ${editor.isActive('heading', { level: 1 }) ? 'bg-white/10' : ''
                        }`}
                    title="Heading 1"
                >
                    <Heading1 className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded bg-white ${editor.isActive('heading', { level: 2 }) ? 'bg-white/10' : ''
                        }`}
                    title="Heading 2"
                >
                    <Heading2 className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded bg-white ${editor.isActive('bulletList') ? 'bg-white/10' : ''
                        }`}
                    title="Bullet List"
                >
                    <List className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded bg-white ${editor.isActive('orderedList') ? 'bg-white/10' : ''
                        }`}
                    title="Ordered List"
                >
                    <ListOrdered className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`p-2 rounded bg-white ${editor.isActive('blockquote') ? 'bg-white/10' : ''
                        }`}
                    title="Quote"
                >
                    <Quote className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="p-2 rounded bg-white disabled:opacity-50"
                    title="Undo"
                >
                    <Undo className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="p-2 rounded bg-white disabled:opacity-50"
                    title="Redo"
                >
                    <Redo className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    onClick={addImage}
                    className={`p-2 rounded bg-white ${isUploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={isUploading}
                    title="Add Image"
                >
                    <ImageIcon className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    onClick={addLink}
                    className={`p-2 rounded bg-white ${editor.isActive('link') ? 'bg-white/10' : ''
                        }`}
                    title="Add Link"
                >
                    <LinkIcon className="w-5 h-5" />
                </button>
            </div>

            <EditorContent editor={editor} />

            {isUploading && (
                <div className="p-2 text-sm text-[#5ce1e6]">
                    Uploading image...
                </div>
            )}
        </div>
    )
} 