import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  role: string;
  type: 'work' | 'education' | 'achievement';
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  location?: string;
  tech?: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: [true, 'Company/Organization name is required'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters'],
    },
    role: {
      type: String,
      required: [true, 'Role/Position is required'],
      trim: true,
      maxlength: [100, 'Role cannot exceed 100 characters'],
    },
    type: {
      type: String,
      enum: ['work', 'education', 'achievement'],
      default: 'work',
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, 'Location cannot exceed 100 characters'],
    },
    tech: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
experienceSchema.index({ type: 1, order: 1, startDate: -1 });

export const Experience = mongoose.model<IExperience>('Experience', experienceSchema);
