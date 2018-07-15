import React, { Component } from "react";
import SearchBar from "../components/search-bar";
import axios from "axios";
import VideoDetail from "../components/video-detail";
import { API_END_POINT, POPULAR_MOVIES_URL, API_KEY } from "../constantes";
import VideoList from "./video-list";
import Video from "../components/video";
import NoResults from "../components/no-results";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: {},
      currentMovie: {},
      hiddenMsg: false
    };
    console.log("1 - ",this.state.hiddenMsg);
  }

  componentWillMount() {
    this.initMovies();
  }

  initMovies = () => {
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(
      function(response) {
        this.setState(
          {
            movieList: response.data.results.slice(1, 7),
            currentMovie: response.data.results[0]
          },
          function() {
            this.applyVideoToCurrentMovie();
          }
        );
      }.bind(this)
    );
  };

  applyVideoToCurrentMovie() {
    axios
      .get(
        `${API_END_POINT}movie/${
          this.state.currentMovie.id
        }?${API_KEY}&append_to_response=videos&include_adult=false`
      )
      .then(
        function(response) {
          if (
            response.data.videos.results[0] &&
            response.data.videos.results[0].key
          ) {
            const youtube_key = response.data.videos.results[0].key;
            let newCurrentMovieState = this.state.currentMovie;
            newCurrentMovieState.videoId = youtube_key;
            this.setState({ currentMovie: newCurrentMovieState });
          }
        }.bind(this)
      );
  }
  onClickListItem(movie) {
    this.setState({ currentMovie: movie }, function() {
      this.applyVideoToCurrentMovie();
      this.setRecommendation();
    });
  }
  setRecommendation() {
    axios
      .get(
        `${API_END_POINT}movie/${
          this.state.currentMovie.id
        }/recommendations?${API_KEY}&language=fr`
      )
      .then(
        function(response) {
          this.setState({ movieList: response.data.results.slice(0, 6) });
        }.bind(this)
      );
  }
  onClickSearch(searchText) {
    if (searchText) {
      console.log("2 - ",this.state.hiddenMsg);
      axios
        .get(
          `${API_END_POINT}search/movie?${API_KEY}&language=fr&include_adult=false&query=${searchText}`
        )
        .then(
          function(response) {
            if (response.data && response.data.results[0]) {
              if (response.data.results[0].id !== this.state.currentMovie.id) {
                    this.showErrorMsg(response, searchText);
        }
      }
        }.bind(this)
        );
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.currentMovie.videoId) {
      return false;
    } else {
      return true;
    }
  }
  
  showErrorMsg(response){
    if (response.data.results[0].title !== this.state.currentMovie.title) {
      this.setState(
        { hiddenMsg: true, currentMovie: response.data.results[0] },
        () => {
          this.applyVideoToCurrentMovie();
          this.setRecommendation();
        }
      );
    }else{
      this.setState(
        { hiddenMsg: false, currentMovie: response.data.results[0] },
        () => {
          this.applyVideoToCurrentMovie();
          this.setRecommendation();
        }
      );
    }    
  }
  
    
  render() {
    const renderVidoList = () => {
      if (this.state.movieList.length >= 5) {
        return (
          <VideoList
            movieList={this.state.movieList}
            callback={this.onClickListItem.bind(this)}
          />
        );
      }
    };
    return (
      <div>
       <div className="search-bar">
          <SearchBar callback={this.onClickSearch.bind(this)} /> 
          {this.state.hiddenMsg ?<NoResults/>:false}       
        </div>

        <div className="row">
          <div className="col-md-8">
            <Video
              videoId={this.state.currentMovie.videoId}
              title={this.state.currentMovie.title}
            />
            <VideoDetail
              className="video-detail"
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
            />
          </div>
          <div className="col-md-4">{renderVidoList()}</div>
          </div>
                 </div>
    );
  }
}

export default App;
