// dao.js
import { Database } from 'sqlite3';
class AppDAO {
  db: Database;
  constructor(dbFilePath) {
    this.db = new Database(dbFilePath, (err) => {
      //cần truyền vào một đường dẫn đến file csdl sqlite để khởi tạo một kết nối đến file để bắt đầu đọc ghi
      if (err) {
        console.log('Could not connect to database', err); //Kết nối chưa thành công, có lỗi
      } else {
        console.log('Connected to database'); //Đã kết nối thành công và sẵn sàng để đọc ghi DB
      }
    });
  }
}

export default AppDAO; //Cần phải exports (mở) cái class  này để một class bất kỳ có thể khởi tạo AppDAO và bắt đầu dùng kết nối đã được mở bên trên (biến this.db)
