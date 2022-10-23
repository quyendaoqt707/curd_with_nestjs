import AppDAO from './db';
class UserRepository {
  dao: any;
  constructor(dao) {
    //Để khởi tạo một đối tượng từ class ProjectRepository chúng ta cần truyền một đối tượng AppDAO cho nó
    this.dao = dao;
  }

  createTable() {
    //Hàm tạo bảng này sẽ dùng để tạo ra cấu trúc bảng projects nếu trong file csdl sqlite3 chưa có bảng này.
    const sql = `
	  CREATE TABLE IF NOT EXISTS projects (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT)`;
    return this.dao.runquery(sql);
  }
  create(name) {
    return this.dao.runquery('INSERT INTO projects (name) VALUES (?)', [name]);
  }

  getAll() {
    return this.dao.all(`SELECT * FROM projects`);
  }
}

export default UserRepository;
