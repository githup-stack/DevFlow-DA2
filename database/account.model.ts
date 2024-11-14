import { model, models, Schema, Types } from "mongoose";

export interface IAccount {
  userId: Types.ObjectId;
  name: string;
  image?: string;
  password?: string; // Thuộc tính tuỳ chọn
  provider: string; // Thuộc tính bắt buộc
  providerAccountId: string;
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
  },
  { timestamps: true }
  // Với { timestamps: true }, khi một tài liệu User mới được tạo, MongoDB sẽ tự động thêm createdAt và updatedAt. Nếu tài liệu được cập nhật sau đó, chỉ updatedAt sẽ được cập nhật với thời gian mới, trong khi createdAt vẫn giữ nguyên thời gian ban đầu.
);

const Account = models?.Account || model<IAccount>("Account", AccountSchema);

export default Account;
