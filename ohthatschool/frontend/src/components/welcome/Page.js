import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContent } from "../../actions/website";

import PieMenu from "./PieMenu";
import PieMenuMore from "./PieMenuMore";


export class Page extends Component {

    static propTypes = {
        content: PropTypes.array.isRequired
    };

    checkProps(parent, children) {
        let element = parent;
        children.map(child => {
            if (typeof element === 'undefined') {
                return null
            }
            else {
                element = element[`${child}`]
            }
        });
        return element;
    }

    componentDidMount() {
        this.props.getContent()
    }

    render() {
        const language = this.checkProps(this.props.content[0], ["language"]);
        const context = this.checkProps(this.props.content[0], ["context"]);
        const page_title = this.checkProps(this.props.content[0], ["context", "page_title"]);

        return (
            <Fragment>
                <PieMenu language={language} context={context} page_title={page_title}/>
                <PieMenuMore/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    content: state.website.content
});

export default connect(mapStateToProps, { getContent })(Page);