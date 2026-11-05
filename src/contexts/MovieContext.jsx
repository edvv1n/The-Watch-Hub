import { createContext, useContext, useState } from 'react';
const MovieContext = createContext(null);
export const useMovieContext = () => useContext(MovieContext);
const read = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
export function MovieProvider({children}) {
  const [favorites, setFavorites] = useState(() => read('favorites', []));
  const [name, setName] = useState(() => read('watchhub_name', ''));
  const [theme, setTheme] = useState(() => read('watchhub_theme', 'dark'));
  const saveFavorites = (list) => {setFavorites(list); localStorage.setItem('favorites', JSON.stringify(list));};
  const addToFavorites = (movie) => saveFavorites(prevUnique([...favorites, movie]));
  const removeFromFavorites = (id) => saveFavorites(favorites.filter(movie => movie.id !== id));
  const isFavorite = (id) => favorites.some(movie => movie.id === id);
  const updateName = (value) => {setName(value); localStorage.setItem('watchhub_name', JSON.stringify(value));};
  const updateTheme = (value) => {setTheme(value); localStorage.setItem('watchhub_theme', JSON.stringify(value));};
  return <MovieContext.Provider value={{favorites,addToFavorites,removeFromFavorites,isFavorite,name,updateName,theme,updateTheme}}>{children}</MovieContext.Provider>;
}
function prevUnique(items) {return items.filter((item,index)=>items.findIndex(x=>x.id===item.id)===index);}
