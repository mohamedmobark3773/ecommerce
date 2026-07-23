import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender is required."],
    },
    content: {
      type: String,
      required: [true, "Message content is required."],
      trim: true,
      maxlength: [5000, "Message content cannot exceed 5000 characters."],
    },
    type: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "A chat must have participants."],
      },
    ],
    title: {
      type: String,
      trim: true,
      maxlength: [100, "Chat title cannot exceed 100 characters."],
      default: "New Conversation",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Chat creator is required."],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastMessage: {
      type: String,
      trim: true,
      default: "",
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ participants: 1 });
chatSchema.index({ isActive: 1, updatedAt: -1 });

export const Chat = mongoose.model("Chat", chatSchema);

