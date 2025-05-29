import { createUploadthing } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
    avatarUploader: f({ image: { maxFileSize: '2MB' } })
        .middleware(async () => {
            return { userId: 'anonymous' }
        })
        .onUploadComplete(async ({ file }) => {
            console.log('✅ Файл загружен:', file.url)
        }),
}
