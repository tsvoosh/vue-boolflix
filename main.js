const app = new Vue({
    el: '#app',
    data: {
        search: '',
        results: [],
        forYou: [],
        searched: false
    },
    created() {
        axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: '883ff48744295568b0bc7e5a825782e9',
                language: 'it-IT',
                query: 'matrix',
            }
        }).then((response) => {
            for (let index = 0; index < 3; index++) {
                this.forYou.push(response.data.results[index]);
            }
            this.forYou.forEach((result) => {
                result.vote_average = Math.ceil(result.vote_average / 2);
            })
        })
    },

    methods: {
        searchMovie() {
            if (this.search == '') {
                return;
            }
            this.searched = true;
            axios.get('https://api.themoviedb.org/3/search/multi', {
                params: {
                    api_key: '883ff48744295568b0bc7e5a825782e9',
                    language: 'it-IT',
                    query: this.search,
                }
            }).then((response) => {
                this.results = response.data.results.filter((person) => {
                    return person.media_type != 'person'
                });
                this.results.forEach((result) => {
                    result.vote_average = Math.ceil(result.vote_average / 2);
                })
                Vue.nextTick(function() {
                    document.getElementById('scrollHere').scrollIntoView({ behavior: 'smooth' });
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
                language = 'us';
            }
            return "https://www.countryflags.io/" + language + "/shiny/64.png";
        },
        noImage(e) {
            e.target.src = 'img/no_image_available.png';
        },
        getPoster(path) {
            return 'http://image.tmdb.org/t/p/w342/' + path
        }
    }
})