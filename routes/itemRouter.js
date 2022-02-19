const router = require('express').Router()
const itemCtrl = require('../controllers/itemCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/item')
    .get(itemCtrl.getItems)
    .post(auth, authAdmin, itemCtrl.createItem)

router.route('/item/:id')
    .delete(auth, authAdmin, itemCtrl.deleteItem)
    .put(auth, authAdmin, itemCtrl.updateItem)


module.exports = router