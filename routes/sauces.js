const express=require('express');
const router=express.Router();
const saucesCtrl=require('../controllers/sauces');

const multer=require('../middleware/multer-config.js');

router.post('/',auth, multer, stuffCtrl.createSauce);
router.put('/:id',auth, multer, stuffCtrl.modifySauces);
router.delete('/:id', auth, stuffCtrl.deleteSauce);
router.get('/:id', auth, stuffCtrl.getOneSauce);
router.get('/', auth, stuffCtrl.getAllSauces);
router.post("/:id/like",auth,saucesCtrl.likeSauce);
module.exports = router;