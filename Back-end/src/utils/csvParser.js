import { parse } from "csv-parse";
import fs from "fs";




export const csvParser = async (filePath) => {
    try {
        const fileContent = fs.readFileSync(filePath);
        const records = await parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
        });
        return records;
    } catch (error) {
        console.error("Error parsing CSV:", error);
        throw error;
    }
};  

export const csvParserAsync = async (filePath) => {
    try {
        const fileContent = await fs.promises.readFile(filePath);
        const records = await parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
        });
        return records;
    } catch (error) {
        console.error("Error parsing CSV:", error);
        throw error;
    }
};

export default csvParser;
