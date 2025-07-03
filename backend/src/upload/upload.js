import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/images");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_\.-]/g, "")}`;

    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;