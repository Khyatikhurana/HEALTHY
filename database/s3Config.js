const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: 'ASIA5VDXAE7VONHRTLHO',
  secretAccessKey: 'YDERn9YeUUBpsAg28bqXBH6X4sEcldMde239cLrp',
  region: 'us-east-1'
});

const s3 = new AWS.S3();
const bucketName = 'your-s3-bucket-name';

function getImageFromS3(imageKey, localFilePath) {
  const params = { Bucket: bucketName, Key: imageKey };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error('Error fetching image from S3:', err);
      return;
    }

    // Save the image to a local file
    fs.writeFile(localFilePath, data.Body, 'binary', (writeErr) => {
      if (writeErr) {
        console.error('Error writing image to local file:', writeErr);
        return;
      }
      console.log(`Image saved locally at ${localFilePath}`);
    });
  });
}

// Example usage
const imageKey = 'bg4.jpg'; // Replace with the actual key of your image in S3
const localFilePath = path.join(__dirname, 'downloaded-image.jpg');

getImageFromS3(imageKey, localFilePath);
