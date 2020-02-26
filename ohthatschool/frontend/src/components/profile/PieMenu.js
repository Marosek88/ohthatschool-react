import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";


export class PieMenu extends Component {
    state ={
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
                    <p>
                        <span>Choose profile's role</span>
                    </p>
                </div>
                <div className="container wrapper">
                    <div className="row">
                        <div className="col-12">
                            <div className="container index-pie-container">
                                <div className="row index-pie-row">
                                    <div className="col-6 index-pie-col">
                                        <div className="index-pie-col-background"
                                        />
                                        <div className="index-pie-text index-pie-student">Student</div>
                                    </div>
                                    <div className="col-6 index-pie-col" id="/profile/educator" onClick={openLink}>
                                        <div className="index-pie-col-background"
                                        />
                                        <div className="index-pie-text index-pie-educator">Educator</div>
                                    </div>
                                    <div className="col-6 index-pie-col">
                                        <div className="index-pie-col-background"
                                        />
                                        <div className="index-pie-text index-pie-parent">Parent</div>
                                    </div>
                                    <div className="col-6 index-pie-col">
                                        <div className="index-pie-col-background"
                                        />
                                        <div className="index-pie-text index-pie-school">School</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default PieMenu



