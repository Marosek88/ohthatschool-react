import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import {getCourses} from "../../actions/educator";


export class EducatorPage extends Component {

    state = {
        pageLoading: false,
        link: "",
    };

    static propTypes = {
        courses: PropTypes.array.isRequired,
        getCourses: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getCourses()
    }

    render() {
        const openLink = e => {
            this.setState({
                link: e.target.parentElement.id,
            })
        };

        if (this.state.link) {
            return <Redirect push to={this.state.link}/>;
        }

        return (
            <Fragment>
                <div className="row">
                    <div className="col-6">
                        Picture here
                    </div>
                    <div className="col-6">
                        Short bio:
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        Long bio:
                    </div>
                    <div className="col-6">
                        Teaching categories
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    courses: state.educator.courses
});

export default connect(mapStateToProps, {getCourses})(EducatorPage);