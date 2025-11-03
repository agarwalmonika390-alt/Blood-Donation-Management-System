import DonorTable from '../DonorTable';
import { type Donor } from '@shared/schema';

// Mock data for example
const mockDonors: Donor[] = [
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
    name: 'John Smith',
    bloodGroup: 'A+',
    phone: '+1234567890',
    addedAt: new Date('2024-01-15'),
  },
  {
    id: '2b3c4d5e-6f7g-8h9i-0j1k-l2m3n4o5p6q7',
    name: 'Sarah Johnson',
    bloodGroup: 'O+',
    phone: '+1234567891',
    addedAt: new Date('2024-01-20'),
  },
  {
    id: '3c4d5e6f-7g8h-9i0j-1k2l-m3n4o5p6q7r8',
    name: 'Michael Chen',
    bloodGroup: 'B+',
    phone: '+1234567892',
    addedAt: new Date('2024-02-01'),
  },
];

export default function DonorTableExample() {
  return (
    <div className="p-6">
      <DonorTable
        donors={mockDonors}
        onEdit={(donor) => console.log('Edit donor:', donor)}
        onDelete={(id) => console.log('Delete donor:', id)}
      />
    </div>
  );
}
