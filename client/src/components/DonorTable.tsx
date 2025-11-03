import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Users } from "lucide-react";
import { type Donor } from "@shared/schema";
import { format } from "date-fns";

interface DonorTableProps {
  donors: Donor[];
  onEdit: (donor: Donor) => void;
  onDelete: (id: string) => void;
}

export default function DonorTable({ donors, onEdit, onDelete }: DonorTableProps) {
  if (donors.length === 0) {
    return (
      <Card className="p-12">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Donors Found</h3>
          <p className="text-muted-foreground">
            Register your first donor to get started
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Blood Group
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Added
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {donors.map((donor, index) => (
              <tr key={donor.id} className="hover-elevate" data-testid={`row-donor-${index}`}>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  #{donor.id.slice(0, 8)}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium" data-testid={`text-donor-name-${index}`}>
                    {donor.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="secondary" data-testid={`badge-blood-group-${index}`}>
                    {donor.bloodGroup}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm" data-testid={`text-phone-${index}`}>
                  {donor.phone}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {format(new Date(donor.addedAt), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onEdit(donor)}
                      data-testid={`button-edit-${index}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onDelete(donor.id)}
                      data-testid={`button-delete-${index}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-border">
        {donors.map((donor, index) => (
          <div key={donor.id} className="p-4" data-testid={`card-donor-${index}`}>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{donor.name}</p>
                  <p className="text-sm text-muted-foreground">#{donor.id.slice(0, 8)}</p>
                </div>
                <Badge variant="secondary">{donor.bloodGroup}</Badge>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Phone: {donor.phone}</p>
                <p className="text-muted-foreground">
                  Added: {format(new Date(donor.addedAt), 'MMM dd, yyyy')}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => onEdit(donor)}
                  data-testid={`button-mobile-edit-${index}`}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => onDelete(donor.id)}
                  data-testid={`button-mobile-delete-${index}`}
                >
                  <Trash2 className="w-4 h-4 mr-2 text-destructive" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
