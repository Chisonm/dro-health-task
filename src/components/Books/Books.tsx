import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import BooksData from './BooksData';
import './books.style.css';

// @ts-check
const Books = () => {
  const [pages, setPages] = useState<number>(2);
  const apiUrl2: string = `https://www.anapioficeandfire.com/api/books?page=${pages}&pageSize=10`;

  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasmore] = useState<boolean>(true);

  // this will render the data from the api as soon as the component mounts
  useEffect(() => {
    // the api url must be string
    const apiUrl: string = process.env.React_App_BOOKS_API_URL;
    // fetch all the books from the first page
    const getBooks: any = () => {
      fetch(apiUrl)
        .then(response =>{ 
          if (!response.ok) { throw response}
          return response.json()
        })
        .then(data => {
          // assigning the books variable with the new state ( data from api )
          setBooks(data)
          // set Loading to false when data is returned from the server
          setLoading(false);
        })
        .catch(err => { 
          alert(err.message)
        })
    }
    getBooks();
  }, [books])


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

  const handleLoading = () => {
    
     setInterval(alertFunc, 3000);
    
  } 
  function alertFunc() {
      alert("loading!");
  }
  
  return (
    <div className="container">
      <div className="title-section">
        <h2>Books</h2>
      </div>
      { loading ? (<h1>loading...</h1> ) : 
          (<InfiniteScroll
            dataLength={books.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={handleLoading}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>that's all</b>
              </p>
            }
          >
            <div className="d-grid">
              {
                books.map((book, index) => {
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
          // error ? (<h1>error</h1>) : ''
      }
    </div>
  )}

export default Books