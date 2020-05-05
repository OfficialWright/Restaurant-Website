var InsertInventoryBox = React.createClass({
    handleInventorySubmit: function (insertinventory) {
        $.ajax({
            url: '/insertinventory',
            dataType: 'json',
            type: 'POST',
            data: insertinventory,
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
                <h1>Insert Inventory</h1>
                <InsertForm onInventorySubmit={this.handleInventorySubmit} />
            </div>
        );
    }
});

var InsertForm = React.createClass({
    getInitialState: function () {
        return {
            inventoryquantity: "",
            inventorydescription: "",
            data: []
        };
    },
    loadProducts: function () {
        $.ajax({
            url: '/getproducts',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadProducts();
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var inventoryquantity = this.state.inventoryquantity.trim();
        var inventorydescription = this.state.inventorydescription.trim();
        var inventoryproduct = invpro.value;

        if (!inventoryproduct || !inventoryquantity || !inventorydescription) {
            console.log("Not entered!");
            return;
        }

        this.props.onInventorySubmit({
            inventoryquantity: inventoryquantity,
            inventorydescription: inventorydescription,
            inventoryproduct: inventoryproduct
        });
        this.setState(this.getInitialState());
        this.loadProducts();
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
                                <SelectList data={this.state.data} />
                            </td>
                        </tr>
                        <tr>
                            <th>Quantity:</th>
                            <td>
                                <TextInput
                                    value={this.state.inventoryquantity}
                                    uniqueName="inventoryquantity"
                                    textArea={false}
                                    required={true}
                                    validate={this.validateNumber}
                                    onChange={this.setValue.bind(this, 'inventoryquantity')}
                                    errorMessage="Quantity is invalid"
                                    emptyMessage="Quantity is Required" />
                            </td>
                        </tr>
                        <tr>
                            <th>Description:</th>
                            <td>
                                <TextInput
                                    value={this.state.inventorydescription}
                                    uniqueName="inventorydescription"
                                    textArea={true}
                                    required={true}
                                    validate={this.commonValidate}
                                    onChange={this.setValue.bind(this, 'inventorydescription')}
                                    errorMessage="Description is invalid"
                                    emptyMessage="Description is Required" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input className="button" type="submit" value="Enter" />
            </form>
        );
    }
});

var SelectList = React.createClass({
    render: function () {
        var optionNodes = this.props.data.map(function (invpro) {
            return (
                <option
                    key={invpro.productKey}
                    value={invpro.productKey}
                >
                    {invpro.productName}
                </option>
            );
        });
        return (
            <select name="invpro" id="invpro">
                {optionNodes}
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
    <InsertInventoryBox />,
    document.getElementById('content')
);