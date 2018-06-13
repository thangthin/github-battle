import axios from 'axios';

export default {
    fetchPopularRepos: function(language) {
        let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=starts:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
        
        return axios.get(encodedURI)
            .then(function(response) {
                return response.data.items;
            })
    }
}