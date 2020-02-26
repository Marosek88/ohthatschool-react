import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {changeView} from "../../actions/educator";


export class BubbleMenu extends Component {
    state = {
        main_view: this.props.view,
    };

    static propTypes = {
        changeView: PropTypes.func.isRequired,
    };


    onButtonClick = (view) => {
        let clicked = document.getElementById(view);
        console.log(clicked);
        let active = document.getElementsByClassName('bubble-menu-item bubble-menu-item-active')
        for (let i = 0; i < active.length; i++) {
            active[i].className = 'bubble-menu-item'
        }
        clicked.className = 'bubble-menu-item bubble-menu-item-active';

        this.setState({main_view: view});

        view = view === "courses" ? "course_list" : view

        this.props.changeView(view);
    };

    onSubButtonClick = (view) => {
        let clicked = document.getElementById(view);

        let active = document.getElementsByClassName('bubble-menu-subitem bubble-menu-subitem-active');
        for (let i = 0; i < active.length; i++) {
            active[i].className = 'bubble-menu-subitem'
        }
        clicked.className = 'bubble-menu-subitem bubble-menu-subitem-active';

        this.props.changeView(view);
    };
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
        console.log(this.state);
        const educator_page = (
            <div className="bubble-menu-item" id="educator_page"
                 onClick={() => this.onButtonClick("educator_page")}>
                <div className="bubble-menu-text">
                    <i className="fas fa-id-card"/>
                </div>
            </div>);

        const courses = (
            <div className="bubble-menu-item" id="courses"
                 onClick={() => this.onButtonClick("courses")}>
                <div className="bubble-menu-text">
                    <i className="fas fa-book-reader"/>
                </div>
            </div>);
        const course_list = (
            <div className="bubble-menu-subitem" id="course_list"
                 onClick={() => this.onSubButtonClick("course_list")}>
                <div className="bubble-menu-text">
                    <i className="fas fa-th-list"/>
                </div>
            </div>);
        const add_course = (
            <div className="bubble-menu-subitem" id="add_course"
                 onClick={() => this.onSubButtonClick("add_course")}>
                <div className="bubble-menu-text">
                    <i className="fas fa-plus"/>
                </div>
            </div>);

        const student_list = (
            <div className="bubble-menu-item" id="student_list"
                 onClick={() => this.onButtonClick("student_list")}>
                <div className="bubble-menu-text">
                    <i className="fas fa-user-graduate"/>
                </div>
            </div>);

        const achievements = (
            <div className="bubble-menu-item" id="achievements"
                 onClick={() => this.onButtonClick("achievements")}>
                <div className="bubble-menu-text">
                    <i className="fas fa-trophy"/>
                </div>
            </div>);


        const bubble_menu = (
            <div className="bubble-menu-container">
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
