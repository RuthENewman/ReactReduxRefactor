import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getPopularMovies,
    showLoadingSpinner,
    searchForMovies,
    clearMovies,
    renderMoreMovies,
    setPopularPersistedState
} from '../actions';
import Home from '../components/Home/Home';

class HomeContainer extends Component {
    componentDidMount() {
        if (sessionStorage.getItem("HomeState")) {
            const home = JSON.parse(sessionStorage.getItem("HomeState"));
            this.props.setPopularPersistedState(home);
        }
        this.getMovies();
    }

    componentDidUpdate() {
        if (this.props.movies.length > 0) {
            if (this.props.searchTerm === '') {
                sessionStorage.setItem("HomeState", JSON.stringify(this.props));
            }
        }
    }

    getMovies = () => {
        this.props.showLoadingSpinner();
        this.props.getPopularMovies();
    }

    searchForMovies = (searchTerm) => {
        this.props.clearMovies();
        this.props.showLoadingSpinner();
        this.props.searchForMovies(searchTerm);
    }

    renderMoreMovies = () => {
        const { searchTerm, currentPage } = this.props;
        this.props.showLoadingSpinner();
        this.props.renderMoreMovies(searchTerm, currentPage);
    }

    render() {
        return (
            <Home 
                { ...this.props }
                searchForMovies={this.searchForMovies}
                renderMoreMovies={this.renderMoreMovies}
            />
        )
    }
}
const mapStateToProps = state => {
    return state.home;
}

const mapDispatchToProps = {
    getPopularMovies,
    showLoadingSpinner,
    searchForMovies,
    clearMovies,
    renderMoreMovies,
    setPopularPersistedState   
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);

