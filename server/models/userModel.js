const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
            },
            message: "Email harus dalam format yang valid!"
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v)
            },
            message: "Nomor telepon harus berupa angka 10 digit!"
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model("User", userSchema)