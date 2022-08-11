import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults:[{ name:'initialName1', artisit:'initialArtist1', album:'initialAlbum1', id: '0'},
                    { name:'initialName2', artisit:'initialArtist2', album:'initialAlbum2', id: '1'}],
      playlistName: 'initialPlaylistName',
      playlistTracks: [{ name:'PlaylistName01', artisit:'PlaylistArtist01', album:'PlaylistAlbum01',id: '3'},
      { name:'PlaylistName02', artisit:'PlaylistArtist02',album:'PlaylistAlbum02', id: '4' }]
    };
    
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  updatePlaylistName(newName){
    this.setState( {playlistName: newName} );
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

  render(){
    console.log(" ==== Begin of App.js render() ====")
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                            onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
                      onPlaylistNameChange={this.updatePlaylistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
      );
    }

}

export default App;
