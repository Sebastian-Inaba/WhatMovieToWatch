import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Movies } from './components/movies';
import { TopRatedMovies } from './components/topRatedMovies';
import { ClickedMovie } from './components/clickedMovie';
import { RandomMovie } from './components/randomMovie';
import { Menu } from './components/menu';
import { Footer } from './components/Attribution';
import './App.css';

function App() {
    const [randomKey, setRandomKey] = useState<number>(0); // randomKey is used to re use the RandomMovie component

    return (
        <Router>
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
