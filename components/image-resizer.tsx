'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageResizerProps {
  isOpen: boolean
  onClose: () => void
  onSave: (imageUrl: string) => void
  imageFile: File | null
}

export function ImageResizer({ isOpen, onClose, onSave, imageFile }: ImageResizerProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0
  })
  const [imageUrl, setImageUrl] = useState<string>('')
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined)

  // Load image when file changes
  useState(() => {
    if (imageFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(imageFile)
    }
  })

  const handleSave = async () => {
    if (!imageRef.current || !crop.width || !crop.height) return

    const canvas = document.createElement('canvas')
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height
    const pixelRatio = window.devicePixelRatio
    
    canvas.width = crop.width * scaleX
    canvas.height = crop.height * scaleY
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      imageRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    )

    // Convert canvas to blob
    canvas.toBlob(
      (blob) => {
        if (!blob) return
        const resizedImageUrl = URL.createObjectURL(blob)
        onSave(resizedImageUrl)
        onClose()
      },
      'image/jpeg',
      0.95
    )
  }

  const aspectRatios = {
    'Free': undefined,
    '16:9': 16/9,
    '4:3': 4/3,
    '1:1': 1,
    '3:4': 3/4,
    '9:16': 9/16
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Resize Image</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.entries(aspectRatios).map(([name, ratio]) => (
              <Button
                key={name}
                variant={aspectRatio === ratio ? "default" : "outline"}
                onClick={() => {
                  setAspectRatio(ratio)
                  if (ratio) {
                    setCrop(prev => ({
                      ...prev,
                      unit: '%',
                      width: 100,
                      height: 100 / ratio
                    }))
                  }
                }}
              >
                {name}
              </Button>
            ))}
          </div>

          <div className="border rounded-lg overflow-hidden">
            {imageUrl && (
              <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                aspect={aspectRatio}
              >
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Crop preview"
                  className="max-h-[600px] w-full object-contain"
                />
              </ReactCrop>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Image
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 