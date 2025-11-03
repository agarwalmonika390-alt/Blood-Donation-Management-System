import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
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
import { insertDonorSchema, type InsertDonor } from "@shared/schema";
import { UserPlus } from "lucide-react";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] as const;

interface DonorFormProps {
  onSubmit: (data: InsertDonor) => void;
  isLoading?: boolean;
}

export default function DonorForm({ onSubmit, isLoading }: DonorFormProps) {
  const form = useForm<InsertDonor>({
    resolver: zodResolver(insertDonorSchema),
    defaultValues: {
      name: "",
      bloodGroup: "A+",
      phone: "",
    },
  });

  const handleSubmit = (data: InsertDonor) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Card className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <UserPlus className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">Donor Registration</h2>
      </div>
      
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
                    data-testid="input-donor-name"
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
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger data-testid="select-blood-group">
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
                    data-testid="input-phone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isLoading}
            data-testid="button-submit-donor"
          >
            {isLoading ? "Registering..." : "Register Donor"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
