// const {S3Client,GetObjectCommand} = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// // Create an S3 client
// const s3Client = new S3Client({
//   region: 'usa-east-1', // Replace with your AWS region
//   credentials: {
//     accessKeyId: "ASIA5VDXAE7VFY6APVNN", 
//     secretAccessKey:"ROkol78BkRZg7qy2ILP87waR9xvYrg0Pd/2mbJam",
//   },
// });

// // Define a function to retrieve an image from S3
// async function getObjectURL(key) {
//   const command = new GetObjectCommand({
//     Bucket:"projectimages1233",
//     Key:key,
// });
//   const url=await getSignedUrl(s3Client,command);
//   return url;
// }
// async function init(){
//     console.log("URL for bg4.jpg", await getObjectURL("bg4.jpg"));
// }
// init();

require("dotenv").config()

const express = require('express')

const app = express();

app.listen(3001);

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');


aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,

});
const BUCKET = process.env.BUCKET
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname)
        }
    })
})

app.post('/upload', upload.single('file'), async function (req, res, next) {

    res.send('Successfully uploaded ' + req.file.location + ' location!')

})

app.get("/list", async (req, res) => {

    let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    let x = r.Contents.map(item => item.Key);
    res.send(x)
})


app.get("/download/:filename", async (req, res) => {
    const filename = req.params.filename
    let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send(x.Body)
})

app.delete("/delete/:filename", async (req, res) => {
    const filename = req.params.filename
    await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send("File Deleted Successfully")

})
