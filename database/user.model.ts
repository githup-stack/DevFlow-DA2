import { model, models, Schema } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  email: string;
  bio?: string;
  image: string; //Thuộc tính bắt buộc
  location?: string; //Thuộc tính tuỳ chọn
  portfolio?: string;
  reputation?: number;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    image: { type: String, required: true },
    location: { type: String },
    portfolio: { type: String },
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true }
  // Với { timestamps: true }, khi một tài liệu User mới được tạo, MongoDB sẽ tự động thêm createdAt và updatedAt. Nếu tài liệu được cập nhật sau đó, chỉ updatedAt sẽ được cập nhật với thời gian mới, trong khi createdAt vẫn giữ nguyên thời gian ban đầu.
);

const User = models?.user || model<IUser>("User", UserSchema); // <IUser> là kiểu dữ liệu TypeScript của mô hình, xác định rằng mô hình User này phải tuân theo cấu trúc được định nghĩa trong interface IUser
// Sử dụng models?.user để kiểm tra xem mô hình đã tồn tại hay chưa
// Nếu mô hình User chưa tồn tại, tạo mới bằng cách gọi model<IUser>("User", UserSchema).
// Tạo ra một mô hình Mongoose có tên User dựa trên cấu trúc của UserSchema và sử dụng kiểu dữ liệu TypeScript IUser để đảm bảo tính an toàn về kiểu trong quá trình làm việc với mô hình này.
export default User;
