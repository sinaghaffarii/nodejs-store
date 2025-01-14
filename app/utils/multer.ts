import { Request } from "express";
import multer, { FileFilterCallback, StorageEngine } from "multer";
import fs from "fs";
import createHttpError from "http-errors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createRoute(req: Request): string {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDay().toString();
  const directory = path.join(__dirname, "..", "..", "public", "uploads", "blogs", year, month, day);
  req.body.fileUploadPath = path.join("uploads", "blogs", year, month, day);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    if (file?.originalname) {
      const filePath = createRoute(req);
      return cb(null, filePath);
    }
    return cb(new Error("Invalid file"), "");
  },

  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    if (file?.originalname) {
      const ext = path.extname(file.originalname);
      const fileName = String(new Date().getTime() + ext);
      req.body.filename = fileName;
      return cb(null, fileName);
    }
    cb(new Error("Invalid file"), "");
  },
});

function fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
  const ext = path.extname(file.originalname);
  const mimetypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  if (mimetypes.includes(ext)) {
    return cb(null, true);
  }
  return cb(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد."));
}

const maxSize = 3 * 1000 * 1000;
export const uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
});
