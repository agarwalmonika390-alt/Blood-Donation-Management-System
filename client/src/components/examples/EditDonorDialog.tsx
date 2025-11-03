import { useState } from 'react';
import EditDonorDialog from '../EditDonorDialog';
import { Button } from '@/components/ui/button';
import { type Donor } from '@shared/schema';

const mockDonor: Donor = {
  id: '1a2b3c4d',
  name: 'John Smith',
  bloodGroup: 'A+',
  phone: '+1234567890',
  addedAt: new Date(),
};

export default function EditDonorDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>
        Open Edit Dialog
      </Button>
      <EditDonorDialog
        open={open}
        onOpenChange={setOpen}
        donor={mockDonor}
        onSubmit={(data) => {
          console.log('Updated donor:', data);
          setOpen(false);
        }}
        isLoading={false}
      />
    </div>
  );
}
