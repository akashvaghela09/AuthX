const mongoose = require("mongoose");

const resetSchema = new mongoose.Schema(
    {
        reset_status: {type:Boolean, required: true},
        user_ID: {type:String, required: true},
    }, 
    { versionKey: false }
)

const ResetUpload = mongoose.model("reset", resetSchema);

module.exports = {ResetUpload}