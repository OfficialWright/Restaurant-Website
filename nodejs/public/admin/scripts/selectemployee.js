var SelectEmployeeBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadEmployeeFromServer: function () {
        $.ajax({
            url: '/selectemployee',
            data: {
                'employeefirstname': employeefirstname.value,
                'employeelastname': employeelastname.value,
                'employeephone': employeephone.value,
                'employeeemail': employeeemail.value
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
        this.loadEmployeeFromServer();
    },
    render: function () {
        return(
            <div>
                <h1>Select Employee</h1>
                <SelectForm onEmployeeSubmit={this.loadEmployeeFromServer} />
                <br/><br/>
                <table className="outputTable">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <EmployeeList data={this.state.data} />
                </table>
            </div>
        );
    }
});

var SelectForm = React.createClass({
    getInitialState: function () {
        return {
            employeefirstname: "",
            employeelastname: "",
            employeephone: "",
            employeeemail: ""
        };
    },handleSubmit: function (e) {
        e.preventDefault();
        var employeefirstname = this.state.employeefirstname.trim();
        var employeelastname = this.state.employeelastname.trim();
        var employeephone = this.state.employeephone.trim();
        var employeeemail = this.state.employeeemail.trim();

        this.props.onEmployeeSubmit({
            employeefirstname: employeefirstname,
            employeelastname: employeelastname,
            employeephone: employeephone,
            employeeemail: employeeemail
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
                            <th>First Name:</th>
                            <td>
                                <input type="text" name="employeefirstname" id="employeefirstname" value={this.state.employeefirstname} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Last Name:</th>
                            <td>
                                <input type="text" name="employeelastname" id="employeelastname" value={this.state.employeelastname} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td>
                                <input type="text" name="employeephone" id="employeephone" value={this.state.employeephone} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>E-mail:</th>
                            <td>
                                <input type="text" name="employeeemail" id="employeeemail" value={this.state.employeeemail} onChange={this.handleChange} />
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

var EmployeeList = React.createClass({
    render: function () {
        var employeeNodes = this.props.data.map(function (employee) {
            //map the data to individual donations
            return (
                <Employee
                    employeeKey={employee.employeeKey}
                    employeeFirstName={employee.employeeFirstName}
                    employeeLastName={employee.employeeLastName}
                    employeePhone={employee.employeePhone}
                    employeeEmail={employee.employeeEmail}
                >
                </Employee>
            );
        });
        
        //print all the nodes in the list
        return (
            <tbody>
                {employeeNodes}
            </tbody>
        );
    }
});

var Employee = React.createClass({
    render: function () {
        //display an individual donation
        return (
            <tr>
                <td>
                    {this.props.employeeFirstName}
                </td>
                <td>
                    {this.props.employeeLastName}
                </td>
                <td>
                    {this.props.employeePhone}
                </td>
                <td>
                    {this.props.employeeEmail}
                </td>
            </tr>
        );
    }
});

ReactDOM.render(
    <SelectEmployeeBox />,
    document.getElementById('content')
);