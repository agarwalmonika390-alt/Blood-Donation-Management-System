import { supabase } from '@/lib/supabase';
import { type Donor, type InsertDonor, donors } from '@shared/schema';
import { eq } from 'drizzle-orm';

export class SupabaseStorage {
  async getAllDonors(): Promise<Donor[]> {
    const { data, error } = await supabase
      .from('donors')
      .select('*')
      .order('added_at', { ascending: false });
    
    if (error) throw error;
    return data.map(donor => ({
      ...donor,
      bloodGroup: donor.blood_group,
      addedAt: donor.added_at
    }));
  }

  async getDonor(id: string): Promise<Donor | undefined> {
    const { data, error } = await supabase
      .from('donors')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async createDonor(insertDonor: InsertDonor): Promise<Donor> {
    const donor = {
      name: insertDonor.name,
      blood_group: insertDonor.bloodGroup,
      phone: insertDonor.phone
    };

    const { data, error } = await supabase
      .from('donors')
      .insert([donor])
      .select()
      .single();
    
    if (error) throw error;
    return {
      ...data,
      bloodGroup: data.blood_group,
      addedAt: data.added_at
    };
  }

  async updateDonor(id: string, insertDonor: InsertDonor): Promise<Donor | undefined> {
    const donor = {
      name: insertDonor.name,
      blood_group: insertDonor.bloodGroup,
      phone: insertDonor.phone
    };

    const { data, error } = await supabase
      .from('donors')
      .update(donor)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return {
      ...data,
      bloodGroup: data.blood_group,
      addedAt: data.added_at
    };
  }

  async deleteDonor(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('donors')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
}