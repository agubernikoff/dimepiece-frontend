export default {
    name: 'about',
    type: 'document',
    title: 'About',
    fields: [
        {
            title: 'Text1',
            name: 'text1',
            type: 'body',
        },
        {
            title: 'Text2',
            name: 'text2',
            type: 'body',
        },
        {
            title: 'Text3 Header',
            name: 'text3Header',
            type: 'string',
        },
        {
            title:'Brynn Portrait',
            name: 'brynnPortrait',
            type:'image'
        },
        {
            title:'Text3 Body',
            name: 'text3Body',
            type: 'body'
        },
        {
            title:'Brands',
            name:'brands',
            type: 'array',
            of: 'image'
        },
        {
            title:'Dimepiece Press',
            name:'dimepiecePress',
            type:'array',
            of:[{type:'dimepiecePress'}]
        }
    ],
  }