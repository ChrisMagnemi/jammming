import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults:[],
      playlistName: 'initialPlaylistName',
      playlistTracks: []
    };
    
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.search = this.search.bind(this);
  }

  updatePlaylistName(newName){
    this.setState( {playlistName: newName} );
  }

  savePlaylist(){
    console.log(">> App.js > savePlaylist()");
    console.log("^^ playlistTracks: ", this.state.playlistTracks);
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    console.log("After trackURIs");
    Spotify.savePlaylist(this.state.playlistName, trackUris).then( () => {
      this.setState( { 
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
    // return [];
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)){
      console.log("--App.js > addTrack > track is already saved in playlist");
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currTrack => currTrack.id !== track.id );
    this.setState( {playlistTracks:tracks} );
  }

  search(term){
    console.log(" >> App.js > search(term) > term: ", term);
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    });
  }

  render(){
    console.log(" ==== Begin of App.js render() ====")
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                            onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
                      onPlaylistNameChange={this.updatePlaylistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onSavePlaylist={this.savePlaylist} />
          </div>
        </div>
      </div>
      );
    }

}

export default App;
