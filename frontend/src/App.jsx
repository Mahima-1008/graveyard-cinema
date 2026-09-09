import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes/routes';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import SuspenseFallback from './components/common/SuspenseFallback';
import './App.css';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'));
const Movies = lazy(() => import('./pages/Movies'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const Series = lazy(() => import('./pages/Series'));
const SeriesDetail = lazy(() => import('./pages/SeriesDetail'));
const ShortFilms = lazy(() => import('./pages/ShortFilms'));
const Stories = lazy(() => import('./pages/Stories'));
const StoryDetail = lazy(() => import('./pages/StoryDetail'));
const Reels = lazy(() => import('./pages/Reels'));
const Trailers = lazy(() => import('./pages/Trailers'));
const Search = lazy(() => import('./pages/Search'));
const Genre = lazy(() => import('./pages/Genre'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const Watchlist = lazy(() => import('./pages/Watchlist'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
        </Route>

        {/* Main Routes */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.MOVIES} element={<Movies />} />
          <Route path={ROUTES.MOVIE_DETAIL} element={<MovieDetail />} />
          <Route path={ROUTES.SERIES} element={<Series />} />
          <Route path={ROUTES.SERIES_DETAIL} element={<SeriesDetail />} />
          <Route path={ROUTES.SHORT_FILMS} element={<ShortFilms />} />
          <Route path={ROUTES.STORIES} element={<Stories />} />
          <Route path={ROUTES.STORY_DETAIL} element={<StoryDetail />} />
          <Route path={ROUTES.REELS} element={<Reels />} />
          <Route path={ROUTES.TRAILERS} element={<Trailers />} />
          <Route path={ROUTES.SEARCH} element={<Search />} />
          <Route path={ROUTES.GENRE} element={<Genre />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.WATCHLIST} element={<Watchlist />} />
        </Route>

        {/* 404 Not Found Route */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
