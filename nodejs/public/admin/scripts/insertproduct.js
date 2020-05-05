var InsertProductBox = React.createClass({
    handleProductSubmit: function (insertproduct) {
        $.ajax({
            url: '/insertproduct',
            dataType: 'json',
            type: 'POST',
            data: insertproduct,
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
                <h1>Insert Product</h1>
                <InsertForm onProductSubmit={this.handleProductSubmit} />
            </div>
        );
    }
});

var InsertForm = React.createClass({
    getInitialState: function () {
        return {
            productName: "",
            productPrice: ""
        };
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var productName = this.state.productName.trim();
        var productPrice = this.state.productPrice.trim();

        if (!productName || !productPrice) {
            console.log("Not entered!");
            return;
        }

        this.props.onProductSubmit({
            productName: productName,
            productPrice: productPrice
        });
        this.setState(this.getInitialState());
        alert("Success");
    },
    validateDollars: function (value) {
        if (value != "") {
            var re = /^\d+(?:\.\d{1,2})?$/;
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
                            <th>Product Name:</th>
                            <td>
                                <TextInput
                                    value={this.state.productName}
                                    uniqueName="productName"
                                    textArea={false}
                                    required={true}
                                    validate={this.commonValidate}
                                    onChange={this.setValue.bind(this, 'productName')}
                                    errorMessage="Product Name is invalid"
                                    emptyMessage="Product Name is Required" />
                            </td>
                        </tr>
                        <tr>
                            <th>Product Price:</th>
                            <td>
                                <TextInput
                                    value={this.state.productPrice}
                                    uniqueName="productPrice"
                                    textArea={false}
                                    required={true}
                                    validate={this.validateDollars}
                                    onChange={this.setValue.bind(this, 'productPrice')}
                                    errorMessage="Product Price is invalid"
                                    emptyMessage="Product Price is Required" />
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
    <InsertProductBox />,
    document.getElementById('content')
);