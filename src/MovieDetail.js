import React, { Component } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';
import apiConfig from './apikeys';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w300';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';
class MovieDetail extends Component {
  state = {
    movie: {},
  }

  async componentDidMount() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${apiConfig.api_key}&language=en-US`);
      const movie = await res.json();
      this.setState({
        movie,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movie } = this.state;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieOverlay />
        <MovieInfo>
          <Overdrive id={movie.id}>
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
          </Overdrive>
          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;

const MovieOverlay = styled.div`
  height: 40vh;
  background: black;
  background: linear-gradient(to right, rgba(11,11,11,0.85), rgba(255,255,255,0.15));
  transition: 0.5s;
  position: relative:
`;

const MovieWrapper = styled.div`
  position: relative;
  background: url(${props => props.backdrop}) no-repeat
  background-size: cover;
  ;
`;

const MovieInfo = styled.div`
  background: #222;
  color: white;
  text-align: left;
  font-size: 1.25rem;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 35px;
  }
  img {
    position: relative;
    top: -7.5rem;
  }
  h1, h3, p {
    text-shadow: 1px 1px 1px #000,
    5px 5px 7px #111;
  }
`;
