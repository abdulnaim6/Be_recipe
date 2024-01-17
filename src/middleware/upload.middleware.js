import multer from "multer";
import path from "path";

const Multerupload = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "tmp");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedExtensions = [".png", ".jpg", ".jpeg"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("File must be .png, .jpg, or .jpeg"), false);
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 4 * 1024 * 1024,
    },
  }).single("picture");

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log("Multer error:", err.message);
      res.status(400).json({ message: "File upload error" });
    } else if (err) {
      console.log("Unknown error:", err.message);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      next();
    }
  });
};

export default Multerupload;
