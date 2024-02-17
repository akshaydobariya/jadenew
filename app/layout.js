'use client'
import { Montserrat, Poppins, Ubuntu } from 'next/font/google'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './globals.css'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useApiService from '@/services/ApiService';
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
import { Router } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { usePathname, useRouter } from 'next/navigation';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseApp from '@/services/Firebase/firebase';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ReduxProvider } from './Redux/ReduxProvider';

const ubuntu = Ubuntu({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  const { notificationSubscribe } = useApiService()
  const [isLoading, setLoading] = useState(true);
  const [scoll, setScroll] = useState(null)
  const [scrollDirection, setScrollDirection] = useState('up');
  const [open, setOpen] = useState(false)

  const path = usePathname()

  const router = useRouter();

  useEffect(() => {
    // Handle route change
    // router.events.on('routeChangeStart', (url) => {
    //   setLoading(true);
    // });

    // router.events.on('routeChangeError', () => {
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 2000);
    // });

    // router.events.on('routeChangeComplete', () => {
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 2000);
    // });
  }, []);
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission == 'granted') {
        getToken(getMessaging(firebaseApp), {
          vapidKey: "BJU-6SvGrpylVgRweN25BqXMUYGXsLmsi-tlSAENWJhtjfe9WYVjtRZ4xCl9XJZlpdMgzzQG7TBil5P9qIUXonw",
        }).then((currentToken) => {
          if (currentToken) {
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
  }, [])


  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setScroll(scrollY);

      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 0 || scrollY - lastScrollY < -10)) {
        console.log(direction, "direction");
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

  return (
    <html lang="en">
      <body className={`${ubuntu.className} dark:bg-[#202020] bg-[#fff] dark:text-gray-100`}>
        {/* <ReduxProvider> */}
          {scoll > 10 && <div className='z-50 fixed lg:right-10 right-8 bottom-8 border-2 border-black rounded-full bg-gray-100 dark:bg-gray-700'>
            <KeyboardArrowUpIcon className='cursor-pointer' fontSize='large' onClick={() => window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })} />
          </div>}

          {/* <div>
          <NotificationsIcon onClick={() => setOpen(true)} className='hidden md:block h-12 w-12 fixed bottom-12 left-5 z-40 cursor-pointer border rounded-full bg-gray-200' />
        </div> */}

          {scrollDirection == 'up' &&
            <header>
              {!path.includes('chapter') && <Header />}
            </header>
          }

          <main>
            <div>
              {/* <NextNProgress height={8} color="#209cee" /> */}
            </div>
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        {/* </ReduxProvider> */}
      </body>
    </html>
  )
}
