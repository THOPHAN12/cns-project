# CNS Ecommerce Website

## Description
The project is sponsored by Phuong Mai of University of Economics Ho Chi Minh City (UEH). Developed by Mr. Toan Nguyen of Ho Chi Minh University of Technology (HCMUT)

## How to run this project
### Prerequisite
Here are the framework you need to install before running this project locally:
- Git: install git [here](https://git-scm.com/install/). Choose the operating system you are using, then download the installer
- Nodejs: install Nodejs [here](https://nodejs.org/en/download/current). Choose the operating system you are using, then download the installer

Feel free to ask Mr. Toan if you have any problem during installing (Zalo: 0764161116)

### Setup environment
1. Clone this project to your repo

**Windows 11 systems:**
- Create a new folder anywhere in file explorer:
- Open this folder, right-click at the space in this explorer, then choose "Run as terminal"
- Copy this command to the terminal just opened:
```
git clone https://github.com/minhtoan-nmt/cns-project.git
```

**Other systems:**
- Create a new folder anywhere in your computer
- Use your terminal and access that folder.

``` 
cd <your-directory>
```
For example, if your newly created folder's address is `D:\cns\project_src`, then paste the following one by one:
```
D:
cd D:\cns\project_src
```
- Copy this command to the terminal just opened:
```
git clone https://github.com/minhtoan-nmt/cns-project.git
```

You will see the files there. **Please keep the terminal open for the next steps**

2. Install the dependency
- Paste the following to the terminal to access the /frontend folder.
```
cd .\cns-project\frontend\
```
(You can type `cd fr` then press Tab for auto-completion.
- Paste the following to install dependency **(IMPORTANT)**
```
npm i
```
3. Run the frontend project
- Run this command on your terminal.
```
npm run dev
```
Then Ctrl+Click on the link _localhost:<port>_ appear on the terminal.
From now on, whenever you want to run the project, just access to frontend, open the terminal and run `npm run dev`

------------

# Phiên bản tiếng Việt:
# Website Thương mại điện tử CNS

## Mô tả
Dự án được tài trợ bởi Phương Mai thuộc Đại học Kinh tế TP.HCM (UEH). Được phát triển bởi Mr. Toàn Nguyễn thuộc Đại học Bách Khoa TP.HCM (HCMUT).

## Hướng dẫn chạy dự án

### Yêu cầu cài đặt (Prerequisite)
Dưới đây là các công cụ bạn cần cài đặt trước khi chạy dự án này trên máy cá nhân:
- **Git:** Cài đặt git [tại đây](https://git-scm.com/install/). Chọn hệ điều hành bạn đang sử dụng, sau đó tải xuống trình cài đặt.
- **Nodejs:** Cài đặt Nodejs [tại đây](https://nodejs.org/en/download/current). Chọn hệ điều hành bạn đang sử dụng, sau đó tải xuống trình cài đặt.

Đừng ngần ngại liên hệ Mr. Toàn nếu bạn gặp bất kỳ vấn đề nào trong quá trình cài đặt (Zalo: 0764161116).

### Thiết lập môi trường

1. **Clone dự án về máy**

**Đối với Windows 11:**
- Tạo một thư mục mới ở bất kỳ đâu trong File Explorer.
- Mở thư mục này, nhấp chuột phải vào khoảng trống, sau đó chọn "Open in Terminal" (hoặc "Run as terminal").
- Sao chép lệnh sau vào terminal vừa mở:
```
git clone [https://github.com/minhtoan-nmt/cns-project.git](https://github.com/minhtoan-nmt/cns-project.git)
```
**Đối với các hệ điều hành khác:**

- Tạo một thư mục mới ở bất kỳ đâu trên máy tính của bạn.
- Sử dụng terminal và truy cập vào thư mục đó.

```Bash
cd <đường-dẫn-thư-mục-của-bạn>
```
Ví dụ: nếu địa chỉ thư mục mới tạo của bạn là D:\cns\project_src, hãy dán lần lượt các lệnh sau:

```Bash
D:
cd D:\cns\project_src
```
- Sao chép lệnh sau vào terminal vừa mở:

```Bash
git clone [https://github.com/minhtoan-nmt/cns-project.git](https://github.com/minhtoan-nmt/cns-project.git)
```
Bạn sẽ thấy các tập tin xuất hiện. Vui lòng giữ cửa sổ terminal mở cho các bước tiếp theo.

**2. Cài đặt thư viện (Dependency)**

- Dán lệnh sau vào terminal để truy cập vào thư mục /frontend.

```Bash
cd .\cns-project\frontend\
```
(Bạn có thể gõ cd fr sau đó nhấn phím Tab để tự động hoàn thành).

- Dán lệnh sau để cài đặt các thư viện cần thiết (QUAN TRỌNG):

```Bash
npm i
```
**3. Chạy dự án Frontend**

Chạy lệnh này trên terminal của bạn:

```Bash
npm run dev
```
Sau đó giữ phím Ctrl + Nhấp chuột trái vào liên kết localhost:<port> xuất hiện trên terminal.

Từ giờ trở đi, bất cứ khi nào bạn muốn chạy dự án, chỉ cần truy cập vào thư mục frontend, mở terminal và chạy lệnh `npm run dev`.
