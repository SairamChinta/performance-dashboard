"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { RiBarChartBoxLine, RiDashboardLine, RiStackLine } from "react-icons/ri";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <Image src="/next.svg" alt="Logo" width={28} height={28} />
          <h1 className={styles.brand}>Performance Dashboard</h1>
        </div>

        <div className={styles.links}>
          <a
            href="https://github.com/SairamChinta?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkCard}
          >
            <FaGithub size={16} />
            <span className={styles.linkLabel}>GitHub</span>
            <HiOutlineArrowUpRight size={14} />
          </a>
          <a
            href="https://sairam-s-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkCard}
          >
            <RiDashboardLine size={16} />
            <span className={styles.linkLabel}>Portfolio</span>
            <HiOutlineArrowUpRight size={14} />
          </a>
        </div>
      </header>

      {/* MAIN */}
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Real-Time Performance Monitoring Simplified</h1>
          <p className={styles.subtitle}>
            A modern analytics dashboard that updates live — built with{" "}
            <strong>Next.js 14</strong> and <strong>TypeScript</strong>, designed for
            performance-critical visualization.
          </p>

          <button
            className={styles.cta}
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
            <HiOutlineArrowUpRight size={18} />
          </button>
        </section>

        {/* FEATURES */}
        <section className={styles.features}>
          <div className={styles.featureCard}>
            <RiBarChartBoxLine size={28} />
            <h3>Live Metrics</h3>
            <p>Stream and visualize real-time data efficiently with optimized state updates.</p>
          </div>

          <div className={styles.featureCard}>
            <RiDashboardLine size={28} />
            <h3>Optimized Insights</h3>
            <p>Handle high-volume data with React concurrency and frame throttling.</p>
          </div>

          <div className={styles.featureCard}>
            <RiStackLine size={28} />
            <h3>Scalable Architecture</h3>
            <p>TypeScript-first modular structure for clarity and scalability.</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Performance Dashboard • Sairam Chinta</p>
      </footer>
    </div>
  );
}
