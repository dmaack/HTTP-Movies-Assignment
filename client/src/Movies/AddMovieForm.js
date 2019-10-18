import React, { useState, useEffect } from 'react';
import axios from 'axios'

const AddMovieForm = props => {
    console.log('Add movie form props', props)

    const initialMovie = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    }


    const [movie, setMovie] = useState(initialMovie)

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/api/movies/`, movie)
            .then(res => {
                console.log('res from post handleSubmit', res.data)
                props.setMovies([...props.movies, res.data])
                props.history.push('/')
            })
            .catch(err => console.log(err))
            setMovie({initialMovie})
    }

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        let name = e.target.name;

        setMovie({
            ...movie,
            [name]: name === 'stars' ? value.split(',') : value
        })
    }
    
        
    
    
    return (
        <div>
            <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='title'
                    onChange={changeHandler}
                    value={movie.title}
                />
                <input
                    type='text'
                    name='director'
                    placeholder='director'
                    onChange={changeHandler}
                    value={movie.director}
                />
                <input
                    type='text'
                    name='metascore'
                    placeholder='metascore'
                    onChange={changeHandler}
                    value={movie.metascore}
                />
                <input
                    type='text'
                    name='stars'
                    placeholder='stars'
                    onChange={changeHandler}
                    value={movie.stars}
                />
                
                <button>Add</button>
                {/* {movie.stars.map(actor => {
                    return <div>{actor}</div>
                })} */}
            </form>
        </div>
    )
}

export default AddMovieForm;