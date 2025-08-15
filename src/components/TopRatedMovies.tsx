import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
}

export function TopRatedMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${apiUrl}&page=1`);
                if (!response.ok)
                    throw new Error('Network response was not ok');
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, [apiUrl]);

    useEffect(() => {
        if (page === 1) return;

        const fetchMoreMovies = async () => {
            try {
                const response = await fetch(`${apiUrl}&page=${page}`);
                if (!response.ok)
                    throw new Error('Network response was not ok');
                const data = await response.json();
                setMovies((prevMovies) => [...prevMovies, ...data.results]);
            } catch (error) {
                console.error('Error fetching more movies:', error);
            }
        };
        fetchMoreMovies();
    }, [page, apiUrl]);

    const viewMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <div className="movieCards">
                {movies.map((movie) => (
                    <Link
                        to={`/movie/${movie.id}`}
                        key={movie.id}
                        className="linkCard"
                    >
                        {movie.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                                className="moviePoster"
                            />
                        )}
                        <h3>{movie.title}</h3>
                    </Link>
                ))}
            </div>
            <button onClick={viewMore} className="viewMoreButton">
                View More
            </button>
        </div>
    );
}
