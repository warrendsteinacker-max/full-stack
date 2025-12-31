import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './AppContext';
import HomePage from './HomePage';
import './App.css';

function App() {
  return (
    /* Wrap the entire app so Context is available everywhere */
    <GlobalProvider>
      <Router>
        <Routes>
          {/* Your new Home Page Route */}
          <Route path="/" element={<HomePage />} />

          {/* You can add more routes here as you expand the app */}
          {/* <Route path="/training" element={<TrainingPage />} /> */}
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;