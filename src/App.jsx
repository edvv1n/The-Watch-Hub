import {useState} from 'react';
import {Routes,Route} from 'react-router-dom';
import {MovieProvider,useMovieContext} from './contexts/MovieContext';
import NavBar from './components/NavBar';
import Logo from './components/Logo';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Movie from './pages/Movie';
import './css/index.css';
function Shell(){const {name,updateName,theme}=useMovieContext();const [draft,setDraft]=useState('');return <div className={`app-shell theme-${theme}`}><div className="ambient-orb orb-one"/><div className="ambient-orb orb-two"/>{!name?<div className="welcome-screen"><div className="welcome-art"/><form className="welcome-card glass" onSubmit={e=>{e.preventDefault();if(draft.trim())updateName(draft.trim().slice(0,45))}}><Logo/><div className="welcome-mark">✦ YOUR TICKET TO THE STORIES</div><h1>Welcome to<br/><em>The Watch Hub.</em></h1><p>Every great story starts somewhere.<br/>What should we call you?</p><label htmlFor="visitor-name">YOUR NAME</label><input id="visitor-name" required maxLength={45} autoFocus value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Enter your name"/><button className="primary-btn" type="submit">Enter the cinema <span className="chevron-right" aria-hidden="true"/></button><small>No account needed. Your name stays in this browser.</small></form></div>:<><NavBar/><main><Routes><Route path="/" element={<Home/>}/><Route path="/favorites" element={<Favorites/>}/><Route path="/movie/:id" element={<Movie/>}/><Route path="*" element={<Home/>}/></Routes></main><footer className="footer"><Logo/><span>Made for movie lovers. Powered by TMDB.</span><small>This product uses the TMDB API but is not endorsed or certified by TMDB.</small></footer></>}</div>}
export default function App(){return <MovieProvider><Shell/></MovieProvider>}
