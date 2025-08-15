import React from 'react';

// https://www.themoviedb.org/
// https://www.youtube.com/

export function Footer() {
    return (
        <footer style={footerStyles}>
            <p>
                ALL Data provided by{' '}
                <a href="https://www.themoviedb.org/" style={tmdbLinkStyles}>
                    TMDb
                </a>
            </p>
            <p>
                ALL Trailers embedded from{' '}
                <a href="https://www.youtube.com/" style={youtubeLinkStyles}>
                    YouTube
                </a>
            </p>
        </footer>
    );
}

type CSSProperties = React.CSSProperties;

const footerStyles: CSSProperties = {
    marginTop: '50px',
    border: '5px solid yellow',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'darkgray',
    color: 'white',
};

const tmdbLinkStyles: CSSProperties = {
    color: 'green',
    textDecoration: 'none',
    fontWeight: 'bold',
};

const youtubeLinkStyles: CSSProperties = {
    color: 'red',
    textDecoration: 'none',
    fontWeight: 'bold',
};
