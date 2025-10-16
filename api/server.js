const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./event_db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../A3-workspace/client-app/dist/client-app/browser")));
app.use("/admin", express.static(path.join(__dirname, "../A3-workspace/projects/admin-app/dist/admin-app/browser")));

// --------------------
// 📋 管理员获取所有活动
// --------------------
app.get("/api/admin/events", (req, res) => {
  const query = `
    SELECT e.event_id, e.event_name, e.event_date, e.event_location,
           e.ticket_price, e.goal_amount, e.progress_amount,
           c.category_name, o.org_name
    FROM events e
    JOIN categories c ON e.category_id = c.category_id
    JOIN organisations o ON e.org_id = o.org_id
    ORDER BY e.event_date DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Admin fetch events error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// --------------------
// 📄 获取单个活动（管理员编辑用）
// --------------------
app.get("/api/admin/events/:id", (req, res) => {
  const eventId = req.params.id;

  const query = `
    SELECT e.*, c.category_name, o.org_name
    FROM events e
    JOIN categories c ON e.category_id = c.category_id
    JOIN organisations o ON e.org_id = o.org_id
    WHERE e.event_id = ?;
  `;

  db.query(query, [eventId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Event not found" });

    res.json(results[0]);
  });
});

// --------------------
// 🛠️ 更新活动（管理员）
// --------------------
app.put("/api/admin/events/:id", (req, res) => {
  const eventId = req.params.id;
  const {
    event_name,
    event_date,
    event_location,
    category_id,
    org_id,
    ticket_price,
    goal_amount,
    progress_amount,
    event_description
  } = req.body;

  const query = `
    UPDATE events
    SET event_name=?, event_date=?, event_location=?, category_id=?, org_id=?, ticket_price=?, goal_amount=?, progress_amount=?, event_description=?
    WHERE event_id=?;
  `;

  db.query(
    query,
    [event_name, event_date, event_location, category_id, org_id, ticket_price, goal_amount, progress_amount, event_description, eventId],
    (err) => {
      if (err) {
        console.error("❌ Admin update event error:", err);
        return res.status(500).json({ error: "Failed to update event" });
      }
      res.json({ message: "✅ Event updated successfully!" });
    }
  );
});

// --------------------
// 🗑️ 删除活动（管理员）
// --------------------
app.delete("/api/admin/events/:id", (req, res) => {
  const eventId = req.params.id;

  // 检查是否存在注册记录
  db.query("SELECT COUNT(*) AS count FROM registrations WHERE event_id = ?", [eventId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results[0].count > 0) {
      return res.status(400).json({ error: "Cannot delete event with existing registrations." });
    }

    db.query("DELETE FROM events WHERE event_id = ?", [eventId], (err) => {
      if (err) {
        console.error("❌ Admin delete event error:", err);
        return res.status(500).json({ error: "Failed to delete event" });
      }
      res.json({ message: "✅ Event deleted successfully!" });
    });
  });
});

// --------------------
// 默认主页
// --------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../A3-workspace/client-app/dist/client-app/browser/index.html"));
});

// --------------------
// 启动服务器
// --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
