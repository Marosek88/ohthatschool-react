import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {changeView} from "../../actions/educator";


export class BubbleMenu extends Component {
    state = {
        main_view: this.props.view,
        sub_view: ""
    };

    static propTypes = {
        changeView: PropTypes.func.isRequired,
    };

    onButtonClick = (view) => {
        if (view === "courses") {
            this.setState({main_view: view, sub_view: "course_list"});
            this.props.changeView("course_list");
        } else {
            this.setState({main_view: view, sub_view: ""});
            this.props.changeView(view);
        }
    };

    onSubButtonClick = (view) => {
        this.setState({sub_view: view});
        this.props.changeView(view);
    };

    render() {
        const {main_view, sub_view} = this.state;

        const big_button = (name, icon) => (
            <div className={main_view === name ? "bubble-menu-item bubble-menu-item-active" : "bubble-menu-item"}
                 id={name}
                 onClick={() => this.onButtonClick(name)}>
                <div className="bubble-menu-text">
                    <i className={icon}/>
                </div>
            </div>
        );

        const small_button = (name, icon) => (
            <div className={sub_view === name ? "bubble-menu-subitem bubble-menu-subitem-active" : "bubble-menu-subitem"}
                 id={name}
                 onClick={() => this.onSubButtonClick(name)}>
                <div className="bubble-menu-text">
                    <i className={icon}/>
                </div>
            </div>
        );

        const educator_page = big_button("educator_page", "fas fa-id-card")

        const courses = big_button("courses", "fas fa-book-reader");
        const course_list = small_button("course_list", "fas fa-th-list")
        const add_course = small_button("add_course", "fas fa-plus")

        const student_list = big_button("student_list", "fas fa-user-graduate")

        const achievements = big_button("achievements", "fas fa-trophy")

        const bubble_menu = (
            <div className="bubble-menu-container" id="bubble-menu-container">
                {educator_page}

                {courses}
                {this.state.main_view === "courses" ? course_list : null}
                {this.state.main_view === "courses" ? add_course : null}

                {student_list}
                {achievements}
            </div>
        );

        return (
            bubble_menu
        );
    }
}

const mapStateToProps = state => ({
    view: state.educator.view,

});

export default connect(mapStateToProps, {changeView})(BubbleMenu);
