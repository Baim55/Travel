import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateBookingPdf = (booking, user, tour) => {
  const doc = new PDFDocument({ margin: 50 });
  const folderPath = "pdfs";
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

  const filePath = path.join(folderPath, `booking_${booking._id}.pdf`);
  doc.pipe(fs.createWriteStream(filePath));

  // Font qeydiyyatı
  doc.registerFont("OpenSans", path.join("fonts", "OpenSans-Regular.ttf"));
  doc.font("OpenSans");

  // Yuxarı sağ tarix
  const currentDate = new Date().toLocaleDateString("az-AZ");
  doc.fontSize(10).fillColor("#888").text(currentDate, { align: "right" });

  // Başlıq
  doc
    .moveDown(1)
    .fontSize(24)
    .fillColor("#2E8B57")
    .text("Rezervasiya Təsdiqi", { align: "center" });

  doc.moveDown(1.5);

  // Separator xətti
  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .strokeColor("#cccccc")
    .lineWidth(1)
    .stroke();

  doc.moveDown(1.2);

  // İstifadəçi məlumatları
  doc
    .fontSize(16)
    .fillColor("#444")
    .text("👤 İstifadəçi Məlumatları", { underline: false, bold: true });
  doc.moveDown(0.4);
  doc.fontSize(13).fillColor("#000");
  doc.text(`• Ad: ${user.username}`);
  doc.text(`• Email: ${user.email}`);

  doc.moveDown(1);

  // Tur məlumatları
  doc
    .fontSize(16)
    .fillColor("#444")
    .text("🌍 Tur Məlumatları", { underline: false });
  doc.moveDown(0.4);
  doc.fontSize(13).fillColor("#000");
  doc.text(`• Tur adı: ${tour.name}`);
  doc.text(`• Tarix: ${new Date(booking.date).toLocaleDateString("az-AZ")}`);
  doc.text(`• Vaxt: ${booking.time}`);
  doc.text(`• Qonaq sayı: ${booking.guestCount}`);
  doc
    .fillColor("#000")
    .text(`• Ümumi məbləğ: `, { continued: true })
    .fillColor("#2E8B57")
    .text(`${tour.price * booking.guestCount} AZN`, { bold: true });

  doc.moveDown(1.5);

  // İkinci separator
  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .strokeColor("#cccccc")
    .lineWidth(1)
    .stroke();

  doc.moveDown(1);

  // Alt açıqlama
  doc
    .fontSize(12)
    .fillColor("#666")
    .text(
      "Rezervasiyanız uğurla qeydə alındı. Əlavə sualınız olarsa, bizimlə əlaqə saxlamaqdan çəkinməyin.",
      { align: "center", lineGap: 4 }
    );

  doc.moveDown(2);
  doc
    .fontSize(10)
    .fillColor("#aaa")
    .text("NeoTravel | © 2025", { align: "center" });

  doc.end();
  return filePath;
};
