'use strict';
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var bcrypt = require('bcrypt');
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected")
});

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/login/', function (req, res) {
    
    var euser = req.body.employeeuser;
    var epass = req.body.employeepass;

    var sqlsel = 'select * from employeeTable where employeeUsername = ?';

    var inserts = [euser];

    var sql = mysql.format(sqlsel, inserts);
    con.query(sql, function (err, data) {
        if (data.length > 0) {
            bcrypt.compare(epass, data[0].employeePassword, function (err, passwordCorrect) {
                if (err) {
                    throw err
                } else if (!passwordCorrect) {
                    console.log("Password incorrect")
                } else {
                    console.log("Password correct")
                    res.send({ redirect: 'insertcustomer.html' });
                }
            })
        } else {
            console.log("Incorrect user name or password");
        }
    });
});

app.post('/insertcustomer', function (req, res) {
    var cfirst = req.body.customerfirstname;
    var clast = req.body.customerlastname;
    var cphone = req.body.customerphone;
    var cemail = req.body.customeremail;
    var croom = req.body.customerroom;

    var sqlins = "INSERT INTO customerTable (customerFirstName, customerLastName, customerPhone, "
        + "customerEmail, customerRoom) VALUES (?, ?, ?, ?, ?)";

    var insert = [cfirst, clast, cphone, cemail, croom];

    var sql = mysql.format(sqlins, insert);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        res.redirect("insertcustomer.html");
        res.end();
    });
});

app.post('/insertemployee', function (req, res) {
    var efirst = req.body.employeefirstname;
    var elast = req.body.employeelastname;
    var ephone = req.body.employeephone;
    var eemail = req.body.employeeemail;
    var eusername = req.body.employeeusername;
    var epassword = req.body.employeepassword;

    var saltRounds = 10;
    var theHashedPW = '';
    bcrypt.hash(epassword, saltRounds, function (err, hashedPassword) {
        if (err) {
            return
        } else {
            theHashedPW = hashedPassword;
            var sqlins = "INSERT INTO employeeTable (employeeFirstName, employeeLastName, employeePhone, "
            + "employeeEmail, employeeUsername, employeePassword) VALUES (?, ?, ?, ?, ?, ?)";
    
            var insert = [efirst, elast, ephone, eemail, eusername, theHashedPW];

            var sql = mysql.format(sqlins, insert);

            con.execute(sql, function (err, result) {
                if (err) throw err;
                res.redirect("insertemployee.html");
                res.end();
            });
        }
    });
});

app.post('/insertproduct', function (req, res) {
    var pname = req.body.productName;
    var pprice = req.body.productPrice;

    var sqlins = "INSERT INTO productTable (productName, productUnitPrice"
        + ") VALUES (?, ?)";

    var insert = [pname, pprice];

    var sql = mysql.format(sqlins, insert);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        res.redirect("insertproduct.html");
        res.end();
    });
});

app.post('/insertinventory', function (req, res) {
    var iquantity = req.body.inventoryquantity;
    var idescription = req.body.inventorydescription;
    var iproduct = req.body.inventoryproduct;

    var sqlins = "INSERT INTO inventoryTable (inventoryQuantityLevel, InventoryDescription, productKey"
        + ") VALUES (?, ?, ?)";

    var insert = [iquantity, idescription, iproduct];

    var sql = mysql.format(sqlins, insert);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        res.redirect("insertinventory.html");
        res.end();
    });
});

app.post('/insertorder', function (req, res) {
    var oproduct = req.body.orderproduct;
    var oquantity = req.body.orderquantity;
    var oprice = req.body.orderprice;
    var oemployee = req.body.orderemployee;
    var ocustomer = req.body.ordercustomer;
    var ostatus = req.body.orderstatus;

    var sqlins = "INSERT INTO customerOrderTable (customerOrderStatus, customerKey, employeeKey)"
        + " VALUES (?, ?, ?)";
    
    var insert = [ostatus, ocustomer, oemployee];

    var sql = mysql.format(sqlins, insert);

    con.execute(sql, function (err, result) {
        if (err) throw err;

        var sqlsel = "SELECT * FROM customerOrderTable WHERE"
        + " customerOrderStatus=? AND customerKey=? AND employeeKey=?";
    
        var select = [ostatus, ocustomer, oemployee];
        var sql = mysql.format(sqlsel, select);

        con.query(sql, function (err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            var newsqlins = "INSERT INTO orderDetailTable (orderDetailQuantity, orderDetailUnitPrice, productKey,"
            + " customerOrderKey)"
            + " VALUES (?, ?, ?, ?)";
    
            var newinsert = [oquantity, oprice, oproduct, data[data.length - 1].customerOrderKey];
    
            var newsql = mysql.format(newsqlins, newinsert);
    
            con.execute(newsql, function (err, result) {
                if (err) throw err;
                res.redirect("insertorder.html");
                res.end();
            });
        });
    });
});

app.get('/selectcustomer/', function (req, res) {
    var cfirstname = req.query.customerfirstname;
    var clastname = req.query.customerlastname;
    var cphone = req.query.customerphone;
    var cemail = req.query.customeremail;
    var croom = req.query.customerroom;

    var sqlsel = 'SELECT * FROM customerTable WHERE customerFirstName LIKE ? AND customerLastName LIKE ?'
        + ' AND customerPhone LIKE ? AND customerEmail LIKE ? AND customerRoom LIKE ?';
    var select = ['%' + cfirstname + '%', '%' + clastname + '%', '%' + cphone + '%', '%' + cemail + '%', '%' + croom + '%'];

    var sql = mysql.format(sqlsel, select);

    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.get('/selectemployee/', function (req, res) {
    var efirstname = req.query.employeefirstname;
    var elastname = req.query.employeelastname;
    var ephone = req.query.employeephone;
    var eemail = req.query.employeeemail;

    var sqlsel = 'SELECT * FROM employeeTable WHERE employeeFirstName LIKE ? AND employeeLastName LIKE ?'
        + ' AND employeePhone LIKE ? AND employeeEmail LIKE ?';
    var select = ['%' + efirstname + '%', '%' + elastname + '%', '%' + ephone + '%', '%' + eemail + '%'];

    var sql = mysql.format(sqlsel, select);

    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.get('/selectproduct/', function (req, res) {
    var pname = req.query.productname;
    var pprice = req.query.productprice;

    var sqlsel = 'SELECT * FROM productTable WHERE productName LIKE ? AND productUnitPrice LIKE ?';
    var select = ['%' + pname + '%', '%' + pprice + '%'];

    var sql = mysql.format(sqlsel, select);

    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.get('/selectinventory/', function (req, res) {
    var iname = req.query.inventoryname;
    var iquantity = req.query.inventoryquantity;

    var sqlsel = 'SELECT * FROM inventoryTable INNER JOIN productTable ON productTable.productKey=inventoryTable.productKey'
        + ' WHERE productName LIKE ? AND inventoryQuantityLevel LIKE ?';
    var select = ['%' + iname + '%', '%' + iquantity + '%'];

    var sql = mysql.format(sqlsel, select);

    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.get('/selectorder/', function (req, res) {
    var oproduct = req.query.orderproduct;
    var oquantity = req.query.orderquantity;
    var oprice = req.query.orderprice;
    var oemployee = req.query.orderemployee;
    var ocustomer = req.query.ordercustomer;
    var odatetime = req.query.orderdatetime;
    var ostatus = req.query.orderstatus;

    var sqlsel = 'SELECT * FROM orderDetailTable INNER JOIN productTable ON productTable.productKey=orderDetailTable.productKey'
        + ' INNER JOIN customerOrderTable ON customerOrderTable.customerOrderKey=orderDetailTable.customerOrderKey'
        + ' INNER JOIN customerTable ON customerTable.customerKey=customerOrderTable.customerKey'
        + ' INNER JOIN employeeTable ON employeeTable.employeeKey=customerOrderTable.employeeKey'
        + ' WHERE productName LIKE ? AND orderDetailQuantity LIKE ? AND orderDetailUnitPrice LIKE ? AND employeeFirstName LIKE ?'
        + ' AND customerFirstName LIKE ? AND customerOrderDateTime LIKE ?'
        + ' AND customerOrderStatus = ?';
    var select = ['%' + oproduct + '%', '%' + oquantity + '%', '%' + oprice + '%', '%' + oemployee + '%', '%' + ocustomer + '%', '%' + odatetime + '%', ostatus];

    var sql = mysql.format(sqlsel, select);

    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.get('/selectschedule/', function (req, res) {
    var sday = req.query.scheduleday;
    var sstart = req.query.schedulestart;
    var send = req.query.scheduleend;

    var sqlsel = 'SELECT * FROM scheduleTable'
        + ' WHERE scheduleDay LIKE ? AND scheduleStartTime LIKE ? AND scheduleEndTime LIKE ?';
    var select = ['%' + sday + '%', '%' + sstart + '%', '%' + send + '%'];

    var sql = mysql.format(sqlsel, select);

    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.post('/updatesinglecustomer', function (req, res) {
    var ukey = req.body.updatecuskey;
    var ufirst = req.body.updatecusfirstname;
    var ulast = req.body.updatecuslastname;
    var uphone = req.body.updatecusphone;
    var uemail = req.body.updatecusemail;
    var uroom = req.body.updatecusroom;

    var sqlins = "UPDATE customerTable SET customerFirstName = ?, customerLastName = ?, customerPhone = ?, "
        + "customerEmail = ?, customerRoom = ? WHERE customerKey = ?";

    var insert = [ufirst, ulast, uphone, uemail, uroom, ukey];

    var sql = mysql.format(sqlins, insert);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        res.redirect("updatecustomer.html");
        res.end();
    });
});

app.get('/getsinglecustomer/', function (req, res) {

    var ckey = req.query.updatecustomerkey;

    var sqlsel = 'select * from customerTable where customerKey = ?';
    var inserts = [ckey];

    var sql = mysql.format(sqlsel, inserts);

    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.get('/deletesinglecustomer/', function (req, res) {

    var ckey = req.query.updatecustomerkey;

    var sqlsel = 'delete from customerTable where customerKey = ?';
    var inserts = [ckey];

    var sql = mysql.format(sqlsel, inserts);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        res.redirect("updatecustomer.html");
        res.end();
    });
});

app.post('/updatesingleemployee', function (req, res) {
    var ekey = req.body.updateempkey;
    var efirst = req.body.updateempfirstname;
    var elast = req.body.updateemplastname;
    var ephone = req.body.updateempphone;
    var eemail = req.body.updateempemail;

    var sqlins = "UPDATE employeeTable SET employeeFirstName = ?, employeeLastName = ?, employeePhone = ?, "
        + "employeeEmail = ? WHERE employeeKey = ?";

    var insert = [efirst, elast, ephone, eemail, ekey];

    var sql = mysql.format(sqlins, insert);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        res.redirect("updateemployee.html");
        res.end();
    });
});

app.get('/getsingleemployee/', function (req, res) {

    var ekey = req.query.updateemployeekey;

    var sqlsel = 'select * from employeeTable where employeeKey = ?';
    var inserts = [ekey];

    var sql = mysql.format(sqlsel, inserts);

    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.get('/deletesingleemployee/', function (req, res) {

    var ekey = req.query.updateemployeekey;

    var sqlsel = 'delete from employeeTable where employeeKey = ?';
    var inserts = [ekey];

    var sql = mysql.format(sqlsel, inserts);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        res.redirect("updateemployee.html");
        res.end();
    });
});

app.post('/updatesingleschedule', function (req, res) {
    var skey = req.body.updateschkey;
    var sday = req.body.updateschday;
    var sstart = req.body.updateschstart;
    var send = req.body.updateschend;

    var sqlins = "UPDATE scheduleTable SET scheduleDay = ?, scheduleStartTime = ?, scheduleEndTime = ?"
        + " WHERE scheduleKey = ?";

    var insert = [sday, sstart, send, skey];

    var sql = mysql.format(sqlins, insert);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        res.redirect("updateschedule.html");
        res.end();
    });
});

app.get('/getsingleschedule/', function (req, res) {

    var skey = req.query.updateschedulekey;

    var sqlsel = 'select * from scheduleTable where scheduleKey = ?';
    var inserts = [skey];

    var sql = mysql.format(sqlsel, inserts);

    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.post('/updatesingleproduct', function (req, res) {
    var pkey = req.body.updateprokey;
    var pname = req.body.updateproname;
    var pprice = req.body.updateproprice;

    var sqlins = "UPDATE productTable SET productName = ?, productUnitPrice = ?"
        + " WHERE productKey = ?";

    var insert = [pname, pprice, pkey];

    var sql = mysql.format(sqlins, insert);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        res.redirect("updateproduct.html");
        res.end();
    });
});

app.get('/getsingleproduct/', function (req, res) {

    var pkey = req.query.updateproductkey;

    var sqlsel = 'select * from productTable where productKey = ?';
    var inserts = [pkey];

    var sql = mysql.format(sqlsel, inserts);

    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.get('/deletesingleproduct/', function (req, res) {

    var pkey = req.query.updateproductkey;

    var sqlsel = 'delete from productTable where productKey = ?';
    var inserts = [pkey];

    var sql = mysql.format(sqlsel, inserts);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        res.redirect("updateproduct.html");
        res.end();
    });
});

app.post('/updatesingleinventory', function (req, res) {
    var ikey = req.body.updateinvkey;
    var iname = req.body.updateinvname;
    var iquantity = req.body.updateinvquantity;

    var sqlins = "UPDATE inventoryTable INNER JOIN productTable ON productTable.productKey=inventoryTable.productKey"
        + " SET productName = ?, inventoryQuantityLevel = ?"
        + " WHERE inventoryKey = ?";

    var insert = [iname, iquantity, ikey];

    var sql = mysql.format(sqlins, insert);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        res.redirect("updateinventory.html");
        res.end();
    });
});

app.get('/getsingleinventory/', function (req, res) {

    var ikey = req.query.updateinventorykey;

    var sqlsel = 'select * from inventoryTable INNER JOIN productTable ON productTable.productKey=inventoryTable.productKey'
        + ' where inventoryKey = ?';
    var inserts = [ikey];

    var sql = mysql.format(sqlsel, inserts);

    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.get('/deletesingleinventory/', function (req, res) {

    var ikey = req.query.updateinventorykey;

    var sqlsel = 'delete from inventoryTable'
        + ' where inventoryKey = ?';
    var inserts = [ikey];

    var sql = mysql.format(sqlsel, inserts);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        res.redirect("updateinventory.html");
        res.end();
    });
});

app.post('/updatesingleorder', function (req, res) {
    var okey = req.body.updateordkey;
    var oproduct = req.body.updateordproduct;
    var oquantity = req.body.updateordquantity;
    var oprice = req.body.updateordprice;
    var oemployee = req.body.updateordemployee;
    var ocustomer = req.body.updateordcustomer;
    var odatetime = req.body.updateorddatetime;
    var ostatus = req.body.updateordstatus;

    var sqlins = 'UPDATE orderDetailTable INNER JOIN customerOrderTable ON customerOrderTable.customerOrderKey=orderDetailTable.customerOrderKey'
        + " SET productKey = ?, orderDetailQuantity = ?, orderDetailUnitPrice = ?, employeeKey = ?, customerKey = ?,"
        + " customerOrderDateTime = ?, customerOrderStatus = ?"
        + " WHERE orderDetailKey = ?";

    var insert = [oproduct, oquantity, oprice, oemployee, ocustomer, odatetime, ostatus, okey];

    var sql = mysql.format(sqlins, insert);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        res.redirect("updateorder.html");
        res.end();
    });
});

app.get('/getsingleorder/', function (req, res) {

    var okey = req.query.updateorderkey;

    var sqlsel = 'SELECT * FROM orderDetailTable INNER JOIN customerOrderTable ON customerOrderTable.customerOrderKey=orderDetailTable.customerOrderKey'
        + ' WHERE orderDetailKey = ?';
    var inserts = [okey];

    var sql = mysql.format(sqlsel, inserts);

    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.get('/deletesingleorder/', function (req, res) {

    var okey = req.query.updateorderkey;

    var thesqlsel = "SELECT * FROM orderDetailTable"
        + " WHERE orderDetailKey = ?";
    
    var theselect = [okey];
    var thesql = mysql.format(thesqlsel, theselect);

    con.query(thesql, function (err, data) {
        if (err) throw err;
        
        var sqlsel = 'delete FROM customerOrderTable'
        + ' WHERE customerOrderKey = ?';
        var inserts = [data[data.length - 1].customerOrderKey];

        var sql = mysql.format(sqlsel, inserts);

        con.execute(sql, function (err, result) {
            if (err) throw err;

            var newsqlsel = 'delete from orderDetailTable'
            + ' WHERE orderDetailKey = ?';
            var newinserts = [okey];

            var newsql = mysql.format(newsqlsel, newinserts);

            con.execute(newsql, function (err, result) {
                if (err) throw err;
                res.redirect("updateorder.html");
                res.end();
            });
        });
    });
});

app.get('/getproducts/', function (req, res) {
    var sqlsel = 'SELECT * FROM productTable';
    var sql = mysql.format(sqlsel);
    
    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.get('/getemployees/', function (req, res) {
    var sqlsel = 'SELECT * FROM employeeTable';
    var sql = mysql.format(sqlsel);
    
    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.get('/getcustomers/', function (req, res) {
    var sqlsel = 'SELECT * FROM customerTable';
    var sql = mysql.format(sqlsel);
    
    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        res.send(JSON.stringify(data));
    });
});

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
