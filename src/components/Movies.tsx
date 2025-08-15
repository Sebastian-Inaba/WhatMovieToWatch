import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
}

export function Movies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const baseUrl = 'https://api.themoviedb.org/3/movie/popular';

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(
                    `${baseUrl}?api_key=${apiKey}&language=en-US&page=1`,
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'An unknown error occurred',
                );
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [apiKey]);

    useEffect(() => {
        if (page === 1) return;

        const fetchMoreMovies = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${baseUrl}?api_key=${apiKey}&language=en-US&page=${page}`,
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch more movies');
                }

                const data = await response.json();
                setMovies((prevMovies) => [...prevMovies, ...data.results]);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Failed to load more movies',
                );
                console.error('Error fetching more movies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMoreMovies();
    }, [page, apiKey]);

    const viewMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

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
                                onError={(e) => {
                                    (
                                        e.target as HTMLImageElement
                                    ).style.display = 'none';
                                }}
                            />
                        )}
                        <h3>{movie.title}</h3>
                    </Link>
                ))}
            </div>

            {!isLoading && (
                <button onClick={viewMore} className="viewMoreButton">
                    View More
                </button>
            )}

            {isLoading && <div className="loading-spinner">Loading...</div>}
        </div>
    );
}
