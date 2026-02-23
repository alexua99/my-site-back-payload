import type { Block } from 'payload'

import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const SectionBlock: Block = {
  slug: 'sectionBlock',
  interfaceName: 'SectionBlock',
  labels: {
    singular: 'Section',
    plural: 'Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'richText',
      required: true,
      label: 'Title',
      admin: {
        description: 'Select text to make it bold or italic',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          BoldFeature(),
          ItalicFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Subtitle',
      admin: {
        description: 'Select text to make it bold or italic',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          BoldFeature(),
          ItalicFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'text',
      type: 'richText',
      label: 'Text (and lists)',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            BoldFeature(),
            ItalicFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            OrderedListFeature(),
            UnorderedListFeature(),
          ]
        },
      }),
    },
    {
      name: 'iconTextItems',
      type: 'array',
      label: 'Icon with text',
      admin: {
        description: 'Add items with icon and text',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          admin: {
            description: 'Image or SVG',
          },
        },
        {
          name: 'text',
          type: 'richText',
          label: 'Text',
          required: true,
          admin: {
            description: 'Select text to make it bold or italic',
          },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              BoldFeature(),
              ItalicFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      admin: {
        description: 'Optional',
      },
    },
  ],
}
