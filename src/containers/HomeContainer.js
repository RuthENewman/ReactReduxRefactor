import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getPopularMovies,
    showLoadingSpinner,
    searchForMovies,
    clearMovies,
    renderMoreMovies
} from '../actions';
import Home from '../components/Home/Home';

class HomeContainer extends Component {
    componentDidMount() {
        this.getMovies();
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
    renderMoreMovies   
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);

