const app = new Vue({
    el: '#app',
    data: {
        search: '',
        results: [],
    },

    methods: {
        searchMovie() {
            axios.get('https://api.themoviedb.org/3/search/multi', {
                params: {
                    api_key : '883ff48744295568b0bc7e5a825782e9',
                    language: 'it',
                    query : this.search,
                }
            })
                .then((response) => {
                    this.results = response.data.results.filter((person) => {
                        return person.media_type != 'person'
                    });
                    console.log(this.results);
                    this.results.forEach((result) => {
                        result.vote_average = Math.ceil(result.vote_average / 2);
                    })
                });
            this.search = '';
        },
        setRating(rating, star) {
            if (rating >= star) {
                return 'fas fa-star'
            } else {
                return 'far fa-star'
            }
        },
        getFlag(language) {
            if (language == 'en') {
                language = 'gb';
            }
            return "https://www.countryflags.io/" + language + "/shiny/64.png";
        },
        noImage(e) {
            e.target.src = 'https://cdn.iconscout.com/icon/free/png-256/data-not-found-1965034-1662569.png';
        },
        getPoster(path) {
            return 'http://image.tmdb.org/t/p/w342/' + path
        }
    }
})