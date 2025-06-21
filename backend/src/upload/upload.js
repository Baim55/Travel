import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/images");
  },
  filename: (req, file, cb) => {
    // Burada fayl adını standartlaşdırırıq:
    const filename = `${Date.now()}-${file.originalname
      .replace(/\s+/g, "_") // boşluqları alt xətt ilə əvəz et
      .replace(/[^a-zA-Z0-9_\.-]/g, "")}`; // xüsusi simvolları sil

    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
