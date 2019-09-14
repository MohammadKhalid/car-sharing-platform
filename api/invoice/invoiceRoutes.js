var express = require('express');
var router = express.Router();
var invoiceController = require('./invoiceController.js');

/*
 * GET
 */
router.get('/', invoiceController.list);
router.get('/mine', invoiceController.myInvoices);

/*
 * GET
 */
router.get('/download/:id', invoiceController.getInvoice);
router.get('/:id', invoiceController.show);

/*
 * POST
 */
router.post('/', invoiceController.create);

/**
 * generating the invoices
 */

router.post('/generate', invoiceController.generate);
router.post('/bill-screenshot', invoiceController.saveScreenshot);

/*
 * PUT
 */
router.put('/confirm/', invoiceController.confirmPayment);
router.put('/invalidate/', invoiceController.invalidatePayment);
router.put('/:id', invoiceController.update);

/*
 * DELETE
 */
router.delete('/:id', invoiceController.remove);

module.exports = router;
