var LoginBox = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },
    handleLogin: function (logininfo) {
        $.ajax({
            url: '/login/',
            dataType: 'json',
            type: 'POST',
            data: logininfo,
            success: function (data) {
                this.setState({ data: data });
                if (typeof data.redirect == 'string') {
                    window.location = data.redirect;
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div>
                <h1>Login</h1>
                <LoginForm onLoginSubmit={this.handleLogin} />
                <br />
            </div>
        );
    }
});

var LoginForm = React.createClass({
    getInitialState: function () {
        return {
            employeeuser: "",
            employeepass: "",

        };
    },
    handleOptionChange: function (e) {
        this.setState({
            selectedOption: e.target.value
        });
    },

    handleSubmit: function (e) {
        e.preventDefault();

        var employeepass = this.state.employeepass.trim();
        var employeeuser = this.state.employeeuser.trim();

        this.props.onLoginSubmit({
            employeepass: employeepass,
            employeeuser: employeeuser
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
                <div id="theform">
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Employee Username</th>
                                    <td>
                                        <input name="employeeuser" id="employeeuser" value={this.state.employeeuser} onChange={this.handleChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Employee Password</th>
                                    <td>
                                        <input type="password" name="employeepass" id="employeepass" value={this.state.employeepass} onChange={this.handleChange} />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <input type="submit" value="Login" />
                    </form>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <LoginBox />,
    document.getElementById('content')
);

