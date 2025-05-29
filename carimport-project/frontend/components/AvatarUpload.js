'use client'

import { UploadButton } from '@uploadthing/react'
import '@uploadthing/react/styles.css'

export default function AvatarUpload({ onUpload }) {
    return (
        <div className="space-y-2">
            <UploadButton
                endpoint="avatarUploader"
                onClientUploadComplete={(res) => {
                    const url = res?.[0]?.url
                    if (url) {
                        onUpload(url)
                        alert('✅ Аватар загружен!')
                    }
                }}
                onUploadError={(error) => {
                    alert(`❌ Ошибка: ${error.message}`)
                }}
            />
        </div>
    )
}
