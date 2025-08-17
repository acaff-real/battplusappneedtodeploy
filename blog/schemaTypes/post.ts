import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    // ✅ 1. ADD A REFERENCE TO THE AUTHOR
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'}, // This links to your 'author' schema
    }),
    // ✅ 2. ADD AN ARRAY OF CATEGORY REFERENCES
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}], // Links to your 'category' schema
    }),
    // ✅ 3. ADD THE RICH TEXT BODY FIELD
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent', // This uses your 'blockContent.ts' schema
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],

  // Update the preview to show the author's name
  preview: {
    select: {
      title: 'title',
      author: 'author.name', // Select the author's name for the preview
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})