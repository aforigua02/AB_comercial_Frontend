import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative overflow-hidden pt-14">
        <div className="relative z-10">
          <Home />
        </div>
      </main>
      <Footer />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  )
}
