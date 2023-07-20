import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import RenderLogin from './components/login/login.jsx';
import RenderMenu from './components/menu/menu.jsx';
import RenderSeries from './components/movies/series.js';
import RenderMovie from './components/movies/movie.js';
import RenderMovieSearch from './components/movies/moviesSearch/movieSearch.jsx'
import RenderMovieInfoPage from './components/movies/moviesInfo/movieInfoPage.jsx';



function App () {

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/menu')
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<RenderLogin />} />
      <Route path="/login" element={<RenderLogin />} />
      <Route path='/menu' element={<RenderMenu />} />
      <Route path='/series' element={<RenderSeries />} />
      <Route path='/movie' element={<RenderMovie />} />
      <Route path='/search' element={<RenderMovieSearch />} />
      <Route path='/vod_info' element={<RenderMovieInfoPage />} />
    </Routes>
  );
}

export default App;
