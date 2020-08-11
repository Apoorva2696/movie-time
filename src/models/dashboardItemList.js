const dashboardItemList = {
    api: 'https://api.themoviedb.org/3/',
    apiKey: '&api_key=87dfa1c669eea853da609d4968d294be',
    categories: [
        {
            title: 'Top TV picks for You',
            param: 'discover/tv?sort_by=popularity.desc&page=2'
        },
        {
            title: 'Sci-Fi movies',
            param: 'genre/878/movies?sort_by=popularity.desc&page=3'
        },
        {
            title: 'Horror movies',
            param: 'genre/27/movies?sort_by=popularity.desc&page=2'
        },
        {
            title: 'Comedy movies',
            param: 'genre/35/movies?sort_by=popularity.desc&page=1'
        }
    ]
};

export default dashboardItemList;