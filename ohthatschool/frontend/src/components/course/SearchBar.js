import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSearchBarInfo } from "../../actions/course";


export class SearchBar extends Component {
    state = {
        title: '',
        category: '',

        visibility: false,
    };

    static propTypes = {
        searchBarInfo: PropTypes.object.isRequired,
        getSearchBarInfo: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getSearchBarInfo()
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    onSubmit = e => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('title', this.state.title);
        form_data.append('description', this.state.description);
        form_data.append('categories', this.state.categories);
        // this.props.addProject(form_data);
        this.setState({
            title: "",
            description: "",
            categories: "",
            visibility: "",
        });
    };

    toggleVisibility = () => {
        if (this.state.visibility === true) {
            this.setState({
                visibility: false,
            });
        } else {
            this.setState({
                visibility: true,
            });
        }
    };

    render() {
        const {title, category, visibility} = this.state;

        const arrow = visible => (
            <i className={visible ? "ml-3 fas fa-chevron-down" : "ml-3 fas fa-chevron-right"}/>
        );

        const form = (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        value={title}
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        className="form-control"
                        type="text"
                        name="category"
                        onChange={this.onChange}
                        value={category}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Search
                    </button>
                </div>
            </form>
        );

        return (
            <div className="card card-body mt-4 mb-4">
                <h3 onClick={this.toggleVisibility} className="vns-link">Search {arrow(visibility)}</h3>
                {visibility ? form : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    searchBarInfo: state.course.searchBarInfo
});

export default connect(mapStateToProps, { getSearchBarInfo })(SearchBar);