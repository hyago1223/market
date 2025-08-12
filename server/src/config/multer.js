import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage_products = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,path.resolve(__dirname,'..','..','..','assets','products'));
    },
    filename: function(req, file, cb){
        const hash = crypto.randomBytes(6).toString('hex');
        const fileName = `${hash}-${file.originalname}`;
        cb(null, fileName);
    }
});

const storage_users = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.resolve(__dirname, '..', '..','..', 'assets', 'users'));
    },
    filename: function(req, file, cb){
        const hash = crypto.randomBytes(6).toString('hex');
        const fileName = `${hash}-${file.originalname}`;
        cb(null, fileName);
    }
});

export const upload_products = multer({ storage: storage_products });
export const upload_users = multer({ storage: storage_users });

export default { upload_products, upload_users}