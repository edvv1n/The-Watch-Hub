import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useMovieContext} from '../contexts/MovieContext';
import {imageUrl} from '../services/api';
export default function MovieCard({movie}){
 const {isFavorite,addToFavorites,removeFromFavorites}=useMovieContext();const favorite=isFavorite(movie.id);
 const [heartAnimation,setHeartAnimation]=useState(0);
 const toggleFavorite=()=>{if(favorite){removeFromFavorites(movie.id)}else{setHeartAnimation(n=>n+1);addToFavorites(movie)}};
 return <article className="movie-card glass"><Link to={`/movie/${movie.id}`} className="poster-link" aria-label={`View ${movie.title}`}><div className="poster-frame">{movie.poster_path?<img loading="lazy" src={imageUrl(movie.poster_path,'w500')} alt={`${movie.title} poster`}/>:<div className="poster-placeholder">🎞</div>}<span className="poster-shine"/></div></Link><button className={`heart ${favorite?'active':''}`} aria-label={favorite?'Remove from watchlist':'Add to watchlist'} aria-pressed={favorite} onClick={toggleFavorite}><span key={favorite?`saved-${heartAnimation}`:'unsaved'} className={favorite&&heartAnimation?'heart-symbol heart-pop':'heart-symbol'} aria-hidden="true">{favorite?'♥':'♡'}</span></button><div className="card-meta"><Link to={`/movie/${movie.id}`}><h3>{movie.title}</h3></Link><div className="card-sub"><span>{movie.release_date?.slice(0,4)||'Coming soon'}</span><span className="star">★ {movie.vote_average?movie.vote_average.toFixed(1):'—'}</span></div></div></article>
}
