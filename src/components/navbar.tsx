import { useEffect, useState } from 'react'
import { DarkModeIcon } from '@/icons/DarkModeIcon'
import { LightModeIcon } from '@/icons/LightModeIcon'
import { LogoSvg } from '@/icons/LogoSvg'
import { MenuIcon } from '@/icons/MenuIcon'
import { Link, NavLink } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MonitorIcon } from '@/icons/MonitorIcon'


type ColorMode = 'light' | 'dark'

export default function Navbar() {
  const items = [
    { label: 'Home', href: '/home' },
    { label: 'About', href: '/about' },
    { label: 'Works', href: '/works' },
    { label: 'Contacts', href: '/contacts' }
  ]

  const [colorMode, setColorMode] = useState<ColorMode>(
    (localStorage.getItem('theme') as ColorMode | null) ?? 'light'
  )

  function changeColorMode() {
    const newMode = colorMode === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', newMode)
    setColorMode(newMode)
  }

  const setLightMode = () => {
    localStorage.setItem('theme', 'light')
    setColorMode('light')
  }

  const setDarkMode = () => {
    localStorage.setItem('theme', 'dark')
    setColorMode('dark')
  }

  const setSystemMode = () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const newMode = prefersDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', newMode);
    setColorMode(newMode);
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorMode)
  }, [colorMode])

  return (
    <nav className="fixed top-0 left-0 w-full h-fit flex flex-row justify-between xl:px-[10%] px-8 py-2 z-50">
      <div>
        <Link to="/" className="group">
          <LogoSvg className="w-12 h-fit p-1 fill-text hover:fill-primary transition-colors duration-200" />
        </Link>
      </div>
      <div className="flex items-center gap-6 md:gap-10">
        <ul className="hidden md:flex flex-row gap-10 lowercase">
          {items.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className={({ isActive }) =>
                isActive ? 'navbar-link text-lg active' : 'navbar-link text-lg'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </ul>
        <div>
          <div className="flex md:hidden">
            <button
              className="flex justify-center items-center w-10 h-10 text-3xl rounded-xl p-1 text-text hover:bg-hover transition-all"
              onClick={changeColorMode}
            >
              {colorMode === 'light' ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </button>
          </div>
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger className='ring-0 outline-none border-0'>
                <button
                  className="flex justify-center items-center w-10 h-10 text-3xl rounded-xl p-1 text-text hover:bg-hover transition-all"
                >
                  {colorMode !== 'light' ? (
                    <DarkModeIcon />
                  ) : (
                    <LightModeIcon />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-background-menu rounded-lg border-background-border'>
                <DropdownMenuItem className='hover:!bg-background-hover !text-text text-md rounded-md gap-2' onClick={setLightMode}>
                  <LightModeIcon />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem className='hover:!bg-background-hover !text-text text-md rounded-md gap-2' onClick={setDarkMode}>
                  <DarkModeIcon />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem className='hover:!bg-background-hover !text-text text-md rounded-md gap-2' onClick={setSystemMode}>
                  <MonitorIcon />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex md:hidden">
          <button className="flex justify-center items-center">
            <MenuIcon className="text-text w-10 h-10 rounded-xl p-2 hover:bg-hover transition-all" />
          </button>
        </div>
      </div>
    </nav>
  )
}
