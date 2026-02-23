import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { slugField } from 'payload'

export const OpenJobs: CollectionConfig = {
  slug: 'open-jobs',
  labels: {
    singular: 'Open Position',
    plural: 'Open Positions',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'location', 'jobType', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'jobType',
      type: 'select',
      required: true,
      defaultValue: 'full-time',
      options: [
        {
          label: 'Full-time',
          value: 'full-time',
        },
        {
          label: 'Part-time',
          value: 'part-time',
        },
        {
          label: 'Contract',
          value: 'contract',
        },
        {
          label: 'Remote',
          value: 'remote',
        },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            OrderedListFeature(),
            UnorderedListFeature(),
          ]
        },
      }),
    },
    slugField(),
  ],
}
