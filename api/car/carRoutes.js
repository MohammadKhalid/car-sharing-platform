var express = require('express');
var router = express.Router();
var carController = require('./carController.js');

/*
 * GET
 */
router.get('/local', carController.listLocal);
router.get('/imported', carController.listImported);
router.get('/mine', carController.myCars);
router.get('/search', carController.search);
router.get('/id', carController.getUserId);
router.get('/isLiked/:id', carController.isLiked);
router.get('/favourite/', carController.getFavourite);
// router.delete('/delete/:id', carController.markDeleted);

/*
 * GET
 */
router.get('/:id', carController.show);

/*
 * POST
 */
router.post('/', carController.create);
router.post('/favourite/:id', carController.markFavourite);

/*
 * PUT
 */
router.put('/:id', carController.update);

/*
 * DELETE
 */
router.delete('/:id', carController.markDeleted);

module.exports = router;
