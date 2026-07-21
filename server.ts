import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Initialize Gemini Client server-side
const apiKey = process.env.GEMINI_API_KEY || "";
let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.error("Gemini AI Client init error:", err);
  }
}

// Memory Database State
let dbUsers = [
  { id: "u1", fullName: "سليمان بن عبد الله القحطاني", email: "admin@aayan.sa", phone: "+966501112222", role: "super_admin", branchName: "فرع الرياض الرئيسي", status: "active" },
  { id: "u2", fullName: "أحمد بن سلمان المنصور", email: "ahmed.m@aayan.sa", phone: "+966502223333", role: "office_manager", branchName: "فرع الرياض الرئيسي", status: "active" },
  { id: "u3", fullName: "محمد بن علي الشهري", email: "mohammed.s@aayan.sa", phone: "+966503334444", role: "agent", branchName: "فرع الرياض الرئيسي", status: "active" },
  { id: "u4", fullName: "فيصل السبيعي", email: "faisal.acc@aayan.sa", phone: "+966504445555", role: "accountant", branchName: "فرع الرياض الرئيسي", status: "active" },
  { id: "u5", fullName: "مهندس طارق الزهراني", email: "tariq.maint@aayan.sa", phone: "+966505556666", role: "maintenance", branchName: "فرع الرياض الرئيسي", status: "active" },
  { id: "u6", fullName: "عبد العزيز بن إبراهيم الراجحي", email: "abdulaziz.customer@gmail.com", phone: "+966506667777", role: "customer", branchName: "فرع الرياض الرئيسي", status: "active" }
];

let dbProperties = [
  { id: "p1", referenceNumber: "PROP-2026-001", title: "فيلا مودرن فاخرة مع مسبح خاص وحديقة", type: "فيلا", purpose: "للبيع", price: 4850000, city: "الرياض", status: "متاح", area: 550, rooms: 6 },
  { id: "p2", referenceNumber: "PROP-2026-002", title: "شقة فاخرة مطلة على البحر بالكامل", type: "شقة", purpose: "للإيجار", price: 120000, city: "جدة", status: "متاح", area: 210, rooms: 3 },
  { id: "p3", referenceNumber: "PROP-2026-003", title: "مجمع تجاري ومكاتب إدارية في حي العليا", type: "محل تجاري", purpose: "للاستثمار", price: 18500000, city: "الرياض", status: "متاح", area: 1200, rooms: 12 },
  { id: "p4", referenceNumber: "PROP-2026-004", title: "أرض تجارية سكنية برأس زاوية في الخبر", type: "أرض", purpose: "للبيع", price: 6200000, city: "الخبر", status: "متاح", area: 950, rooms: 0 }
];

// --- HEALTH & METADATA API ---
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "نظام أعيان العقاري المؤسسي | Aayan Real Estate Enterprise",
    modulesCount: 20,
    timestamp: new Date().toISOString(),
  });
});

// --- MODULE 1: AUTH & USERS API ---
app.post("/api/auth/login", (req, res) => {
  const { emailOrPhone } = req.body;
  const user = dbUsers.find(u => u.email === emailOrPhone || u.phone === emailOrPhone) || dbUsers[0];
  res.json({
    token: `fake_jwt_${user.id}_${Date.now()}`,
    user,
  });
});

app.get("/api/users", (req, res) => {
  res.json(dbUsers);
});

app.post("/api/users", (req, res) => {
  const newUser = {
    id: `u_${Date.now()}`,
    fullName: req.body.fullName || "مستخدم جديد",
    email: req.body.email || "user@aayan.sa",
    phone: req.body.phone || "+966500000000",
    role: req.body.role || "agent",
    branchName: "فرع الرياض الرئيسي",
    status: "active"
  };
  dbUsers.unshift(newUser);
  res.status(201).json(newUser);
});

// --- MODULE 2 & 15: PROPERTIES API ---
app.get("/api/properties", (req, res) => {
  res.json(dbProperties);
});

app.post("/api/properties", (req, res) => {
  const newProp = {
    id: `p_${Date.now()}`,
    referenceNumber: `PROP-2026-${Math.floor(100 + Math.random() * 900)}`,
    title: req.body.title || "عقار جديد",
    type: req.body.type || "فيلا",
    purpose: req.body.purpose || "للبيع",
    price: req.body.price || 2000000,
    city: req.body.city || "الرياض",
    status: "متاح",
    area: req.body.area || 300,
    rooms: req.body.rooms || 4
  };
  dbProperties.unshift(newProp);
  res.status(201).json(newProp);
});

// --- MODULE 11: GEMINI AI API ENDPOINTS ---
app.post("/api/ai/property-description", async (req, res) => {
  const { type, city, area, price, features } = req.body;
  const prompt = `أنت خبير تسويق عقاري كاتب محترف. أنشئ عنواناً جذاباً ووصفاً تسويقياً شاملاً باللغة العربية لعقار بالمواصفات التالية:
النوع: ${type || "فيلا"}
المدينة: ${city || "الرياض"}
المساحة: ${area || 400} متر مربع
السعر: ${price || 2500000} ريال سعودي
المميزات: ${(features || []).join("، ")}

أرجع الإجابة بصيغة JSON بالتنسيق التالي فقط:
{
  "title": "عنوان تسويقي مبهر",
  "description": "وصف تسويقي دقيق ومقنع للعقار",
  "highlights": ["نقطة قوة 1", "نقطة قوة 2", "نقطة قوة 3"]
}`;

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      const text = response.text || "";
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch (err) {
      console.warn("Gemini AI API call failed, falling back to rule engine:", err);
    }
  }

  // Fallback
  return res.json({
    title: `${type} عصرية فاخرة للبيع في موقع حيوي بـ ${city}`,
    description: `فرصة استثمارية وسكنية استثنائية لامتلاك ${type} بمساحة ${area} م² في أرقى أحياء ${city}. تم تصميمه بعناية فائقة ليوفر أعلى مستويات الرفاهية والراحة لجميع أفراد العائلة.`,
    highlights: [
      `موقع استراتيجي ومميز في ${city}`,
      `مساحة واسعة تبلغ ${area} م²`,
      `سعر تنافسي بـ ${Number(price).toLocaleString("ar-SA")} ريال`
    ]
  });
});

app.post("/api/ai/chat", async (req, res) => {
  const { prompt } = req.body;
  const systemInstruction = `أنت المساعد الذكي لنظام "أعيان العقاري المؤسسي". أجب بأسلوب مهني وواضح باللغة العربية، وساعد المستخدمين في التحليلات العقارية والتسعير وإدارة العملاء.`;

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction
        }
      });
      return res.json({ reply: response.text });
    } catch (err) {
      console.warn("Gemini Chat API fallback:", err);
    }
  }

  return res.json({
    reply: `مرحباً بك! بصفتي المساعد الذكي لمؤسسة أعيان العقارية، يسعدني إجابتك حول "${prompt}". تشهد الأسواق العقارية في السعودية والإمارات طلباً متزايداً على الوحدات الفاخرة والمجمعات التجارية. يمكنك استخدام أدوات التحليل الذكية في النظام لمعاينة متوسط الأسعار ونسب الإغلاق.`
  });
});

// --- MODULE 19: EXPORT ENDPOINTS ---
app.post("/api/export/csv", (req, res) => {
  const { title, data } = req.body;
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(title || "report")}.csv"`);
  
  let csv = "\uFEFF"; // UTF-8 BOM
  if (Array.isArray(data) && data.length > 0) {
    const headers = Object.keys(data[0]);
    csv += headers.join(",") + "\n";
    data.forEach((row: Record<string, any>) => {
      csv += headers.map(h => `"${String(row[h] || "").replace(/"/g, '""')}"`).join(",") + "\n";
    });
  } else {
    csv += "تقرير,تاريخ,الحالة\nأعيان العقارية,2026-07-21,مكتمل\n";
  }
  res.send(csv);
});

// VITE MIDDLEWARE SETUP FOR DEV / STATIC SERVING FOR PROD
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`====================================================`);
    console.log(`🚀 Aayan Real Estate Enterprise System Running on http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
}

startServer();
