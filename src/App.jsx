import { Routes, Route } from 'react-router-dom';

import Caesar from './pages/Caesar';
import Subheader from './components/Header';
import Vigener from './pages/Vigener';

import './App.scss';

const App = () => {
  return (
    <>
      <header>
        <h1>Технології захисту інформації</h1>
        <Subheader />
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Caesar />} />
          <Route path="/vigener" element={<Vigener />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
