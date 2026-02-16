import { put } from '@vercel/blob'

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024

export async function POST(req: Request): Promise<Response> {
  const contentType = req.headers.get('content-type') || ''

  // Image upload mode: multipart/form-data with "file"
  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData()
    const file = formData.get('file')
    const fileNameFromBody = formData.get('filename')

    if (!(file instanceof File)) {
      return Response.json({ error: 'Missing file in form-data. Use field "file".' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return Response.json({ error: `Only images are allowed. Got "${file.type}".` }, { status: 400 })
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return Response.json(
        { error: `Image is too large. Max size is ${MAX_IMAGE_SIZE_BYTES / (1024 * 1024)}MB.` },
        { status: 400 },
      )
    }

    const safeName = file.name.replace(/\s+/g, '-')
    const pathname =
      typeof fileNameFromBody === 'string' && fileNameFromBody.trim().length > 0
        ? fileNameFromBody
        : `images/${Date.now()}-${safeName}`

    const { url } = await put(pathname, file, { access: 'public' })
    return Response.json({ mode: 'image', url })
  }

  // Text upload mode: JSON body (for quick testing)
  const body = (await req.json().catch(() => null)) as { content?: string; pathname?: string } | null
  const pathname = body?.pathname || 'articles/blob.txt'
  const content = body?.content || 'Hello World!'

  const { url } = await put(pathname, content, { access: 'public' })
  return Response.json({ mode: 'text', url })
}
