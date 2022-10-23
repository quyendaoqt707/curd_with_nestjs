Các bước build CURD endpoint cơ bản:

1. Create module qua cli: `nest g module users`
2. Create controller qua cli: `nest g controller <module_name>`
3. Create services qua cli: `nest g service <module_name>`
4. Viết services, Inject services đó vào trong controller
5. Viết controller với Decorator
5. Viết services : kết nối DB
