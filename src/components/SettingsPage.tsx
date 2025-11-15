import { useState } from "react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { 
  Bell, 
  BellOff, 
  Droplets, 
  Coffee, 
  AlertTriangle,
  Clock,
  Settings as SettingsIcon,
  ChevronRight,
  Watch,
  Heart,
  Utensils,
  Moon as MoonIcon,
  Link2,
  CheckCircle2,
  Circle,
  Sparkles
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";

interface NotificationSettings {
  migraineSmart: {
    enabled: boolean;
    riskThreshold: number;
    checkTimes: string[];
  };
  waterIntake: {
    enabled: boolean;
    times: string[];
    intervalHours: number;
  };
  caffeineIntake: {
    enabled: boolean;
    times: string[];
  };
}

interface ConnectedApp {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  connected: boolean;
  lastSync?: string;
}

export function SettingsPage() {
  const [settings, setSettings] = useState<NotificationSettings>({
    migraineSmart: {
      enabled: true,
      riskThreshold: 65,
      checkTimes: ["12:00", "18:00", "21:00"]
    },
    waterIntake: {
      enabled: true,
      times: ["09:00", "12:00", "15:00", "18:00", "21:00"],
      intervalHours: 3
    },
    caffeineIntake: {
      enabled: true,
      times: ["14:00", "20:00"]
    }
  });

  const [hasChanges, setHasChanges] = useState(false);
  
  // Load connected apps from localStorage
  const loadConnectedApps = (): ConnectedApp[] => {
    const saved = localStorage.getItem("connected_apps");
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: "clue",
        name: "Clue",
        description: "Period & hormone tracking",
        category: "Period Tracking",
        icon: "heart",
        connected: false
      },
      {
        id: "flo",
        name: "Flo",
        description: "Menstrual cycle tracker",
        category: "Period Tracking",
        icon: "heart",
        connected: false
      },
      {
        id: "waterminder",
        name: "WaterMinder",
        description: "Daily hydration tracking",
        category: "Hydration",
        icon: "droplets",
        connected: false
      },
      {
        id: "plant-nanny",
        name: "Plant Nanny",
        description: "Water intake reminders",
        category: "Hydration",
        icon: "droplets",
        connected: false
      },
      {
        id: "myfitnesspal",
        name: "MyFitnessPal",
        description: "Nutrition & meal logging",
        category: "Meals",
        icon: "utensils",
        connected: false
      },
      {
        id: "cronometer",
        name: "Cronometer",
        description: "Detailed nutrition tracking",
        category: "Meals",
        icon: "utensils",
        connected: false
      },
      {
        id: "headspace",
        name: "Headspace",
        description: "Meditation & mindfulness",
        category: "Meditation",
        icon: "sparkles",
        connected: false
      },
      {
        id: "calm",
        name: "Calm",
        description: "Sleep & relaxation support",
        category: "Meditation",
        icon: "sparkles",
        connected: false
      },
      {
        id: "insight-timer",
        name: "Insight Timer",
        description: "Guided meditation library",
        category: "Meditation",
        icon: "sparkles",
        connected: false
      },
      {
        id: "ten-percent",
        name: "Ten Percent Happier",
        description: "Practical meditation courses",
        category: "Meditation",
        icon: "sparkles",
        connected: false
      },
      {
        id: "apple-watch",
        name: "Apple Watch",
        description: "Activity, heart rate, sleep",
        category: "Wearables",
        icon: "watch",
        connected: false
      },
      {
        id: "fitbit",
        name: "Fitbit",
        description: "Fitness & health tracking",
        category: "Wearables",
        icon: "watch",
        connected: false
      },
      {
        id: "oura",
        name: "Oura Ring",
        description: "Sleep & recovery insights",
        category: "Wearables",
        icon: "moon",
        connected: false
      },
      {
        id: "garmin",
        name: "Garmin Connect",
        description: "Sports & wellness data",
        category: "Wearables",
        icon: "watch",
        connected: false
      }
    ];
  };

  const [connectedApps, setConnectedApps] = useState<ConnectedApp[]>(loadConnectedApps());

  const timeOptions = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
  ];

  const handleSave = () => {
    // In a real app, this would save to backend/local storage
    toast.success("Settings saved successfully!");
    setHasChanges(false);
  };

  const getAppIcon = (iconName: string) => {
    const iconProps = { size: 20 };
    switch (iconName) {
      case "heart":
        return <Heart {...iconProps} />;
      case "droplets":
        return <Droplets {...iconProps} />;
      case "utensils":
        return <Utensils {...iconProps} />;
      case "watch":
        return <Watch {...iconProps} />;
      case "moon":
        return <MoonIcon {...iconProps} />;
      case "sparkles":
        return <Sparkles {...iconProps} />;
      default:
        return <Link2 {...iconProps} />;
    }
  };

  const toggleAppConnection = (appId: string) => {
    setConnectedApps(prev => {
      const updated = prev.map(app => {
        if (app.id === appId) {
          const newConnection = !app.connected;
          return {
            ...app,
            connected: newConnection,
            lastSync: newConnection ? new Date().toLocaleString() : undefined
          };
        }
        return app;
      });
      // Save to localStorage
      localStorage.setItem("connected_apps", JSON.stringify(updated));
      return updated;
    });
    
    const app = connectedApps.find(a => a.id === appId);
    if (app?.connected) {
      toast.success(`Disconnected from ${app.name}`);
    } else {
      toast.success(`Connected to ${app?.name}! Data will sync automatically.`);
    }
  };

  // Group apps by category
  const groupedApps = connectedApps.reduce((acc, app) => {
    if (!acc[app.category]) {
      acc[app.category] = [];
    }
    acc[app.category].push(app);
    return acc;
  }, {} as Record<string, ConnectedApp[]>);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Period Tracking":
        return { bg: "bg-pink-100", text: "text-pink-600", border: "border-pink-200" };
      case "Hydration":
        return { bg: "bg-cyan-100", text: "text-cyan-600", border: "border-cyan-200" };
      case "Meals":
        return { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" };
      case "Wearables":
        return { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" };
      case "Meditation":
        return { bg: "bg-yellow-100", text: "text-yellow-600", border: "border-yellow-200" };
      default:
        return { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-200" };
    }
  };

  const updateMigraineEnabled = (enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      migraineSmart: { ...prev.migraineSmart, enabled }
    }));
    setHasChanges(true);
  };

  const updateMigraineThreshold = (value: number[]) => {
    setSettings(prev => ({
      ...prev,
      migraineSmart: { ...prev.migraineSmart, riskThreshold: value[0] }
    }));
    setHasChanges(true);
  };

  const updateMigraineTime = (index: number, time: string) => {
    setSettings(prev => {
      const newTimes = [...prev.migraineSmart.checkTimes];
      newTimes[index] = time;
      return {
        ...prev,
        migraineSmart: { ...prev.migraineSmart, checkTimes: newTimes }
      };
    });
    setHasChanges(true);
  };

  const addMigraineTime = () => {
    setSettings(prev => ({
      ...prev,
      migraineSmart: {
        ...prev.migraineSmart,
        checkTimes: [...prev.migraineSmart.checkTimes, "12:00"]
      }
    }));
    setHasChanges(true);
  };

  const removeMigraineTime = (index: number) => {
    setSettings(prev => ({
      ...prev,
      migraineSmart: {
        ...prev.migraineSmart,
        checkTimes: prev.migraineSmart.checkTimes.filter((_, i) => i !== index)
      }
    }));
    setHasChanges(true);
  };

  const updateWaterEnabled = (enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      waterIntake: { ...prev.waterIntake, enabled }
    }));
    setHasChanges(true);
  };

  const updateWaterTime = (index: number, time: string) => {
    setSettings(prev => {
      const newTimes = [...prev.waterIntake.times];
      newTimes[index] = time;
      return {
        ...prev,
        waterIntake: { ...prev.waterIntake, times: newTimes }
      };
    });
    setHasChanges(true);
  };

  const addWaterTime = () => {
    setSettings(prev => ({
      ...prev,
      waterIntake: {
        ...prev.waterIntake,
        times: [...prev.waterIntake.times, "12:00"]
      }
    }));
    setHasChanges(true);
  };

  const removeWaterTime = (index: number) => {
    setSettings(prev => ({
      ...prev,
      waterIntake: {
        ...prev.waterIntake,
        times: prev.waterIntake.times.filter((_, i) => i !== index)
      }
    }));
    setHasChanges(true);
  };

  const updateCaffeineEnabled = (enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      caffeineIntake: { ...prev.caffeineIntake, enabled }
    }));
    setHasChanges(true);
  };

  const updateCaffeineTime = (index: number, time: string) => {
    setSettings(prev => {
      const newTimes = [...prev.caffeineIntake.times];
      newTimes[index] = time;
      return {
        ...prev,
        caffeineIntake: { ...prev.caffeineIntake, times: newTimes }
      };
    });
    setHasChanges(true);
  };

  const addCaffeineTime = () => {
    setSettings(prev => ({
      ...prev,
      caffeineIntake: {
        ...prev.caffeineIntake,
        times: [...prev.caffeineIntake.times, "12:00"]
      }
    }));
    setHasChanges(true);
  };

  const removeCaffeineTime = (index: number) => {
    setSettings(prev => ({
      ...prev,
      caffeineIntake: {
        ...prev.caffeineIntake,
        times: prev.caffeineIntake.times.filter((_, i) => i !== index)
      }
    }));
    setHasChanges(true);
  };

  return (
    <div className="p-4 space-y-4 pb-24">

      {/* Smart Migraine Notifications */}
      <Card className="p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <div>
              <Label htmlFor="migraine-smart" className="text-slate-800">
                Smart Migraine Check
              </Label>
              <p className="text-xs text-slate-500 mt-1">
                Ask about migraines when risk is high
              </p>
            </div>
          </div>
          <Switch
            id="migraine-smart"
            checked={settings.migraineSmart.enabled}
            onCheckedChange={updateMigraineEnabled}
          />
        </div>

        {settings.migraineSmart.enabled && (
          <div className="space-y-4 pt-4 border-t">
            {/* Risk Threshold */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-slate-700">Risk Threshold</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Notify when risk ≥</span>
                  <span className={`text-lg ${
                    settings.migraineSmart.riskThreshold >= 70 ? "text-red-600" :
                    settings.migraineSmart.riskThreshold >= 40 ? "text-amber-600" :
                    "text-green-600"
                  }`}>
                    {settings.migraineSmart.riskThreshold}%
                  </span>
                </div>
              </div>
              <Slider
                value={[settings.migraineSmart.riskThreshold]}
                onValueChange={updateMigraineThreshold}
                min={30}
                max={90}
                step={5}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>30%</span>
                <span>Low Risk</span>
                <span>High Risk</span>
                <span>90%</span>
              </div>
            </div>

            {/* Check Times */}
            <div>
              <Label className="text-slate-700 mb-2 block">Check Times</Label>
              <p className="text-xs text-slate-500 mb-3">
                App will check your risk level at these times and notify if above threshold
              </p>
              <div className="space-y-2">
                {settings.migraineSmart.checkTimes.map((time, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Clock className="text-slate-400" size={16} />
                    <Select value={time} onValueChange={(val) => updateMigraineTime(index, val)}>
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {settings.migraineSmart.checkTimes.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMigraineTime(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={addMigraineTime}
                className="mt-3 w-full"
              >
                + Add Check Time
              </Button>
            </div>

            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
              <p className="text-xs text-indigo-800">
                <span>Smart Feature:</span> You'll only be asked about migraines when your 
                current risk level exceeds {settings.migraineSmart.riskThreshold}% at the scheduled check times.
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Water Intake Reminders */}
      <Card className="p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <Droplets className="text-cyan-600" size={20} />
            </div>
            <div>
              <Label htmlFor="water-intake" className="text-slate-800">
                Water Intake Reminders
              </Label>
              <p className="text-xs text-slate-500 mt-1">
                Stay hydrated throughout the day
              </p>
            </div>
          </div>
          <Switch
            id="water-intake"
            checked={settings.waterIntake.enabled}
            onCheckedChange={updateWaterEnabled}
          />
        </div>

        {settings.waterIntake.enabled && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <Label className="text-slate-700 mb-2 block">Reminder Times</Label>
              <div className="space-y-2">
                {settings.waterIntake.times.map((time, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Clock className="text-slate-400" size={16} />
                    <Select value={time} onValueChange={(val) => updateWaterTime(index, val)}>
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {settings.waterIntake.times.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWaterTime(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={addWaterTime}
                className="mt-3 w-full"
              >
                + Add Reminder
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Caffeine Intake Reminders */}
      <Card className="p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Coffee className="text-amber-700" size={20} />
            </div>
            <div>
              <Label htmlFor="caffeine-intake" className="text-slate-800">
                Caffeine Intake Reminders
              </Label>
              <p className="text-xs text-slate-500 mt-1">
                Track your caffeine consumption
              </p>
            </div>
          </div>
          <Switch
            id="caffeine-intake"
            checked={settings.caffeineIntake.enabled}
            onCheckedChange={updateCaffeineEnabled}
          />
        </div>

        {settings.caffeineIntake.enabled && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <Label className="text-slate-700 mb-2 block">Reminder Times</Label>
              <p className="text-xs text-slate-500 mb-3">
                Log your caffeine intake at these times
              </p>
              <div className="space-y-2">
                {settings.caffeineIntake.times.map((time, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Clock className="text-slate-400" size={16} />
                    <Select value={time} onValueChange={(val) => updateCaffeineTime(index, val)}>
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {settings.caffeineIntake.times.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCaffeineTime(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={addCaffeineTime}
                className="mt-3 w-full"
              >
                + Add Reminder
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Connected Apps */}
      <Card className="p-4 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Link2 className="text-indigo-600" size={20} />
          </div>
          <div>
            <Label className="text-slate-800">Connected Apps</Label>
            <p className="text-xs text-slate-500 mt-1">
              Link health tracking apps to import data
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          {Object.keys(groupedApps).map(category => {
            const colors = getCategoryColor(category);
            return (
              <div key={category}>
                <h4 className={`text-sm ${colors.text} mb-2`}>{category}</h4>
                <div className="space-y-2">
                  {groupedApps[category].map(app => (
                    <div 
                      key={app.id} 
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        app.connected ? `${colors.border} ${colors.bg}` : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${app.connected ? 'bg-white' : 'bg-white'}`}>
                          <div className={app.connected ? colors.text : 'text-slate-400'}>
                            {getAppIcon(app.icon)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Label className="text-slate-800">{app.name}</Label>
                            {app.connected && (
                              <CheckCircle2 className={`${colors.text}`} size={14} />
                            )}
                          </div>
                          <p className="text-xs text-slate-500">{app.description}</p>
                          {app.lastSync && (
                            <p className="text-xs text-slate-400 mt-1">
                              Last sync: {app.lastSync}
                            </p>
                          )}
                        </div>
                      </div>
                      <Switch
                        checked={app.connected}
                        onCheckedChange={() => toggleAppConnection(app.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-4">
          <p className="text-xs text-slate-600">
            <span className="font-semibold">Note:</span> Connected apps will automatically sync their data 
            to provide more accurate migraine predictions. You can disconnect at any time.
          </p>
        </div>
      </Card>

      {/* Notification Permissions Info */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Bell className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-blue-800">
            <p className="mb-2">
              Make sure notifications are enabled in your device settings to receive reminders.
            </p>
            <Button
              variant="link"
              size="sm"
              className="text-blue-700 p-0 h-auto"
              onClick={() => toast.info("Open your device settings to manage notification permissions")}
            >
              Check Notification Settings
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Reset Onboarding */}
      <Card className="p-4 bg-amber-50 border-amber-200">
        <h3 className="text-slate-700 mb-3">Advanced Settings</h3>
        <div className="space-y-3">
          <div>
            <h4 className="text-slate-700 mb-1">Reset App Demo</h4>
            <p className="text-sm text-slate-600 mb-3">
              Restart the entire demo including onboarding questionnaire and calendar population animation.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("onboarding_completed");
                localStorage.removeItem("trigger_weights");
                localStorage.removeItem("migraine_calendar_data");
                localStorage.removeItem("data_populated");
                localStorage.removeItem("info_update_seen");
                toast.success("App will restart with onboarding and demo");
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }}
              className="text-amber-700 border-amber-300 hover:bg-amber-100"
            >
              Reset & Restart Onboarding
            </Button>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      {hasChanges && (
        <div className="fixed bottom-20 left-4 right-4 z-20">
          <Button
            onClick={handleSave}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            size="lg"
          >
            Save Settings
          </Button>
        </div>
      )}
    </div>
  );
}