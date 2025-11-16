"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          <div className={styles.logoIcon}>{"⚡"}</div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Умный КГТУ</span>
            <span className={styles.logoSubtitle}>Energy Efficient Campus</span>
          </div>
        </Link>

        <nav className={styles.nav}>
          <Link href="/solutions" className={styles.navLink}>
            Решения
          </Link>
          <Link href="/impact" className={styles.navLink}>
            Эффект
          </Link>
          <Link href="/about" className={styles.navLink}>
            О проекте
          </Link>
        </nav>

        <div className={styles.cta}>
          <Link href="/feedback" className={styles.ctaButton}>
            <span>{"💡"}</span>
            feedback
          </Link>
        </div>

        <button
          className={`${styles.mobileMenuButton} ${
            isMobileMenuOpen ? styles.active : ""
          }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <nav className={styles.mobileNav}>
          <Link
            href="/"
            className={styles.mobileNavLink}
            onClick={closeMobileMenu}
          >
            <span className={styles.mobileNavIcon}>{"🏠"}</span>
            Главная
          </Link>

          <Link
            href="/solutions"
            className={styles.mobileNavLink}
            onClick={closeMobileMenu}
          >
            <span className={styles.mobileNavIcon}>{"💡"}</span>
            Решения
          </Link>

          <Link
            href="/impact"
            className={styles.mobileNavLink}
            onClick={closeMobileMenu}
          >
            <span className={styles.mobileNavIcon}>{"📊"}</span>
            Эффект
          </Link>

          <Link
            href="/about"
            className={styles.mobileNavLink}
            onClick={closeMobileMenu}
          >
            <span className={styles.mobileNavIcon}>{"ℹ️"}</span>О проекте
          </Link>

          <Link
            href="/feedback"
            className={styles.mobileNavLinkCta}
            onClick={closeMobileMenu}
          >
            <span className={styles.mobileNavIcon}>{"🌍"}</span>
            feedback
          </Link>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={closeMobileMenu}></div>
      )}
    </header>
  );
}
