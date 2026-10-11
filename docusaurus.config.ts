import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'mikinel Shisha System',
  tagline: 'VRChatのワールドに、シーシャのある時間を。',
  favicon: 'img/shisha-icon.png',
  // 参考サイトと同じ GitHub Pages 構成。公開先に合わせて環境変数で変更できます。
  url: process.env.SITE_URL || 'https://nmxi.github.io',
  baseUrl: process.env.BASE_URL || '/Unity_VRC_Shisha_Docs/',
  organizationName: 'nmxi',
  projectName: 'Unity_VRC_Shisha_Docs',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',
  i18n: {defaultLocale: 'ja', locales: ['ja']},
  markdown: {format: 'detect'},
  presets: [
    ['classic', {
      docs: {sidebarPath: './sidebars.ts'},
      blog: false,
      theme: {customCss: './src/css/custom.css'},
    } satisfies Preset.Options],
  ],
  themeConfig: {
    image: 'img/notion/intro/preview.png',
    colorMode: {defaultMode: 'dark', respectPrefersColorScheme: false},
    navbar: {
      title: 'mikinel Shisha System',
      logo: {alt: '', src: 'img/shisha-icon.png'},
      items: [
        {type: 'docSidebar', sidebarId: 'docs', label: 'ドキュメント', position: 'left'},
        {to: '/docs/basic', label: 'Basic', position: 'right'},
        {to: '/docs/advanced', label: 'Advanced', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {title: 'はじめる', items: [
          {label: 'このアセットについて', to: '/docs/intro'},
          {label: 'Basic モードの導入', to: '/docs/basic'},
          {label: 'Advanced モードの導入', to: '/docs/advanced'},
        ]},
        {title: 'つくる・体験する', items: [
          {label: 'カスタムデザインの作成', to: '/docs/custom-design'},
          {label: 'サンプルワールド', href: 'https://vrchat.com/home/world/wrld_ac532470-12ed-4bd4-80d5-12b2c6a00dea'},
          {label: '紹介動画', href: 'https://youtu.be/lRXlGNVUriw'},
        ]},
      ],
      copyright: `Copyright © ${new Date().getFullYear()} mikinel. Built with Docusaurus.`,
    },
    tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 4},
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula},
  } satisfies Preset.ThemeConfig,
};

export default config;
