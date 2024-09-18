import React from 'react';
import css from './Header.module.css';

export function Header() {
  return (
    <header className={css.root} data-fsd="widget/header">
      <a href="/">Home</a>
      <a href="/about">About</a>
    </header>
  );
}
