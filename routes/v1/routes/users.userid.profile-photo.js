var express = require('express');
var router = express.Router();
var path = require('path');

var nPath = path.normalize(path.dirname(require.main.filename)+"/../profile_photos");
console.log(nPath);

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, nPath)
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage })

/* GET users listing. */
router.route('/')
.post(
//    function(req, res, next){
//        
//    },
    upload.single('profile-photo'),
    function(req, res, next){
        if(!req.file) return next(new Error("no file provided"));
        res.locals.data = req.file;
        return res.json(res.locals);
    }
);

module.exports = router;