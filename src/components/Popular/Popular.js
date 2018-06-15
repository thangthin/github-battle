import React from 'react';
import styles from './Popular.css';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import Loading from '../Loading/Loading';

const SelectLanguage = (props) => {
    let languages = ["All", "Java", "JavaScript", "Python", "R", "Rust", "TypeScript"];
    return (
        <ul className="languages">
            {
                languages.map(lang => (
                    <li
                        style={lang === props.selectedLanguage ? {color: '#d0021b'}: null}
                        key={lang}
                        onClick={()=>{props.onSelect(lang)}}>{lang}</li>
                ))
            }
        </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

const RepoGrid = (props) => {

    return (
        <ul className="popular-list">
            {props.repos.map(function(repo, index) {
                return (
                    <li key={repo.name} className="popular-item">
                        <div className="popular-rank">#{index + 1}</div>
                        <ul className="space-list-items">
                            <li>
                                <img
                                    className="avatar"
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login}
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: "All",
            repos: null,
        }

        this.updateSelectedLanguage = this.updateSelectedLanguage.bind(this);
    }

    componentDidMount() {
        this.updateSelectedLanguage("All");
    }

    updateSelectedLanguage(lang) {
        this.setState(function() {
            return {
                selectedLanguage: lang,
                repos: null,
            }
        });
        api.fetchPopularRepos(lang)
            .then(function(response) {
                this.setState(function() {
                    return {
                        repos: response,
                    }
                })
            }.bind(this))
    }

    render() {
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateSelectedLanguage}
                />
                {!this.state.repos 
                    ? <Loading/>
                    : <RepoGrid repos={this.state.repos}/>  }
                              
            </div>
        )
    }
}

export default Popular;