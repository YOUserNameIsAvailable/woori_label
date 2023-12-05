import { SAFlag } from '@components/icons/language/SAFlag';
import { USFlag } from '@components/icons/language/USFlag';

export const siteSettings = {
  name: 'Razor',
  description:
    'Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.',
  author: {
    name: "Wikithemes, Inc.",
    websiteUrl: "#",
    address: "",
  },
  logo: {
    url: '/assets/images/logo.png',
    urlReverse: '/assets/images/logo-black.png',
    alt: 'Razor',
    href: '/',
    width: 195,
    height: 26,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  site_header: {
    topmenu: [
      {
        id: 1,
        path: '/my-account/wishlist/',
        label: 'menu-wishlists',
      },
      {
        id: 2,
        path: '/checkout/',
        label: 'menu-checkout',
      },
      {
        id: 3,
        path: '/',
        label: 'menu-gift',
      },
    ],
    menu: [
      {
        id: 1,
        path: '/',
        label: 'menu-demos',
        type: 'default',
        subMenu: [
          {
            id: 1,
            path: 'https://razor-contentbuilder.vercel.app/',
            label: 'menu-home1',
          },
          {
            id: 2,
            path: 'https://razor-contentbuilder.vercel.app/home2',
            label: 'menu-home2',
          },
          {
            id: 3,
            path: 'https://razor-contentbuilder.vercel.app/home3',
            label: 'menu-home3',
          },
          {
            id: 4,
            path: 'https://razor-contentbuilder.vercel.app/home4',
            label: 'menu-home4',
          },
          {
            id: 5,
            path: 'https://razor-contentbuilder.vercel.app/home5',
            label: 'menu-home5',
          },
          {
            id: 6,
            path: 'https://razor-contentbuilder.vercel.app/home6',
            label: 'menu-home6',
          },
          {
            id: 7,
            path: 'https://razor-contentbuilder.vercel.app/home7',
            label: 'menu-home7',
          },
          {
            id: 8,
            path: 'https://razor-furniture.vercel.app/',
            label: 'menu-furniture-home1',
          },
          {
            id: 9,
            path: 'https://razor-furniture.vercel.app/home2',
            label: 'menu-furniture-home2',
          },
          {
            id: 10,
            path: 'https://razor-contentbuilder.vercel.app/ar',
            label: 'menu-rtl',
          },
        ],
      },
      {
        id: 2,
        path: '/search',
        label: 'menu-categories',
        type: 'mega',
        mega_categoryCol: 5,
        mega_bannerMode: 'none',
        mega_bannerImg: '/assets/images/mega/banner-menu.jpg',
        mega_bannerUrl: '/search',
        mega_contentBottom: '<strong>30% Off</strong> the shipping of your first order with the code: <strong>RAZOR-SALE30</strong>',
        subMenu: [
          {
            id: 1,
            path: '/search',
            label: 'menu-fresh-vegetables',
            image: {
              id: 1,
              thumbnail: "/assets/images/category/collection_1.jpg",
              original: "/assets/images/category/collection_1.jpg"
            },
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-home-audio',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-helicopters',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-toys',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-outdoor',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-organic',
              },
            ],
          },
          {
            id: 2,
            path: '/search',
            label: 'menu-diet-nutrition',
            image: {
              id: 1,
              thumbnail: "/assets/images/category/collection_2.jpg",
              original: "/assets/images/category/collection_2.jpg"
            },
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-automotive',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-autocar',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-morecar',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-autosecurity',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-battereries',
              },
            ],
          },
          {
            id: 3,
            path: '/search',
            label: 'menu-healthy-foods',
            image: {
              id: 1,
              thumbnail: "/assets/images/category/collection_3.jpg",
              original: "/assets/images/category/collection_3.jpg"
            },
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-vegetarian',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-kakogenic',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-mediterranean',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-organic',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-organic',
              },
            ],
          },
          {
            id: 4,
            path: '/search',
            label: 'menu-grocery-items',
            image: {
              id: 1,
              thumbnail: "/assets/images/category/collection_4.jpg",
              original: "/assets/images/category/collection_4.jpg"
            },
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-battereries',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-beadphones',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-accessories',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-jewelry',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-wedding',
              },
            ],
          },
          {
            id: 5,
            path: '/search',
            label: 'menu-beaf-steak',
            image: {
              id: 1,
              thumbnail: "/assets/images/category/collection_5.jpg",
              original: "/assets/images/category/collection_5.jpg"
            },
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-menwatch',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-womanwatch',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-gift',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-giftman',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-giftwoman',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        path: '/search',
        label: 'menu-dietary',
        type: 'mega',
        mega_categoryCol: 5,
        mega_bannerMode: 'right',
        mega_bannerImg: '/assets/images/mega/banner-menu.jpg',
        mega_bannerUrl: '/search',
        mega_contentBottom: '<strong>30% Off</strong> the shipping of your first order with the code: <strong>RAZOR-SALE30</strong>',
        subMenu: [
          {
            id: 1,
            path: '/search',
            label: 'menu-vegetarian',
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-home-audio',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-helicopters',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-toys',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-outdoor',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-organic',
              },
            ],
          },
          {
            id: 2,
            path: '/search',
            label: 'menu-automotive',
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-automotive',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-autocar',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-morecar',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-autosecurity',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-battereries',
              },
            ],
          },
          {
            id: 3,
            path: '/search',
            label: 'menu-mediterranean',
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-vegetarian',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-kakogenic',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-mediterranean',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-organic',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-organic',
              },
            ],
          },
          {
            id: 4,
            path: '/search',
            label: 'menu-organic',
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-battereries',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-beadphones',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-accessories',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-jewelry',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-wedding',
              },
            ],
          },
          {
            id: 5,
            path: '/search',
            label: 'menu-publications',
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-menwatch',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-womanwatch',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-gift',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-giftman',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-giftwoman',
              },
            ],
          },
        ],
      },
      {
        id: 4,
        path: '/shops/',
        label: 'menu-shops',
      },
      {
        id: 5,
        path: '/',
        label: 'menu-pages',
        subMenu: [
          {
            id: 1,
            path: '/',
            label: 'menu-users',
            subMenu: [
              {
                id: 1,
                path: '/my-account/account-settings',
                label: 'menu-my-account',
              },
              {
                id: 2,
                path: '/signin',
                label: 'menu-sign-in',
              },
              {
                id: 3,
                path: '/signup',
                label: 'menu-sign-up',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-organic',
              },
            ],
          },
          {
            id: 2,
            path: '/faq',
            label: 'menu-faq',
          },
          {
            id: 3,
            path: '/contact-us',
            label: 'menu-contact-us',
          },
          {
            id: 4,
            path: '/privacy',
            label: 'menu-privacy-policy',
          },
          {
            id: 5,
            path: '/terms',
            label: 'menu-terms-condition',
          },
          {
            id: 6,
            path: '/checkout',
            label: 'menu-checkout',
          },
          {
            id: 7,
            path: '/404',
            label: 'menu-404',
          }
        ],
      },
      {
        id: 6,
        path: '/blog/blog-category-grid',
        label: 'menu-blog',
        subMenu: [
          {
            id: 1,
            path: '/blog/blog-category-grid',
            label: 'menu-blog-grid',
          },
          {
            id: 2,
            path: '/blog/blog-category-list',
            label: 'menu-blog-list',
          },
          {
            id: 3,
            path: '/blog/blog-category-big',
            label: 'menu-blog-big',
          },
          {
            id: 4,
            path: '/blog',
            label: 'menu-blog-wide',
          },
          {
            id: 6,
            path: '/blog/blog-category-wide',
            label: 'menu-single-post',
            subMenu: [
              {
                id: 1,
                path: '/blog/blog-post-left',
                label: 'menu-left-sidebar',
              },
              {
                id: 2,
                path: '/blog/blog-post-right',
                label: 'menu-right-sidebar',
              },
              {
                id: 3,
                path: '/blog/the-litigants-on-the-screen-are-not-actors',
                label: 'menu-no-sidebar',
              }
            ],
          }
        ],
      },
      {
        id: 7,
        path: '/contact-us',
        label: 'menu-contact-us',
      },
    ],
    languageMenu: [
      {
        id: 'ar',
        name: 'عربى ',
        value: 'ar',
        icon: <SAFlag />,
      },
      {
        id: 'en',
        name: 'English',
        value: 'en',
        icon: <USFlag />,
      }
    ],
  },
};
