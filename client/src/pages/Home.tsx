import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Users, Droplet } from "lucide-react";
import StatCard from "@/components/StatCard";
import DonorForm from "@/components/DonorForm";
import SearchFilter from "@/components/SearchFilter";
import DonorTable from "@/components/DonorTable";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import EditDonorDialog from "@/components/EditDonorDialog";
import { type Donor, type InsertDonor } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

export default function Home() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);

  // Fetch all donors
  const { data: donors = [], isLoading } = useQuery<Donor[]>({
    queryKey: ["/api/donors"],
    select: (data) => 
      data.map((donor) => ({
        ...donor,
        addedAt: new Date(donor.addedAt),
      })),
  });

  // Create donor mutation
  const createDonorMutation = useMutation({
    mutationFn: async (data: InsertDonor) => {
      const res = await apiRequest("POST", "/api/donors", data);
      return await res.json();
    },
    onSuccess: (newDonor: Donor) => {
      queryClient.invalidateQueries({ queryKey: ["/api/donors"] });
      toast({
        title: "Success!",
        description: `${newDonor.name} has been registered as a donor.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to register donor",
        variant: "destructive",
      });
    },
  });

  // Update donor mutation
  const updateDonorMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertDonor }) => {
      const res = await apiRequest("PUT", `/api/donors/${id}`, data);
      return await res.json();
    },
    onSuccess: (updatedDonor: Donor) => {
      queryClient.invalidateQueries({ queryKey: ["/api/donors"] });
      setEditDialogOpen(false);
      setSelectedDonor(null);
      toast({
        title: "Updated!",
        description: `${updatedDonor.name}'s information has been updated.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update donor",
        variant: "destructive",
      });
    },
  });

  // Delete donor mutation
  const deleteDonorMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/donors/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/donors"] });
      setDeleteDialogOpen(false);
      toast({
        title: "Deleted",
        description: `${selectedDonor?.name} has been removed from the system.`,
        variant: "destructive",
      });
      setSelectedDonor(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete donor",
        variant: "destructive",
      });
    },
  });

  // Filter donors based on search and blood group
  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      const matchesSearch =
        donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.phone.includes(searchTerm);
      const matchesBloodGroup =
        selectedBloodGroup === "All" || donor.bloodGroup === selectedBloodGroup;
      return matchesSearch && matchesBloodGroup;
    });
  }, [donors, searchTerm, selectedBloodGroup]);

  // Calculate statistics
  const stats = useMemo(() => {
    const bloodGroupCounts = donors.reduce((acc, donor) => {
      acc[donor.bloodGroup] = (acc[donor.bloodGroup] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: donors.length,
      bloodGroupCounts,
    };
  }, [donors]);

  const handleAddDonor = (data: InsertDonor) => {
    createDonorMutation.mutate(data);
  };

  const handleEditDonor = (data: InsertDonor) => {
    if (!selectedDonor) return;
    updateDonorMutation.mutate({ id: selectedDonor.id, data });
  };

  const handleDeleteClick = (id: string) => {
    const donor = donors.find((d) => d.id === id);
    if (donor) {
      setSelectedDonor(donor);
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (!selectedDonor) return;
    deleteDonorMutation.mutate(selectedDonor.id);
  };

  const handleEditClick = (donor: Donor) => {
    setSelectedDonor(donor);
    setEditDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading donors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <Droplet className="w-10 h-10" />
            <h1 className="text-4xl font-bold tracking-tight">
              Blood Donation Management System
            </h1>
          </div>
          <p className="text-lg text-primary-foreground/90">
            Save Lives Through Your Generosity
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Donors" value={stats.total} icon={Users} />
          <StatCard
            title="A+ Donors"
            value={stats.bloodGroupCounts['A+'] || 0}
            icon={Droplet}
            bloodGroup="A+"
          />
          <StatCard
            title="B+ Donors"
            value={stats.bloodGroupCounts['B+'] || 0}
            icon={Droplet}
            bloodGroup="B+"
          />
          <StatCard
            title="O+ Donors"
            value={stats.bloodGroupCounts['O+'] || 0}
            icon={Droplet}
            bloodGroup="O+"
          />
        </div>

        {/* Registration Form */}
        <DonorForm
          onSubmit={handleAddDonor}
          isLoading={createDonorMutation.isPending}
        />

        {/* Search and Filter */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Donor List</h2>
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedBloodGroup={selectedBloodGroup}
            onBloodGroupChange={setSelectedBloodGroup}
          />
        </div>

        {/* Donor Table */}
        <DonorTable
          donors={filteredDonors}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </main>

      {/* Dialogs */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        donorName={selectedDonor?.name}
      />

      <EditDonorDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        donor={selectedDonor}
        onSubmit={handleEditDonor}
        isLoading={updateDonorMutation.isPending}
      />
    </div>
  );
}
