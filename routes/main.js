const router = require('express').Router(),
    Component = require('../models/comp.model'),
    multer = require('multer'),
    fs = require('fs')

const upload = multer({ dest: './uploads/',
    rename: (fieldname, filename) => {
        return filename;
    },
})

router.route('/').get((req, res) => {
    Component.find()
        .then(comps => res.json(comps))

        .catch(err => res.status(400).json('Unable to get component data: ' + err));
})

router.route('/add').post(upload.single('file'), (req, res) => {
    const newComp = new Component(req.body)
    
    newComp.image = {
        data: fs.readFileSync(req.file.path),
        contentType: 'image/png'
    }

    newComp.save()
        .then(() => res.status(200).json({'Comp': 'Comp added successfully'}))
        .catch(err => res.status(400).json('Unable to add component: ' + err));
});

router.route('/remove').post(upload.none(), (req, res) => {
    
    Component.findOneAndDelete({_id: req.body._id})
        .then(() => res.status(200).json({'Comp': 'Comp deleted successfully'}))
        .then(() => Component.updateMany({ order: {$gt: req.body.order} }, {$inc: {order: -1} } ))
        .catch(err => res.status(400).json('Unable to delete component: ' + err));

});

router.route('/update').post(upload.single('file'), (req, res) => {
    let data = {
        compName: req.body.compName,
        desc: req.body.desc,
    }

    if (req.file) data.image = {
        data: fs.readFileSync(req.file.path),
        contentType: 'image/png'
    }

    Component.findOneAndUpdate({_id: req.body._id}, data)
        .then(() => res.status(200).json({'Comp': 'Comp updated successfully'}))
        .catch(err => res.status(400).json('Unable to update component: ' + err));
});

router.route('/sort').post(upload.none(), (req, res) => {
    Component.findOneAndUpdate({_id: req.body._id}, {order: req.body.order})
        .then(() => res.status(200).json({'Comp': 'Comp sorted successfully'}))
        .catch(err => res.status(400).json('Unable to sort component: ' + err));
});

module.exports = router;