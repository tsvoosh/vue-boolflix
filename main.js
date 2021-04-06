const app = new Vue({
    el: '#app',
    data: {
        search: '',
        results: [],
    },

    methods: {
        searchMovie() {
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=883ff48744295568b0bc7e5a825782e9', {params: {query : this.search}})
                .then(response => this.results = response.data.results);
            this.search = '';
        }
    }
})