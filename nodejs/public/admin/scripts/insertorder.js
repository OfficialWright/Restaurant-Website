var InsertOrderBox = React.createClass({
    handleOrderSubmit: function (insertorder) {
        $.ajax({
            url: '/insertorder',
            dataType: 'json',
            type: 'POST',
            data: insertorder,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return(
            <div>
                <h1>Insert Order</h1>
                <InsertForm onOrderSubmit={this.handleOrderSubmit} />
            </div>
        );
    }
});

var InsertForm = React.createClass({
    getInitialState: function () {
        return {
            prodata: [],
            orderquantity: "",
            orderprice: "",
            empdata: [],
            cusdata: [],
            stadata: []
        };
    },
    loadProducts: function () {
        $.ajax({
            url: '/getproducts',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ prodata: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadEmployees: function () {
        $.ajax({
            url: '/getemployees',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ empdata: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadCustomers: function () {
        $.ajax({
            url: '/getcustomers',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ cusdata: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadProducts();
        this.loadEmployees();
        this.loadCustomers();
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var orderproduct = ordpro.value;
        var orderquantity = this.state.orderquantity.trim();
        var orderprice = this.state.orderprice.trim();
        var orderemployee = ordemp.value;
        var ordercustomer = ordcus.value;
        var orderstatus = ordsta.value;

        if (!orderproduct || !orderquantity || !orderprice || 
            !orderemployee || !ordercustomer || !orderstatus) {
            console.log("Not entered!");
            return;
        }

        this.props.onOrderSubmit({
            orderproduct: orderproduct,
            orderquantity: orderquantity,
            orderprice: orderprice,
            orderemployee: orderemployee,
            ordercustomer: ordercustomer,
            orderstatus: orderstatus,
        });
        this.setState(this.getInitialState());
        this.loadProducts();
        this.loadEmployees();
        this.loadCustomers();
        alert("Success");
    },
    validateNumber: function (value) {
        if (value != "") {
            var re = /^[0-9]+$/;
            return re.test(value);
        } else {
            return true;
        }
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
                            <th>Product:</th>
                            <td>
                                <SelectProduct data={this.state.prodata} />
                            </td>
                        </tr>
                        <tr>
                            <th>Quantity:</th>
                            <td>
                                <TextInput
                                    value={this.state.orderquantity}
                                    uniqueName="orderquantity"
                                    textArea={false}
                                    required={true}
                                    validate={this.validateNumber}
                                    onChange={this.setValue.bind(this, 'orderquantity')}
                                    errorMessage="Quantity is invalid"
                                    emptyMessage="Quantity is Required" />
                            </td>
                        </tr>
                        <tr>
                            <th>Price:</th>
                            <td>
                                <TextInput
                                    value={this.state.orderprice}
                                    uniqueName="orderprice"
                                    textArea={false}
                                    required={true}
                                    validate={this.validateDollars}
                                    onChange={this.setValue.bind(this, 'orderprice')}
                                    errorMessage="Price is invalid"
                                    emptyMessage="Price is Required" />
                            </td>
                        </tr>
                        <tr>
                            <th>Employee:</th>
                            <td>
                                <SelectEmployee data={this.state.empdata} />
                            </td>
                        </tr>
                        <tr>
                            <th>Customer:</th>
                            <td>
                                <SelectCustomer data={this.state.cusdata} />
                            </td>
                        </tr>
                        <tr>
                            <th>Status:</th>
                            <td>
                                <SelectStatus data={this.state.stadata} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input className="button" type="submit" value="Enter" />
            </form>
        );
    }
});

var SelectProduct = React.createClass({
    render: function () {
        var optionNodes = this.props.data.map(function (ordpro) {
            return (
                <option
                    key={ordpro.productKey}
                    value={ordpro.productKey}
                >
                    {ordpro.productName}
                </option>
            );
        });
        return (
            <select name="ordpro" id="ordpro">
                {optionNodes}
            </select>
        );
    }
});

var SelectEmployee = React.createClass({
    render: function () {
        var optionNodes = this.props.data.map(function (ordemp) {
            return (
                <option
                    key={ordemp.employeeKey}
                    value={ordemp.employeeKey}
                >
                    {ordemp.employeeFirstName}
                </option>
            );
        });
        return (
            <select name="ordemp" id="ordemp">
                {optionNodes}
            </select>
        );
    }
});

var SelectCustomer = React.createClass({
    render: function () {
        var optionNodes = this.props.data.map(function (ordcus) {
            return (
                <option
                    key={ordcus.customerKey}
                    value={ordcus.customerKey}
                >
                    {ordcus.customerFirstName}
                </option>
            );
        });
        return (
            <select name="ordcus" id="ordcus">
                {optionNodes}
            </select>
        );
    }
});

var SelectStatus = React.createClass({
    render: function () {
        return (
            <select name="ordsta" id="ordsta">
                <option
                    key="1"
                    value="1"
                >
                    Active
                </option>

                <option
                    key="0"
                    value="0"
                >
                    Inactive
                </option>
            </select>
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
    <InsertOrderBox />,
    document.getElementById('content')
);