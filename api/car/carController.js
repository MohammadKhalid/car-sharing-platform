var carModel = require('./carModel.js');
var fs = require('fs');
const uuidv4 = require('uuid/v4');

/**
 * carController.js
 *
 * @description :: Server-side logic for managing cars.
 */
module.exports = {

    /**
     * carController.list()
     */
    listLocal: function (req, res) {
        carModel.find({ assembly: "Local", "deleted": false }, function (err, cars) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car.',
                    error: err
                });
            }
            return res.json(assignFavourite(cars, req.session.uid));
        });
    },

    listImported: function (req, res) {
        carModel.find({ assembly: "Imported", "deleted": false }, function (err, cars) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car.',
                    error: err
                });
            }
            return res.json(assignFavourite(cars, req.session.uid));
        });
    },

    myCars: function (req, res) {
        carModel.find({ uploadedBy: req.session.uid, "deleted": false }, function (err, cars) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car.',
                    error: err
                });
            }
            return res.json(assignFavourite(cars, req.session.uid));
        })
    },
    getFavourite: function (req, res) {
        carModel.find({ likes: req.session.uid, "deleted": false }, function (err, cars) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car.',
                    error: err
                });
            }
            return res.json(assignFavourite(cars, req.session.uid));
        })
    },

    isLiked(req, res) {
        var id = req.params.id;
        carModel.findOne({ _id: id }, function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car.',
                    error: err
                });
            }
            if (!car) {
                return res.status(404).json({
                    message: 'No such car'
                });
            }
            if (car.likes.indexOf(req.session.uid) >= 0) {
                return res.status(200).json({
                    "isLiked": true
                });
            }
            else {
                return res.status(200).json({
                    "isLiked": false
                });
            }
        })
    },
    getUserId: function (req, res) {
        if (req.session.uid) {
            return res.status(200).json({
                id: req.session.uid
            });
        }
        else {
            return res.status(401).json({
                message: 'Error no id exists'
            });
        }
    },
    markDeleted: function (req, res) {
        var id = req.params.id;
        carModel.findOne({ _id: id }, function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car.',
                    error: err
                });
            }
            if (!car) {
                return res.status(404).json({
                    message: 'No such car'
                });
            }
            if (car.uploadedBy == req.session.uid) {
                car.deleted = true;
                car.save(function (err, car) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error in deletion',
                            error: err
                        });
                    }
                    return res.status(201).json(car);
                });
            }
            else {
                return res.status(500).json({
                    message: "You don't have access to delete this car",
                    error: err
                });
            }
        })
    },
    markFavourite: function (req, res) {
        var id = req.params.id;
        carModel.findOne({ _id: id }, function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car.',
                    error: err
                });
            }
            if (!car) {
                return res.status(404).json({
                    message: 'No such car'
                });
            }
            if (car.likes.indexOf(req.session.uid) >= 0) {
                car.likes.splice(car.likes.indexOf(req.session.uid), 1);
            }
            else {
                car.likes.push(req.session.uid);
            }
            car.save(function (err, car) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error in deletion',
                        error: err
                    });
                }
                return res.status(201).json(car);
            });


        })
    },
    /**
     * carController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        carModel.findOne({ _id: id })
            .populate("uploadedBy", "_id name phone")
            .exec(function (err, car) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting car.',
                        error: err
                    });
                }
                if (!car) {
                    return res.status(404).json({
                        message: 'No such car'
                    });
                }
                return res.json(car);
            });
    },

    /** Searching Query **/
    search(req, res) {
        var query = {};
        var search = req.query.search
        var area = req.query.area
        var city = req.query.city
        var maxMileage = req.query.maxMileage
        var maxModelNo = req.query.maxModelNo
        var maxPrice = req.query.maxPrice
        var minMileage = req.query.minMileage
        var minModelNo = req.query.minModelNo
        var minPrice = req.query.minPrice
        var model = req.query.model
        var transmission = req.query.transmission

        if (search && search != "") {
            query["$text"] = { 
                $search : search 
            }
        }
        
        if (area && area != "") {
            query.area = {
                "$regex": area,
                "$options": "i"
            }
        }
        if (city && city != "") {
            query.city = {
                "$regex": city,
                "$options": "i"
            }
        }
        if (maxMileage && maxMileage != "") {
            query.mileage = query.mileage || {};
            query.mileage.$lte = maxMileage;
        }
        if (maxModelNo && maxModelNo != "") {
            query.modelNo = query.modelNo || {};
            query.modelNo.$lte = maxModelNo;
        }
        if (maxPrice && maxPrice != "") {
            query.price = query.price || {};
            query.price.$lte = maxPrice;
        }
        if (minMileage && minMileage != "") {
            query.mileage = query.mileage || {};
            query.mileage.$gte = minMileage;
        }
        if (minModelNo && minModelNo != "") {
            query.modelNo = query.modelNo || {};
            query.modelNo.$gte = minModelNo;
        }
        if (minPrice && minPrice != "") {
            query.price = query.price || {};
            query.price.$gte = minPrice;
        }
        if (model && model != "") {
            query.title = {
                "$regex": model,
                "$options": "i"
            }
        }
        // if(search && search != ""){
        //     query.block = {
        //         "$regex": block,
        //         "$options": "i"
        //     }
        // }
        if (transmission && transmission != "") {
            query.transmission = {
                "$regex": transmission,
                "$options": "i"
            }
        }
        query.deleted = false;
        carModel.find(query).exec(function (err, cars) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car.',
                    error: err
                });
            }
            return res.json(assignFavourite(cars, req.session.uid));
        })
    },

    /**
     * carController.create()
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
        var car = new carModel({
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
            deleted: false,
            // registration : req.body.registration,
            features: req.body.features,
            likes: req.body.likes,
            uploadedBy: req.session.uid

        });

        car.save(function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating car',
                    error: err
                });
            }
            return res.status(201).json(car);
        });
    },

    /**
     * carController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        carModel.findOne({ _id: id }, function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car',
                    error: err
                });
            }
            if (!car) {
                return res.status(404).json({
                    message: 'No such car'
                });
            }
            car.title = req.body.title ? req.body.title : car.title;
            car.city = req.body.city ? req.body.city : car.city;
            car.area = req.body.area ? req.body.area : car.area;
            car.modelNo = req.body.modelNo ? req.body.modelNo : car.modelNo;
            car.regCity = req.body.regCity ? req.body.regCity : car.regCity;
            car.mileage = req.body.mileage ? req.body.mileage : car.mileage;
            car.color = req.body.color ? req.body.color : car.color;
            car.price = req.body.price ? req.body.price : car.price;
            car.description = req.body.description ? req.body.description : car.description;
            car.engineType = req.body.engineType ? req.body.engineType : car.engineType;
            car.engineCapacity = req.body.engineCapacity ? req.body.engineCapacity : car.engineCapacity;
            car.transmission = req.body.transmission ? req.body.transmission : car.transmission;
            car.images = req.body.images ? req.body.images : car.images;
            car.assembly = req.body.assembly ? req.body.assembly : car.assembly;
            // car.registration = req.body.registration ? req.body.registration : car.registration;
            car.features = req.body.features ? req.body.features : car.features;
            car.likes = req.body.likes ? req.body.likes : car.likes;
            car.uploadedBy = req.session.uid;

            car.save(function (err, car) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating car.',
                        error: err
                    });
                }

                return res.json(car);
            });
        });
    },

    /**
     * carController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        carModel.findByIdAndRemove(id, function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the car.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
function assignFavourite(cars, id) {
    cars = JSON.parse(JSON.stringify(cars));
    for (var i = 0; i < cars.length; i++) {
        if (cars[i].likes.indexOf(id) >= 0) {
            cars[i].liked = true;
            cars[i].likes = null;
        }
        else {
            cars[i].liked = false;
            cars[i].likes = null;
        }
    }
    return cars;
}