import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Wordleaux from './Wordleaux';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

const Header = () => {
  return (
    <header className="App-header">
      <Link
        to="/"
        className="App-link"
      >
        Home
      </Link>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/wordleaux" element={<Wordleaux />} />
      </Routes>
    </div>
  );
}

export default App;
