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
import RenderSettingsPage from './components/settings/settings.jsx';
import RenderMoviePlayerPage from './components/movies/moviePlayer/moviePlayer.jsx';
import RenderFriendsPage from './components/friends/friendsPage.jsx';
import { useDispatch, useSelector } from 'react-redux';
import RenderLiveTv from './components/liveTv/liveTv.jsx';
import os from './remote/register';
import io from 'socket.io-client';
import { events, playerEvents } from './remote/socket';

function makeid (length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
}

const id = makeid(12)

// export const socket = io('http://192.168.8.127:6543', { transports: ["websocket"], auth: { code: id } });
export const socket = io('http://173.249.2.23:6543', { transports: ["websocket"], auth: { code: id } });

function App () {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onPlayerEvent = (e) => {
    switch (e.event) {
      case playerEvents.setupDataSource: {
        navigate('/player', { state: e.data.playerInfo })

        dispatch(
          {
            type: 'CHANGE_INFO_STATE',
            payload: {
              infoPageState: e.data.infoPageState
            }
          }
        )

        dispatch(
          {
            type: 'CHANGE_CONTROLS',
            payload: {
              name: 'movie-player'
            }
          }
        )

        dispatch(
          {
            type: 'CHANGE_SELECTID_MOVIE',
            payload: {
              movie: e.data.selectidMovie
            }
          }
        )
        break;
      }
    }

  }


  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/menu')
      dispatch(
        {
          type: 'CHANGE_CONTROLS',
          payload: {
            name: 'menu-item'
          }
        }
      )
    } else {
      navigate('/login')
      dispatch(
        {
          type: 'CHANGE_CONTROLS',
          payload: {
            name: 'login-items'
          }
        }
      )
    }

    socket.on(events.playerEvent, (e) => onPlayerEvent(e))

    return () => { }
  }, [])

  os()

  if (!localStorage.getItem('pinCode')) {
    localStorage.setItem('pinCode', '0000')
  }

  if (!localStorage.getItem('language')) {
    localStorage.setItem('language', 'eng')
  }

  if (!localStorage.getItem('mac')) {
    localStorage.setItem('mac', id)
  }

  return (
    <Routes>
      <Route path='/' element={<RenderLogin />} />
      <Route path="/login" element={<RenderLogin />} />
      <Route path='/menu' element={<RenderMenu />} />
      <Route path='/series' element={<RenderSeries />} />
      <Route path='/movie' element={<RenderMovie />} />
      <Route path='/search' element={<RenderMovieSearch />} />
      <Route path='/vod_info' element={<RenderMovieInfoPage />} />
      <Route path='/settings' element={<RenderSettingsPage />} />
      <Route path='/live_tv' element={<RenderLiveTv />} />
      <Route path='/player' element={<RenderMoviePlayerPage />} />
      <Route path='/friends' element={<RenderFriendsPage />} />
    </Routes>
  );
}

export default App;
