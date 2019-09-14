var invoiceModel = require('./invoiceModel.js');
var userModel = require('../user/userModel');
var fs = require('fs');
var pdf = require('html-pdf');
const uuidv4 = require('uuid/v4');

/**
 * invoiceController.js
 *
 * @description :: Server-side logic for managing invoices.
 */
module.exports = {

    /**
     * invoiceController.list()
     */
    list: function (req, res) {
        invoiceModel.find({}, function (err, invoices) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting invoice.',
                    error: err
                });
            }
            return res.json(invoices);
        });
    },

    myInvoices: function (req, res) {
        invoiceModel.find({ user: req.session.uid }, function (err, invoices) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting invoice.',
                    error: err
                });
            }
            return res.json(invoices);
        })
    },

    /**
     * invoiceController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        invoiceModel.findOne({ _id: id }, function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting invoice.',
                    error: err
                });
            }
            if (!invoice) {
                return res.status(404).json({
                    message: 'No such invoice'
                });
            }
            return res.json(invoice);
        });
    },

    /**
     * invoiceController.create()
     */
    create: function (req, res) {
        //saving file
        var images = req.body.images;
        var imageNames = [];
        for (var i = 0; i < images.length; i++) {
            let base64String = images[i].split(';base64,'); // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA
            let base64Image = base64String[1];
            let format = base64String[0].split('/').pop();
            let filename = uuidv4() + '.' + format;
            imageNames.push(filename);
            fs.writeFile('./uploads/' + filename, base64Image, { encoding: 'base64' }, function (err) {
                console.log('File created: ' + filename);
            });
        }
        var invoice = new invoiceModel({
            title: req.body.title,
            images: imageNames,
            city: req.body.city,
            area: req.body.area,
            modelNo: req.body.modelNo,
            regCity: req.body.regCity,
            mileage: req.body.mileage,
            color: req.body.color,
            price: req.body.price,
            description: req.body.description,
            engineType: req.body.engineType,
            engineCapacity: req.body.engineCapacity,
            transmission: req.body.transmission,
            assembly: req.body.assembly,
            // registration : req.body.registration,
            features: req.body.features,
            likes: req.body.likes,
            uploadedBy: req.session.uid

        });

        invoice.save(function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating invoice',
                    error: err
                });
            }
            return res.status(201).json(invoice);
        });
    },

    confirmPayment: function (req, res) {
        var id = req.body.id;
        invoiceModel.findOne({ _id: id }, function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting invoice',
                    error: err
                });
            }
            if (!invoice) {
                return res.status(404).json({
                    message: 'No such invoice'
                });
            }
            invoice.hasPaid = true;
            invoice.save(function (err, invoice) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating invoice.',
                        error: err
                    });
                }
                return res.json(invoice);
            });
        });
    },
    invalidatePayment: function (req, res) {
        var id = req.body.id;
        invoiceModel.findOne({ _id: id }, function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting invoice',
                    error: err
                });
            }
            if (!invoice) {
                return res.status(404).json({
                    message: 'No such invoice'
                });
            }
            invoice.hasPaid = false;
            invoice.save(function (err, invoice) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating invoice.',
                        error: err
                    });
                }
                return res.json(invoice);
            });
        });
    },
    saveScreenshot(req, res) {
        try {
            let image = req.body.image;
            let date = req.body.date;
            let base64String = image.split(';base64,'); // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA
            let base64Image = base64String[1];
            let format = base64String[0].split('/').pop();
            let filename = uuidv4() + '.' + format;
            fs.writeFile('./paidinvoices/' + filename, base64Image, { encoding: 'base64' }, function (err) {
                var conditions = { user: req.session.uid, date: date }
                    , update = { $set: { screenshot: filename } }
                    , options = { multi: false };
                invoiceModel.update(conditions, update, options, function (err, data) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating invoice',
                            error: err
                        });
                    }
                    res.status(200).json(data);
                });
            });
        }
        catch (e) {
            console.log(e);
        }
        return res.status(200);
    },
    generate: function (req, res) {
        userModel
            .find()
            .select("_id")
            .exec(function (err, ids) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting invoice.',
                        error: err
                    });
                }
                else {
                    var data = [];
                    var date = new Date(req.body.month);
                    var amount = req.body.amount;
                    for (var i = 0; i < ids.length; i++) {
                        data.push({
                            date: date,
                            amount: amount,
                            screenshot: "",
                            hasPaid: false,
                            user: ids[i]._id
                        })
                    }
                    invoiceModel.insertMany(data, function (err, result) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when getting invoice.',
                                error: err
                            });
                        }
                        else {
                            res.status(200).json({
                                message: "Successfully generated"
                            })
                        }
                    })
                }
            })
    },
    getInvoice: function (req, res) {
        pdf.create(getInvoiceHTML(), {height: '595px', width: '842px'}).toStream((err, pdfStream) => {
            if (err) {
                // handle error and return a error response code
                console.log(err)
                return res.sendStatus(500)
            } else {
                // send a status code of 200 OK
                res.statusCode = 200

                // once we are done reading end the response
                pdfStream.on('end', () => {
                    // done reading
                    return res.end()
                })

                // pipe the contents of the PDF directly to the response
                pdfStream.pipe(res)
            }
        })
    },


    /**
     * invoiceController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        invoiceModel.findOne({ _id: id }, function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting invoice',
                    error: err
                });
            }
            if (!invoice) {
                return res.status(404).json({
                    message: 'No such invoice'
                });
            }
            invoice.title = req.body.title ? req.body.title : invoice.title;
            invoice.city = req.body.city ? req.body.city : invoice.city;
            invoice.area = req.body.area ? req.body.area : invoice.area;
            invoice.modelNo = req.body.modelNo ? req.body.modelNo : invoice.modelNo;
            invoice.regCity = req.body.regCity ? req.body.regCity : invoice.regCity;
            invoice.mileage = req.body.mileage ? req.body.mileage : invoice.mileage;
            invoice.color = req.body.color ? req.body.color : invoice.color;
            invoice.price = req.body.price ? req.body.price : invoice.price;
            invoice.description = req.body.description ? req.body.description : invoice.description;
            invoice.engineType = req.body.engineType ? req.body.engineType : invoice.engineType;
            invoice.engineCapacity = req.body.engineCapacity ? req.body.engineCapacity : invoice.engineCapacity;
            invoice.transmission = req.body.transmission ? req.body.transmission : invoice.transmission;
            invoice.images = req.body.images ? req.body.images : invoice.images;
            invoice.assembly = req.body.assembly ? req.body.assembly : invoice.assembly;
            // invoice.registration = req.body.registration ? req.body.registration : invoice.registration;
            invoice.features = req.body.features ? req.body.features : invoice.features;
            invoice.likes = req.body.likes ? req.body.likes : invoice.likes;
            invoice.uploadedBy = req.session.uid;

            invoice.save(function (err, invoice) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating invoice.',
                        error: err
                    });
                }

                return res.json(invoice);
            });
        });
    },

    /**
     * invoiceController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        invoiceModel.findByIdAndRemove(id, function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the invoice.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

function getInvoiceHTML() {
    return `
<html>

<head>
<title>Invoice</title>
<style>
    body{
    	zoom: 0.79;
    }
    .container {
        width: 32%;
        display: inline-block;
    }

    .challanNo {
        margin: 10px;
    }

    .title {
        text-align: center;
        font-weight: 600;
    }

    .info {
        margin: 20px;
        border: 1px solid black;
        padding: 5px;
        text-align: center;
    }

    .dates {
        margin: 10px;
    }

    .dates table {
        width: 100%;
    }

    .person-info {
        margin: 10px;
    }

    .person-info table {
        border-collapse: collapse;
        width: 100%;
    }

    .person-info table td {
        padding: 2px 10px;
    }

    .person-info table,
    .person-info tr,
    .person-info td {
        border: 1px solid black;
    }

    .amount {
        margin: 10px;
    }

    .amount table {
        border-collapse: collapse;
        width: 100%;
    }

    .amount table td {
        padding: 2px 10px;
    }

    .amount table,
    .amount tr,
    .amount td {
        border: 1px solid black;
    }
</style>
</head>

<body>
<div class="container">
    <div style="text-align: center;">
        <h3>Customer Copy</h3>
    </div>
    <div class="challanNo">
        <span>Challan#</span>
        <span style="float: right">1</span>
    </div>
    <div class="title">
        <p>WheeLink Bill Payment Account</p>
        <p>A/C No. 1525-7000595484</p>
        <p>H-12 Sector Islamabad</p>
    </div>
    <div class="info">
        Pay the dues through Challan in any Habib Bank. The fee slip of the challan have to be submitted through your online account.
        <br> For queries email to wheelink@gmail.com
    </div>
    <div class="dates">
        <table>
            <tr>
                <td>Month</td>
                <td style="text-align: right">May 2018</td>
            </tr>
            <tr>
                <td>Issue Date</td>
                <td style="text-align: right">01 May 2018</td>
            </tr>
            <tr>
                <td>Please Pay by</td>
                <td style="text-align: right">10 May 2018</td>
            </tr>
        </table>
    </div>
    <div class="person-info">
        <table>
            <tr>
                <td>Customer</td>
                <td style="text-align: right">
                    <b>Mohsin Ammar</b>
                </td>
            </tr>
            <tr>
                <td>City</td>
                <td style="text-align: right">Karachi</td>
            </tr>
            <tr>
                <td>Customer Id</td>
                <td style="text-align: right">14894</td>
            </tr>
        </table>
    </div>
    <div class="amount">
        <table>
            <tr>
                <td>
                    <b>Details</b>
                </td>
                <td style="text-align: right">
                    <b>Amount</b>
                </td>
            </tr>
            <tr>
                <td>Current Month Charges</td>
                <td style="text-align: right">10,000</td>
            </tr>
            <tr>
                <td>Arrears</td>
                <td style="text-align: right">1,000</td>
            </tr>
            <tr>
                <td>Total</td>
                <td style="text-align: right">
                    <b>11,000</b>
                </td>
            </tr>
            <tr>
                <td>5% fine on late deposite upto 13 May 2018</td>
                <td style="text-align: right">11,500</td>
            </tr>
            <tr>
                <td>Validity of challan with 10% fine upto 15 May 2018</td>
                <td style="text-align: right">12,000</td>
            </tr>
        </table>
    </div>
    <div class="note"></div>
</div>

<div class="container">
    <div style="text-align: center;">
        <h3>Customer Copy</h3>
    </div>
    <div class="challanNo">
        <span>Challan#</span>
        <span style="float: right">1</span>
    </div>
    <div class="title">
        <p>WheeLink Bill Payment Account</p>
        <p>A/C No. 1525-7000595484</p>
        <p>H-12 Sector Islamabad</p>
    </div>
    <div class="info">
        Pay the dues through Challan in any Habib Bank. The fee slip of the challan have to be submitted through your online account.
        <br> For queries email to wheelink@gmail.com
    </div>
    <div class="dates">
        <table>
            <tr>
                <td>Month</td>
                <td style="text-align: right">May 2018</td>
            </tr>
            <tr>
                <td>Issue Date</td>
                <td style="text-align: right">01 May 2018</td>
            </tr>
            <tr>
                <td>Please Pay by</td>
                <td style="text-align: right">10 May 2018</td>
            </tr>
        </table>
    </div>
    <div class="person-info">
        <table>
            <tr>
                <td>Customer</td>
                <td style="text-align: right">
                    <b>Mohsin Ammar</b>
                </td>
            </tr>
            <tr>
                <td>City</td>
                <td style="text-align: right">Karachi</td>
            </tr>
            <tr>
                <td>Customer Id</td>
                <td style="text-align: right">14894</td>
            </tr>
        </table>
    </div>
    <div class="amount">
        <table>
            <tr>
                <td>
                    <b>Details</b>
                </td>
                <td style="text-align: right">
                    <b>Amount</b>
                </td>
            </tr>
            <tr>
                <td>Current Month Charges</td>
                <td style="text-align: right">10,000</td>
            </tr>
            <tr>
                <td>Arrears</td>
                <td style="text-align: right">1,000</td>
            </tr>
            <tr>
                <td>Total</td>
                <td style="text-align: right">
                    <b>11,000</b>
                </td>
            </tr>
            <tr>
                <td>5% fine on late deposite upto 13 May 2018</td>
                <td style="text-align: right">11,500</td>
            </tr>
            <tr>
                <td>Validity of challan with 10% fine upto 15 May 2018</td>
                <td style="text-align: right">12,000</td>
            </tr>
        </table>
    </div>
    <div class="note"></div>
</div>

<div class="container">
    <div style="text-align: center;">
        <h3>Customer Copy</h3>
    </div>
    <div class="challanNo">
        <span>Challan#</span>
        <span style="float: right">1</span>
    </div>
    <div class="title">
        <p>WheeLink Bill Payment Account</p>
        <p>A/C No. 1525-7000595484</p>
        <p>H-12 Sector Islamabad</p>
    </div>
    <div class="info">
        Pay the dues through Challan in any Habib Bank. The fee slip of the challan have to be submitted through your online account.
        <br> For queries email to wheelink@gmail.com
    </div>
    <div class="dates">
        <table>
            <tr>
                <td>Month</td>
                <td style="text-align: right">May 2018</td>
            </tr>
            <tr>
                <td>Issue Date</td>
                <td style="text-align: right">01 May 2018</td>
            </tr>
            <tr>
                <td>Please Pay by</td>
                <td style="text-align: right">10 May 2018</td>
            </tr>
        </table>
    </div>
    <div class="person-info">
        <table>
            <tr>
                <td>Customer</td>
                <td style="text-align: right">
                    <b>Mohsin Ammar</b>
                </td>
            </tr>
            <tr>
                <td>City</td>
                <td style="text-align: right">Karachi</td>
            </tr>
            <tr>
                <td>Customer Id</td>
                <td style="text-align: right">14894</td>
            </tr>
        </table>
    </div>
    <div class="amount">
        <table>
            <tr>
                <td>
                    <b>Details</b>
                </td>
                <td style="text-align: right">
                    <b>Amount</b>
                </td>
            </tr>
            <tr>
                <td>Current Month Charges</td>
                <td style="text-align: right">10,000</td>
            </tr>
            <tr>
                <td>Arrears</td>
                <td style="text-align: right">1,000</td>
            </tr>
            <tr>
                <td>Total</td>
                <td style="text-align: right">
                    <b>11,000</b>
                </td>
            </tr>
            <tr>
                <td>5% fine on late deposite upto 13 May 2018</td>
                <td style="text-align: right">11,500</td>
            </tr>
            <tr>
                <td>Validity of challan with 10% fine upto 15 May 2018</td>
                <td style="text-align: right">12,000</td>
            </tr>
        </table>
    </div>
    <div class="note"></div>
</div>

</body>

</html>
    `;
}