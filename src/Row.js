import React, { useEffect, useState } from 'react';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const Row = ({ title, fetchUrl, isLargeRow }) => {

    let url = 'https://api.themoviedb.org/3' + fetchUrl;
    let imgUrl = `https://image.tmdb.org/t/p/original`;


    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [error, setError] = useState({
        mviName: '',
        msg: false
    })

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setMovies(data))
    }, [url]);


    const handleClick = (movie) => {
        console.log(movie);
        movieTrailer(`${movie.title}`).then(console.log).catch(console.error)

        if (trailerUrl) {
            setTrailerUrl('');
        }
        else {
            movieTrailer(movie?.name || movie?.title)
                .then((urll) => {
                    const urlParams = new URLSearchParams(new URL(urll).search);
                    setTrailerUrl(urlParams.get("v"));
                    setError(false);
                })
                .catch(err => setError({ mviName: movie.name || movie?.title, msg: true }))
        }
    }

    const opt = {
        height: "390 !important",
        width: "100% !important",
        margin: "0 auto",
        playerVars: {
            autoplay: 1,
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {
                    movies.results && movies.results.map(movies =>
                        <img
                            key={movies.id}
                            onClick={() => handleClick(movies)}
                            className={`poster_img ${isLargeRow && "large_poster_img"}`}
                            src={isLargeRow ? imgUrl + `${movies.poster_path}` : imgUrl + `${movies.backdrop_path}`}
                            alt={movies.title} />
                    )
                }
            </div>

            {error.msg && <p id="err-msg">{error.mviName} (trailer) - Not Found</p>}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opt}></YouTube>}
        </div>
    );
};

export default Row;