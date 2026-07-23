import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateOrderInvoice = (order, outputPath) => {

    return new Promise((resolve, reject) => {

        try {

            if (!order) {
                return reject(new Error("Order is required."));
            }

            const directory = path.dirname(outputPath);

            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }

            const doc = new PDFDocument({
                margin: 50,
                size: "A4",
            });

            const stream = fs.createWriteStream(outputPath);

            doc.pipe(stream);

            doc
                .fontSize(22)
                .text("ORDER INVOICE", {
                    align: "center",
                });

            doc.moveDown();

            doc
                .fontSize(12)
                .text(`Invoice Date: ${new Date().toLocaleString()}`)
                .text(`Order ID: ${order._id}`)
                .text(`Customer: ${order.user?.name || "N/A"}`)
                .text(`Email: ${order.user?.email || "N/A"}`)
                .text(`Payment Status: ${order.paymentStatus || "Pending"}`);

            doc.moveDown();

            doc
                .fontSize(14)
                .text("Shipping Address");

            doc
                .fontSize(12)
                .text(order.shippingAddress?.address || "")
                .text(order.shippingAddress?.city || "")
                .text(order.shippingAddress?.country || "");

            doc.moveDown();

            const tableTop = doc.y + 20;

            doc
                .fontSize(13)
                .text("Product", 50, tableTop)
                .text("Price", 280, tableTop)
                .text("Qty", 370, tableTop)
                .text("Total", 460, tableTop);

            doc.moveTo(50, tableTop + 18)
                .lineTo(550, tableTop + 18)
                .stroke();

            let y = tableTop + 35;

            order.items.forEach((item) => {

                doc
                    .fontSize(12)
                    .text(item.name, 50, y)
                    .text(`$${item.price}`, 280, y)
                    .text(item.quantity.toString(), 370, y)
                    .text(`$${item.price * item.quantity}`, 460, y);

                y += 25;

            });

            doc.moveTo(50, y)
                .lineTo(550, y)
                .stroke();

            y += 20;

            doc
                .fontSize(16)
                .text(
                    `Grand Total: $${order.totalPrice}`,
                    50,
                    y
                );

            doc.end();

            stream.on("finish", () => {

                resolve(outputPath);

            });

            stream.on("error", reject);

        } catch (error) {

            reject(error);

        }

    });

};

export default generateOrderInvoice;