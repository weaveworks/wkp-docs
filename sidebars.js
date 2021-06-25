module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/introduction',
        'getting-started/wk',
        'getting-started/entitlements',
        'getting-started/git-config-repository',
        'getting-started/known-issues',
      ],
    },
    {
      type: 'category',
      label: 'Deploying WKP',
      items: [
        'deploying-wkp/hosts',
        'deploying-wkp/cluster-creation-on-ssh-nodes',
        'deploying-wkp/components-on-existing-cluster',
        'deploying-wkp/cluster-creation-on-eks',
        'deploying-wkp/cluster-creation-on-footloose',
      ],
    },
    {
      type: 'category',
      label: 'Team Workspaces',
      items: [
        'team-workspaces/usage-guide',
        'team-workspaces/team-permissions',
        'team-workspaces/member-guide',
      ],
    },
    {
      type: 'category',
      label: 'Cluster Operations',
      items: [
        'cluster-operations/user-workloads',
        'cluster-operations/adding-removing-nodes',
        'cluster-operations/upgrading-kubernetes-version',
        'cluster-operations/custom-kubernetes-configuration',
        'cluster-operations/auth',
        'cluster-operations/nats-tls',
        'cluster-operations/managing-secrets',
        'cluster-operations/sealing-key',
      ],
    },
    {
      type: 'category',
      label: 'Monitoring',
      items: [
        'monitoring/introduction',
        'monitoring/alerts',
        'monitoring/dashboards',
      ],
    },
    {
      type: 'category',
      label: 'Tasks',
      items: [
        'tasks/control-plane-load-balancers',
        'tasks/using-the-eks-d-distribution',
        'tasks/multiple-cluster-admins',
        'tasks/patching-node-os-packages',
        'tasks/profiling-kubectl',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/help',
        'troubleshooting/kubelet',
        'troubleshooting/controller',
        'troubleshooting/scope',
        'tasks/patching-node-os-packages',
        'tasks/profiling-kubectl',
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: ['FAQ/faq'],
    },
    {
      type: 'category',
      label: 'Reference',
      items: ['reference/reference', 'reference/cluster', 'reference/machines'],
    },
    {
      type: 'category',
      label: 'Thirdparty Dependencies',
      items: ['deps/dependencies'],
    },
  ],
  mccp: [
    'mccp/intro',
    'mccp/installation',
    {
      type: 'category',
      label: 'Usage Guide',
      collapsed: false,
      items: [
        'mccp/existing-clusters',
        'mccp/cluster-api-providers',
        'mccp/templates',
      ],
    },
  ],
};
