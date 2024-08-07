import './App.css';
import NavBar from './components/NavBar/NavBar';
import QuizState from './context/QuizState';
import Home from './pages/Home/Home';
import {
  Routes,
  Route
} from "react-router-dom";
import About from './pages/About/About';
import ReviewAnswer from './pages/Review/ReviewAnswer';
import ScoreCardShared from './pages/ScoreBoard/ScoreCardShared';
function App() {

  return (
    <>
      <QuizState>
        <div className="App">
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/review" element={<ReviewAnswer />} />
            <Route exact path="/share" element={<ScoreCardShared />} />
          </Routes>
        </div>
      </QuizState>
    </>
  );
}

export default App;
