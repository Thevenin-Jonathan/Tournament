let url, urlApi;

if (process.env.NODE_ENV === "production") {
  url = "https://cassini-tournament.herokuapp.com";
  urlApi = "https://cassini-tournament.herokuapp.com/api/v1";
} else {
  url = "http://localhost:3001";
  urlApi = "http://localhost:3001/api/v1";
}

const config = {
    serverUrl: url,
    api: {
        baseUrl: urlApi,
        accessToken: null,
    },
    path: {
        uploads: {
            avatar: 'http://kinoah.com/images/tournament/avatar',
            coverTournament: 'http://kinoah.com/images/tournament/cover',
            logoClub: 'uploads/logo-club',
        } 
    },
    toast: {
      duration: 5000,
    }
}

export default config;
