import React, { useState, useEffect } from 'react';
import axios from 'axios';


 


const UpdateForm = props => {
    console.log('Update Form props', props)

    const initialMovie = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    }


    const [movie, setMovie] = useState(initialMovie)
    console.log(movie);

    useEffect(() => {

        const id = props.match.params.id;
        const movieToEdit = props.movies.find(movie => `${movie.id}` === id)
        if(movieToEdit) {
            setMovie(movieToEdit)
        };
    }, [props.movies, props.match.params]) 

   

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const deleteMovie = e => {
        e.preventDefault();
        axios
        .delete(`http://localhost:5000/api/movies${movie.id}`)
        .then(res => {
            console.log('res from deleteMovie', res)
            props.history.push(`/`)
        })
        .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log('response from axios PUT request', res)
            props.setMovies([...props.movies, res.data])
            // setMovie(initialMovie)
            props.history.push(`/`)
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
                <button>Update</button>
                <button onCLick={deleteMovie}>Delete</button>
            </form>
        </div>
    )
}

export default UpdateForm;