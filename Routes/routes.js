const express = require('express');
const router = express.Router();
const { get_event, AddEvent, update_event ,delete_event} = require('../controllers/api');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/events', get_event);

router.post("/events", upload.single('image'), AddEvent);

router.put('/events/:id', upload.single('image'), update_event);

router.delete('/events/:id',delete_event)


module.exports = router;
