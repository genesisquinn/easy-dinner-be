const { Storage } = require('@google-cloud/storage');
const path = require('path');

const serviceKeyPath = path.join(__dirname, '..', 'image-upload-sa.json');
const storage = new Storage({ keyFilename: serviceKeyPath });




const uploadFileToStorage = async (file) => new Promise((resolve, reject) => {
    {
        const bucketName = process.env.GCP_STORAGE_BUCKET_NAME;

        const bucket = storage.bucket(bucketName);
        const { buffer, originalname } = file;
        const newName = originalname.replace(/ /g, "_");
        const blob = bucket.file(originalname.replace(/ /g, "_"));
        const blobStream = blob.createWriteStream({ resumable: false });

        blobStream
            .on('finish', () => {
                const publicUrl = `https://storage.googleapis.com/${bucketName}/${newName}`;
                resolve(publicUrl)
            })
            .on('error', (e) => {
                console.log('e: ', e);
                reject('Oops something went wrong trying to upload the image.')
            })
            .end(buffer);
    }

});

module.exports = { uploadFileToStorage }