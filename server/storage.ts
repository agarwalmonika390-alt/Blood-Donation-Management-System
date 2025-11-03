import { type Donor, type InsertDonor } from "@shared/schema";
import { randomUUID } from "crypto";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DONORS_FILE = path.join(process.cwd(), "donors.json");

export interface IStorage {
  getAllDonors(): Promise<Donor[]>;
  getDonor(id: string): Promise<Donor | undefined>;
  createDonor(donor: InsertDonor): Promise<Donor>;
  updateDonor(id: string, donor: InsertDonor): Promise<Donor | undefined>;
  deleteDonor(id: string): Promise<boolean>;
}

export class JsonFileStorage implements IStorage {
  private async readDonors(): Promise<Donor[]> {
    try {
      if (!existsSync(DONORS_FILE)) {
        await this.writeDonors([]);
        return [];
      }
      const data = await readFile(DONORS_FILE, "utf-8");
      const donors = JSON.parse(data);
      return donors.map((donor: any) => ({
        ...donor,
        addedAt: new Date(donor.addedAt),
      }));
    } catch (error) {
      console.error("Error reading donors file:", error);
      throw new Error("Failed to read donors data");
    }
  }

  private async writeDonors(donors: Donor[]): Promise<void> {
    await writeFile(DONORS_FILE, JSON.stringify(donors, null, 2), "utf-8");
  }

  async getAllDonors(): Promise<Donor[]> {
    return await this.readDonors();
  }

  async getDonor(id: string): Promise<Donor | undefined> {
    const donors = await this.readDonors();
    return donors.find((d) => d.id === id);
  }

  async createDonor(insertDonor: InsertDonor): Promise<Donor> {
    const donors = await this.readDonors();
    const id = randomUUID();
    const donor: Donor = {
      ...insertDonor,
      id,
      addedAt: new Date(),
    };
    donors.push(donor);
    await this.writeDonors(donors);
    return donor;
  }

  async updateDonor(
    id: string,
    insertDonor: InsertDonor
  ): Promise<Donor | undefined> {
    const donors = await this.readDonors();
    const index = donors.findIndex((d) => d.id === id);
    if (index === -1) return undefined;

    const updated: Donor = {
      ...donors[index],
      ...insertDonor,
    };
    donors[index] = updated;
    await this.writeDonors(donors);
    return updated;
  }

  async deleteDonor(id: string): Promise<boolean> {
    const donors = await this.readDonors();
    const initialLength = donors.length;
    const filtered = donors.filter((d) => d.id !== id);
    
    if (filtered.length === initialLength) {
      return false;
    }
    
    await this.writeDonors(filtered);
    return true;
  }
}

export const storage = new JsonFileStorage();
