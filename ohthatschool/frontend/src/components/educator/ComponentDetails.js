import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getDetails, resetDetails} from "../../actions/educator";


export class ComponentDetails extends Component {

    static propTypes = {
        detailsData: PropTypes.object.isRequired,
        getDetails: PropTypes.func.isRequired,
        resetDetails: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getDetails(this.props.get_what, this.props.get_id);
    }

    componentWillUnmount() {
        this.props.resetDetails();
    }

    render() {
        const get_properties_list = this.props.get_properties_list;
        const data = this.props.detailsData;

        let found_undefined = false;
        // create list of details with check if any undefined found
        let details = [];
        for (let i = 0; i < get_properties_list.length; i++) {
            const properties = get_properties_list[i]["properties"];
            let element = data[properties[0]];
            for (let j = 1; j < properties.length; j++) {
                if (!element) {
                    found_undefined = true;
                    break
                } else {
                    element = element[properties[j]];
                }
            }
            details.push({label: get_properties_list[i]["label"], value: element})
        }

        const rendered_details = (
            !found_undefined ?
                <Fragment>
                    <ul>
                        {details.map(detail => (
                            <li key={detail.label}>{detail.label}: {detail.value}</li>
                        ))}
                    </ul>
                </Fragment>
                : null
        );

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>{this.props.get_what} Details</h2>
                {rendered_details}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    detailsData: state.educator.detailsData,
});

export default connect(mapStateToProps, {getDetails, resetDetails})(ComponentDetails);