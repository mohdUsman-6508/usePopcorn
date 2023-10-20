import { useEffect, useState } from "react";
import StarRating from "./StarRating.js";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = "dc928c08";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Ben 10");
  const [selectId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState([]);

  function handleWathced(movie) {
    setWatched((watched) => [...watched, movie]);
    setSelectedId(null);
  }

  function handleDeleteMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function onSelectId(id) {
    setSelectedId((selectId) => (selectId ? null : id));
    // console.log(selectId);
  }

  function onCloseDetails() {
    setSelectedId(null);
  }

  /////////////useEffect
  useEffect(
    function () {
      const controller = new AbortController();

      async function getMovies() {
        try {
          setIsLoad(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("something went wrong!");
          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found!");
          setMovies(data.Search);
          setError("");

          // .then((res) => res.json())
          // .then((data) => setMovies(data.Search));
        } catch (err) {
          // console.log(err.message);
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoad(false);
          setError("");
        }
      }

      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }

      getMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  //// FOR FUTURE REFERENCE
  /// DEPENDENCY ARRAY IS VERY IMPORTANT HERE IT PLAYS A BIG ROLE::

  // useEffect(function () {
  //   console.log(
  //     "it will render everytime,at initial render after browser paint,whenever state changes"
  //   );// In sync with everyone
  // });
  // useEffect(function () {
  //   console.log(
  //     "it will render only one time when browser paint initially on starting of application"
  //   );
  // }, []); //// Empty dependency array i.e it is not depending on an state changes

  // console.log("i will render, i don't care");

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Result movies={movies} />
      </Navbar>
      <Main>
        <LeftBox>
          {/* {isLoad ? <Loader /> : <LeftMovieList movies={movies} />} */}
          {isLoad && <Loader />}
          {!isLoad && !error && (
            <LeftMovieList
              movies={movies}
              onSelectId={onSelectId}
              selectId={selectId}
            />
          )}
          {error && <ErrorMessage error={error} />}
        </LeftBox>
        <RightBox
          selectId={selectId}
          onCloseDetails={onCloseDetails}
          watched={watched}
          onWatchedMovie={handleWathced}
          handleDeleteMovie={handleDeleteMovie}
        />
      </Main>
    </>
  );
}

function ErrorMessage({ error }) {
  return (
    <p className="error">
      <span>⚠️</span>
      {error}
    </p>
  );
}
function Loader() {
  return <p className="loader">Loading....</p>;
}
///////////////////////////
////////////////////Navbar*************************************************************************** */
function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Result({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
/////////////Navbar
//********************************************************************************************** */
//////////////
function Main({ children }) {
  return <main className="main">{children}</main>;
}

///////////////////////////
function RightBox({
  selectId,
  onCloseDetails,
  watched,
  onWatchedMovie,
  handleDeleteMovie,
}) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {selectId ? (
        <MovieDetails
          selectId={selectId}
          onCloseDetails={onCloseDetails}
          onWatchedMovie={onWatchedMovie}
          watched={watched}
        />
      ) : (
        <>
          {isOpen2 && (
            <>
              <Summary watched={watched} />
              <WatchedMovieList
                watched={watched}
                handleDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

function MovieDetails({ selectId, onCloseDetails, onWatchedMovie, watched }) {
  const [movieDetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState();

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectId);
  const watchedRating = watched.find(
    (movie) => movie.imdbID === selectId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbRating,
  } = movieDetail;

  useEffect(
    function () {
      async function getMovieDeatail() {
        setLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectId}`
        );
        const data = await res.json();
        // console.log(data);
        setMovieDetail(data);
        setLoading(false);
      }

      getMovieDeatail();
    },
    [selectId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `${title}`;

      return function () {
        document.title = "usePopcorn";
        // console.log(`${title}leanUp fn`);
      }; ////cleanup function
    },
    [title]
  );
  function handleAdd() {
    const movieObj = {
      imdbID: selectId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onWatchedMovie(movieObj);
  }
  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseDetails}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            {!isWatched ? (
              <div className="rating">
                <StarRating maxRating={10} size={24} setState={setUserRating} />
                {userRating ? (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to list
                  </button>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <p style={{ color: "red", fontSize: "18px" }}>
                You have rated this movie {watchedRating} ⭐.
              </p>
            )}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, handleDeleteMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieListItem
          movie={movie}
          key={movie.imdbID}
          handleDeleteMovie={handleDeleteMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovieListItem({ movie, handleDeleteMovie }) {
  function handleDelete() {
    // console.log("working");
    // console.log(movie.imdbID);
    handleDeleteMovie(movie.imdbID);
  }
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={handleDelete}>
          X
        </button>
      </div>
    </li>
  );
}
//////////////////////

//////////
function LeftBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function LeftMovieList({ movies, onSelectId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <LeftMovieListItem
          movie={movie}
          key={movie.imdbID}
          onSelectId={onSelectId}
        />
      ))}
    </ul>
  );
}

function LeftMovieListItem({ movie, onSelectId }) {
  // const [selectId, setSelectedId] = useState(null);

  return (
    <li onClick={() => onSelectId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
