const router = require('express').Router()
const cardCtrl = require('../controllers/cardCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/card')
    .get(
        // auth, authAdmin
        // ,
        cardCtrl.getCards)
    .post(auth, authAdmin, cardCtrl.createCard)

router.route('/card/:id')
    .get(
      
        cardCtrl.getCardsByYear)
    .post(auth, authAdmin, cardCtrl.createCard)

router.route('/card/:id')
    .delete(auth, authAdmin, cardCtrl.deleteCard)
    .put(auth, authAdmin, cardCtrl.updateCard)


module.exports = router