import React, {Component} from 'react';
import Select from 'react-select'


export class AddItemComponent extends Component {
    constructor(props) {
        super(props);
        let form_data = {};
        props.field_list.map(field => form_data[field.name] = field.start_value);
        this.state = {
            form_data: form_data
        };

        this.handleMultiChange = this.handleMultiChange.bind(this);
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
                    [option.field_name]: option
                }
            };
        });
    }

    prepareForm = (form, form_data) => {
        Object.keys(form_data).map(key => {
            let is_select = false;
            this.props.field_list.map(field => {
                if (field.name === key && field.field_type === "select") {
                    is_select = true;
                }
            });

            if (is_select) {
                form.append(key, form_data[key]["value"])
            } else {
                form.append(key, form_data[key])
            }
        })
    };

    onSubmit = e => {
        e.preventDefault();
        let form = new FormData();
        this.prepareForm(form, this.state.form_data);
        this.props.add_function(this.props.add_what, form);
    };

    render() {
        const render_field = (field) => {
            if (field.field_type === "text") {
                return (
                    <div className="form-group" key={field.name}>
                        <label>{field.label}</label>
                        <input
                            className="form-control"
                            type="text"
                            name={field.name}
                            onChange={this.onChange}
                            value={this.state.form_data[field.name]}
                        />
                    </div>
                )
            } else if (field.field_type === "textarea") {
                return (
                    <div className="form-group" key={field.name}>
                        <label>{field.label}</label>
                        <textarea
                            className="form-control"
                            name={field.name}
                            onChange={this.onChange}
                            value={this.state.form_data[field.name]}/>
                    </div>
                )
            } else if (field.field_type === "number") {
                return (
                    <div className="form-group" key={field.name}>
                        <label>{field.label}</label>
                        <input
                            className="form-control"
                            type="number"
                            name={field.name}
                            onChange={this.onChange}
                            value={this.state.form_data[field.name]}
                        />
                    </div>
                )
            } else if (field.field_type === "select") {
                return (
                    <div className="form-group" key={field.name}>
                        <label>{field.label}</label>
                        <Select
                            name={field.name}
                            placeholder={field.label}
                            value={this.state.form_data[field.name]}
                            options={field.options}
                            onChange={this.handleMultiChange}
                            multi
                        />
                    </div>
                )
            }
        };

        const render_form = (
            <form onSubmit={this.onSubmit}>
                {this.props.field_list.map(field => (
                    render_field(field)
                ))}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        );

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add {this.props.add_what}</h2>
                {render_form}
            </div>
        );
    }
}

export default AddItemComponent;