import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  id: { type: String, required: "Name is required" },
  name: { type: String, required: "Name is required" },
  avatarUrl: String,
  tags: Array,
  steamId: Number,
});

// usernameField : 사용자 이름을 보유한 필드 이름을 지정합니다. 기본값은 'username'입니다.
// 다른 필드를 사용하여 사용자 이름을 보유하려는 경우이 옵션을 사용할 수 있습니다 (예 : "email").
UserSchema.plugin(passportLocalMongoose, { usernameField: "id" });

const model = mongoose.model("User", UserSchema);
export default model;
