
const versions = require('./versions.json');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'WKP Technical Documentation',
  tagline: 'The tagline of my site',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon_150px.png',
  organizationName: 'Weaveworks', // Usually your GitHub org/user name.
  projectName: 'wkp-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'WKP Docs',
      logo: {
        alt: 'My Site Logo',
        src: 'img/weave-logo.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Getting Started',
            src: 'img/logo.svg',
          position: 'left',
        },
        {
          to: 'docs/deploying-wkp/hosts',
          activeBasePath:'docs' ,
          label: 'Install',
          position: 'left',
        },
        {
          href: 'https://github.com/weaveworks/wkp-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
           
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
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
            'https://github.com/facebook/docusaurus/edit/master/website/',
          lastVersion: versions[0],
          versions: {
            current: {
              label: 'master',
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
