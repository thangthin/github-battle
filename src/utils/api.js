import axios from 'axios';

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secrets=" + sec;

function getProfile(username) {
    return axios.get("https://api.github.com/users/" + username + params)
        .then(function(response) {
            return response.data;
        });
}

function getRepos(username) {
    return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}

function getStarCount(repos) {
    return repos.data.reduce((count, repo) => {
        return count + repo.stargazers_count;
    }, 0)
}

function calculateScore(profile, repos) {
    let followers = profile.followers;
    let totalStars = getStarCount(repos);
    return (followers * 3) + totalStars;
}

function handleError(error) {
    console.warn(error);
    return null;
}

function getUserData(username) {
    return axios.all([
        getProfile(username),
        getRepos(username)
    ]).then(function(data) {
        let profile = data[0];
        let repos = data[1];
        return {
            profile: profile,
            score: calculateScore(profile, repos) 
        }
    });
}

function sortPlayers(players) {
    return players.sort(function(a, b) {
        return b.score - a.score;
    });
}

export default {
    battle: function(peoples) {
        return axios.all(peoples.map(getUserData))
            .then(sortPlayers);
    },
    fetchPopularRepos: function(language) {
        let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=starts:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
        
        return axios.get(encodedURI)
            .then(function(response) {
                return response.data.items;
            })
    }
}