import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {type: 'category', label: '導入ガイド', className: 'sidebar-section', collapsible: false, collapsed: false, items: [
      'quick-installation',
      {type: 'doc', id: 'basic', className: 'sidebar-mode-basic'},
      {type: 'doc', id: 'advanced', className: 'sidebar-mode-advanced'},
    ]},
    {type: 'category', label: 'カスタマイズ', className: 'sidebar-section', collapsible: false, collapsed: false, items: ['custom-design']},
  ],
};

export default sidebars;
