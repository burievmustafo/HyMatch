import { Tabs } from 'expo-router';
import { Heart, X, Check, User, Settings } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TabLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 12,
        },
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#9ca3af',
      }}>
      <Tabs.Screen
        name="refused"
        options={{
          title: t('tabs.refused'),
          tabBarIcon: ({ size, color }) => (
            <X size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.jobs'),
          tabBarIcon: ({ size, color }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chosen"
        options={{
          title: t('tabs.chosen'),
          tabBarIcon: ({ size, color }) => (
            <Check size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}