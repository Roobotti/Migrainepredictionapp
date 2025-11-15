import { Card } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { 
  Brain, 
  AlertCircle, 
  Lightbulb, 
  Heart,
  Moon,
  Droplets,
  Activity,
  PhoneCall,
} from "lucide-react";

interface InfoPageProps {
  hasNewInsight?: boolean;
  onInsightViewed?: () => void;
}

export function InfoPage({ hasNewInsight = false, onInsightViewed }: InfoPageProps) {
  return (
    <div className="p-4 space-y-4">
      {/* Regular Header Card - Always visible */}
      <Card className="p-6 bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Brain size={32} />
          <h2>About Migraines</h2>
        </div>
        <p className="text-teal-100">
          Learn about migraine triggers, symptoms, and management strategies to better control your condition.
        </p>
      </Card>

      {/* Information Accordion */}
      <Card className="p-4 bg-white">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="what-is">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Brain className="text-teal-600" size={20} />
                <span>What is a Migraine?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-slate-600">
                <p>
                  A migraine is a neurological condition characterized by intense, debilitating headaches. 
                  Migraine headaches are often accompanied by other symptoms such as nausea, vomiting, 
                  and sensitivity to light and sound.
                </p>
                <p>
                  Migraines can last from 4 to 72 hours if untreated. The pain is typically on one side 
                  of the head and can be described as throbbing or pulsing.
                </p>
                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                  <p className="text-sm">
                    <span>Did you know?</span> Nearly 1 in 7 people worldwide experience migraines, 
                    making it one of the most common neurological conditions.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="symptoms">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <AlertCircle className="text-teal-600" size={20} />
                <span>Common Symptoms</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-slate-600">
                <p>Migraine symptoms can vary but commonly include:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Intense throbbing or pulsing pain, usually on one side of the head</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Sensitivity to light (photophobia) and sound (phonophobia)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Nausea and vomiting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Visual disturbances (aura) - flashing lights, blind spots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Dizziness or vertigo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Difficulty concentrating</span>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="triggers">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Activity className="text-teal-600" size={20} />
                <span>Common Triggers</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-slate-600">
                <p>Understanding your triggers is key to managing migraines:</p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <Moon className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-slate-700 mb-1">Sleep Issues</h4>
                      <p className="text-sm">Too little or too much sleep can trigger migraines. Aim for 7-9 hours consistently.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <Droplets className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-slate-700 mb-1">Dehydration</h4>
                      <p className="text-sm">Not drinking enough water is a common trigger. Stay hydrated throughout the day.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <Heart className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-slate-700 mb-1">Stress</h4>
                      <p className="text-sm">Emotional stress and anxiety can trigger migraines. Practice relaxation techniques.</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm">
                  Other triggers include: certain foods (aged cheese, processed meats), caffeine, 
                  hormonal changes, weather changes, bright lights, and strong smells.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="prevention">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Lightbulb className="text-teal-600" size={20} />
                <span>Prevention Tips</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-slate-600">
                <p>These lifestyle changes can help reduce migraine frequency:</p>
                
                <div className="space-y-2">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="text-green-800 mb-1">Maintain Regular Sleep</h4>
                    <p className="text-sm text-green-700">Go to bed and wake up at the same time daily, even on weekends.</p>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-blue-800 mb-1">Stay Hydrated</h4>
                    <p className="text-sm text-blue-700">Drink at least 8 glasses of water per day.</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="text-purple-800 mb-1">Exercise Regularly</h4>
                    <p className="text-sm text-purple-700">30 minutes of moderate exercise most days can help prevent migraines.</p>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="text-orange-800 mb-1">Manage Stress</h4>
                    <p className="text-sm text-orange-700">Try meditation, yoga, or deep breathing exercises.</p>
                  </div>

                  <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                    <h4 className="text-pink-800 mb-1">Limit Screen Time</h4>
                    <p className="text-sm text-pink-700">Take regular breaks and use blue light filters on devices.</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="treatment">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Heart className="text-teal-600" size={20} />
                <span>Treatment Options</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-slate-600">
                <p>Migraine treatment can include:</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-slate-700 mb-2">Acute Treatments</h4>
                    <ul className="space-y-1 ml-4 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>Over-the-counter pain relievers (ibuprofen, acetaminophen)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>Prescription triptans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>Anti-nausea medications</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-slate-700 mb-2">Preventive Treatments</h4>
                    <ul className="space-y-1 ml-4 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>Daily preventive medications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>CGRP inhibitors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>Botox injections (for chronic migraines)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <span>Important:</span> Always consult with a healthcare provider before 
                    starting any new treatment plan.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="when-to-seek">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <PhoneCall className="text-teal-600" size={20} />
                <span>When to Seek Help</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-slate-600">
                <p>Seek immediate medical attention if you experience:</p>
                
                <div className="space-y-2">
                  <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <p className="text-sm text-red-800">
                      A sudden, severe headache like a "thunderclap"
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <p className="text-sm text-red-800">
                      Headache with fever, stiff neck, confusion, or vision changes
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <p className="text-sm text-red-800">
                      Headache after a head injury
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <p className="text-sm text-red-800">
                      Headache that gets progressively worse
                    </p>
                  </div>
                </div>

                <p className="text-sm mt-4">
                  Also consult a doctor if your migraines are becoming more frequent, 
                  if your usual treatments aren't working, or if migraines are significantly 
                  impacting your quality of life.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Emergency Contact Card */}


      {/* Disclaimer */}
      <Card className="p-4 bg-slate-50 border-slate-300">
        <p className="text-xs text-slate-600 text-center">
          This app provides general information about migraines and is not a substitute 
          for professional medical advice, diagnosis, or treatment. Always consult with 
          a qualified healthcare provider regarding any medical concerns.
        </p>
      </Card>
    </div>
  );
}