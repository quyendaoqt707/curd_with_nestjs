## Run project:
>npm run start

## Run project với watch mode:
>npm run start:dev

## Cấu trúc project:
* app.controller.ts: Chứa các router để xử lý các request và trả về response cho client.
* app.controller.spec.ts: Có nhiệm vụ viết unit-test cho các controller.
* app.module.ts: Root module của ứng dụng.
app.service.ts: Service chứa các logic mà controller sẽ dùng đến.
main.ts: Entry point: Sử dụng NestFactory để khởi tạo ứng dụng.

## Module trong NestJS (https://docs.nestjs.com/modules)
* Một module trong Nest là 1 đóng gói của các logic liên quan đến một chức năng cụ thể. Nếu trong CURD thì nó là các tập hợp các thao tác trên một table được gom nhóm lại. VD: CURD trên table 'users' thì sẽ là module *user* 
* 1 Module trong nest một Class được Nest định nghĩa sẵn và ta phải tạo ra nó bằng cách sử dụng decorator: @Module() (Decorator: chỉ là việc modify một class/function bằng cách pass vào class/function những data nhất định để tạo ra các class/funtion mới theo 1 kiến trúc có sẵn --> Gọi là Decorator Pattern (Nest sử dụng Parttern này))
* 1 User define module sẽ là 1 thư mục trong thư mục gốc `src`. VD module `user` thì sẽ có 1 thư mục `user` nằm bên trong `src`. Thư mục này sẽ chưa toàn bộ source code dùng để định nghĩa ra module này.
* Ta có thể tạo nhanh 1 module bằng câu lệnh: `nest g module users` --> Tạo module tên là `users`
* Cấu trúc thư mục 1 module như sau: 
	- File

https://docs.nestjs.com/controllers
Controller:
