import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Team: CollectionConfig<'team'> = {
  slug: 'team',
  labels: {
    singular: 'Team Member',
    plural: 'Team',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'position', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle / Job Title',
    },
    {
      name: 'position',
      type: 'select',
      required: true,
      defaultValue: 'members',
      options: [
        {
          label: 'Team Member',
          value: 'members',
        },
        {
          label: 'Regional Director Sona-Pharm',
          value: 'director_sona_pharm',
        },
        {
          label: 'Regional Director of Sona-Exim',
          value: 'director_sona_exim',
        },
        {
          label: 'General Director',
          value: 'general_director',
        },
      ],
      admin: {
        description: 'Select position. Director positions can only have one member.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Biography / Description',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Photo',
    },
    {
      name: 'linkidin',
      type: 'text',
      label: 'LinkedIn URL',
      admin: {
        placeholder: 'https://www.linkedin.com/in/username',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, req, operation, originalDoc }) => {
        // Проверяем уникальность позиций директоров только при создании или обновлении
        if (operation === 'create' || operation === 'update') {
          const directorPositions = ['director_sona_pharm', 'director_sona_exim', 'general_director']

          if (data?.position && directorPositions.includes(data.position)) {
            const whereClause: any = {
              position: {
                equals: data.position,
              },
            }

            // Исключаем текущий документ при обновлении
            if (operation === 'update' && originalDoc?.id) {
              whereClause.id = {
                not_equals: originalDoc.id,
              }
            }

            // Ищем существующую запись с такой же позицией директора
            const existing = await req.payload.find({
              collection: 'team',
              where: whereClause,
              limit: 1,
            })

            if (existing.docs.length > 0) {
              const positionLabels = {
                director_sona_pharm: 'Regional Director Sona-Pharm',
                director_sona_exim: 'Regional Director of Sona-Exim',
                general_director: 'General Director',
              }
              throw new Error(
                `Position "${positionLabels[data.position as keyof typeof positionLabels]}" is already taken. Only one person can have this position.`
              )
            }
          }
        }

        return data
      },
    ],
  },
}
