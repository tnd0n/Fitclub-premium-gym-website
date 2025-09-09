import { type User, type InsertUser, type FitnessClass, type InsertClass, type Trainer, type InsertTrainer, type Membership, type InsertMembership, type Booking, type InsertBooking, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getClasses(): Promise<FitnessClass[]>;
  getClass(id: string): Promise<FitnessClass | undefined>;
  createClass(cls: InsertClass): Promise<FitnessClass>;
  
  getTrainers(): Promise<Trainer[]>;
  getTrainer(id: string): Promise<Trainer | undefined>;
  createTrainer(trainer: InsertTrainer): Promise<Trainer>;
  
  getMemberships(): Promise<Membership[]>;
  getMembership(id: string): Promise<Membership | undefined>;
  createMembership(membership: InsertMembership): Promise<Membership>;
  
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private classes: Map<string, FitnessClass>;
  private trainers: Map<string, Trainer>;
  private memberships: Map<string, Membership>;
  private bookings: Map<string, Booking>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.classes = new Map();
    this.trainers = new Map();
    this.memberships = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize classes
    const initialClasses: FitnessClass[] = [
      {
        id: "1",
        name: "HIIT Strength",
        time: "6:00 AM",
        duration: "45 min",
        trainer: "Sarah Johnson",
        difficulty: "Advanced",
        category: "strength",
        spots: 8,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "2",
        name: "Morning Yoga",
        time: "7:00 AM",
        duration: "60 min",
        trainer: "Emma Wilson",
        difficulty: "Beginner",
        category: "yoga",
        spots: 12,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "3",
        name: "Boxing Bootcamp",
        time: "6:30 PM",
        duration: "50 min",
        trainer: "Mike Torres",
        difficulty: "Intermediate",
        category: "boxing",
        spots: 6,
        image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "4",
        name: "Cardio Blast",
        time: "7:30 PM",
        duration: "40 min",
        trainer: "Lisa Chen",
        difficulty: "Intermediate",
        category: "cardio",
        spots: 15,
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      }
    ];

    // Initialize trainers
    const initialTrainers: Trainer[] = [
      {
        id: "1",
        name: "Sarah Johnson",
        specialty: "Strength & Conditioning",
        certifications: "NASM-CPT, CSCS",
        experience: "8+ years",
        bio: "Former Olympic athlete specializing in strength training and athletic performance.",
        image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "2",
        name: "Mike Torres",
        specialty: "Boxing & Martial Arts",
        certifications: "USA Boxing Certified",
        experience: "12+ years",
        bio: "Professional boxing coach with championship training experience.",
        image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "3",
        name: "Emma Wilson",
        specialty: "Yoga & Mindfulness",
        certifications: "RYT-500, Meditation Certified",
        experience: "6+ years",
        bio: "Holistic wellness expert focusing on mind-body connection and flexibility.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "4",
        name: "Lisa Chen",
        specialty: "Cardio & Weight Loss",
        certifications: "ACE-CPT, Nutrition Specialist",
        experience: "10+ years",
        bio: "Weight loss specialist with expertise in metabolic conditioning and nutrition.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ];

    // Initialize memberships
    const initialMemberships: Membership[] = [
      {
        id: "1",
        name: "Basic",
        price: 99,
        features: [
          "Gym Access (6 AM - 10 PM)",
          "Basic Equipment Use",
          "Locker Room Access",
          "Free Wifi",
          "1 Guest Pass/Month"
        ],
        popular: 0
      },
      {
        id: "2",
        name: "Premium",
        price: 149,
        features: [
          "24/7 Gym Access",
          "All Group Classes",
          "Personal Training (2 sessions)",
          "Nutrition Consultation",
          "Sauna & Steam Room",
          "5 Guest Passes/Month",
          "Priority Booking"
        ],
        popular: 1
      },
      {
        id: "3",
        name: "Elite",
        price: 199,
        features: [
          "24/7 VIP Access",
          "Unlimited Group Classes",
          "Personal Training (4 sessions)",
          "Nutrition & Meal Planning",
          "Recovery & Spa Services",
          "Unlimited Guest Passes",
          "Priority Everything",
          "Monthly Body Composition Analysis"
        ],
        popular: 0
      }
    ];

    initialClasses.forEach(cls => this.classes.set(cls.id, cls));
    initialTrainers.forEach(trainer => this.trainers.set(trainer.id, trainer));
    initialMemberships.forEach(membership => this.memberships.set(membership.id, membership));
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

  async getClasses(): Promise<FitnessClass[]> {
    return Array.from(this.classes.values());
  }

  async getClass(id: string): Promise<FitnessClass | undefined> {
    return this.classes.get(id);
  }

  async createClass(cls: InsertClass): Promise<FitnessClass> {
    const id = randomUUID();
    const newClass: FitnessClass = { ...cls, id };
    this.classes.set(id, newClass);
    return newClass;
  }

  async getTrainers(): Promise<Trainer[]> {
    return Array.from(this.trainers.values());
  }

  async getTrainer(id: string): Promise<Trainer | undefined> {
    return this.trainers.get(id);
  }

  async createTrainer(trainer: InsertTrainer): Promise<Trainer> {
    const id = randomUUID();
    const newTrainer: Trainer = { ...trainer, id };
    this.trainers.set(id, newTrainer);
    return newTrainer;
  }

  async getMemberships(): Promise<Membership[]> {
    return Array.from(this.memberships.values());
  }

  async getMembership(id: string): Promise<Membership | undefined> {
    return this.memberships.get(id);
  }

  async createMembership(membership: InsertMembership): Promise<Membership> {
    const id = randomUUID();
    const newMembership: Membership = { 
      ...membership, 
      id,
      popular: membership.popular ?? 0
    };
    this.memberships.set(id, newMembership);
    return newMembership;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const newBooking: Booking = { 
      ...booking, 
      id, 
      phone: booking.phone ?? null,
      createdAt: new Date() 
    };
    this.bookings.set(id, newBooking);
    return newBooking;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const newContact: Contact = { 
      ...contact, 
      id, 
      phone: contact.phone ?? null,
      createdAt: new Date() 
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
