import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import BooksData from './components/Books/BooksData';
import Navbar from './components/Navbar/Navbar'
import Search from './components/Search/Search';

function App() {
  const [pages, setPages] = useState<number>(2);
  const apiUrl2: string = `https://www.anapioficeandfire.com/api/books?page=${pages}&pageSize=10`;

  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasmore] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  //     set search query to empty string
  const [query, setQuery]: [string, (query: string) => void] = useState<string>("");
  // const [searchParam] = useState<string[]>(["publisher", "name", "isbn", "authors"]);


  // this will render the data from the api as soon as the component mounts
  useEffect(() => {
    // the api url must be string
    const apiUrl: string = process.env.React_App_BOOKS_API_URL;
    // fetch all the books from the first page
    const getBooks: any = () => {
      fetch(apiUrl, {
        method: 'GET'
      })
        .then(response => {
          if (!response.ok) { throw response }
          return response.json()
        })
        .then((data) => {
          // set Loading to true when data is has returned from the server
          setLoading(true);
          // assigning the books variable with the new state ( data from api )
          setBooks(data)
        },
          (error) => {
            setLoading(true);
            setError(error);
          })
    }
    getBooks();
  }, [])

  // fetch books on page 2
  const fetchPages = async () => {
    const res = await fetch(apiUrl2);
    const data = await res.json()
    return data;
  }

  // fetches data from page1 and page2 for infinite scrolling
  const fetchData = async () => {
    const dataFromPages = await fetchPages()
    setBooks([...books, ...dataFromPages]);
    // if data from the page is Equal to 0 or the data is lessThan 20 then it should stop loading
    if (dataFromPages.length === 0 || dataFromPages.length < 20) {
      setHasmore(false);
    }
    setPages(pages + 1);
    console.log('loading...');
  }
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  
  const searchItems = (e: { target: { value: string } }) => {
    
    setQuery(e.target.value)
    
    if (query !== '') {
        const filteredData = books.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(query.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(books)
    }
}



  return (
    <>
      <Navbar />
      <Search placeholder="Search for books" handleChange={searchItems} query={query} />

      <div className="container">
        <div className="title-section">
          <h2>Books</h2>
        </div>
        {error ? (<div>Error: {`${error.message} data`}</div>) : query.length > 1 ? (
        <div className="d-grid">
              {filteredResults.map((book, index) => {
                return (
                  <div key={index}>
                    <BooksData
                      name={book.name}
                      publisher={book.publisher}
                      authors={book.authors}
                      isbn={book.isbn}
                      released={book.released} />
                  </div>
                )
              })
              }
            </div>) : !loading ? (<h3>Loading....</h3>) :
          (<InfiniteScroll
            dataLength={books.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>that's all</b>
              </p>
            }
          >
            <div className="d-grid">
              {books.map((book, index) => {
                return (
                  <div key={index}>
                    <BooksData
                      name={book.name}
                      publisher={book.publisher}
                      authors={book.authors}
                      isbn={book.isbn}
                      released={book.released} />
                  </div>
                )
              })
              }
            </div>
          </InfiniteScroll>)
        }
      </div>
    </>
  );
}

export default App;
