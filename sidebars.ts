import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {type: 'category', label: '導入ガイド', collapsed: false, items: ['quick-installation', 'basic', 'advanced']},
    {type: 'category', label: 'カスタマイズ', collapsed: false, items: ['custom-design']},
  ],
};

export default sidebars;
