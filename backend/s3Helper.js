const aws = require('aws-sdk');
require('dotenv').config();
const uuid = require('uuid');

async function uploadFile(base64Data,fileType,acl="public-read"){
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: Buffer.from(base64Data, 'base64'),
        Key: uuid.v4(),
        ContentEncoding: 'base64',
        ContentType: `${fileType}`,
        ACL: 'public-read'
    }  
    const s3Client = getS3Client();
    let s3Details;
    try{
        s3Details = await (s3Client.upload(params).promise());
    }
    catch(error){
        return {'status' : 0, 'error' : error}
    }

    return {'status':1, 's3Details': s3Details};
}

async function uploadImages(images){
    let s3Images = [];
    let image,type;
    for(let i=0; i<images.length;i++){
        type = images[i].match(/^data:image\/([a-zA-Z]+);base64,/)[1];
        image = await uploadFile(images[i],`image/${type}`);  
        if(image.status != 0){
            s3Images.push(image.s3Details);
        }
    }
    if(images.length != s3Images.length){
        return {'status' : 0, 'error': "Some images were not uploaded"};
    }
    return {'status':1, 's3Details':s3Images};
}

function getS3Client(){
    const s3Client = new aws.S3({region:process.env.AWS_REGION_NAME,credentials:{accessKeyId:process.env.AWS_ACCESS_KEY,secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY}});
    return s3Client

}

module.exports = {uploadFile, uploadImages}