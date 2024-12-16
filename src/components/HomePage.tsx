"use client"
import React, { useState, useEffect, ReactEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { clientSearch } from '@/store/actions';
import { ClientSearchResponse, ClientSearchResults } from '@/types/Schema';
import DataTable from './DataTable';
import { useSelector } from 'react-redux';
import { AppState } from '@/store/reducers';

const HomePage = () => {
    const dispatch = useDispatch();
    const [isText, setText] = useState(null);
    const searchResults = useSelector((state: AppState) => state.user.clientSearchResults);
    const [isSearchResults, setSearchResults] = useState(searchResults);

    const searchClient = () => {
        dispatch(clientSearch(`${isText ? isText : ''}`, 'NAME', 'ASCENDING', 2, 50));
    }

    const searchHandler=(e:any)=>{
        setText(e.target.value);
        if (e.key === 'Enter') {
            e.preventDefault();
            setText(e.target.value);
            searchClient();
        }
    }

    useEffect(() => {
        setSearchResults(searchResults);
    }, [searchResults])

    return (
        <>
            <div className='flex flex-col md:flex-row items-center gap-5 p-7 bg-gradient-to-l from-cyan-500 to-blue-500'>
                <h1 className='text-3xl text-white'>Client Search</h1>
                <form className="min-w-[400px] px-5">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" onChange={searchHandler} onKeyDown={searchHandler} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="search by name" />
                    </div>
                </form>
                <button onClick={searchClient} className="text-white bg-blue-800 hover:bg-blue-700 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3">Search</button>
            </div>
            <section className='container w-full mx-auto my-5'>
            {isSearchResults.length ?
                <DataTable resultData={isSearchResults} /> : <h1 className='text-black'>No Data</h1>
            }
            </section>
        </>
    )
}

export default HomePage;

