import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Movies } from './components/Movies';
import { TopRatedMovies } from './components/TopRatedMovies';
import { ClickedMovie } from './components/ClickedMovie';
import { RandomMovie } from './components/RandomMovie';
import { Menu } from './components/Menu';
import { Footer } from './components/Attribution';
import './App.css';

function App() {
    const [randomKey, setRandomKey] = useState<number>(0); // randomKey is used to re use the RandomMovie component

    return (
        <Router basename={import.meta.env.BASE_URL}>
            <div className="App">
                <header className="navMenu">
                    <Menu
                        randomClick={() => setRandomKey((prev) => prev + 1)}
                    />
                </header>
                <Routes>
                    <Route path="/" element={<Movies />} />
                    <Route path="/movie/:id" element={<ClickedMovie />} />
                    <Route path="/topRated" element={<TopRatedMovies />} />
                    <Route
                        path="/RandomMovie"
                        element={<RandomMovie key={randomKey} />}
                    />
                </Routes>
            </div>
            <div className="tmdbAttribution">
                <Footer />
            </div>
        </Router>
    );
}

export default App;
