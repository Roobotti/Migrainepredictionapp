import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

interface MigraineCalendarData {
  month: number; // 0-11 (9 = October, 10 = November)
  day: number;
  severity: "severe" | "moderate" | "mild";
}

interface DayOfWeekData {
  day: string;
  count: number;
  percentage: number;
}

export function WeeklyTriggerTrends() {
  const [dayOfWeekData, setDayOfWeekData] = useState<DayOfWeekData[]>([]);

  useEffect(() => {
    // Get data from calendar (primary source)
    const calendarDataJson = localStorage.getItem("migraine_calendar_data");
    
    if (!calendarDataJson) return;

    try {
      const calendarData: MigraineCalendarData[] = JSON.parse(calendarDataJson);
      
      if (calendarData.length === 0) return;
      
      // Count migraines by day of the week
      const dayOfWeekCounts: { [key: string]: number } = {
        'Monday': 0,
        'Tuesday': 0,
        'Wednesday': 0,
        'Thursday': 0,
        'Friday': 0,
        'Saturday': 0,
        'Sunday': 0
      };
      
      const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      
      calendarData.forEach((item) => {
        const date = new Date(2025, item.month, item.day);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        dayOfWeekCounts[dayOfWeek]++;
      });
      
      const totalMigraines = calendarData.length;
      
      // Convert to array format for chart
      const chartData: DayOfWeekData[] = dayOrder.map(day => ({
        day,
        count: dayOfWeekCounts[day],
        percentage: Math.round((dayOfWeekCounts[day] / totalMigraines) * 100)
      }));
      
      setDayOfWeekData(chartData);
    } catch (error) {
      console.error("Error calculating day of week trends:", error);
    }
  }, []);

  if (dayOfWeekData.length === 0) {
    return (
      <Card className="p-4 bg-white">
        <h3 className="text-slate-600 mb-2">Migraine Days Pattern</h3>
        <p className="text-sm text-slate-500">
          No data available. Log migraines to see patterns by day of the week.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-white">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={20} className="text-teal-600" />
        <div>
          <h3 className="text-slate-600">Migraine Days Pattern</h3>
          <p className="text-sm text-slate-500">
            Which days of the week migraines occur most frequently
          </p>
        </div>
      </div>

      <div className="h-80 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dayOfWeekData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="day"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={{ stroke: "#cbd5e1" }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={{ stroke: "#cbd5e1" }}
              label={{ value: "Migraine Count", angle: -90, position: "insideLeft", style: { fill: "#64748b", fontSize: 12 } }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
              formatter={(value: number, name: string) => {
                const dayData = dayOfWeekData.find(d => d.count === value);
                return [`${value} migraines (${dayData?.percentage}%)`, ""];
              }}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#14b8a6" 
              strokeWidth={3}
              dot={{ fill: "#14b8a6", r: 5 }}
              activeDot={{ r: 7 }}
              name="Migraines"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-slate-500 text-center mt-4">
        Understanding your migraine patterns can help you plan and prepare better
      </p>
    </Card>
  );
}