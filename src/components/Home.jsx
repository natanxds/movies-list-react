import MovieCard from "./MovieCard"
import { useState, useEffect } from "react";
import '../css/Home.css'
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLaoding] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.log(error);
                setError("Failed to fetch popular movies");
            } finally {
                setLaoding(false);
            }
        }
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return

        if (loading) return;
        setLaoding(true);

        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults)
            setError(null)
        } catch (error) {
            console.log(error)
            setError("Failed to search movies");
        } finally {
            setLaoding(false);
        }

        setSearchQuery("");
    }


    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movies" className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-mesasge">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;