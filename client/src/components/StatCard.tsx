import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  bloodGroup?: string;
}

export default function StatCard({ title, value, icon: Icon, bloodGroup }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-bold">{value}</p>
            {bloodGroup && (
              <span className="text-lg font-semibold text-primary">{bloodGroup}</span>
            )}
          </div>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}
