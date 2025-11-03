import { useState } from 'react';
import DeleteConfirmDialog from '../DeleteConfirmDialog';
import { Button } from '@/components/ui/button';

export default function DeleteConfirmDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>
        Open Delete Dialog
      </Button>
      <DeleteConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          console.log('Deleted!');
          setOpen(false);
        }}
        donorName="John Smith"
      />
    </div>
  );
}
