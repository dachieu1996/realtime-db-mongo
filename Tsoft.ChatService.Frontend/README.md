# Tài liệu quy ước Core.FE

## **Build và commit code**

- > Trước khi commit code cần chạy lệnh để build code với môi trường product: ng build --prod
- > Mỗi người sẽ có 1 branch riêng để lập trình.
- > Mỗi lần trước khi commit sẽ thực hiện pull code từ branch develope về, tiến hành merge rồi commit code lên branch của mình và branch develop, code build lên môi trường test sẽ từ branch develope

## Quy tắc đặt tên

- Tên Class viết theo kiểu: Pascal Case (ThisWordIsInPascalCase) ví dụ: export class ConfigurationClass
- Tên "export const ..."  viết theo kiểu Camel Case (thisWordIsInCamelCase) ví dụ: export const configurationRouter

## Đặt tên trong file đa ngôn ngữ

- `src\assets\tmp\i18n\vi-VN.json`
- Quy ước chung đặt label cho các chức năng riêng
- Tên module (catalog, product…. )
- Tên chức năng (stock-warehouse, routing)
- Tên thành phần trên màn hình (label, button, grid…)
- Các thành phần phụ nếu có sẽ được thêm vào phía sau (có thể thêm đuôi nếu cần thiết)
Ví dụ: catalog.stock-warehouse.label.add: "Thêm mới", catalog.stock-warehouse.button.delete: "Xóa",
- Tham khảo các tên bắt đầu với **menu** và **app**

## Một số lưu ý chung

- Các control, message, label trên màn hình đều phải sử dụng đa ngôn ngữ
  - Với code html: {{ 'menu.account.logout' | translate }}
  - Với code TS: console.log(this.i18n.fanyi('app.setting.copyinfo'));
  - Tham khảo từ khóa tìm kiếm: setting-drawer.component

- Thư viện tham khảo:
  - <https://ng-alain.com/>
  - <https://ng.ant.design/docs/introduce/en>

- Các api chỉ trả ra dữ liệu cần thiết, hạn chế trả ra dữ liệu thừa - performance kém
  - Table dùng api riêng
  - List của combo box sẽ dùng api riêng

## Cấu trúc thư mục

```javascript
├── _mock                                       # Local Mock Data
├── src
│   ├── app
│   │   ├── core
│   │   │   ├── i18n
│   │   │   ├── net
│   │   │   │   └── default.interceptor.ts      # Default HTTP interceptor
│   │   │   ├── services
│   │   │   │   └── startup.service.ts          # Initialize project configuration
│   │   │   └── core.module.ts                  # Core module file
│   │   ├── layout                              # Layout files
│   │   ├── models                              # Models
│   │   │   ├── catalog-manager                 # Các model liên quan đến quản lý danh mục hệ thống
│   │   │   │   ├── **                          # ...
│   │   │   ├── reader-manager                  # Các model liên quan đến quản lý độc giả
│   │   │   │   ├── **                          # ...
│   │   │   ├── warehouse-management            # Các model liên quan đến quản lý kho
│   │   │   │   ├── **                          # ...
│   │   │   ├── **                              # Business directory
│   │   │   └── index.ts                        # index file
│   │   ├── routes
│   │   │   ├── base-manager                    # Các chức năng liên quan đến chức năng nền, kế thừa
│   │   │   │   ├── Danh mục cơ quan lưu trữ    # ...
│   │   │   │   ├── **                          # ...
│   │   │   ├── catalog-manager                 # Các chức năng liên quan đến quản lý danh mục hệ thống
│   │   │   │   ├── Danh mục loại hình tài liệu # ...
│   │   │   │   ├── Danh mục phông lưu trữ      # ...
│   │   │   │   ├── **                          # ...
│   │   │   ├── reader-manager                  # Các chức năng liên quan đến quản lý độc giả
│   │   │   │   ├── **                          # Bổ sung cụ thể theo nghiệp vụ
│   │   │   ├── warehouse-management            # Các chức năng liên quan đến quản lý kho
│   │   │   │   ├── **                          # Bổ sung cụ thể theo nghiệp vụ
│   │   │   ├── **                              # Business directory
│   │   │   ├── routes.module.ts                # Business routing module
│   │   │   └── routes-routing.module.ts
│   │   ├── services                            # Services
│   │   │   ├── base-manager                    # Các chức năng liên quan đến chức năng nền, kế thừa
│   │   │   │   ├── Danh mục cơ quan lưu trữ    # ...
│   │   │   │   ├── **                          # ...
│   │   │   ├── catalog-manager                 # Các chức năng liên quan đến quản lý danh mục hệ thống
│   │   │   │   ├── Danh mục loại hình tài liệu # ...
│   │   │   │   ├── Danh mục phông lưu trữ      # ...
│   │   │   │   ├── **                          # ...
│   │   │   ├── reader-manager                  # Các chức năng liên quan đến quản lý độc giả
│   │   │   │   ├── **                          # Bổ sung cụ thể theo nghiệp vụ
│   │   │   ├── warehouse-management            # Các chức năng liên quan đến quản lý kho
│   │   │   │   ├── **                          # Bổ sung cụ thể theo nghiệp vụ
│   │   │   ├── passport                        # Các api liên quan đến đăng nhập, đăng ký
│   │   │   │   ├── login                       # ...
│   │   │   │   ├── **                          # ...
│   │   │   ├── **                              # Business directory
│   │   │   └── index.ts                        # index file
│   │   ├── shared                              # Shared module
│   │   │   └── shared.module.ts
│   │   ├── app.component.ts                    # Root component
│   │   └── app.module.ts                       # Root module
│   │   └── delon.module.ts                     # @delon modules import
│   ├── assets                                  # Local static files
│   ├── environments                            # Environment configuration
│   ├── styles                                  # Project styles
└── └── style.less                              # Style entry
```
