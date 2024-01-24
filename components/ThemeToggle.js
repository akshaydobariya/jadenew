'use client'

import { useEffect, useState } from "react"
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import { FaMoon } from 'react-icons/fa'
import { BsSunFill } from 'react-icons/bs'

function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme === "dark") setDarkMode(true)
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem("theme", "light")
        }
    }, [darkMode])
    return (
        <div className="relative w-16 h-7 flex items-center dark:bg-gray-700 bg-gray-400 cursor-pointer rounded-full p-1"
            onClick={() => setDarkMode(!darkMode)}>
            <FaMoon className="text-white" size={18} />
            <div className="absolute bg-white dark:bg-medium w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
                style={darkMode ? { left: "2px" } : { right: "2px" }}>
            </div>
            <BsSunFill className="ml-auto text-yellow-400 mb-[2px] mr-[2px]" />
        </div>
    )
}

export default ThemeToggle