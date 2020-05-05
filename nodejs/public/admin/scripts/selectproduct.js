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
    componentDidMount: function () {
        this.loadProductFromServer();
    },
    render: function () {
        return(
            <div>
                <h1>Select Product</h1>
                <SelectForm onProductSubmit={this.loadProductFromServer} />
                <br/><br/>
                <table className="outputTable">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Price</th>
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
            <form onSubmit={this.handleSubmit}>
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
                <input className="button" type="submit" value="Enter" />
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
            </tr>
        );
    }
});

ReactDOM.render(
    <SelectProductBox />,
    document.getElementById('content')
);