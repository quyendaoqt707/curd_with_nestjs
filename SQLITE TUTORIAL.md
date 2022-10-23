HD này chỉ cách sử dụng SQLite cho Nodejs

Cài đặt SQLite:
`npm install --save sqlite3`

Tạo file db: (hoặc có chế độ in-mem khá hay)
`touch database.db` (tên.đuôi tuỳ ý)

Kết nối db:
```
let db = new sqlite3.Database('./db/chinook.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});
```