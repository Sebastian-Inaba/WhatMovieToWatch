import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    genres: { id: number; name: string }[];
}

interface Trailer {
    id: string;
    key: string;
    name: string;
    type: string;
    site: string;
}

export function ClickedMovie() {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [trailer, setTrailer] = useState<Trailer | null>(null);
    const [backdrop, setBackdrop] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;

                // Fetch all data
                const [movieResponse, trailerResponse, backdropResponse] =
                    await Promise.all([
                        fetch(
                            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
                        ),
                        fetch(
                            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`,
                        ),
                        fetch(
                            `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`,
                        ),
                    ]);

                if (
                    !movieResponse.ok ||
                    !trailerResponse.ok ||
                    !backdropResponse.ok
                ) {
                    throw new Error('Failed to fetch movie data');
                }

                const [movieData, trailerData, backdropData] =
                    await Promise.all([
                        movieResponse.json(),
                        trailerResponse.json(),
                        backdropResponse.json(),
                    ]);

                setMovie(movieData);

                // Find YouTube trailer
                const youtubeTrailer = trailerData.results.find(
                    (video: Trailer) =>
                        video.type === 'Trailer' && video.site === 'YouTube',
                );
                setTrailer(youtubeTrailer || null);

                // Set backdrop image if available
                setBackdrop(
                    backdropData.backdrops?.length > 0
                        ? backdropData.backdrops[0].file_path
                        : null,
                );
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Failed to load movie data',
                );
                console.error('Error fetching movie:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieData();
    }, [id]);

    if (isLoading) {
        return <div className="spinner"></div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!movie) {
        return <div className="error-message">Movie not found</div>;
    }

    const divStyle = {
        '--backdrop-url': backdrop
            ? `url(https://image.tmdb.org/t/p/original${backdrop})`
            : 'none',
    } as React.CSSProperties;

    return (
        <div
            className={`movieGrid ${backdrop ? 'has-backdrop' : ''}`}
            style={divStyle}
        >
            <h1>{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                }}
            />

            <div className="movieGenres">
                {movie.genres.map((genre) => (
                    <span key={genre.id} className="genre">
                        {genre.name}
                    </span>
                ))}
            </div>

            <p className="movieDescription">{movie.overview}</p>
            <p className="releaseDate">Release Date: {movie.release_date}</p>

            {trailer && (
                <div className="trailer">
                    <h3>
                        {movie.title} - {trailer.name}
                    </h3>
                    <div className="trailer-container">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={`${movie.title} Trailer`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
