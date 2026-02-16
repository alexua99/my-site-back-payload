import { put } from '@vercel/blob'

export async function POST(): Promise<Response> {
  const { url } = await put('articles/blob.txt', 'Hello World!', {
    access: 'public',
  })

  return Response.json({ url })
}
