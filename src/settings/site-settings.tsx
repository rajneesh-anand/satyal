import { ILFlag } from "@components/icons/language/ILFlag";
import { SAFlag } from "@components/icons/language/SAFlag";
import { CNFlag } from "@components/icons/language/CNFlag";
import { USFlag } from "@components/icons/language/USFlag";
import { DEFlag } from "@components/icons/language/DEFlag";
import { ESFlag } from "@components/icons/language/ESFlag";
import { RUFlag } from "@components/icons/language/RUFlag";

export const siteSettings = {
  name: "Satyal Online Learning",
  description:
    'Satyal Publication has been in the educational publishing industry for more than 30 years. We started from a book shop 42 years ago in Biratnagar which transformed into the largest and one of the leading educational publishing house in the later days. Today, we are here as a new firm to change the way we educate our loved ones. This change, we are seeking to digitalize the education sector. "Lets Change The Way We Educate Our Loved Ones!"',
  author: {
    name: "Satyal Online Learning",
    websiteUrl: "http://satyaldigital.com/",
    address: "",
  },
  logo: {
    url: "/assets/images/logo.svg",
    alt: "logo-1",
    href: "/",
    width: 128,
    height: 30,
  },
  defaultLanguage: "en",
  currencyCode: "USD",
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
        path: "/about/",
        label: "menu-about",
      },
      {
        id: 2,
        path: "/services/",
        label: "menu-service",
      },

      {
        id: 3,
        path: "/services/",
        label: "menu-contact",
      },
    ],
    languageMenu: [
      {
        id: "en",
        name: "English",
        value: "en",
        icon: <USFlag />,
      },
      {
        id: "de",
        name: "Deutsch",
        value: "de",
        icon: <DEFlag />,
      },
      {
        id: "ru",
        name: "Русский",
        value: "ru",
        icon: <RUFlag />,
      },
    ],
  },
};
