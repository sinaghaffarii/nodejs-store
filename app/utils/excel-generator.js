const ExcelJS = require("exceljs");
const moment = require("moment-jalaali");

// -------------------------------------------------------------- EXCEL GENERATOR ----------------------------------------------------------

/**
 * @swagger
 *   /download-excel/{month}:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: generate excel for month entrance and exit
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: month
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

router.get("/download-excel/:month", async (req, res) => {
  const { month } = req.params;
  if (!month || isNaN(month) || month < 1 || month > 12) {
    return res
      .status(400)
      .send(
        "Invalid month parameter. Please provide a number between 1 and 12."
      );
  }
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1", {
    properties: { showGridLines: true },
  });
  worksheet.views = [{ rightToLeft: true }];
  worksheet.columns = [
    { header: "روز", key: "day", width: 10 },
    { header: "تاریخ", key: "date", width: 15 },
    { header: "ورود", key: "arrival", width: 10 },
    { header: "خروج", key: "departure", width: 10 },
    { header: "میزان حضور", key: "presence", width: 15 },
    { header: "زمان مجاز", key: "allowedTime", width: 15 },
    { header: "میزان تاخیر", key: "delay", width: 15 },
    { header: "", key: "empty", width: 10 },
  ];
  // تبدیل عدد ماه به تاریخ شمسی
  const startDate = moment()
    .jMonth(month - 1)
    .startOf("jMonth");
  for (let i = 0; i < startDate.daysInMonth(); i++) {
    const currentDate = startDate.clone().add(i, "days");
    const dayOfWeek = currentDate.format("dddd");
    const date = currentDate.format("jYYYY/jMM/jDD");
    worksheet.addRow({
      day: dayOfWeek,
      date: date,
      arrival: "08:00",
      departure: "17:00",
      presence: "9h",
      allowedTime: "8h",
      delay: "1h",
      empty: "",
    });
  }
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + `${months[month]}.xlsx`
  );
  await workbook.xlsx.write(res);
  return res.end();
});
