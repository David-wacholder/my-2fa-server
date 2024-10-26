const express = require("express");
const bodyParser = require("body-parser");
const speakeasy = require("speakeasy");

const app = express();
const PORT = 3000; // פורט לשימוש מקומי בלבד


// שימוש ב-body-parser כדי לטפל בבקשות JSON
app.use(bodyParser.json());

// יצירת קוד 2FA
app.post("/api/2fa", (req, res) => {
  const { secret, apiKey } = req.body;

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
