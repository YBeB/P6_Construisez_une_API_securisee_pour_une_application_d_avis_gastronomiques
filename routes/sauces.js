const express=require('express');
const router=express.Router();
const saucesCtrl=require('../controllers/sauces');

const multer=require('../middleware/multer-config');

router.post('/',auth, multer, stuffCtrl.createSauces);
router.put('/:id',auth, multer, stuffCtrl.modifySauces);
router.delete('/:id', auth, stuffCtrl.deleteSauces);
router.get('/:id', auth, stuffCtrl.getOneSauce);
router.get('/', auth, stuffCtrl.getAllSauces);
module.exports = router;