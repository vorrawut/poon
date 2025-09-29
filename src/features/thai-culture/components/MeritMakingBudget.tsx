import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareHeading,
  ThemeAwareButton,
  useTheme,
} from "../../../core";
import { cn } from "../../../libs/utils";
import { formatThaiCurrency } from "../services/thaiLocalization";
import type { MeritMakingActivity } from "../types";

interface MeritMakingEntry {
  id: string;
  activityType: MeritMakingActivity['type'];
  amount: number;
  date: Date;
  location?: string;
  notes?: string;
  frequency: MeritMakingActivity['frequency'];
}

interface MeritMakingBudgetProps {
  language?: 'en' | 'th';
  onMeritMakingUpdate?: (entry: MeritMakingEntry) => void;
  className?: string;
}

// Merit Making Activity Types
const MERIT_MAKING_ACTIVITIES: MeritMakingActivity[] = [
  {
    id: 'temple_donation',
    name: {
      en: 'Temple Donation',
      th: 'บริจาควัด'
    },
    type: 'temple_donation',
    frequency: 'monthly',
    suggestedAmount: {
      min: 100,
      max: 5000,
      currency: 'THB'
    },
    description: {
      en: 'Regular donations to support temple maintenance and community activities',
      th: 'การบริจาคประจำเพื่อสนับสนุนการบำรุงรักษาวัดและกิจกรรมชุมชน'
    },
    icon: '🏛️'
  },
  {
    id: 'monk_offering',
    name: {
      en: 'Monk Offering',
      th: 'ถวายพระ'
    },
    type: 'monk_offering',
    frequency: 'weekly',
    suggestedAmount: {
      min: 20,
      max: 500,
      currency: 'THB'
    },
    description: {
      en: 'Offering food, robes, and necessities to Buddhist monks',
      th: 'การถวายอาหาร ผ้าไตร และสิ่งของจำเป็นแก่พระสงฆ์'
    },
    icon: '👨‍🦲'
  },
  {
    id: 'charity',
    name: {
      en: 'Charity Donation',
      th: 'บริจาคการกุศล'
    },
    type: 'charity',
    frequency: 'monthly',
    suggestedAmount: {
      min: 50,
      max: 2000,
      currency: 'THB'
    },
    description: {
      en: 'Donations to help those in need and support charitable organizations',
      th: 'การบริจาคเพื่อช่วยเหลือผู้ที่ต้องการและสนับสนุนองค์กรการกุศล'
    },
    icon: '❤️'
  },
  {
    id: 'merit_transfer',
    name: {
      en: 'Merit Transfer Ceremony',
      th: 'พิธีอุทิศส่วนกุศล'
    },
    type: 'merit_transfer',
    frequency: 'special_occasion',
    suggestedAmount: {
      min: 500,
      max: 10000,
      currency: 'THB'
    },
    description: {
      en: 'Special ceremonies to transfer merit to deceased relatives and ancestors',
      th: 'พิธีกรรมพิเศษเพื่ออุทิศส่วนกุศลให้แก่ญาติผู้ล่วงลับและบรรพบุรุษ'
    },
    icon: '🕯️'
  }
];

export function MeritMakingBudget({ 
  language = 'en', 
  onMeritMakingUpdate,
  className 
}: MeritMakingBudgetProps) {
  const { isPlayMode } = useTheme();
  const [entries, setEntries] = useState<MeritMakingEntry[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<MeritMakingEntry>>({});
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Initialize with sample data
  useEffect(() => {
    const sampleEntries: MeritMakingEntry[] = [
      {
        id: '1',
        activityType: 'temple_donation',
        amount: 1000,
        date: new Date(2024, 11, 1),
        location: language === 'th' ? 'วัดพระแก้ว' : 'Wat Phra Kaew',
        notes: language === 'th' ? 'บริจาคประจำเดือน' : 'Monthly donation',
        frequency: 'monthly'
      },
      {
        id: '2',
        activityType: 'monk_offering',
        amount: 200,
        date: new Date(2024, 11, 15),
        location: language === 'th' ? 'วัดใกล้บ้าน' : 'Local Temple',
        notes: language === 'th' ? 'ถวายข้าวและแกง' : 'Rice and curry offering',
        frequency: 'weekly'
      },
      {
        id: '3',
        activityType: 'charity',
        amount: 500,
        date: new Date(2024, 11, 20),
        location: language === 'th' ? 'มูลนิธิการกุศล' : 'Charity Foundation',
        notes: language === 'th' ? 'ช่วยเหลือเด็กกำพร้า' : 'Help orphaned children',
        frequency: 'monthly'
      }
    ];
    setEntries(sampleEntries);
  }, [language]);

  const getActivityType = (type: MeritMakingActivity['type']) => {
    return MERIT_MAKING_ACTIVITIES.find(a => a.type === type);
  };

  const getFrequencyText = (frequency: MeritMakingActivity['frequency']) => {
    const frequencies = {
      en: {
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        special_occasion: 'Special Occasion'
      },
      th: {
        daily: 'รายวัน',
        weekly: 'รายสัปดาห์',
        monthly: 'รายเดือน',
        special_occasion: 'โอกาสพิเศษ'
      }
    };
    return frequencies[language][frequency];
  };

  const filterEntriesByPeriod = (entries: MeritMakingEntry[], period: 'week' | 'month' | 'year') => {
    const now = new Date();
    const startDate = new Date();
    
    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    return entries.filter(entry => entry.date >= startDate);
  };

  const filteredEntries = filterEntriesByPeriod(entries, selectedPeriod);
  const totalMeritBudget = filteredEntries.reduce((sum, entry) => sum + entry.amount, 0);

  const meritStats = MERIT_MAKING_ACTIVITIES.map(activity => {
    const activityEntries = filteredEntries.filter(e => e.activityType === activity.type);
    const total = activityEntries.reduce((sum, e) => sum + e.amount, 0);
    const count = activityEntries.length;
    return {
      activity,
      total,
      count,
      percentage: totalMeritBudget > 0 ? (total / totalMeritBudget) * 100 : 0
    };
  }).sort((a, b) => b.total - a.total);

  const handleAddEntry = () => {
    if (!newEntry.activityType || !newEntry.amount || !newEntry.date) {
      return;
    }

    const entry: MeritMakingEntry = {
      id: Date.now().toString(),
      activityType: newEntry.activityType,
      amount: newEntry.amount,
      date: newEntry.date,
      location: newEntry.location,
      notes: newEntry.notes,
      frequency: newEntry.frequency || 'monthly'
    };

    setEntries(prev => [...prev, entry]);
    onMeritMakingUpdate?.(entry);
    setNewEntry({});
    setShowAddModal(false);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <ThemeAwareHeading level="h2" className="mb-2" gradient={isPlayMode}>
            {language === 'th' ? '🙏 งบประมาณทำบุญ' : '🙏 Merit Making Budget'}
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary">
            {language === 'th' 
              ? 'จัดการและติดตามการทำบุญตามหลักพุทธศาสนา'
              : 'Manage and track your merit-making activities according to Buddhist principles'
            }
          </ThemeAwareText>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Period Selector */}
          <select 
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-sm"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'year')}
          >
            <option value="week">{language === 'th' ? 'สัปดาห์นี้' : 'This Week'}</option>
            <option value="month">{language === 'th' ? 'เดือนนี้' : 'This Month'}</option>
            <option value="year">{language === 'th' ? 'ปีนี้' : 'This Year'}</option>
          </select>

          <ThemeAwareButton
            variant="primary"
            onClick={() => setShowAddModal(true)}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            {language === 'th' ? 'บันทึกบุญ' : 'Record Merit'}
          </ThemeAwareButton>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <ThemeAwareCard className="p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">💰</div>
            <ThemeAwareText color="secondary" className="text-sm mb-1">
              {language === 'th' ? 'งบประมาณทั้งหมด' : 'Total Merit Budget'}
            </ThemeAwareText>
            <ThemeAwareText className="text-xl font-bold text-green-600">
              {formatThaiCurrency(totalMeritBudget, language, true)}
            </ThemeAwareText>
          </div>
        </ThemeAwareCard>

        <ThemeAwareCard className="p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">📊</div>
            <ThemeAwareText color="secondary" className="text-sm mb-1">
              {language === 'th' ? 'ครั้งที่ทำบุญ' : 'Merit Activities'}
            </ThemeAwareText>
            <ThemeAwareText className="text-xl font-bold text-blue-600">
              {filteredEntries.length}
            </ThemeAwareText>
          </div>
        </ThemeAwareCard>

        <ThemeAwareCard className="p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🏛️</div>
            <ThemeAwareText color="secondary" className="text-sm mb-1">
              {language === 'th' ? 'บริจาควัด' : 'Temple Donations'}
            </ThemeAwareText>
            <ThemeAwareText className="text-xl font-bold text-orange-600">
              {formatThaiCurrency(
                filteredEntries
                  .filter(e => e.activityType === 'temple_donation')
                  .reduce((sum, e) => sum + e.amount, 0),
                language,
                true
              )}
            </ThemeAwareText>
          </div>
        </ThemeAwareCard>

        <ThemeAwareCard className="p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">❤️</div>
            <ThemeAwareText color="secondary" className="text-sm mb-1">
              {language === 'th' ? 'การกุศล' : 'Charity'}
            </ThemeAwareText>
            <ThemeAwareText className="text-xl font-bold text-red-600">
              {formatThaiCurrency(
                filteredEntries
                  .filter(e => e.activityType === 'charity')
                  .reduce((sum, e) => sum + e.amount, 0),
                language,
                true
              )}
            </ThemeAwareText>
          </div>
        </ThemeAwareCard>
      </div>

      {/* Merit Statistics */}
      <ThemeAwareCard className="p-6">
        <ThemeAwareHeading level="h3" className="mb-4">
          {language === 'th' ? '📈 สถิติการทำบุญ' : '📈 Merit Making Statistics'}
        </ThemeAwareHeading>

        <div className="space-y-4">
          {meritStats.map((stat, index) => (
            <motion.div
              key={stat.activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{stat.activity.icon}</div>
                <div>
                  <ThemeAwareText className="font-medium">
                    {stat.activity.name[language]}
                  </ThemeAwareText>
                  <ThemeAwareText color="secondary" className="text-sm">
                    {stat.count} {language === 'th' ? 'ครั้ง' : 'times'} • {stat.percentage.toFixed(1)}%
                  </ThemeAwareText>
                </div>
              </div>
              <ThemeAwareText className="text-lg font-bold text-green-600">
                {formatThaiCurrency(stat.total, language, true)}
              </ThemeAwareText>
            </motion.div>
          ))}
        </div>
      </ThemeAwareCard>

      {/* Recent Merit Activities */}
      <ThemeAwareCard className="p-6">
        <ThemeAwareHeading level="h3" className="mb-4">
          {language === 'th' ? '📋 กิจกรรมทำบุญล่าสุด' : '📋 Recent Merit Activities'}
        </ThemeAwareHeading>

        <div className="space-y-3">
          {filteredEntries
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 5)
            .map((entry, index) => {
              const activity = getActivityType(entry.activityType);
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-xl">{activity?.icon}</div>
                    <div>
                      <ThemeAwareText className="font-medium">
                        {activity?.name[language]}
                      </ThemeAwareText>
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarIcon className="w-4 h-4" />
                        <ThemeAwareText color="secondary">
                          {entry.date.toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US')}
                        </ThemeAwareText>
                        {entry.location && (
                          <>
                            <span>•</span>
                            <ThemeAwareText color="secondary">
                              {entry.location}
                            </ThemeAwareText>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <ThemeAwareText className="font-bold text-green-600">
                    {formatThaiCurrency(entry.amount, language)}
                  </ThemeAwareText>
                </motion.div>
              );
            })}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🙏</div>
            <ThemeAwareText color="secondary">
              {language === 'th' 
                ? 'ยังไม่มีกิจกรรมทำบุญในช่วงเวลานี้'
                : 'No merit-making activities in this period'
              }
            </ThemeAwareText>
          </div>
        )}
      </ThemeAwareCard>

      {/* Merit Making Suggestions */}
      <ThemeAwareCard className="p-6">
        <ThemeAwareHeading level="h3" className="mb-4">
          {language === 'th' ? '💡 คำแนะนำการทำบุญ' : '💡 Merit Making Suggestions'}
        </ThemeAwareHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MERIT_MAKING_ACTIVITIES.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg",
                "hover:border-purple-400 transition-colors cursor-pointer",
                isPlayMode && "hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/10"
              )}
              onClick={() => {
                setNewEntry({
                  activityType: activity.type,
                  frequency: activity.frequency,
                  amount: activity.suggestedAmount.min
                });
                setShowAddModal(true);
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">{activity.icon}</div>
                <ThemeAwareText className="font-medium">
                  {activity.name[language]}
                </ThemeAwareText>
              </div>
              <ThemeAwareText color="secondary" className="text-sm mb-3">
                {activity.description[language]}
              </ThemeAwareText>
              <div className="flex items-center justify-between text-sm">
                <ThemeAwareText color="secondary">
                  {getFrequencyText(activity.frequency)}
                </ThemeAwareText>
                <ThemeAwareText className="font-medium">
                  {formatThaiCurrency(activity.suggestedAmount.min, language)} - {formatThaiCurrency(activity.suggestedAmount.max, language)}
                </ThemeAwareText>
              </div>
            </motion.div>
          ))}
        </div>
      </ThemeAwareCard>

      {/* Add Merit Entry Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowAddModal(false);
              setNewEntry({});
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full"
            >
              <ThemeAwareCard className="p-6">
                <ThemeAwareHeading level="h2" className="mb-6">
                  {language === 'th' ? 'บันทึกการทำบุญ' : 'Record Merit Making'}
                </ThemeAwareHeading>

                <div className="space-y-4">
                  {/* Activity Type */}
                  <div>
                    <ThemeAwareText className="text-sm font-medium mb-2">
                      {language === 'th' ? 'ประเภทการทำบุญ' : 'Merit Activity Type'}
                    </ThemeAwareText>
                    <select 
                      className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={newEntry.activityType || ''}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, activityType: e.target.value as MeritMakingActivity['type'] }))}
                    >
                      <option value="">{language === 'th' ? 'เลือกประเภท' : 'Select Type'}</option>
                      {MERIT_MAKING_ACTIVITIES.map(activity => (
                        <option key={activity.id} value={activity.type}>
                          {activity.icon} {activity.name[language]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount */}
                  <div>
                    <ThemeAwareText className="text-sm font-medium mb-2">
                      {language === 'th' ? 'จำนวนเงิน (บาท)' : 'Amount (THB)'}
                    </ThemeAwareText>
                    <input
                      type="number"
                      className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      placeholder="0"
                      value={newEntry.amount || ''}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <ThemeAwareText className="text-sm font-medium mb-2">
                      {language === 'th' ? 'วันที่' : 'Date'}
                    </ThemeAwareText>
                    <input
                      type="date"
                      className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={newEntry.date?.toISOString().split('T')[0] || ''}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, date: new Date(e.target.value) }))}
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <ThemeAwareText className="text-sm font-medium mb-2">
                      {language === 'th' ? 'สถานที่' : 'Location'}
                    </ThemeAwareText>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      placeholder={language === 'th' ? 'เช่น วัดพระแก้ว' : 'e.g., Wat Phra Kaew'}
                      value={newEntry.location || ''}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <ThemeAwareText className="text-sm font-medium mb-2">
                      {language === 'th' ? 'หมายเหตุ' : 'Notes'}
                    </ThemeAwareText>
                    <textarea
                      className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      rows={3}
                      placeholder={language === 'th' ? 'รายละเอียดเพิ่มเติม...' : 'Additional details...'}
                      value={newEntry.notes || ''}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <ThemeAwareButton
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowAddModal(false);
                      setNewEntry({});
                    }}
                  >
                    {language === 'th' ? 'ยกเลิก' : 'Cancel'}
                  </ThemeAwareButton>
                  <ThemeAwareButton
                    variant="primary"
                    className="flex-1"
                    onClick={handleAddEntry}
                  >
                    {language === 'th' ? 'บันทึก' : 'Record'}
                  </ThemeAwareButton>
                </div>
              </ThemeAwareCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
