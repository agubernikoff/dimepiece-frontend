
export default {
    name: 'articles',
    type: 'document',
    title: 'Articles',
    fields: [
      {
        title: 'Title',
        name: 'title',
        type: 'string'
      },
      {
        title:'Cover Image',
        name:'coverImage',
        type: "image"
      },
      {
        title:'Date Published',
        name:'datePublished',
        type:'date'
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
            {title: 'Brynn\'s Tips', value: 'Brynn\'s Tips'},
            {title: 'In The Field', value: 'In The Field'},
            {title: 'Interviews', value: 'Interviews'},
          ]
        }
      },
      {
        title: 'Featured',
        name: 'isFeatured',
        type: 'boolean'
      },
      {
        title: 'Most Discussed',
        name: 'mostDiscussed',
        type: 'boolean'
      }
    ]
  }