const express = require('express');
const adminRouter = require("./routes/admin.js");
const userRouter = require("./routes/users.js");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(adminRouter);
app.use(userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
