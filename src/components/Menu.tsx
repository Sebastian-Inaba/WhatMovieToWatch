import { Link } from 'react-router-dom';
import '../App.css';

interface MenuProps {
    randomClick: () => void;
}

export function Menu({ randomClick }: MenuProps) {
    return (
        <div className="navMenuBackground">
            <div className="navMenu">
                <div className="myLogo">
                    <Link to="/">Logo</Link>
                </div>
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/">Movies</Link>
                        </li>
                        <li>
                            <Link to="/topRated">Top Rated</Link>
                        </li>
                        <li>
                            <Link
                                to="/RandomMovie"
                                onClick={randomClick}
                                aria-label="Get random movie"
                            >
                                Random Movie
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
