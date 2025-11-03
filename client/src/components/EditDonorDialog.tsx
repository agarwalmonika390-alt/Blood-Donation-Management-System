import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertDonorSchema, type InsertDonor, type Donor } from "@shared/schema";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] as const;

interface EditDonorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donor: Donor | null;
  onSubmit: (data: InsertDonor) => void;
  isLoading?: boolean;
}

export default function EditDonorDialog({
  open,
  onOpenChange,
  donor,
  onSubmit,
  isLoading,
}: EditDonorDialogProps) {
  const form = useForm<InsertDonor>({
    resolver: zodResolver(insertDonorSchema),
    defaultValues: {
      name: "",
      bloodGroup: "A+",
      phone: "",
    },
  });

  useEffect(() => {
    if (donor) {
      form.reset({
        name: donor.name,
        bloodGroup: donor.bloodGroup as any,
        phone: donor.phone,
      });
    }
  }, [donor, form]);

  const handleSubmit = (data: InsertDonor) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-edit-donor">
        <DialogHeader>
          <DialogTitle>Edit Donor Information</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donor Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter full name"
                      data-testid="input-edit-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger data-testid="select-edit-blood-group">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone number"
                      type="tel"
                      data-testid="input-edit-phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel-edit"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                data-testid="button-save-edit"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
