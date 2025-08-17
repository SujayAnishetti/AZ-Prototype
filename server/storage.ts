import { type User, type InsertUser, type ClinicalTrial, type InsertClinicalTrial } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllClinicalTrials(): Promise<ClinicalTrial[]>;
  getClinicalTrial(id: string): Promise<ClinicalTrial | undefined>;
  createClinicalTrial(trial: InsertClinicalTrial): Promise<ClinicalTrial>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private clinicalTrials: Map<string, ClinicalTrial>;

  constructor() {
    this.users = new Map();
    this.clinicalTrials = new Map();
    
    // Initialize with sample clinical trials data
    this.initializeClinicalTrials();
  }

  private async initializeClinicalTrials() {
    const sampleTrials: InsertClinicalTrial[] = [
      {
        title: "Novel Oncology Treatment for Advanced Lung Cancer",
        diseaseArea: "Oncology",
        phase: "Phase I",
        recruitmentStatus: "Actively Recruiting",
        primarySite: "Memorial Sloan Kettering, New York",
        description: "Investigating a novel targeted therapy for patients with advanced non-small cell lung cancer."
      },
      {
        title: "Cardiovascular Prevention Study with Innovative Therapy",
        diseaseArea: "Cardiovascular",
        phase: "Phase II",
        recruitmentStatus: "Screening",
        primarySite: "Mayo Clinic, Minnesota",
        description: "Evaluating the efficacy of a new cardiovascular prevention therapy in high-risk patients."
      },
      {
        title: "Diabetes Management with Next-Generation Treatment",
        diseaseArea: "Endocrinology",
        phase: "Phase III",
        recruitmentStatus: "Actively Recruiting",
        primarySite: "Joslin Diabetes Center, Boston",
        description: "Large-scale study of an innovative diabetes management approach for Type 2 diabetes patients."
      },
      {
        title: "Long-term Safety Study for Respiratory Disease Treatment",
        diseaseArea: "Respiratory",
        phase: "Phase IV",
        recruitmentStatus: "Not Recruiting",
        primarySite: "Cleveland Clinic, Ohio",
        description: "Post-market surveillance study evaluating long-term safety of respiratory disease treatment."
      },
      {
        title: "Immunotherapy Approach for Rare Disease Treatment",
        diseaseArea: "Rare Diseases",
        phase: "Phase I",
        recruitmentStatus: "Starting Soon",
        primarySite: "NIH Clinical Center, Maryland",
        description: "First-in-human study of immunotherapy approach for patients with rare genetic disorders."
      },
      {
        title: "Neurological Disorder Treatment with Advanced Therapeutics",
        diseaseArea: "Neurology",
        phase: "Phase III",
        recruitmentStatus: "Actively Recruiting",
        primarySite: "Johns Hopkins, Baltimore",
        description: "Phase III trial evaluating advanced therapeutics for neurodegenerative disorders."
      },
      {
        title: "Breakthrough Therapy for Autoimmune Disease Management",
        diseaseArea: "Immunology",
        phase: "Phase II",
        recruitmentStatus: "Screening",
        primarySite: "Stanford Medicine, California",
        description: "Clinical trial investigating breakthrough therapy for autoimmune disease management."
      },
      {
        title: "Precision Medicine Approach for Pediatric Cancer",
        diseaseArea: "Pediatric Oncology",
        phase: "Phase I/II",
        recruitmentStatus: "Actively Recruiting",
        primarySite: "Children's Hospital, Philadelphia",
        description: "Precision medicine study for pediatric cancer patients using targeted therapeutic approaches."
      }
    ];

    for (const trial of sampleTrials) {
      await this.createClinicalTrial(trial);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllClinicalTrials(): Promise<ClinicalTrial[]> {
    return Array.from(this.clinicalTrials.values());
  }

  async getClinicalTrial(id: string): Promise<ClinicalTrial | undefined> {
    return this.clinicalTrials.get(id);
  }

  async createClinicalTrial(insertTrial: InsertClinicalTrial): Promise<ClinicalTrial> {
    const id = randomUUID();
    const trial: ClinicalTrial = { ...insertTrial, id };
    this.clinicalTrials.set(id, trial);
    return trial;
  }
}

export const storage = new MemStorage();
