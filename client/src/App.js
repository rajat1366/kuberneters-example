import { Fragment } from "react";
import './App.css';
import { BrowserRouter, Routes, Route ,Link} from "react-router-dom";
import OtherPage from './OtherPage';
import MainComponent from "./MainComponent";

function App() {
  return (
    <BrowserRouter>
        <header className="header">
          <div>This is a multicontainer application</div>
          <Link to="/">Home</Link><br/>
          <Link to="/otherpage">Other page</Link>
        </header>
          <Routes>
      
            <Route exact path="/" element={<MainComponent/>} />
            <Route path="/otherpage" element={<OtherPage/>} />
          
        </Routes>
    </BrowserRouter>

  );
}

export default App;
