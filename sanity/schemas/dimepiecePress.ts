export default {
  name: 'dimepiecePress',
  type: 'document',
  title: 'Dimepiece Press',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Link To Article',
      name: 'link',
      type: 'url',
    },
    {
      title: 'Brand',
      name: 'brand',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Date Published',
      name: 'datePublished',
      type: 'date',
    },
  ],
}
