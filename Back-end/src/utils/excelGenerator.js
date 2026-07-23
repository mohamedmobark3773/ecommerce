import ExcelJS from "exceljs";

export const excelGenerator = async (
    data = [],
    sheetName = "Data"
) => {

    try {

        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet(sheetName);

        if (!Array.isArray(data) || data.length === 0) {

            return await workbook.xlsx.writeBuffer();

        }

        worksheet.columns = Object.keys(data[0]).map((key) => ({

            header: key,
            key,
            width: 25,

        }));

        data.forEach((row) => {

            worksheet.addRow(row);

        });

        worksheet.getRow(1).font = {
            bold: true
        };

        return await workbook.xlsx.writeBuffer();

    } catch (error) {

        console.error("Excel Generator Error:", error);

        throw error;

    }

};


export default excelGenerator;