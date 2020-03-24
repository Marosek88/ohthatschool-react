import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getList} from "../../actions/educator";


export class ComponentList extends Component {
    static propTypes = {
        listItems: PropTypes.array.isRequired,
        getList: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getList(this.props.get_what, this.props.get_id)
    }

    render() {
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>{this.props.get_what}</h2>
                <ul>
                    {this.props.listItems.map(item => (
                        <Link to={`${this.props.link_to}${item.id}`}
                              key={item.id}>
                            <li>
                                ID: {item.id}<br/>
                                Title: {item.title}<br/>
                                Description: {item.description}<br/>
                                Duration: {item.duration}<br/>
                                Active: {item.active}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listItems: state.educator.listItems

});

export default connect(mapStateToProps, {getList})(ComponentList);