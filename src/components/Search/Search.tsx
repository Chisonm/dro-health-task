import React from 'react'
import './search.style.css'
    
export default function Search() {
    return (
        <div className="container">
            <div className="flex-row">
                <input type="text" className="form-control"  placeholder="Search for books"/>
                <button className="search-btn"><i className='bx bx-white bx-search-alt'></i></button>
            </div>
        </div>
    )
}
