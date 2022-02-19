const router = require('express').Router()
const yearCtrl = require('../controllers/yearCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/year')
    .get(auth, authAdmin,yearCtrl.getYears)
    .post(auth, authAdmin, yearCtrl.createYear)

router.route('/year/:id')
     .delete(auth, authAdmin, yearCtrl.deleteYear)
    .put(auth, authAdmin, yearCtrl.updateYear)


module.exports = router