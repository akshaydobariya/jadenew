'use client'
import { Montserrat, Poppins, Ubuntu } from 'next/font/google'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './globals.css'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import useApiService from '@/services/ApiService';
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
import { Router } from 'next/router';

const ubuntu = Ubuntu({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  const { notificationSubscribe } = useApiService()

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

  // useEffect(() => {
  //   Notification.requestPermission().then(async (permission) => {
  //     if (permission == 'granted') {
  //       await getToken(getMessaging(firebaseApp), {
  //         vapidKey: "BJU-6SvGrpylVgRweN25BqXMUYGXsLmsi-tlSAENWJhtjfe9WYVjtRZ4xCl9XJZlpdMgzzQG7TBil5P9qIUXonw",
  //       }).then((currentToken) => {
  //         if (currentToken) {
  //           notificationSubscribe().then((res) => {
  //             console.log('res notification', res);
  //           }).catch((er) => {
  //             console.log(er);
  //           })
  //         } else {
  //           console.log("No token available");
  //         }
  //       }).catch((er) => {
  //         console.log("Error");
  //       })
  //     }
  //   })
  // }, [])

  return (
    <html lang="en">
      <body className={`${ubuntu.className} dark:bg-gray-800 dark:text-gray-100`}>
        <header>
          <Header />
        </header>
        <main>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
