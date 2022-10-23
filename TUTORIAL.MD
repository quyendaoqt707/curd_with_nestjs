## Run project:
>npm run start

## Run project với watch mode:
>npm run start:dev

## Cấu trúc project:
* app.controller.ts: Chứa `root router` để xử lý các request và trả về response cho client.
* app.controller.spec.ts: Có nhiệm vụ viết unit-test cho các controller.
* app.module.ts: Root module của ứng dụng: Đây là nơi định nghĩa ra các module của `App`(root endpoint) và import các module phụ vào (VD: `users`, `posts`). Nếu ta tạo module mới bằng CLI thì nó sẽ tự import module mới đó vào đây, còn ko ta phải thêm thủ công.
app.service.ts: Service chứa các logic mà controller sẽ dùng đến.
main.ts: Entry point: Sử dụng NestFactory để khởi tạo ứng dụng.


## Big picture (Logic tổng quan)
1. Endpoint main.ts create 1 NestJS app: Creator này nhận 1 root module tên là `AppModule` (trong file `app.module.ts` do Nest cấp sẵn khi init project)
2. AppModule là root module (module trước nhất cần phải có). Nó import và sử dụng lại all các Module nhỏ khác (user-defined module)
3. Các user-define module là các thư mục cụ thể nằm trong thư mục `src`. Trong này chứa all toàn bộ mã liên quan đến module đó: module define, controller, services. giúp module đó hoạt động.
4. Root module sẽ phân chia các request về cho các module nhỏ hơn và controller trong mỗi module nhỏ đó sẽ gọi các services tương ứng để xử lý request

## Module trong NestJS (https://docs.nestjs.com/modules)
* Một module trong Nest là 1 đóng gói của các logic liên quan đến một chức năng cụ thể. Nếu trong CURD thì nó là các tập hợp các thao tác trên một table được gom nhóm lại. VD: CURD trên table 'users' thì sẽ là module *user* 
* 1 Module trong nest một Class được Nest định nghĩa sẵn và ta phải tạo ra nó bằng cách sử dụng decorator: @Module() (Decorator: chỉ là việc modify một class/function bằng cách pass vào class/function những data nhất định để tạo ra các class/funtion mới theo 1 kiến trúc có sẵn --> Gọi là Decorator Pattern (Nest sử dụng Parttern này))
* 1 User define module sẽ là 1 thư mục trong thư mục gốc `src`. VD module `user` thì sẽ có 1 thư mục `user` nằm bên trong `src`. Thư mục này sẽ chưa toàn bộ source code dùng để định nghĩa ra module này.
* Ta có thể tạo nhanh 1 module bằng câu lệnh: `nest g module users` --> Tạo module tên là `users` với 1 file duy nhất là `users.module.ts` và **import nó vào app.module.ts** 
* Các thành phần trong module (xem file `module_name.module.ts`) **Mỗi thành phần là 1 array**
	- providers: khai báo Các repository, helper,... và quan trọng nhất là services (bản chất là Request Handler function) thực sự (tầng thấp nhất) sẽ sử dụng request
	- controllers: Controller interface cho module này
	- imports: Import các module khác vào sử dụng trong module này
	- exports: Export một services trong module ra cho các module khác sử dụng (nếu nó import vào)

* Các dạng module mà Nest hỗ trợ:
	- Share module: chia sẻ service (như một hàm dịch vụ) giữa các moudle với nhau (tức là ko chỉ riêng với root module: App). Services nào muốn đượcc chia sẻ sẽ được thêm vào mảng Exports trong `users.module.ts`. Sau khi export thì các module khác có thể import nó vào để sử dụng (Import thông qua mảng Import trong `module.ts`) 
	- Dynamic module: 
	- Global module: Sử dụng decorator `@Global` vào trong file `users.module.ts`. Khi đó ko cần phải import global module vào các module khác nữa.(https://viblo.asia/p/tim-hieu-ve-nestjs-phan-1-3P0lP0ymlox )

* Cấu trúc thư mục 1 module như sau: 
	- File định nghĩa/khai báo module: `users.module.ts` (do CLI tạo ra nếu dùng CLI)
	- 

## Controller (https://docs.nestjs.com/controllers):
* Controller là chính là thành phần lõi trong 1 module để định nghĩa ra các `route` xử lý các request và response cho client nhờ sự làm việc của các `service`
* Tạo 1 controller nhanh bằng CLI: `nest g controller <module_name>` --> 2 file mới sẽ được tạo vào trong thư mục `module_name` là: `src/<module_name>/<module_name>.controller.spec.ts` và  `src/<module_name>/<module_name>.controller.ts`. Đồng thời sẽ import controller mới tạo này vào trong file khai báo module: `<module_name>.module.ts` (tức vào mảng: `controllers`)
* File `src/<module_name>/<module_name>.controller.spec.ts` phục vụ cho unit test. 
* File `src/<module_name>/<module_name>.controller.ts` phục vụ định nghĩa tập hợp các endpoint mà controller này sẽ hỗ trợ thông qua các decorator, đồng thời cũng là nơi parse các param/body trước khi pass nó vào services (*Tức là controller này sẽ khai báo hỗ trợ method nào: POST/GET..)

## Services
* Bản chất là các Request Handler function như trong các framework khác. Cung cấp 1 services cụ thể (ko bao gồm endpoint(path và method)). Controller sử dụng services này để trả về dữ liệu cho 1 endpoint cụ thể
* Tạo services bằng CLI: `nest generate service <module_name>` -> Tạo ra 2 file .services.ts và spec.ts dùng cho unitest. Đồng thời update services mới vào mảng `providers` trong `module_name.module.ts`
* Ta sẽ viết các handler function thực sự trong file `<module_name>.service.ts`  -> gọi là xử lý logic

## Provider
* Provider là nơi cung cấp các serivce, repositories, factories, helpers,... cho controller trong một module sử dụng. 
Đây cũng là nơi sẽ chứa những logic xử lý đã được tách biệt với controller. 
* Để tạo ra một provider chúng ta chỉ cần khai báo `@Injectable ()` trước một class đã định nghĩa. Việc sử dụng `@Injectable()` sẽ cho Nest biết đây là một class thuộc provider.  
* VD tạo một service với Decorator Injectable: https://viblo.asia/p/tim-hieu-ve-nestjs-phan-1-3P0lP0ymlox 
## Decorator
* NestJS hỗ trợ mạnh các Decorator để giảm thiểu nhiều việc sử lý lặp lại như: 
	- @Controller('prefix_route'): Tạo ra endpoint /prefix_route
	- @Post('sub_route'):  Tạo ra endpoint: POST /prefix_route/sub_route
	- @HttpCode(INT): config status code cho response
	- @Header('Cache-Control', 'none'): Add header cho response
	- ... Xem đầy đủ tại: https://docs.nestjs.com/controllers 

VD: @Param('postId') postId  => extract property tên là 'postId' ở trong field params trong req object sau đó gán cho postId

## Data Transfer Object (DTO)
* NestJS hỗ trợ kiểm tra ràng buộc dữ liệu để ngăn chặn những dữ liệu ko hợp lệ post lên server trước khi xử lý ở services thông qua DTO (Data Transfer Object):
* Tạo một DTO: trong thư mục module cần tạo DTO, tạo ra thư mục `dto` và trong đó tạo file `create-user.dto.ts`
* Trong file trên export 1 class chứa các field và kiểu dữ liệu ràng buộc cho các field đó. Trong controller `users` sẽ import nó vào và sử dụng với decorator @Body để parse body trước khi pass nó vào cho services.
Xem ví dụ ở: https://viblo.asia/p/tim-hieu-ve-nestjs-phan-1-3P0lP0ymlox 

## Interface 
* Là 1 kiểu dữ liệu để dùng chung ở nhiều module khác nhau (1 dạng template)
* Địnhg nghĩa trong file `user.interface.ts`

## DOCS:
* Build một CURD endpoint đơn giản: https://viblo.asia/p/tim-hieu-nestjs-framework-crud-RnB5pOYJlPG 
* Giải thích kiến trúc (HAY): https://viblo.asia/p/tim-hieu-ve-nestjs-phan-1-3P0lP0ymlox  
* https://docs.nestjs.com/ 

# ADVANCE:
**Request Object** 
* object này trong nest tên là `req`
* Tương tự Context trong fiber. Request object trong NEst chứa all các thông tin về request. và được Nest cấp tự động khi có request vào các Controller
* Các field ta hay sử dụng như: `body`, `params`,...
* https://docs.nestjs.com/controllers#request-object 

**Cấu trúc một Controller**
- Bản chất là 1 class được export với nhiều async method. Các method này chính là các Handler function. Trong thân các method này sẽ call 1 services và phân giải nó (vì services trả về Promise) thông qua await để lấy được body response. Body response có thể là JSON/String...
- Mỗi async method trong này đều sử dụng các Decorator để định nghĩa: METHOD, HEADER, HTTP_STATUS,... 
- Method cx sử dụng DTO để lọc dữ liệu và parse dữ liệu đầu vào. 


VD về một 
