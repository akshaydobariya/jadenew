'use client'
import { Ubuntu } from 'next/font/google'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './globals.css'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import useApiService from '@/services/ApiService';
import 'nprogress/nprogress.css';
import { usePathname, useSearchParams } from 'next/navigation';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseApp from '@/services/Firebase/firebase';
import { Provider } from 'react-redux';
import { Store } from './Redux/store';
// import TopbarProgress from '@/components/TopbarProgress';
import Head from 'next/head';
import dynamic from 'next/dynamic';
// const TawkMessengerReact = dynamic(() => import('@tawk.to/tawk-messenger-react'), { ssr: false });
{/* {isClient && <TawkMessengerReact propertyId="65e7f86a9131ed19d9757f9c" widgetId="1ho924p3m" />} */ }
import TopBarProgress from "react-topbar-progress-indicator";
import NextNProgress from 'nextjs-progressbar';
const useRouter = dynamic(() => import('next/router'));
import { Suspense } from "react"
import NProgress from 'nprogress'; // Import NProgress
// import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

// Add NProgress styles
import 'nprogress/nprogress.css';

const ubuntu = Ubuntu({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

// TopBarProgress.config({
//   barColors: {
//     0: "darkBlue",
//     "1.0": "white",
//   },
// });

export default function RootLayout({ children }) {
  const { notificationSubscribe } = useApiService()
  const [scoll, setScroll] = useState(null)
  const [scrollDirection, setScrollDirection] = useState('up');
  const [progress, setProgress] = useState(false)
  const [localStorageToken, setLocalStorageToken] = useState()
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const path = usePathname()

  const isSupported = () =>
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  const getFirebase = async () => {
    if ('Notification' in window) {
      const messaging = typeof window !== "undefined" ? getMessaging(firebaseApp) : null;

      // Retrieve the notification permission status
      Notification.requestPermission().then((permission) => { })
    }
  }

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  useEffect(() => {
    setLocalStorageToken(localStorage.getItem('token'))
  }, [])

  // alert(permission)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getFirebase()
      //alert(isSupported())
      if (isSupported()) {
        Notification.requestPermission().then((permission) => {
          // alert(permission)
          if (permission == 'granted') {
            getToken(getMessaging(firebaseApp), {
              vapidKey: "BJU-6SvGrpylVgRweN25BqXMUYGXsLmsi-tlSAENWJhtjfe9WYVjtRZ4xCl9XJZlpdMgzzQG7TBil5P9qIUXonw",
            }).then((currentToken) => {
              if (currentToken) {
                localStorage.setItem('fcm_token', currentToken)
                notificationSubscribe(currentToken).then((res) => {
                }).catch((er) => {
                  console.log(er, "Error Api");
                })
              } else {
                console.log("No token available firebase");
              }
            }).catch((er) => {
              console.log("Error Firebase--");
            })
          }
        })
      }
    }
  }, [localStorageToken])

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setScroll(scrollY);

      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 0 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", updateScrollDirection);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("scroll", updateScrollDirection);
      }
    };
  }, [scrollDirection]);

  useEffect(() => {
    setTimeout(() => {
      setProgress(false)
    }, 3000);
  }, [])

  const searchParams = useSearchParams()

  useEffect(() => {
    const handleStart = () => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    handleStop()

    return () => {
      handleStart()
    }
  }, [path, searchParams])

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/66053081a0c6737bd125d55f/1hq24ausn';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  return (
    <html lang="en" id='body'>
      <body className={`${ubuntu.className} dark:bg-[#202020] bg-[#fff] dark:text-gray-100`} >
        {scoll > 10 && <div className='z-50 fixed lg:right-10 right-8 bottom-24 border-2 border-black rounded-full bg-gray-100 dark:bg-[#212121]'>
          <KeyboardArrowUpIcon className='cursor-pointer' fontSize='large' onClick={() => window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })} />
        </div>}

        <Provider store={Store}>
          {scrollDirection == 'up' &&
            <header>
              {!path.includes('chapter') && <Header />}
            </header>
          }

          {/* <TawkMessengerReact propertyId="65e7f86a9131ed19d9757f9c" widgetId="1ho924p3m" /> */}
          <main className=''>
            {children}
          </main>
        </Provider>

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
