import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home(): ReactNode {
  const background = useBaseUrl('/img/shisha-background.webp');
  const preview = useBaseUrl('/img/notion/intro/preview.png');
  return (
    <Layout title="ドキュメント" description="VRChat用シーシャギミック Mikinel Shisha System の公式ドキュメント。">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles.hero}>
        <img className={styles.background} src={background} alt="" fetchPriority="high" />
        <img className={`${styles.background} ${styles.secondSlide}`} src={preview} alt="" />
        <div className={styles.overlay} aria-hidden="true" />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.titlePanel}>
            <p className={styles.eyebrow}>VRChat World Gimmick</p>
            <h1 className={styles.title}>Mikinel Shisha System</h1>
            <div className={styles.buttons}>
              <Link className={`button button--lg ${styles.heroButton}`} to="/docs/intro">Documentation</Link>
              <Link className={`button button--lg ${styles.heroButton}`} href="https://youtu.be/lRXlGNVUriw" target="_blank" rel="noopener noreferrer">YouTube</Link>
              <Link className={`button button--lg ${styles.heroButton}`} href="https://nmxi.booth.pm/items/5651463" target="_blank" rel="noopener noreferrer">Booth</Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
