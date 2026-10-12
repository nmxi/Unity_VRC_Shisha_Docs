import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Mikinel Shisha System',
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
      gtag: {trackingID: 'G-CSQPCJ2S21'},
      theme: {customCss: './src/css/custom.css'},
    } satisfies Preset.Options],
  ],
  themeConfig: {
    image: 'img/notion/intro/preview.png',
    colorMode: {defaultMode: 'dark', disableSwitch: false, respectPrefersColorScheme: false},
    navbar: {
      title: 'Mikinel Shisha System',
      hideOnScroll: false,
      logo: {alt: 'Mikinel Shisha System Icon', src: 'img/shisha-icon.png'},
      items: [],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://x.com/mikinel" target="_blank" rel="noopener noreferrer">mikinel</a>. Built with Docusaurus.`,
    },
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula},
  } satisfies Preset.ThemeConfig,
};

export default config;
