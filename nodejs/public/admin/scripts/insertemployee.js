var InsertEmployeeBox = React.createClass({
    handleEmployeeSubmit: function (insertemployee) {
        $.ajax({
            url: '/insertemployee',
            dataType: 'json',
            type: 'POST',
            data: insertemployee,
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
                <h1>Insert Employee</h1>
                <InsertForm onEmployeeSubmit={this.handleEmployeeSubmit} />
            </div>
        );
    }
});

var InsertForm = React.createClass({
    getInitialState: function () {
        return {
            employeefirstname: "",
            employeelastname: "",
            employeephone: "",
            employeeemail: "",
            employeeusername: "",
            employeepassword: ""
        };
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var employeefirstname = this.state.employeefirstname.trim();
        var employeelastname = this.state.employeelastname.trim();
        var employeephone = this.state.employeephone.trim();
        var employeeemail = this.state.employeeemail.trim();
        var employeeusername = this.state.employeeusername.trim();
        var employeepassword = this.state.employeepassword.trim();

        if (!employeefirstname || !employeelastname || !employeephone || 
            !employeeemail || !employeeusername || !employeepassword) {
            console.log("Not entered!");
            return;
        }

        this.props.onEmployeeSubmit({
            employeefirstname: employeefirstname,
            employeelastname: employeelastname,
            employeephone: employeephone,
            employeeemail: employeeemail,
            employeeusername: employeeusername,
            employeepassword: employeepassword
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
                                    value={this.state.employeefirstname}
                                    uniqueName="employeefirstname"
                                    textArea={false}
                                    required={true}
                                    validate={this.commonValidate}
                                    onChange={this.setValue.bind(this, 'employeefirstname')}
                                    errorMessage="First Name is invalid"
                                    emptyMessage="First Name is Required" />
                            </td>
                        </tr>
                        <tr>
                            <th>Last Name:</th>
                            <td>
                                <TextInput
                                    value={this.state.employeelastname}
                                    uniqueName="employeelastname"
                                    textArea={false}
                                    required={true}
                                    validate={this.commonValidate}
                                    onChange={this.setValue.bind(this, 'employeelastname')}
                                    errorMessage="Last Name is invalid"
                                    emptyMessage="Last Name is Required" />
                            </td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td>
                                <TextInput
                                    value={this.state.employeephone}
                                    uniqueName="employeephone"
                                    textArea={false}
                                    required={true}
                                    validate={this.validatePhone}
                                    onChange={this.setValue.bind(this, 'employeephone')}
                                    errorMessage="Phone Number is invalid"
                                    emptyMessage="Phone Number is Required" />
                            </td>
                        </tr>
                        <tr>
                            <th>E-mail:</th>
                            <td>
                                <TextInput
                                    value={this.state.employeeemail}
                                    uniqueName="employeeemail"
                                    textArea={false}
                                    required={true}
                                    validate={this.validateEmail}
                                    onChange={this.setValue.bind(this, 'employeeemail')}
                                    errorMessage="E-mail is invalid"
                                    emptyMessage="E-mail is Required" />
                            </td>
                        </tr>
                        <tr>
                            <th>Username:</th>
                            <td>
                                <TextInput
                                    value={this.state.employeeusername}
                                    uniqueName="employeeusername"
                                    textArea={false}
                                    required={true}
                                    validate={this.commonValidate}
                                    onChange={this.setValue.bind(this, 'employeeusername')}
                                    errorMessage="Username is invalid"
                                    emptyMessage="Username is Required" />
                            </td>
                        </tr>
                        <tr>
                            <th>Password:</th>
                            <td>
                                <TextInput
                                    inputType="password"
                                    value={this.state.employeepassword}
                                    uniqueName="employeepassword"
                                    textArea={false}
                                    required={true}
                                    validate={this.commonValidate}
                                    onChange={this.setValue.bind(this, 'employeepassword')}
                                    errorMessage="Password is invalid"
                                    emptyMessage="Password is Required" />
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
                        type={this.props.inputType}
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
    <InsertEmployeeBox />,
    document.getElementById('content')
);