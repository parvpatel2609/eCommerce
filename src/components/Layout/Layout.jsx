import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import '../../input.css';
import Helmet from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> {title} </title>
      </Helmet>

      <Navbar />

      <main style={{ minHeight: "80vh" }}>
        <Toaster />
        {children}
      </main>

      <Footer />
    </>
  )
}

export default Layout;