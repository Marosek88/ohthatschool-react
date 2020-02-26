import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select'
import PropTypes from 'prop-types';
import {getFormData, createCourse} from "../../actions/educator";


export class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form_data: {
                owner: 1,
                title: '',
                description: '',
                categories: [],
                duration: 0,
                price: 0
            },
            visibility: false,
        };

        this.handleMultiChange = this.handleMultiChange.bind(this);
    }

    static propTypes = {
        formInfo: PropTypes.array.isRequired,
        getFormData: PropTypes.func.isRequired,
        createCourse: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getFormData()
    }

    onChange = e => this.setState({
        form_data:
            {
                ...this.state.form_data,
                [e.target.name]: e.target.value
            }
    });

    handleMultiChange(option) {
        this.setState(state => {
            return {
                form_data: {
                    ...state.form_data,
                    categories: option
                }
            };
        });
    }

    onSubmit = e => {
        e.preventDefault();
        let form = new FormData();
        form.append('owner', this.state.form_data.owner);
        form.append('title', this.state.form_data.title);
        form.append('description', this.state.form_data.description);
        form.append('categories', this.state.form_data.categories.value);
        form.append('duration', this.state.form_data.duration);
        form.append('price', this.state.form_data.price);
        this.props.createCourse(form);
        this.setState({
            form_data: {
                title: "",
                description: "",
                categories: [],
                duration: 0,
                price: 0,
            },
            visibility: "",
        });
    };

    toggleVisibility = () => {
        if (this.state.visibility === true) {
            this.setState({
                visibility: false,
            });
        } else {
            this.setState({
                visibility: true,
            });
        }
    };

    render() {
        const {title, description, categories, duration, price} = this.state.form_data;
        const visibility = this.state.visibility;

        let categoryOptions = [];
        this.props.formInfo.map(category => {
            categoryOptions.push({value: category.id, label: category.name})
        });

        const arrow = visible => (
            <i className={visible ? "ml-3 fas fa-chevron-down" : "ml-3 fas fa-chevron-right"}/>
        );

        const project_form = (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        value={title}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        onChange={this.onChange}
                        value={description}/>
                </div>
                <div className="form-group">
                    <label>Categories</label>
                    <Select
                        name="categories"
                        placeholder="Category"
                        value={categories}
                        options={categoryOptions}
                        onChange={this.handleMultiChange}
                        multi
                    />
                </div>
                <div className="form-group">
                    <label>Duration</label>
                    <input
                        className="form-control"
                        type="number"
                        name="duration"
                        onChange={this.onChange}
                        value={duration}
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        className="form-control"
                        type="number"
                        name="price"
                        onChange={this.onChange}
                        value={price}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        );

        return (
            <div className="card card-body mt-4 mb-4">
                <h3 onClick={this.toggleVisibility} className="vns-link">Add Course {arrow(visibility)}</h3>
                {visibility ? project_form : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    formInfo: state.educator.formInfo
});

export default connect(mapStateToProps, {getFormData, createCourse})(AddCourse);