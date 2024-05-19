# 🏫Kaleidoscope

Kaleidoscope là một dự án ứng dụng học tiếng nước ngoài không chỉ là một công cụ, mà là một trải nghiệm đa chiều, như một kính vạn hoa, mở ra những góc nhìn mới, phong phú và đa dạng trong việc khám phá và tiếp cận văn hóa và ngôn ngữ của thế giới. Thể hiện tính đa dạng, sáng tạo và thú vị trong việc học ngoại ngữ, giúp người dùng thấy rằng mỗi lần học là một trải nghiệm khác biệt, đầy màu sắc, giống như cách các mảnh ghép của kaleidoscope tạo ra những hình ảnh mới mẻ và phong phú.

## Table of Contents

- [Description](#description)
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

🚀Kaleidoscope là một ứng dụng học ngôn ngữ mang tính cách mạng được thiết kế để biến trải nghiệm của bạn từ những bài tập đơn điệu thành một hành trình khám phá sôi động. Không giống như các phương pháp truyền thống, Kaleidoscope áp dụng cách tiếp cận nhiều mặt, đáp ứng nhiều phong cách học tập khác nhau và giúp bạn luôn hứng thú với từng bước học tập.

**Đắm chìm trong thế giới ngôn ngữ:**

- **Sự đa dạng đáng kinh ngạc:** Nắm vững các khái niệm từ vựng và ngữ pháp mới thông qua các hoạt động dưới kính vạn hoa – từ các câu đố tương tác đến các bài học hấp dẫn theo chủ đề.
- **Kết nối và cộng tác:** Phá bỏ rào cản ngôn ngữ và xây dựng sự tự tin bằng cách tương tác với những người cùng học từ khắp nơi trên thế giới. Chia sẻ kinh nghiệm của bạn, đặt câu hỏi và động viên lẫn nhau trong quá trình học ngôn ngữ của bạn.
- **Có cấu trúc nhưng linh hoạt:** Thực hiện theo một lộ trình học tập được xây dựng tỉ mỉ được thiết kế để hướng dẫn bạn dần dần hướng tới sự trôi chảy. Điều chỉnh tốc độ theo nhu cầu của bạn, xem lại các chủ đề để củng cố và tạo trải nghiệm học ngôn ngữ được cá nhân hóa.

Trong dự án sử dụng những công nghệ như Next.js 14, Elevenlabs AI, Shadcn UI, và Clerk authentication với những tính năng:

- 📃Next.js 14 được chọn để khả năng render trên máy chủ, cung cấp hiệu suất cao và lợi ích SEO.
- 🤖Elevenlabs AI giúp chúng tôi tích hợp giọng điệu AI sống động, tạo ra trải nghiệm học tập phong phú.
- ⚖️Thư viện Shadcn UI mang lại giao diện người dùng hấp dẫn và phản hồi, nâng cao tương tác và sự hài lòng của người dùng.
- 👉Xác thực Clerk đảm bảo bảo mật dữ liệu và xác thực người dùng mạnh mẽ.

## Background

Kaleidoscope là ứng dụng học ngôn ngữ độc đáo, lấy cảm hứng từ Duolingo, mang đến trải nghiệm đa chiều giống như việc nhìn qua một kính vạn hoa. Với sự đa dạng và sáng tạo, người dùng khám phá ngôn ngữ và văn hóa một cách phong phú thông qua các hoạt động tương tác và kết nối cộng đồng.

## Install

1. Clone the Repository:

```bash
git clone https://github.com/Tuoc2004/Kaleidoscope
```

2. Install Dependencies:

```bash
cd Kaleidoscope/kaleidoscope
npm install
```

3. Create a .env File:

- Fill in the following environment variables with your own values:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_postgres_connection_string
API_KEY=your_gemini_api_key # Optional
ADMIN_KEY=your_admin_key
```

4. Setup Clerk Authentication

- Follow Clerk's documentation to create a project and obtain your keys (https://clerk.com/docs/quickstarts/setup-clerk).
- Replace the placeholder values in .env with your actual keys.

5. Configure Neon and Postgres

- Refer to Neon's documentation (https://neon.tech/) for setting up a serverless Postgres instance using Neon.
- Update the `DATABASE_URL` environment variable with your Postgres connection string.

## Usage

1. Run these commands in sequence to set up the database:

```bash
npm run db:reset
npm run db:push
npm run db:prod
```

2. Start the server:

```bash
npm run dev
```

3. Open the link: [`localhost:3000/`](http://localhost:3000/)

## 💁Contributing

Yêu cầu kéo đều được chào đón. Đối với những thay đổi lớn, vui lòng mở một vấn đề trước để thảo luận về những gì bạn muốn thay đổi.

Hãy đảm bảo cập nhật các bài kiểm tra khi thích hợp.

### 🌟Contributors
[![langchain contributors](https://contrib.rocks/image?repo=Tuoc2004/Kaleidoscope&max=2000)](https://github.com/Tuoc2004/Kaleidoscope/graphs/contributors)
## License

[MIT](https://choosealicense.com/licenses/mit/)
