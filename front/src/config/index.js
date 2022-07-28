let url, urlApi;

if (process.env.NODE_ENV === "production") {
  url = "https://cassini-tournament.herokuapp.com/";
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
            avatar: 'uploads/avatar',
            coverTournament: 'uploads/cover-tournament',
            logoClub: 'uploads/logo-club',
        } 
    }
}

export default config;
