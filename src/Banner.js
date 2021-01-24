import React, { useEffect, useState } from 'react';
import "./Banner.css";

const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(()=>{
        fetch('https://api.themoviedb.org/3/discover/tv?api_key=fe98e7f53085f48d4cd9ec736b394793&with_networks=213')
        .then(res => res.json())
        .then(data => setMovie(data.results[Math.floor(Math.random()*data.results.length)]))
    },[]);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    return (
        <header className="banner"
        style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
            
        }}
        >
            <div className="banner_content">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner_buttons">
                    <button className="banner_btn">Play</button>
                    <button className="banner_btn">My List</button>
                </div>

                <h1 className="banner_description">
                    {truncate(movie?.overview, 150)}
                </h1>

            </div>
            <div className="fade_btm"></div>
            
        </header>
    );
};

export default Banner;