import React, {Component, Fragment} from 'react';
import {Redirect} from "react-router-dom";


export class CourseTile extends Component {
    state = {
        link: ""
    };

    render() {
        const openLink = (link) => {
            return <Redirect push to={this.state.link}/>;
        };

        const {id, title, owner, description, price, rating, duration} = this.props.course;
        return (
            <Fragment>
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={id} onClick={() => openLink("/profile")}>
                    <div className="tile">
                        <div className="tile-img"/>

                        <h5 className="tile-name">{title}</h5>
                        <p className="tile-additional">{owner.username}</p>
                        <p className="tile-description">{description}</p>
                        <div className="container tile-footer">
                            <div className="row no-gutters tile-footer-labels">
                                <div className="col-4">Learners:</div>
                                <div className="col-4">Rating:</div>
                                <div className="col-4">Price:</div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-4">678</div>
                                <div className="col-4">{rating ? rating + " / 5.0" : "Not rated"}</div>
                                <div className="col-4">€{price} / hour</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default CourseTile;