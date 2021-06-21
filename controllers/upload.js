const config = require('../utils/config')
const uploadRouter = require('express').Router()
const dotenv = require('dotenv')


require('dotenv/config')

const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')
const uuid = require('uuid/v4')
const { Config } = require('aws-sdk')



const s3 = new AWS.S3({
    accessKeyId: config.AWS_ACCESS_ID,
    secretAccessKey: config.AWS_ACCESS_KEY
})

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('file')

uploadRouter.post('/',upload,(req, res) => {

    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]
    console.log(req)

    const params = {
        Bucket: config.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }

        res.status(200).send(data)
    })
})



module.exports = uploadRouter