import React, { useState, useEffect } from 'react';
import axios from 'axios';


   const initialMovie = {
       id: '',
       title: '',
       director: '',
       metascore: '',
       stars: ''
   }


const UpdateForm = props => {
    console.log('Update Form props', props)
    const [movie, setMovie] = useState(initialMovie)
    console.log(movie);

    const changeHandler = e => {
        return null
    }

    const handleSubmit = e => {
        e.preventdefault();
        axios
        .put(`http://localhost5000/api/movies/${props.match.params.id}`, movie)
        .then(res => {
            console.log('response from axios PUT request', res)
            props.setMovies(...props.movies, res.data)
        })
        .catch(err => {
            console.log('No data', err)
        })
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='Enter new title'
                    // onChange={}
                    // value={}
                />
                <input
                    type='text'
                    name='director'
                    placeholder='Enter new director'
                    // onChange={}
                    // value={}
                />
                <input
                    type='text'
                    name='metascore'
                    placeholder=''
                    // onChange={}
                    // value={}
                />
                <input
                    type='text'
                    name='stars'
                    placeholder=''
                    // onChange={}
                    // value={}
                />
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateForm;