const app = new Vue({
    el: '#app',
    data: {
        search: '',
        results: [],
        forYou: [],
        searched: false,
        ready: false
    },
    mounted() {
        axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: '883ff48744295568b0bc7e5a825782e9',
                language: 'it-IT',
                query: 'matrix',
            }
        }).then((response) => {
            for (let index = 0; index < 3; index++) {
                this.forYou.push(response.data.results[index]);
                this.forYou[index].vote_average = Math.ceil(this.forYou[index].vote_average / 2);
                axios.get('https://api.themoviedb.org/3/movie/' + this.forYou[index].id + '/credits?api_key=883ff48744295568b0bc7e5a825782e9&language=en-US')
                    .then((response) => {
                        this.forYou[index].cast = response.data.cast;
                        if (index == (this.forYou.length - 1)) {
                            setTimeout(() => {
                                this.ready = true;
                            }, 100)
                        }
                    })
            }
        })

    },

    methods: {
        searchMovie() {
            if (this.search == '') {
                return;
            }
            this.searched = false;
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
                this.results.forEach((result, counter) => {
                    result.vote_average = Math.ceil(result.vote_average / 2);
                    if (result.media_type == 'tv') {
                        axios.get('https://api.themoviedb.org/3/tv/' + result.id + '/credits?api_key=883ff48744295568b0bc7e5a825782e9&language=it-IT')
                            .then((response) => {
                                result.cast = response.data.cast;
                                if (counter == this.results.length - 1) {
                                    setTimeout(() => {
                                        this.searched = true;
                                        Vue.nextTick(() => {
                                            document.getElementById('scrollHere').scrollIntoView({ behavior: 'smooth' });
                                        })
                                    }, 100);
                                }
                            })
                    } else {
                        axios.get('https://api.themoviedb.org/3/movie/' + result.id + '/credits?api_key=883ff48744295568b0bc7e5a825782e9&language=it-IT')
                            .then((response) => {
                                result.cast = response.data.cast;
                                if (counter == this.results.length - 1) {
                                    setTimeout(() => {
                                        this.searched = true;
                                        Vue.nextTick(() => {
                                            document.getElementById('scrollHere').scrollIntoView({ behavior: 'smooth' });
                                        })
                                    }, 100);
                                }
                            })
                    }
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
        },
        getActor(id) {
            axios.get('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=883ff48744295568b0bc7e5a825782e9&language=en-US')
                .then((response) => {
                    return response.data.cast;
                })
        }
    }
})