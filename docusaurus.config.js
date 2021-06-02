
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
          type: 'doc',
          docId: 'getting-started/introduction',
          label: 'Getting Started',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'deploying-wkp/hosts',
          label: 'Install',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'tasks/using-the-eks-d-distribution',
          label: 'Tasks',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'cluster-operations/user-workloads',
          label: 'Cluster Operations',
          position: 'left',
        },
        // right
        {
          type: 'doc',
          docId: 'download',
          position: 'right',
          label: 'WKP Downloads',
        },
        {
          type: 'doc',
          docId: 'release-notes',
          position: 'right',
          label: 'Release Notes',
        },
        {
         type: 'docsVersionDropdown',
         position: 'right',
         dropdownActiveClassDisabled: true,
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
