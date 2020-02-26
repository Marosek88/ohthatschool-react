import React, {Component} from 'react';


export class PieMenu extends Component {

    render() {
        return (
            <header className="index">
                <div className="index-header">
                    <p>
                        <span>School is cool! Check all the cool things we've prepared for...</span>
                    </p>
                </div>
                <div className="container wrapper">
                    <div className="row">
                        <div className="col-12">
                            <div className="container index-pie-container">
                                <div className="row index-pie-row">
                                    <div className="col-6 index-pie-col js-scroll-trigger" data-href="#info-student">
                                        <div className="index-pie-col-background"
                                             />
                                        <div className="index-pie-text index-pie-student">Students</div>
                                    </div>
                                    <div className="col-6 index-pie-col js-scroll-trigger" data-href="#info-educator">
                                        <div className="index-pie-col-background"
                                             />
                                        <div className="index-pie-text index-pie-educator">Educators</div>
                                    </div>
                                    <div className="col-6 index-pie-col js-scroll-trigger" data-href="#info-parent">
                                        <div className="index-pie-col-background"
                                             />
                                        <div className="index-pie-text index-pie-parent">Parents</div>
                                    </div>
                                    <div className="col-6 index-pie-col js-scroll-trigger" data-href="#info-school">
                                        <div className="index-pie-col-background"
                                             />
                                        <div className="index-pie-text index-pie-school">Schools</div>
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



