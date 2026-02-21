import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9000;

// Test database SQL connection
async function testDBConnection() {
  try {
    await db.query("SELECT 1");
    console.log("✅ Database SQL connected successfully!");
    return true;
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
    return false;
  }
}

testDBConnection();
//

app.get("/", (req, res) => {
  res.send("Welcome to the bookshelf API");
});

// app.use(authRoute);
// app.use(sectionRoute);
// app.use(berandaRoute);
// app.use(demografiRoute);
// app.use(petaWilayahRoute);
// app.use(visiMisiRoute);
// app.use(batasWilayahRoute);
// app.use(pemerintahanRoute);
// app.use(potensiRoute);
// app.use(sejarahRoute);
// app.use(wisataRoute);
// app.use(saranaPrasaranaRoute);
// app.use(galeriRoute);
// app.use(roleRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
