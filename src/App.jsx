import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PortfolioProvider } from "./contexts/PortofolioContext/PortofolioContext";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import PortfolioList from './components/PortofolioList/PortofolioList';
import Portfolio from './pages/Portofolio/Portofolio';
 

function App() {
  return (
     <Router> 
      <PortfolioProvider>
        <Header />
        <main className="min-h-screen bg-gray-800 py-5"> 
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio-create" element={<Portfolio />} />
              <Route path="/portfolio-public"  element={<PortfolioList/>}/> 
            </Routes>
        </main>
        <Footer />
      </PortfolioProvider>
    </Router>
  );
}

export default App;
