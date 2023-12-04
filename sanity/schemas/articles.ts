import {defineField} from 'sanity'
export default {
  name: 'articles',
  type: 'document',
  title: 'Articles',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Author',
      name: 'author',
      type: 'string',
    },
    {
      title: 'Author Link',
      name: 'authorLink',
      type: 'url',
    },
    {
      title: 'Photographer',
      name: 'photographer',
      type: 'string',
    },
    {
      title: 'Photographer Link',
      name: 'photographerLink',
      type: 'url',
    },
    {
      title: 'Cover Image',
      name: 'coverImage',
      type: 'image',
    },
    {
      title: 'Featured',
      name: 'isFeatured',
      type: 'boolean',
    },
    {
      title: 'Most Discussed',
      name: 'mostDiscussed',
      type: 'boolean',
    },
    {
      title: 'Preview Description',
      name: 'previewDescription',
      type: 'string',
      validation: Rule => 
        Rule.custom((description,context)=> 
          {if((context.document.isFeatured || context.document.mostDiscussed) && !description) 
            return "Preview Description is required for a 'Featured' or 'Most Discussed' article.";
          else return true})
    },
    defineField({
      name: 'body',
      title: 'Body',
      type: 'body',
    }),
    {
      title: 'Date Published',
      name: 'datePublished',
      type: 'date',
    },
    {
      title: 'Category',
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Dial Dimepiece', value: 'Dial Dimepiece'},
          {title: 'Digital Dimes', value: 'Digital Dimes'},
          {title: 'Dream Watch', value: 'Dream Watch'},
          {title: 'First Dimers', value: 'First Dimers'},
          {title: "Brynn's Tips", value: "Brynn's Tips"},
          {title: 'In The Field', value: 'In The Field'},
          {title: 'Interview', value: 'Interview'},
        ],
      },
    },
  ],
}
