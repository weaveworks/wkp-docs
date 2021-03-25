
const versions = require('./versions.json');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'WKP Technical Documentation',
  // tagline: 'The tagline of my site',
  url: 'https://weaveworks.github.io/wkp-docs/',
  baseUrl: '/wkp-docs/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon_150px.png',
  organizationName: 'Weaveworks', // Usually your GitHub org/user name.
  projectName: 'wkp-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'WKP Docs',
      logo: {
        alt: 'WKP docs',
        src: 'img/weave-logo.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Getting Started',
          position: 'left',
        },
        {
          to: 'docs/deploying-wkp/hosts',
          activeBasePath:'docs' ,
          label: 'Install',
          position: 'left',
        },
        {
          to: 'docs/tasks/using-the-eks-d-distribution',
          activeBasePath:'docs' ,
          label: 'Tasks',
          position: 'left',
        },
        {
          to: 'docs/cluster-operations/user-workloads',
          activeBasePath:'docs' ,
          label: 'Cluster Operations',
          position: 'left',
        },
        
        {
          href: 'https://github.com/weaveworks/wkp-docs/tree/main',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
   footer: {
      style: 'dark',
      links: [
        
        {
          title: 'Support',
          items: [
            {
              label: 'Contact Us',
              href: 'mailto:support@weave.works',
            },
          ],
         },
      ], 
      copyright: `Copyright © ${new Date().getFullYear()} Weaveworks`,
    }, 
  }, 
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/weaveworks/wkp-docs/tree/main',
          lastVersion: versions[0],
          versions: {
            current: {
              label: 'main',
            },
          }
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ]
};
