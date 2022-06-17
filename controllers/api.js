const client = require('../database/db');
const db = client.db('Test_db');
const collection = db.collection('events');
const { ObjectId, ISODate } = require('mongodb');
// const { router } = require('../Routes/routes');


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



exports.get_event = async (req, res) => {
    const id = req.query.id;
    console.log(id);
    if (req.query.id != null) {

        await collection.findOne({ _id: ObjectId(id) }).then(user => {
            if (user == null) {
                res.status(404).send("user not found");
            } else {
                res.status(200).json({ message: user })
            }
        }).catch(err => {
            console.log(err);
        })
    }
    else {

        const type = req.query.type;
        const Limit = parseInt(req.query.limit);
        const page = req.query.page;
        const sortby = (type == "latest") ? 1 : -1;

        await collection.find().sort({ schedule: sortby }).limit(Limit).toArray(function (err, result) {
            if (err) {
                res.status(500).json({ message: err });
                // throw err;
            } else {
                res.status(200).json({ message: result });
                // console.log(result);
            }
        });

    }

};



exports.AddEvent = async (req, res) => {
    console.log(req.file);
    const event = await collection.insertOne({
        'type':'event',
        'uid':18,
        'name': req.body.name,
        'files': req.file.path,
        'tagline': req.body.tagline,
        'schedule': Date(req.body.schedule),
        'description': req.body.description,
        'moderator': req.body.moderator,
        'category': req.body.category,
        'sub_category': req.body.sub_category,
        'rigor_rank': parseInt(req.body.rigor_rank)
    }, function (err, result) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            res.status(200).json({ message: result });
        }
    });

};


exports.update_event = async (req, res) => {
    
    const id = req.params.id;
    console.log(id);
    const tobeUpdated ={};
    Object.keys(req.body).forEach(function (key){
        tobeUpdated[key]=req.body[key];
    });
    let file_path = null;
    if (req.file != null){
        file_path = req.file.path;
        tobeUpdated['files']=file_path;
    }
    console.log(tobeUpdated);
    const updateResult = await collection.updateOne({ _id: ObjectId(id) },{$set: tobeUpdated }, function (err, result) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            if(result.matchedCount == 0){
                res.status(501).json({ message: "user with given _id not exist" });
            }else{

                res.status(200).json({ message: result });
            }
        }
    });

};

exports.delete_event = async(req,res)=>{
    const id=req.params.id;
    await collection.deleteOne({'_id':ObjectId(id)},function(err,result){
        if (err) {
            res.status(500).json({ message: err });
        }
        else{
            if(result.matchedCount == 0){
                res.status(501).json({ message: "user with given _id not exist" });
            }else{

                res.status(200).json({ message: `user with _id : ${id} deleted successfully` });
            }
        }
    })
};