import mongoose from "mongoose";

// ---------------------------------------------------------------------------
// AnalyticsEvent model
// ---------------------------------------------------------------------------
// A general-purpose event log for client-side and server-side analytics.
// The repository currently aggregates live data from other collections, but
// this model allows the system to also persist discrete events (page views,
// button clicks, conversions, errors, etc.) for richer time-series analysis.
// ---------------------------------------------------------------------------

const analyticsEventSchema = new mongoose.Schema(
  {
    // The category of event, e.g. "page_view", "product_view", "add_to_cart",
    // "purchase", "search", "login", "error"
    eventType: {
      type: String,
      required: [true, "Event type is required."],
      trim: true,
      index: true,
    },

    // Optional reference to the authenticated user who triggered the event
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    // Session identifier for grouping anonymous events
    sessionId: {
      type: String,
      trim: true,
      index: true,
    },

    // The entity the event is about (product, order, category, etc.)
    resourceType: {
      type: String,
      trim: true,
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    // Arbitrary payload — keep schema-less for flexibility
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Request context
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },

    // Geographic info resolved from IP
    country: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },

    // UTM / referral attribution
    source: {
      type: String,
      trim: true,
    },
    medium: {
      type: String,
      trim: true,
    },
    campaign: {
      type: String,
      trim: true,
    },

    // Device classification
    deviceType: {
      type: String,
      enum: ["desktop", "mobile", "tablet", "unknown"],
      default: "unknown",
    },

    // Duration in milliseconds (useful for session or page-dwell events)
    durationMs: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
    // Optimise for time-series queries: store in createdAt order
    timeseries: undefined, // kept simple; swap to a TimeSeries collection if needed
  }
);

// Compound index for the most common query patterns
analyticsEventSchema.index({ eventType: 1, createdAt: -1 });
analyticsEventSchema.index({ user: 1, createdAt: -1 });
analyticsEventSchema.index({ resourceType: 1, resourceId: 1, createdAt: -1 });

export const AnalyticsEvent = mongoose.model("AnalyticsEvent", analyticsEventSchema);
export const AnalyticsModel = AnalyticsEvent; // backwards-compat named export
export default AnalyticsEvent;
