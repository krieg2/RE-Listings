import './App.css';
import { useCallback, useState } from 'react';
import Listing from './Listing';
import Paginator from './Paginator';

function App() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState();

  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const [results, setResults] = useState([]);

  const search = async (requestPage) => {
    let urlString = "http://localhost:8080/listings";
    urlString += `?minPrice=${minPrice}&maxPrice=${maxPrice}&minBedrooms=${minBedrooms}&page=${requestPage}`;

    if(city) urlString += `&city=${city}`;
    if(description) urlString += `&description=${description}`;

    try {
      const response = await fetch(urlString);
      const json = await response.json();
      
      setResults(json.content);
      setPage(json.number);
      setTotalPages(json.totalPages);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleClick = () => {
    setPage(0);
    setTotalPages(0);
    search(0);
  };

  const handlePrevious = useCallback(() => {
    const prevPage = page <= 0 ? 0 : page - 1;
    if(prevPage !== page) {
      search(prevPage);
    }
  }, [page]);

  const handleNext = useCallback(() => {
    const limit = totalPages - 1;
    const nextPage = page >= limit ? limit : page + 1;
    if(nextPage !== page) {
      search(nextPage);
    }
  }, [page, totalPages]);

  const handlePageSelect = useCallback((p) => {
    const nextPage = p;
    if(nextPage !== page) {
      search(p);
    }
  }, [page]);

  return (
    <div className="App">
      <div className="heading"><h1>Real Estate Listing Search</h1></div>

      <div className="search-controls">

        <label htmlFor="min-price">Min Price:</label>
        <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} type="number" id="min-price" min="0" max="100000" step="0.01" />
        
        <label htmlFor="max-price">Max Price:</label>
        <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} type="number" id="max-price" min="0" max="100000" step="0.01" />

        <label htmlFor="min-beds">Min Bedrooms:</label>
        <input value={minBedrooms} onChange={(e) => setMinBedrooms(e.target.value)} type="number" id="min-beds" min="0" max="100" step="1" />

        <label htmlFor="city">City:</label>
        <input value={city} onChange={(e) => setCity(e.target.value)} id="city" />

        <label htmlFor="description">Description:</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} id="description" />

        <button onClick={handleClick}>Search</button>
      </div>
      {error
      ?
        <>{error}</>
      :
        <div className="search-results">{
            !!results && results.length > 0
          ?
            <div>
              <Paginator currentPage={page} totalPages={totalPages} pageSelectCallback={handlePageSelect} previousCallback={handlePrevious} nextCallback={handleNext} />
              <div>{results.map(res => <Listing key={res.id} {...res} />)}</div>
            </div>
          :
            "No results."
          }
        </div>
      }
    </div>
  );
}

export default App;
