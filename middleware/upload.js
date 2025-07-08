// middleware/upload.js
import multer from "multer";

// memory storage → buffer in req.file.buffer
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("File must be an image"));
    } else cb(null, true);
  },
});
