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
    console.log(req)
    const newComp = new Component()
    
    newComp.compName = req.body.compName
    newComp.desc = req.body.desc
    
    newComp.image = {
        data: fs.readFileSync(req.file.path),
        contentType: 'image/png'
    }

    newComp.save()
        .then(() => res.status(200).json({'Comp': 'Comp added successfully'}))
        .catch(err => res.status(400).json('Unable to add component: ' + err));
});

router.route('/remove').post(upload.none(), (req, res) => {
    Component.findOneAndDelete(req.body)
        .then(() => res.status(200).json({'Comp': 'Comp deleted successfully'}))
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

module.exports = router;