export const siteSettings = {
  name: 'Satyal Online Learning',
  description:
    'Satyal Publication has been in the educational publishing industry for more than 30 years. We started from a book shop 42 years ago in Biratnagar which transformed into the largest and one of the leading educational publishing house in the later days. Today, we are here as a new firm to change the way we educate our loved ones. This change, we are seeking to digitalize the education sector. "Lets Change The Way We Educate Our Loved Ones!"',
  author: {
    name: 'Satyal Online Learning',
    websiteUrl: 'http://satyaldigital.com/',
    address: '',
  },
  logo: {
    url: '/images/logo.svg',
    alt: 'brand logo',
    href: '/',
    width: 128,
    height: 30,
  },
  whitelogo: {
    // url: '/images/whitelogo.svg',
    url: '/images/White Colour.svg',
    alt: 'brand logo',
    href: '/',
    width: 128,
    height: 30,
  },
  defaultLanguage: 'en',
  currencyCode: 'NPR',
  paymentOptions: [
    {
      id: '1',
      name: 'Khalti',
      iconSrc: '/images/payment/khalti-seeklogo.com.svg',
    },
    {
      id: '2',
      name: 'Esewa',
      iconSrc: '/images/payment/esewa-seeklogo.com.svg',
    },
    {
      id: '3',
      name: 'Fonepay',
      iconSrc: '/images/payment/fonepay.svg',
    },
    {
      id: '4',
      name: 'Master Card',
      iconSrc: '/images/payment/mastercard.svg',
    },
    {
      id: '5',
      name: 'Visa Card',
      iconSrc: '/images/payment/visa.svg',
    },
    {
      id: '6',
      name: 'Mobile-Banking',
      iconSrc: '/images/payment/mobile-banking.svg',
    },
    // {
    //   id: "7",
    //   name: "Unionpay",
    //   iconSrc: "/images/payment/unionpay-seeklogo.com (1).svg",
    // },
    {
      id: '8',
      name: 'Connect-ips',
      iconSrc: '/images/payment/connectips.svg',
    },
    {
      id: '9',
      name: 'E-Banking',
      iconSrc: '/images/payment/E-Banking.svg',
    },
    {
      id: '10',
      name: 'SCT-Banking',
      iconSrc: '/images/payment/sct-logo.svg',
    },
  ],

  site_header: {
    menu: [
      // {
      //   id: 1,
      //   path: "/",
      //   label: "menu-demos",
      //   subMenu: [
      //     {
      //       id: 1,
      //       path: "/",
      //       label: "menu-modern",
      //     },
      //     {
      //       id: 2,
      //       path: "/classic",
      //       label: "menu-classic",
      //     },
      //     {
      //       id: 3,
      //       path: "/vintage",
      //       label: "menu-vintage",
      //     },
      //     {
      //       id: 4,
      //       path: "/standard",
      //       label: "menu-standard",
      //     },
      //     {
      //       id: 5,
      //       path: "/minimal",
      //       label: "menu-minimal",
      //     },
      //     {
      //       id: 6,
      //       path: "/trendy",
      //       label: "menu-trendy",
      //     },
      //     {
      //       id: 7,
      //       path: "/elegant",
      //       label: "menu-elegant",
      //     },
      //   ],
      // },
      // {
      //   id: 2,
      //   path: "/search",
      //   label: "menu-categories",
      //   subMenu: [
      //     {
      //       id: 1,
      //       path: "/search",
      //       label: "menu-fresh-vegetables",
      //     },
      //     {
      //       id: 2,
      //       path: "/search",
      //       label: "menu-diet-nutrition",
      //     },
      //     {
      //       id: 3,
      //       path: "/search",
      //       label: "menu-healthy-foods",
      //     },
      //     {
      //       id: 4,
      //       path: "/search",
      //       label: "menu-grocery-items",
      //     },
      //     {
      //       id: 5,
      //       path: "/search",
      //       label: "menu-beaf-steak",
      //     },
      //   ],
      // },
      // {
      //   id: 3,
      //   path: "/search",
      //   label: "menu-dietary",
      //   subMenu: [
      //     {
      //       id: 1,
      //       path: "/search",
      //       label: "menu-vegetarian",
      //     },
      //     {
      //       id: 2,
      //       path: "/search",
      //       label: "menu-kakogenic",
      //     },
      //     {
      //       id: 3,
      //       path: "/search",
      //       label: "menu-mediterranean",
      //     },
      //     {
      //       id: 4,
      //       path: "/search",
      //       label: "menu-organic",
      //     },
      //   ],
      // },
      // {
      //   id: 6,
      //   path: "/",
      //   label: "menu-pages",
      //   subMenu: [
      //     {
      //       id: 1,
      //       path: "/",
      //       label: "menu-users",
      //       subMenu: [
      //         {
      //           id: 1,
      //           path: "/my-account/account-settings",
      //           label: "menu-my-account",
      //         },
      //         {
      //           id: 2,
      //           path: "/signin",
      //           label: "menu-sign-in",
      //         },
      //         {
      //           id: 3,
      //           path: "/signup",
      //           label: "menu-sign-up",
      //         },
      //       ],
      //     },
      //     {
      //       id: 2,
      //       path: "/faq",
      //       label: "menu-faq",
      //     },
      //     {
      //       id: 3,
      //       path: "/about-us",
      //       label: "menu-about-us",
      //     },
      //     {
      //       id: 4,
      //       path: "/privacy",
      //       label: "menu-privacy-policy",
      //     },
      //     {
      //       id: 5,
      //       path: "/terms",
      //       label: "menu-terms-condition",
      //     },
      //     {
      //       id: 6,
      //       path: "/contact-us",
      //       label: "menu-contact-us",
      //     },
      //     {
      //       id: 7,
      //       path: "/checkout",
      //       label: "menu-checkout",
      //     },
      //     {
      //       id: 8,
      //       path: "/404",
      //       label: "menu-404",
      //     },
      //   ],
      // },
      {
        id: 1,
        path: '/about/',
        label: 'menu-about',
      },
      {
        id: 2,
        path: '/services/',
        label: 'menu-service',
      },

      {
        id: 3,
        path: '/services/',
        label: 'menu-contact',
      },
    ],
  },
};
