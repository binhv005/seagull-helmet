# SEAGULL HELMETS – Website

Website bán hàng đa trang (React + Vite + React Router), song ngữ Việt / English.

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # xuất bản ra thư mục dist/
```

## Các trang

| Đường dẫn | Trang |
|---|---|
| `/` | Trang chủ |
| `/san-pham` | Danh sách sản phẩm (lọc danh mục, tìm kiếm, sắp xếp) |
| `/san-pham/:id` | Chi tiết sản phẩm (chọn màu qua `?mau=`) |
| `/lookbook` | Lookbook – 4 chiến dịch hình ảnh |
| `/gio-hang` | Giỏ hàng & đặt hàng |
| `/gioi-thieu` | Giới thiệu |
| `/tin-tuc`, `/tin-tuc/:id` | Tin tức & bài viết |
| `/lien-he` | Liên hệ + bản đồ |

## Chỉnh sửa nội dung

- Thông tin cửa hàng: `src/data/store.js`
- Sản phẩm, giá, danh mục: `src/data/products.js` (giá hiện là giá mẫu)
  – mỗi sản phẩm có danh sách `variants` (màu + ảnh)

## Ảnh sản phẩm

Ảnh gốc (PNG 5000px, nền trong suốt) để ở `image/newimg/` – **không** đặt trong `public/`
vì sẽ bị chép nguyên vào bản build. Ảnh dùng trên web là WebP 1000px trong
`public/images/products/<sản-phẩm>/<màu>.webp`, tạo bằng:

```bash
python scripts/process-newimg.py image/newimg .work/proc      # cắt sát, vuông, nén WebP
python scripts/place-newimg.py .work/proc public/images/products  # đặt tên theo sản phẩm/màu
```

Ảnh lifestyle cho slider/Lookbook (`public/images/lifestyle/`) và ảnh phụ kiện được tạo từ
`image/AnhSanPham` (đã cắt bỏ phần chữ tiếng Trung):

```bash
python scripts/prep-lifestyle.py image/AnhSanPham public/images
```

Khi thêm ảnh mới: bổ sung vào bảng `PLAN` trong `scripts/place-newimg.py` (theo đúng thứ tự
tên file) và thêm màu tương ứng vào `src/data/products.js`.
- Bộ sưu tập / Lookbook: `src/data/collections.js`
- Tin tức: `src/data/news.js`
- Link mạng xã hội (Facebook, Zalo, Instagram, TikTok): `src/data/store.js` – link để trống sẽ không hiển thị
- Câu chữ giao diện VI/EN: `src/i18n/translations.js`
- Màu thương hiệu: biến CSS ở đầu `src/index.css`

## Lưu ý trước khi đưa lên mạng

- Form đặt hàng và form liên hệ chưa nối backend – cần kết nối API / Google Form / dịch vụ email.
- Website dùng BrowserRouter: khi deploy cần cấu hình rewrite mọi đường dẫn về `index.html`
  (Netlify: file `_redirects`, Vercel: `vercel.json`).
