var InsertCustomerBox = React.createClass({
    handleCustomerSubmit: function (insertcustomer) {
        $.ajax({
            url: '/insertcustomer',
            dataType: 'json',
            type: 'POST',
            data: insertcustomer,
            success: function (data) {
                this.setState({ data: data })
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return(
            <div>
                <h1>Insert Customer</h1>
                <InsertForm onCustomerSubmit={this.handleCustomerSubmit} />
            </div>
        );
    }
});

var InsertForm = React.createClass({
    getInitialState: function () {
        return {
            customerfirstname: "",
            customerlastname: "",
            customerphone: "",
            customeremail: "",
            customerroom: ""
        };
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var customerfirstname = this.state.customerfirstname.trim();
        var customerlastname = this.state.customerlastname.trim();
        var customerphone = this.state.customerphone.trim();
        var customeremail = this.state.customeremail.trim();
        var customerroom = this.state.customerroom.trim();

        if (!customerfirstname || !customerlastname || !customerphone || 
            !customeremail || !customerroom) {
            console.log("Not entered!");
            return;
        }

        this.props.onCustomerSubmit({
            customerfirstname: customerfirstname,
            customerlastname: customerlastname,
            customerphone: customerphone,
            customeremail: customeremail,
            customerroom: customerroom
        });
        this.setState(this.getInitialState());
        alert("Success");
    },
    validateEmail: function (value) {
        if (value != "") {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(value);
        } else {
            return true;
        }
    },
    validatePhone: function (value) {
        if (value != "") {
            var re = /^[2-9]\d{2}-\d{3}-\d{4}$/;
            return re.test(value);
        } else {
            return true;
        }
    },
    commonValidate: function (value) {
        if (value.length > 2) {
            return true;
        } else {
            return false;
        }
    },
    setValue: function (field, event) {
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    },
    render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>First Name:</th>
                            <td>
                                <TextInput
                                    value={this.state.customerfirstname}
                                    uniqueName="customerfirstname"
                                    textArea={false}
                                    required={true}
                                    validate={this.commonValidate}
                                    onChange={this.setValue.bind(this, 'customerfirstname')}
                                    errorMessage="First Name is invalid"
                                    emptyMessage="First Name is Required" />
                            </td>
                        </tr>
                        <tr>
                            <th>Last Name:</th>
                            <td>
                                <TextInput
                                    value={this.state.customerlastname}
                                    uniqueName="customerlastname"
                                    textArea={false}
                                    required={true}
                                    validate={this.commonValidate}
                                    onChange={this.setValue.bind(this, 'customerlastname')}
                                    errorMessage="Last Name is invalid"
                                    emptyMessage="Last Name is Required" />
                            </td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td>
                                <TextInput
                                    value={this.state.customerphone}
                                    uniqueName="customerphone"
                                    textArea={false}
                                    required={true}
                                    validate={this.validatePhone}
                                    onChange={this.setValue.bind(this, 'customerphone')}
                                    errorMessage="Phone Number is invalid"
                                    emptyMessage="Phone Number is Required" />
                            </td>
                        </tr>
                        <tr>
                            <th>E-mail:</th>
                            <td>
                                <TextInput
                                    value={this.state.customeremail}
                                    uniqueName="customeremail"
                                    textArea={false}
                                    required={true}
                                    validate={this.validateEmail}
                                    onChange={this.setValue.bind(this, 'customeremail')}
                                    errorMessage="E-mail is invalid"
                                    emptyMessage="E-mail is Required" />
                            </td>
                        </tr>
                        <tr>
                            <th>Room Number:</th>
                            <td>
                                <TextInput
                                    value={this.state.customerroom}
                                    uniqueName="customerroom"
                                    textArea={false}
                                    required={true}
                                    validate={this.commonValidate}
                                    onChange={this.setValue.bind(this, 'customerroom')}
                                    errorMessage="Room Number is invalid"
                                    emptyMessage="Room Number is Required" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input className="button" type="submit" value="Enter" />
            </form>
        );
    }
});

var InputError = React.createClass({
    getInitialState: function () {
        return {
            message: ''
        };
    },
    render: function () {
        var errorClass = classNames(this.props.className, {
            'error_container': true,
            'visible': this.props.visible,
            'invisible': !this.props.visible
        });
        return (
            <div className={errorClass}>
                <td>{this.props.errorMessage}</td>
            </div>
        )
    }
});

var TextInput = React.createClass({
    getInitialState: function () {
        return {
            isEmpty: true,
            value: null,
            valid: false,
            errorMessage: "",
            errorVisible: false
        };
    },
    handleChange: function (event) {
        this.validation(event.target.value);

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },
    validation: function (value, valid) {
        if (typeof valid === 'undefined') {
            valid = true;
        }

        var message = "";
        var errorVisible = false;

        if (!valid) {
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }
        else if (this.props.required && jQuery.isEmptyObject(value)) {
            message = this.props.emptyMessage;
            valid = false;
            errorVisible = true;
        }
        else if (value.length < this.props.minCharacters) {
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }
        this.setState({
            value: value,
            isEmpty: jQuery.isEmptyObject(value),
            valid: valid,
            errorMessage: message,
            errorVisible: errorVisible
        });
    },
    handleBlur: function (event) {
        var valid = this.props.validate(event.target.value);
        this.validation(event.target.value, valid);
    },
    render: function () {
        if (this.props.textArea) {
            return (
                <div className={this.props.uniqueName}>
                    <input
                        placeholder={this.props.text}
                        className={'input input-' + this.props.uniqueName}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        value={this.props.value} />

                    <InputError
                        visible={this.state.errorVisible}
                        errorMessage={this.state.errorMessage} />
                </div>
            );
        } else {
            return (
                <div className={this.props.uniqueName}>
                    <input
                        name={this.props.uniqueName}
                        id={this.props.uniqueName}
                        placeholder={this.props.text}
                        className={'input input-' + this.props.uniqueName}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        value={this.props.value} />

                    <InputError
                        visible={this.state.errorVisible}
                        errorMessage={this.state.errorMessage} />
                </div>
            );
        }
    }
});

ReactDOM.render(
    <InsertCustomerBox />,
    document.getElementById('content')
);