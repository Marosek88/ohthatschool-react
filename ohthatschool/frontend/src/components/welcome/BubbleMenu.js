import React, {Component, Fragment} from 'react';
// import {connect} from 'react-redux';
// import Select from 'react-select'
// import PropTypes from 'prop-types';
// import {getFormData, createCourse} from "../../actions/educator";


export class BubbleMenu extends Component {
    state = {
        visibility: true
    };

    // static propTypes = {
    //     formInfo: PropTypes.array.isRequired,
    //     getFormData: PropTypes.func.isRequired,
    //     createCourse: PropTypes.func.isRequired,
    // };
    //
    // componentDidMount() {
    //     this.props.getFormData()
    // }

    // toggleVisibility = () => {
    //     if (this.state.visibility === true) {
    //         this.setState({
    //             visibility: false,
    //         });
    //     } else {
    //         this.setState({
    //             visibility: true,
    //         });
    //     }
    // };

    render() {
        // const {title, description, categories, duration, price} = this.state.form_data;
        // const visibility = this.state.visibility;

        const bubble_menu = (
            <div className="bubble-menu-container">
                <div className="bubble-menu-item">
                    <div className="bubble-menu-text"><i className="fas fa-book-reader"/></div>
                </div>
                <div className="bubble-menu-item">
                    <div className="bubble-menu-text"><i className="fas fa-user-graduate"/></div>
                </div>
                <div className="bubble-menu-item">
                    <div className="bubble-menu-text"><i className="fas fa-trophy"/></div>
                </div>
            </div>
        );

        return (
            bubble_menu
        );
    }
}

// const mapStateToProps = state => ({
//     formInfo: state.educator.formInfo
// });
//
// export default connect(mapStateToProps, {getFormData, createCourse})(BubbleMenu);

export default BubbleMenu;