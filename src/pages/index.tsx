import type {CSSProperties, ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const guides = [
  {number: '01', tag: '気軽に楽しむ', title: 'Basic mode', description: 'Use するだけで吸えるモード。', to: '/docs/basic', link: 'Basic の導入方法'},
  {number: '02', tag: '準備する時間も楽しむ', title: 'Advanced mode', description: '炭の加熱や蒸らしを行うモード。', to: '/docs/advanced', link: 'Advanced の導入方法'},
  {number: '03', tag: '自分だけのデザインに', title: 'Custom design', description: 'オリジナルモデルの作成手順。', to: '/docs/custom-design', link: 'カスタムデザインの作成'},
];

export default function Home(): ReactNode {
  const preview = useBaseUrl('/img/notion/intro/preview.png');
  const background = useBaseUrl('/img/shisha-background.webp');
  return (
    <Layout title="ドキュメント" description="VRChat用シーシャギミック mikinel Shisha System の公式ドキュメント。Basic・Advanced モードの導入からカスタムデザインまで、画像付きで解説します。">
      <main className={styles.home} style={{'--home-background-image': `url("${background}")`} as CSSProperties}>
        <header className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <h1>Shisha<span>System</span></h1>
              <p className={styles.description}>VRChat向けUdon製シーシャギミック</p>
              <div className={styles.actions}>
                <Link className="button button--primary button--lg" to="/docs/quick-installation">導入をはじめる <span aria-hidden="true">↗</span></Link>
                <Link className={styles.secondaryLink} to="/docs/intro">このアセットについて <span aria-hidden="true">→</span></Link>
              </div>
            </div>
            <figure className={styles.heroFigure}>
              <img src={preview} alt="VRChatでパイプを手に持ち、シーシャを楽しむ様子" width="1200" height="900" fetchPriority="high" />
            </figure>
          </div>
        </header>
        <section className={`container ${styles.guides}`} aria-label="導入ガイド">
          <div className={styles.cards}>
            {guides.map(guide => (
              <Link key={guide.number} to={guide.to} className={styles.card}>
                <div className={styles.cardTop}><span>{guide.tag}</span><span className={styles.number}>{guide.number}</span></div>
                <h2>{guide.title}</h2>
                <p>{guide.description}</p>
                <span className={styles.cardLink}>{guide.link}<span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
