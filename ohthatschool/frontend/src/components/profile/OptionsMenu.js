import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";


export class OptionsMenu extends Component {
    state = {
        link: "",
    };

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
            <header className="index">
                <div className="overlay"/>
                <div className="index-header">
                    <p className="my-5">
                        <span>Choose action</span>
                    </p>
                </div>
                <div className="container wrapper">
                    <div className="row row-center">

                        <div className="col-6 col-lg-2 text-center mx-auto my-3">
                            <Link to="/profile/settings">
                                <div className="round-item">
                                    <div className="round-item-text">
                                        <i className="fas fa-user-cog"/>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-6 col-lg-2 text-center mx-auto my-3">
                            <Link to="/profile/educator">
                                <div className="round-item">
                                    <div className="round-item-text">
                                        <i className="fas fa-chalkboard-teacher"/>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-6 col-lg-2 text-center mx-auto my-3">
                            <div className="round-item">
                                <div className="round-item-text">
                                    <i className="fas fa-user-graduate"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 col-lg-2 text-center mx-auto my-3">
                            <div className="round-item">
                                <div className="round-item-text">
                                    <i className="fas fa-female"/><i className="fas fa-child"
                                                                     style={{fontSize: "50%"}}/><i
                                    className="fas fa-male"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 col-lg-2 text-center mx-auto my-3">
                            <div className="round-item">
                                <div className="round-item-text">
                                    <i className="fas fa-school"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default OptionsMenu



