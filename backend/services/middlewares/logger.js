import { promises as fsPromises } from "fs";
import path from "path";

// function to get a writable date format
function getDate() {
    const date = new Date();
    return date.toISOString();
}

export const logger = async (req, res, next) => {
    const log = `${getDate()} - ${req.method} - ${req.originalUrl}\n`;
    const logFilePath = path.join(process.cwd(), `db_operations.log`);

    try {
        await fsPromises.appendFile(logFilePath, log);
    } catch (err) {
        console.error(`There was an error during the log registration:`, err);
    }
    next();
}