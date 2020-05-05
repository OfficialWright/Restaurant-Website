var SelectProductBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadProductFromServer: function () {
        $.ajax({
            url: '/selectproduct',
            data: {
                'productname': productname.value,
                'productprice': productprice.value
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    updateSingleProductFromServer: function (product) {
        $.ajax({
            url: '/updatesingleproduct',
            dataType: 'json',
            data: product,
            type: 'POST',
            cache: false,
            success: function (updatesingledata) {
                this.setState({ updatesingledata: updatesingledata });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        window.location.reload(true);
    },
    componentDidMount: function () {
        this.loadProductFromServer();
    },
    render: function () {
        return(
            <div>
                <h1>Update Product</h1>
                <SelectForm onProductSubmit={this.loadProductFromServer} />
                <UpdateForm onUpdateSubmit={this.updateSingleProductFromServer} />
                <br/><br/>
                <table className="outputTable">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <ProductList data={this.state.data} />
                </table>
            </div>
        );
    }
});

var SelectForm = React.createClass({
    getInitialState: function () {
        return {
            productkey: "",
            productname: "",
            productprice: ""
        };
    },handleSubmit: function (e) {
        e.preventDefault();
        var productname = this.state.productname.trim();
        var productprice = this.state.productprice.trim();

        this.props.onProductSubmit({
            productname: productname,
            productprice: productprice
        });
    },
    handleChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    },
    render: function () {
        return (
            <div>
            <form className="left" onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>Product Name:</th>
                            <td>
                                <input type="text" name="productname" id="productname" value={this.state.productname} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Product Price:</th>
                            <td>
                                <input type="text" name="productprice" id="productprice" value={this.state.productprice} onChange={this.handleChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input className="button" type="submit" value="Search" />
            </form>
            </div>
        );
    }
});

var UpdateForm = React.createClass({
    getInitialState: function () {
        return {
            updateprokey: "",
            updateproname: "",
            updateproprice: ""
        };
    },handleUpdateSubmit: function (e) {
        e.preventDefault();
        var updateprokey = updateproductkey.value;
        var updateproname = updateproductname.value;
        var updateproprice = updateproductprice.value;

        this.props.onUpdateSubmit({
            updateprokey: updateprokey,
            updateproname: updateproname,
            updateproprice: updateproprice
        });
    },
    handleUpdateChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    },
    render: function () {
        return (
            <div>
            <form className="right" onSubmit={this.handleUpdateSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>Product Name:</th>
                            <td>
                                <input type="text" name="updateproductname" id="updateproductname" value={this.state.updateproductname} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Product Price:</th>
                            <td>
                                <input type="text" name="updateproductprice" id="updateproductprice" value={this.state.updateproductprice} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="hidden" name="updateproductkey" id="updateproductkey" onChange={this.handleUpdateChange} />
                <input className="button" type="submit" value="Update" />
            </form>
            </div>
        );
    }
});

var ProductList = React.createClass({
    render: function () {
        var productNodes = this.props.data.map(function (product) {
            //map the data to individual donations
            return (
                <Product
                    productKey={product.productKey}
                    productName={product.productName}
                    productPrice={product.productUnitPrice}
                >
                </Product>
            );
        });
        
        //print all the nodes in the list
        return (
            <tbody>
                {productNodes}
            </tbody>
        );
    }
});

var Product = React.createClass({
    getInitialState: function () {
        return {
            updateproductkey: "",
            singledata: []
        };
    },
    updateRecord: function (e) {
        e.preventDefault();
        var theupdateproductkey = this.props.productKey;
        
        this.loadSingleProduct(theupdateproductkey);
    },
    deleteRecord: function (e) {
        e.preventDefault();
        var theupdateproductkey = this.props.productKey;
        
        this.deleteSingleProduct(theupdateproductkey);
    },
    loadSingleProduct: function (theupdateproductkey) {
        $.ajax({
            url: '/getsingleproduct',
            data: {
                'updateproductkey': theupdateproductkey
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ singledata: data });
                console.log(this.state.singledata);
                var populateProduct = this.state.singledata.map(function (product) {
                    updateproductkey.value = product.productKey;
                    updateproductname.value = product.productName;
                    updateproductprice.value = product.productUnitPrice;
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    deleteSingleProduct: function (theupdateproductkey) {
        if (confirm("Delete this record?")) {
            $.ajax({
                url: '/deletesingleproduct',
                data: {
                    'updateproductkey': theupdateproductkey
                },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    this.setState({ singledata: data });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
            window.location.reload(true);
        }
    },
    render: function () {
        //display an individual donation
        return (
            <tr>
                <td>
                    {this.props.productName}
                </td>
                <td>
                    {this.props.productPrice}
                </td>
                <td>
                    <form onSubmit={this.updateRecord}>
                        <input type="submit" value="Update Record" />
                    </form>
                </td>
                <td>
                    <form onSubmit={this.deleteRecord}>
                        <input type="submit" value="Delete Record" />
                    </form>
                </td>
            </tr>
        );
    }
});

ReactDOM.render(
    <SelectProductBox />,
    document.getElementById('content')
);