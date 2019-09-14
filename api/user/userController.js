var userModel = require('./userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        userModel.find({}, 'name email phone address approved', function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(users);
        });
    },

    activate: function (req, res) {
        var id = req.params.id;
        userModel.findById(id, function (err, user) {
            if (err){
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            user.approved = true;
            user.save(function (err, unpdatedUser) {
                if (err){
                    return res.status(500).json({
                        message: 'Error when getting user.',
                        error: err
                    });
                }
                res.send(unpdatedUser);
            });
        });
    },
    deactivate: function (req, res) {
        var id = req.params.id;
        userModel.findById(id, function (err, user) {
            if (err){
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            user.approved = false;
            user.save(function (err, unpdatedUser) {
                if (err){
                    return res.status(500).json({
                        message: 'Error when getting user.',
                        error: err
                    });
                }
                res.send(unpdatedUser);
            });
        });
    },
    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        userModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },
    myinfo: function (req, res) {
        var id = req.session.uid || 0;
        userModel.findOne({ _id: id }, "name email phone address", function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new userModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            address: req.body.address,
            approved: false,
            cars: [],
        });

        userModel.findOne({ phone: req.body.phone }, function (err, existingUser) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!existingUser) {
                user.save(function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when creating user',
                            error: err
                        });
                    }
                    return res.status(200).json({ "message": "successfully signed up" });
                });
            }
            else {
                res.status(400).json({ "message": "User already exists" })
            }
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        userModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.name = req.body.name ? req.body.name : user.name;
            user.email = req.body.email ? req.body.email : user.email;
            user.phone = req.body.phone ? req.body.phone : user.phone;
            user.password = req.body.password ? req.body.password : user.password;
            user.address = req.body.address ? req.body.address : user.address;
            user.approved = req.body.approved ? req.body.approved : user.approved;
            user.cars = req.body.cars ? req.body.cars : user.cars;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },
    updateMyInfo: function (req, res) {
        var id = req.session.uid || 0;
        userModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.name = (req.body.name && req.body.name != '') ? req.body.name : user.name;
            user.email = (req.body.email && req.body.email != '') ? req.body.email : user.email;
            user.password = (req.body.password && req.body.password != '') ? req.body.password : user.password;
            user.address = (req.body.address && req.body.address != '') ? req.body.address : user.address;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
