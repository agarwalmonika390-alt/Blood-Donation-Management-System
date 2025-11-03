import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] as const;

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedBloodGroup: string;
  onBloodGroupChange: (value: string) => void;
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  selectedBloodGroup,
  onBloodGroupChange,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
          data-testid="input-search"
        />
      </div>
      <Select value={selectedBloodGroup} onValueChange={onBloodGroupChange}>
        <SelectTrigger className="w-full sm:w-48" data-testid="select-filter-blood-group">
          <SelectValue placeholder="Filter by blood group" />
        </SelectTrigger>
        <SelectContent>
          {bloodGroups.map((group) => (
            <SelectItem key={group} value={group}>
              {group === "All" ? "All Blood Groups" : group}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
