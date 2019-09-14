var express = require('express');
var router = express.Router();
var userController = require('./userController.js');

/*
 * GET
 */
router.get('/', userController.list);

/*
 * GET
 */
router.get('/myinfo', userController.myinfo);
router.get('/:id', userController.show);

/*
 * POST
 */
router.post('/', userController.create);

/*
 * PUT
 */
router.put('/myinfo', userController.updateMyInfo);
router.put('/activate/:id', userController.activate);
router.put('/deactivate/:id', userController.deactivate);
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
