import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Heart, 
  Footprints, 
  Cloud, 
  Smartphone, 
  Moon, 
  Droplets,
  Thermometer,
  Coffee,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sun
} from "lucide-react";
import { useState } from "react";

interface SubMetric {
  name: string;
  value: string;
  status: "normal" | "warning" | "danger";
}

interface HealthMetric {
  id: string;
  name: string;
  value?: string;
  riskContribution: number;
  icon: React.ReactNode;
  status: "normal" | "warning" | "danger";
  subMetrics?: SubMetric[];
}

export function RiskLevelPage() {
  const overallRisk = 68; // 0-100
  const riskLevel = overallRisk >= 70 ? "High" : overallRisk >= 40 ? "Medium" : "Low";
  const riskColor = overallRisk >= 70 ? "bg-red-500" : overallRisk >= 40 ? "bg-amber-500" : "bg-green-500";
  const riskTextColor = overallRisk >= 70 ? "text-red-600" : overallRisk >= 40 ? "text-amber-600" : "text-green-600";

  const [expandedMetrics, setExpandedMetrics] = useState<string[]>([]);

  const toggleMetric = (id: string) => {
    setExpandedMetrics(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const healthMetrics: HealthMetric[] = [
    {
      id: "sleep",
      name: "Sleep",
      riskContribution: 25,
      icon: <Moon className="text-teal-600" size={24} />,
      status: "danger",
      subMetrics: [
        { name: "Sleep Duration", value: "5h 20m", status: "danger" },
        { name: "Sleep Quality", value: "Poor", status: "danger" }
      ]
    },
    {
      id: "weather",
      name: "Weather",
      riskContribution: 22,
      icon: <Cloud className="text-teal-600" size={24} />,
      status: "danger",
      subMetrics: [
        { name: "Atmospheric Pressure", value: "1008 hPa", status: "danger" },
        { name: "Temperature", value: "28°C", status: "warning" },
        { name: "Conditions", value: "Partly Cloudy", status: "normal" }
      ]
    },
    {
      id: "screen",
      name: "Screen Time",
      value: "6h 45m",
      riskContribution: 18,
      icon: <Smartphone className="text-teal-600" size={24} />,
      status: "warning"
    },
    {
      id: "heart",
      name: "Heart Rate",
      value: "85 bpm",
      riskContribution: 15,
      icon: <Heart className="text-teal-600" size={24} />,
      status: "warning"
    },
    {
      id: "caffeine",
      name: "Caffeine Intake",
      value: "3 cups",
      riskContribution: 12,
      icon: <Coffee className="text-teal-600" size={24} />,
      status: "warning"
    },
    {
      id: "hydration",
      name: "Hydration",
      value: "4 glasses",
      riskContribution: 8,
      icon: <Droplets className="text-teal-600" size={24} />,
      status: "warning"
    },
    {
      id: "steps",
      name: "Steps Today",
      value: "3,240",
      riskContribution: 5,
      icon: <Footprints className="text-teal-600" size={24} />,
      status: "normal"
    }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Risk Level Card */}
      <Card className="p-6 bg-white border-2 border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-slate-600">Current Migraine Risk</h2>
            <Badge 
              className={`mt-2 ${riskColor} hover:${riskColor}`}
            >
              {riskLevel} Risk
            </Badge>
          </div>
          <div className={`text-4xl ${riskTextColor}`}>
            {overallRisk}%
          </div>
        </div>
        
        <Progress value={overallRisk} className="h-3 bg-teal-100 [&>*]:bg-teal-500" />
        
        <div className="mt-4 flex items-start gap-2 bg-amber-50 p-3 rounded-lg border border-amber-200">
          <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-amber-800">
            Your migraine risk is elevated. Consider reducing screen time and getting more rest.
          </p>
        </div>
      </Card>

      {/* Today's Factors */}
      <div>
        <h3 className="text-slate-700 mb-3 px-1">Contributing Factors</h3>
        <div className="space-y-3">
          {healthMetrics.map((metric) => (
            <Card key={metric.id} className="p-4 bg-white">
              <div className="flex items-center gap-3 mb-3">
                {metric.icon}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-slate-700">{metric.name}</h4>
                    <span className="text-sm text-slate-500">{metric.value}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Risk Contribution</span>
                  <span className={`${
                    metric.riskContribution >= 20 ? "text-red-600" : 
                    metric.riskContribution >= 10 ? "text-amber-600" : 
                    "text-green-600"
                  }`}>
                    +{metric.riskContribution}%
                  </span>
                </div>
                <Progress 
                  value={metric.riskContribution} 
                  className="h-2 bg-teal-100 [&>*]:bg-teal-500"
                />
              </div>

              {metric.subMetrics && (
                <div className="mt-3">
                  <button
                    className="flex items-center text-sm text-slate-500"
                    onClick={() => toggleMetric(metric.id)}
                  >
                    {expandedMetrics.includes(metric.id) ? (
                      <ChevronUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 mr-1" />
                    )}
                    {expandedMetrics.includes(metric.id) ? "Hide" : "Show"} Details
                  </button>
                  {expandedMetrics.includes(metric.id) && (
                    <div className="mt-2 space-y-1">
                      {metric.subMetrics.map((subMetric) => (
                        <div key={subMetric.name} className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">{subMetric.name}</span>
                          <span className={`text-sm ${
                            subMetric.status === "normal" ? "text-green-600" :
                            subMetric.status === "warning" ? "text-amber-600" :
                            "text-red-600"
                          }`}>{subMetric.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <h3 className="text-slate-700 mb-3">Weekly Summary</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-2xl text-indigo-600">3</div>
            <div className="text-xs text-slate-600 mt-1">Migraines</div>
          </div>
          <div>
            <div className="text-2xl text-purple-600">5.2h</div>
            <div className="text-xs text-slate-600 mt-1">Avg Sleep</div>
          </div>
          <div>
            <div className="text-2xl text-pink-600">62%</div>
            <div className="text-xs text-slate-600 mt-1">Avg Risk</div>
          </div>
        </div>
      </Card>
    </div>
  );
}