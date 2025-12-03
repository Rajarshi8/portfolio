import mongoose, { Document, Schema } from 'mongoose';

export interface ISocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface ISite extends Document {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  profileImage: string;
  resumeUrl: string;
  location: string;
  currentRole?: string;
  currentCompany?: string;
  email: string;
  socialLinks: ISocialLink[];
  skills: string[];
  aboutText: string;
  themeDefault: 'light' | 'dark';
  createdAt: Date;
  updatedAt: Date;
}

const socialLinkSchema = new Schema<ISocialLink>(
  {
    platform: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const siteSchema = new Schema<ISite>(
  {
    heroTitle: {
      type: String,
      required: true,
      default: "Hey, I'm Rajarshi",
    },
    heroSubtitle: {
      type: String,
      default: 'Full Stack Developer',
    },
    heroDescription: {
      type: String,
      default: 'Building scalable web applications and solving complex problems.',
    },
    profileImage: {
      type: String,
      default: '/img/profile.jpg',
    },
    resumeUrl: {
      type: String,
      default: '/resume.pdf',
    },
    location: {
      type: String,
      default: 'India',
    },
    currentRole: {
      type: String,
    },
    currentCompany: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    socialLinks: {
      type: [socialLinkSchema],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    aboutText: {
      type: String,
      default: '',
    },
    themeDefault: {
      type: String,
      enum: ['light', 'dark'],
      default: 'dark',
    },
  },
  {
    timestamps: true,
  }
);

export const Site = mongoose.model<ISite>('Site', siteSchema);
