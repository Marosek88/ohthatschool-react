import React, { Fragment } from 'react';

import MoreStudent from "./MoreStudent";


export default function PieMenuMore() {
    return (
        <Fragment>
            <div id="info" />
            <div className="go-to-top" >
                <div className="go-to-top-text"><i className="icon-arrow-up" /></div>
            </div>

            <MoreStudent />
        </Fragment>
    );
}