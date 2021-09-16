import multer from "multer";
import path from "path";
import crypto from "crypto";
import aws from "aws-sdk";
import multerS3 from "multer-s3";

const storageTypes = {
  local: multer.diskStorage({
    destination: function(_req, file, cb) {
      cb(null, path.resolve(__dirname, "./", "src", "tmp", "uploads"));
    },
    filename: function(_req, file, cb) {
      crypto.randomBytes(16, (err, hash) => {
        if(err) cb(err, "Um erro aconteceu.");
        const fileName = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, fileName);
      });
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_DEFAULT_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        const fileName = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, fileName);
      });
    }
  })
};
const multerConfig = module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes["s3"],
};

export default multerConfig;
