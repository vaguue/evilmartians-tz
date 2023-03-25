import type { DefaultSeoProps, NextSeoProps } from 'next-seo';

export type HeadSeoProps = {
  title: string;
  description: string;
  siteName?: string;
  name?: string;
  url?: string;
  username?: string;
  canonical?: string;
  nextSeoProps?: NextSeoProps;
};

export const seoConfig: {
  headSeo: Required<Pick<HeadSeoProps, 'siteName'>>;
  defaultNextSeo: DefaultSeoProps;
} = {
  headSeo: {
    siteName: 'Evil Matrians Task',
  },
  defaultNextSeo: {
    twitter: {
      handle: '@andrey_sitnik',
      site: '@andrey_sitnik',
      cardType: 'summary_large_image',
    },
  },
} as const;
