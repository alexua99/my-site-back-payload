import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { slugField } from 'payload'

export const OpenJobs: CollectionConfig<'open-jobs'> = {
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
      label: 'Job Title',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Location',
      admin: {
        placeholder: 'e.g., Kyiv, Ukraine',
      },
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
      label: 'Job Type',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Short Description',
      admin: {
        description: 'Brief overview shown in the list',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Job Description',
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
