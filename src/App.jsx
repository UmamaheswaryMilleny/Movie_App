import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Spinner from "./components/spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

//server that we sending API request to
const API_BASE_URL = "https://api.themoviedb.org/3";

//it is like a password that identifies you to server
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

//This is a JavaScript object that stores settings for the API call.
const API_OPTIONS = {
  method: "GET",
  //These are extra pieces of information you send with your request.
  headers: {
    //ou’re telling the server: “Please give me the response in JSON format”.
    accept: "application/json",
    //This is how you log in to the server."Bearer" is a type of authentication — it just means "Here’s my token!".
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm,setDebouncedSearchTerm]=useState('')
  const [trendingMovies,setTrendingMovies]=useState([])

//debounce the search term to prevent making too many api requests
//by waiting for the user to stop typing for 500ms
useDebounce(()=>setDebouncedSearchTerm(searchTerm),500,[searchTerm])

  const fetchMovies = async (query='') => {

    setIsLoading(true);
    //Clear out any old error messages.
    setErrorMessage("");
    try {
      const endpoint = query?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
       :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      //fetch() Only throws for network errors, not for HTTP errors
      if (!response.ok) {
        //Forces the code to go into the catch() block for bad HTTP status
        throw new Error("Failed to fetch movies");
      }
      //his line turns that JSON into a JavaScript object you can work with.
      const data = await response.json();
      // console.log(data);
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      if(query && data.results.length>0){
        await updateSearchCount(query,data.results[0])
      }
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      // setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  const loadTrendingMovies=async()=>{
    try{
      const movies=await  getTrendingMovies()
      setTrendingMovies(movies)

    }catch(error){
      console.error(`Error fetching trending movies :${error}`)

    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(()=>{
    loadTrendingMovies()
  },[])

  return (
    <main
      className="overflow-hidden
"
    >
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span>You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trendingMovies.length>0 &&(
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie,index)=>(
                <li key={movie.$id}>
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
              </ul></section>
        )}
        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
