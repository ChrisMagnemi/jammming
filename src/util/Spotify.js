

let accessToken;

// Chris's info:
const clientId = 'cafabe6c776149178e3795251af91a19';
const redirectUri = 'http://localhost:3000';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            console.log("Access token exists");
            return accessToken;
        } 

        // check for an access token match 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch= window.location.href.match(/expires_in=([^&]*)/);
        

        if (accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            
            //clear the parameters, allowing us to grab a new acess token when it expires.
            window.setTimeout( () => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        } else {

            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }

    },
    search(term){
        const accessToken = Spotify.getAccessToken();

        
        return fetch( `https://api.spotify.com/v1/search?type=track&q=${term}`, {
             headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => {
            return response.json()
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artists: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
            
        }).catch( error => { console.log("error in sportify.js fetch ", error)});
    },
    savePlaylist(playlistName, UrisArray){
        if (!playlistName || !UrisArray.length) {
            console.log(" >> Spotify.js > savePlaylist > falsy param");
            return
        }

        // API call setup
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
       let userId;
       console.log("after api setup");

       return fetch('https://api.spotify.com/v1/me', { headers: headers }
       ).then(response => response.json()
       ).then( jsonResponse => {
            userId = jsonResponse.id;
            console.log("userId is: ", userId);
            console.log("new playlistName is; ", playlistName);
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify( { name: playlistName })
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify( {uris: UrisArray})
                    }
                )
            })
            })

    }
};




export default Spotify;