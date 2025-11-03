import StatCard from '../StatCard';
import { Users } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <StatCard title="Total Donors" value={42} icon={Users} />
      <StatCard title="A+ Donors" value={12} icon={Users} bloodGroup="A+" />
      <StatCard title="B+ Donors" value={8} icon={Users} bloodGroup="B+" />
      <StatCard title="O+ Donors" value={15} icon={Users} bloodGroup="O+" />
    </div>
  );
}
