import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import ScrollReveal from './components/ScrollReveal'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Lookbook from './pages/Lookbook'
import About from './pages/About'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// old /gio-hang links: go home and ask the drawer to open
function OpenCart() {
  return <Navigate to="/" replace state={{ openCart: true }} />
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    // links with a #hash scroll to their own target (e.g. lookbook campaigns)
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollReveal />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/san-pham/:id" element={<ProductDetail />} />
          <Route path="/gio-hang" element={<OpenCart />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/gioi-thieu" element={<About />} />
          <Route path="/tin-tuc" element={<News />} />
          <Route path="/tin-tuc/:id" element={<NewsDetail />} />
          <Route path="/lien-he" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <FloatingContact />
    </>
  )
}
