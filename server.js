const express = require("express");
const bodyParser = require("body-parser");
const speakeasy = require("speakeasy");

const app = express();
const PORT = 3000; // פורט לשימוש מקומי בלבד

// מפתח API סודי (החלף את זה במפתח אמיתי לפרודקשן)
const SECRET_KEY = "123456";

// שימוש ב-body-parser כדי לטפל בבקשות JSON
app.use(bodyParser.json());

// יצירת קוד 2FA
app.post("/api/2fa", (req, res) => {
  const { secret, apiKey } = req.body;

  // בדיקה אם מפתח ה-API נכון
  if (apiKey !== SECRET_KEY) {
    return res.status(403).json({ error: "מפתח API לא חוקי" });
  }

  // יצירת קוד 2FA בעזרת speakeasy
  try {
    const token = speakeasy.totp({
      secret: secret,
      encoding: "base32",
    });

    // שליחת תגובה בפורמט מותאם אישית
    res.status(200).send(`id_list_message=t-הקוד הוא!.d-${token}`);
  } catch (error) {
    res.status(500).json({ error: "שגיאה ביצירת קוד 2FA" });
  }
});

// הפעלת השרת מקומית
app.listen(PORT, () => {
  console.log(`שרת רץ בכתובת http://localhost:${PORT}`);
});
