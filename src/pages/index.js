import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Release Notes',
    description: (
      <>
        Find out what's new in <a href ="/docs/release-notes">this release.</a>
      </>
    ),
  },
  {
    title: 'Troubleshooting',
    description: (
      <>
       <a href="/docs/troubleshooting/help"> Troubleshoot </a> kubelet, wks-controller and other issues.
      </>
    ),
  },
  {
    title: 'WKP downloads',
    description: (
      <>
        Download a version of WKP.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Weave Kubernetes technical documentation <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <p> Reduce the complexity of operating Kubernetes with GitOps and enable your team to deliver fast and secure cloud native applications.
Automate platform configuration for common use cases such as monitoring and machine learning.
Rollout reproducible cluster stacks to different environments from development to staging to production and simplify operations.
Reduce day 2 operation problems with WKP’s sophisticated cluster life-cycle management of maintenance, upgrades and patches to scale cluster fleet management across multiple clouds, on-premise and at the edge.</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
