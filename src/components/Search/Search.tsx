/* eslint-disable no-dupe-args */
import { useState, useEffect } from 'react'
import React from 'react'
import './search.style.css'

interface SearchProps  {
    placeholder: string,
    handleChange: any,
    query: string
}

export default function Search(search : SearchProps) {
   
    return (
        <div className="container">
            <div className="flex-row">
                <input type="search" className="form-control" value={search.query} onChange={search.handleChange}  placeholder={search.placeholder}/>
                <button className="search-btn"><i className='bx bx-white bx-search-alt'></i></button>
            </div>
        </div>
    )
}
