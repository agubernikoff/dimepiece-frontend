import {TagIcon} from '@sanity/icons'
import pluralize from 'pluralize-esm'
import ShopifyIcon from '../../components/icons/Shopify'
import ProductHiddenInput from '../../components/inputs/ProductHidden'
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus'
import {defineField, defineType} from 'sanity'
import {getPriceRange} from '../../utils/getPriceRange'

const GROUPS = [
  {
    name: 'editorial',
    title: 'Editorial',
    default: true,
  },
  {
    name: 'shopifySync',
    title: 'Shopify sync',
    icon: ShopifyIcon,
  },
  {
    name: 'seo',
    title: 'SEO',
  },
]

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'hidden',
      type: 'string',
      components: {
        field: ProductHiddenInput,
      },
      group: GROUPS.map((group) => group.name),
      hidden: ({parent}) => {
        const isActive = parent?.store?.status === 'active'
        const isDeleted = parent?.store?.isDeleted
        return !parent?.store || (isActive && !isDeleted)
      },
    }),
    // Title (proxy)
    defineField({
      name: 'titleProxy',
      title: 'Title',
      type: 'proxyString',
      options: {field: 'store.title'},
    }),
    {
      title: 'Brand',
      name: 'brand',
      type: 'string',
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    // Slug (proxy)
    defineField({
      name: 'slugProxy',
      title: 'Slug',
      type: 'proxyString',
      options: {field: 'store.slug.current'},
    }),
    // Color theme
    defineField({
      name: 'colorTheme',
      title: 'Color theme',
      type: 'reference',
      to: [{type: 'colorTheme'}],
      group: 'editorial',
    }),
    defineField({
      name: 'description',
      title: "Brynn's Description",
      type: 'body',
      group: 'editorial',
    }),
    defineField({
      name: 'store',
      title: 'Shopify',
      type: 'shopifyProduct',
      description: 'Product data from Shopify (read-only)',
      group: 'shopifySync',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.shopify',
      group: 'seo',
    }),
    {
      title: 'Product Images',
      name: 'productImages',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      title: "Brynn's Pick",
      name: 'isFeatured',
      type: 'boolean',
    },
    {
      title: "Brynn's Pick Image - Grey (Required if Brynn's Pick)",
      name: 'brynnPickImage',
      type: 'image',
      validation: (Rule) =>
        Rule.custom((image, context) => {
          if (context.document.isFeatured && !image)
            return "Grey Image is required for a 'Brynn's Pick' product."
          else return true
        }),
    },
    {
      title: "Featured Headline (Required if Brynn's Pick)",
      name: 'featuredHeadline',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((headline, context) => {
          if (context.document.isFeatured && !headline)
            return "Featured Headline is required for a 'Brynn's Pick' product."
          else return true
        }),
    },
    {
      title: 'Date of Birth',
      name: 'dateOfBirth',
      type: 'string',
    },
    {
      title: 'Material',
      name: 'material',
      type: 'string',
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string',
    },
    {
      title: 'Movement',
      name: 'movement',
      type: 'string',
    },
    {
      title: 'Condition',
      name: 'condition',
      type: 'string',
    },
    {
      title: 'Box',
      name: 'box',
      type: 'boolean',
    },
    {
      title: 'Papers',
      name: 'Papers',
      type: 'boolean',
    },
    {
      title: 'Nitty Gritty',
      name: 'nittyGritty',
      type: 'body',
    },
    {
      title: "Brynn's Basics",
      name: 'brynnsBasics',
      type: 'boolean',
    },
    {
      title: 'Case Size',
      name: 'caseSize',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
        ],
      },
    },
    {
      title: 'Style',
      name: 'style',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Gold', value: 'gold'},
          {title: 'Steel', value: 'steel'},
          {title: 'Gem-Set', value: 'gemSet'},
          {title: 'Leather Strap', value: 'leatherStrap'},
          {title: 'Colored Dial', value: 'coloredDial'},
        ],
      },
    },
  ],
  orderings: [
    {
      name: 'titleAsc',
      title: 'Title (A-Z)',
      by: [{field: 'store.title', direction: 'asc'}],
    },
    {
      name: 'titleDesc',
      title: 'Title (Z-A)',
      by: [{field: 'store.title', direction: 'desc'}],
    },
    {
      name: 'priceDesc',
      title: 'Price (Highest first)',
      by: [{field: 'store.priceRange.minVariantPrice', direction: 'desc'}],
    },
    {
      name: 'priceAsc',
      title: 'Price (Lowest first)',
      by: [{field: 'store.priceRange.minVariantPrice', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      options: 'store.options',
      previewImageUrl: 'store.previewImageUrl',
      priceRange: 'store.priceRange',
      status: 'store.status',
      title: 'store.title',
      variants: 'store.variants',
    },
    prepare(selection) {
      const {isDeleted, options, previewImageUrl, priceRange, status, title, variants} = selection

      const optionCount = options?.length
      const variantCount = variants?.length

      let description = [
        variantCount ? pluralize('variant', variantCount, true) : 'No variants',
        optionCount ? pluralize('option', optionCount, true) : 'No options',
      ]

      let subtitle = getPriceRange(priceRange)
      if (status !== 'active') {
        subtitle = '(Unavailable in Shopify)'
      }
      if (isDeleted) {
        subtitle = '(Deleted from Shopify)'
      }

      return {
        description: description.join(' / '),
        subtitle,
        title,
        media: (
          <ShopifyDocumentStatus
            isActive={status === 'active'}
            isDeleted={isDeleted}
            type="product"
            url={previewImageUrl}
            title={title}
          />
        ),
      }
    },
  },
})
