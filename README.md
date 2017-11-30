# Grunt + AWS S3 Boilerplate

### Installation

Download or clone this repo.

```
npm install
```

### Run Server & Compile 
- `grunt server` - This will launch browser sync and grunt watch.
- `grunt build` - This will compile website into the www site. It performs grunt tasks.
- `grunt deploy` - Deploy to S3

### AWS S3 Deployment
Create a file in the project root (same level as package.json) called aws-keys.json. Update the AccessKeyId, SecretKey, Region & Bucket with your own values from your AWS console.

```
// aws-keys.json
{
  "AWSAccessKeyId": "XXXXXXXXXXXXXXXXXX",
  "AWSSecretKey": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "AWSRegion":  "us-west-2",
  "AWSBucket":  "mybucket"
}
```

When you run `grunt deploy` it will now read your AWS settings from this file. The contents of the `www` folder are deployed to the root of the S3 bucket. A diff will be performed on the files and only modified files are uploaded to S3.