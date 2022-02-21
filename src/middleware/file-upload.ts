import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import * as mime from "mime-types";

export const fileUpload = multer({
  limits: { fileSize: 5000000 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = mime.extension(file.mimetype);
      cb(null, uuidv4() + "." + ext);
    },
  }),
});
