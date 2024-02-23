import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/home";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Categories from './Categories';
import './output.css';
import SignIn from './SignIn';
import Contact from './components/contact';
import Propos from "./components/propos"

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Catégories"  element={<Categories/>} />
          <Route path="/propos"  element={<Propos/>} />
          <Route path="/SignIn"  element={<SignIn/>} />
          <Route path="/Contact"  element={<Contact/>} />
         
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
