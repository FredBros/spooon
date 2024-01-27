import ThemeToggle from '@/src/theme/ThemeToggle';
import React from 'react'

const Header = async() => {
  return (
    <header className="border-b border-b-accent fixed top-0 left-0 right-0 bg-background">
      <div className="container flex items-center py-2 max-w-5xl m-auto gap-1">
        <h2 className="text-2xl font-bold mr-auto">spOoOn</h2>
        <ThemeToggle/>
      </div>
    </header>
  );
}

export default Header
