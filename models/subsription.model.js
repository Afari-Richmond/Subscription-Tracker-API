import mongoose from "mongoose";

const subsriptionsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subsription Name is required"],
      trim: true,
      minLength: [2, "Subsription Name must be at least 2 characters"],
      maxLength: [100, "Subsription Name must be at most 100 characters"],
    },

    price: {
      type: Number,
      required: [true, "Subsription price is required"],
      min: [0, "Subsription price must be at least 0"],
      max: [100000, "Subsription price must be at most 100000"],
    },

    currency: {
      type: String,
      required: [true, "Subsription currency is required"],
      enum: {
        values: ["USD", "EUR", "GBP", "INR", "AUD", "CAD"],
        message: "{VALUE} is not a valid currency",
      },
      default: "USD",
    },

    frequency: {
      type: String,
      required: [true, "Subsription frequency is required"],
      enum: {
        values: ["daily", "weekly", "monthly", "yearly"],
        message: "{VALUE} is not a valid frequency",
      },
      default: "monthly",
    },
    category: {
      type: String,
      required: [true, "Subsription category is required"],
      enum: {
        values: ["entertainment", "education", "health", "finance", "other"],
        message: "{VALUE} is not a valid category",
      },
      default: "other",
    },

    paymentMethod: {
      type: String,
      required: [true, "Subscription Payment Method is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: {
        values: ["active", "cancelled", "expired"],
        message: "{VALUE} is not a valid status",
      },
      default: "active",
    },

    startDate: {
      type: Date,
      required: [true, "Subsription start date is required"],
      validate: {
        validator: (value) => value <= new Date(),
        message: "Subsription start date must be in the past",
      },
    },

    renewalDate: {
      type: Date,
      required: [true, "Subscription renewal date is required"],
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },

    user: {
      type: mongoose.Schema.Types.objectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

subsriptionsSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subsription = mongoose.model("Subsription", subsriptionsSchema);
export default Subsription;
