import React, {Component, Fragment} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        warning: PropTypes.object.isRequired,
        info: PropTypes.object.isRequired,
    };

    componentDidUpdate(prevProps) {
        const {error, warning, info , alert} = this.props;
        if (error !== prevProps.error) {
            if (error.msg.title) {
                alert.error(`Title: ${error.msg.title.join()}`)
            }
            if (error.msg.categories) {
                alert.error("Categories: At least one category needs to be set")
            }
        }

        if (warning !== prevProps.warning) {
            alert.warning(warning.msg)
        }

        if (info !== prevProps.info) {
            alert.success(info.msg)
        }
    }


    render() {
        return <Fragment/>;
    }
}

const mapStateToProps = state => ({
    error: state.messages.error,
    warning: state.messages.warning,
    info: state.messages.info
});

export default connect(mapStateToProps)(withAlert()(Alerts));