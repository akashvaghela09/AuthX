const express = require("express")
const router = express.Router()
const {ResetUpload} = require("../model/reset.modal")
const bcrypt = require("bcrypt")

// Get Reset Links
router.get("/", async (req, res) => {
    const user = await ResetUpload.find().lean().exec();
    return res.status(200).json({data: user})
})

// Get Single Reset Link
router.get("/:id", async (req, res) => {
    try {
        const user = await ResetUpload.findById(req.params.id).lean().exec()
        return res.status(200).json({data: user})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

// Post Reset Link
router.post("/", async (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            let userbody = {
                "name": req.body.name,
                "email": req.body.email,
                "password": hash
            }
            const user = ResetUpload.create(userbody);
            return res.status(201).json({data: userbody})
        });
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

// Update Reset Link
router.patch("/:id", async (req, res) => {
    try {
        const user = await ResetUpload.findByIdAndUpdate(req.params.id, req.body, { new: true}).lean().exec()
        return res.status(200).json({data: user})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})


// Delete Reset Link
router.delete("/:id", async (req, res) => {
    try {
        const user = await ResetUpload.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).json({data: user})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

module.exports = router