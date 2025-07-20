import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ja' | 'en' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ja: {
    'app.title': 'HyMatch',
    'app.subtitle': '理想のアルバイトを見つけよう',
    'common.menu': 'メニュー',
    'tabs.jobs': 'お仕事',
    'tabs.refused': '見送り',
    'tabs.chosen': '応募済み',
    'tabs.profile': 'プロフィール',
    'contact.title': 'お問い合わせ',
    'contact.phone': '電話',
    'contact.email': 'メール',
    'contact.chat': 'チャット',
    'contact.subtitle': 'サポートチームにお気軽にお問い合わせください',
    'contact.phoneDetail': '月-金 9:00-18:00',
    'contact.emailDetail': '24時間以内に返信',
    'contact.chatDetail': '24時間対応',
    'profile.incomplete': 'プロフィールが未完成です',
    'profile.complete': 'プロフィールを完成させる',
    'profile.edit': 'プロフィール編集',
    'profile.basicInfo': '基本情報',
    'profile.contactInfo': '連絡先情報',
    'profile.workPreferences': '勤務希望',
    'profile.firstName': '名前',
    'profile.lastName': '苗字',
    'profile.age': '年齢',
    'profile.gender': '性別',
    'profile.nationality': '国籍',
    'profile.email': 'メールアドレス',
    'profile.phone': '電話番号',
    'profile.japaneseLevel': '日本語レベル',
    'profile.preferredDays': '希望勤務日',
    'profile.preferredJobTypes': '希望職種',
    'profile.addPhoto': '写真を追加',
    'profile.save': 'プロフィールを保存',
    'profile.male': '男性',
    'profile.female': '女性',
    'profile.other': 'その他',
    'filter.title': 'フィルター',
    'filter.jobType': '職種',
    'filter.wage': '時給',
    'filter.japanese': '日本語レベル',
    'filter.workDays': '勤務日',
    'filter.reset': 'リセット',
    'filter.apply': 'フィルターを適用',
    'sort.wage': '時給順',
    'sort.commute': '通勤時間順',
    'sort.date': '投稿日順',
    'sort.title': '並び替え',
    'empty.chosen': 'まだ応募した求人がありません',
    'empty.chosenSub': 'いいねした求人がここに表示されます',
    'empty.refused': 'まだ見送った求人がありません',
    'empty.refusedSub': 'パスした求人がここに表示されます',
    'language.select': '言語を選択',
  },
  en: {
    'app.title': 'HyMatch',
    'app.subtitle': 'Find Your Perfect Part-Time Job',
    'common.menu': 'Menu',
    'tabs.jobs': 'Jobs',
    'tabs.refused': 'Refused',
    'tabs.chosen': 'Chosen',
    'tabs.profile': 'Profile',
    'contact.title': 'Contact Us',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.chat': 'Live Chat',
    'contact.subtitle': 'Need help? Get in touch with our support team.',
    'contact.phoneDetail': 'Mon-Fri 9:00-18:00',
    'contact.emailDetail': 'Response within 24 hours',
    'contact.chatDetail': 'Available 24/7',
    'profile.incomplete': 'Profile is incomplete',
    'profile.complete': 'Complete Profile',
    'profile.edit': 'Edit Profile',
    'profile.basicInfo': 'Basic Information',
    'profile.contactInfo': 'Contact Information',
    'profile.workPreferences': 'Work Preferences',
    'profile.firstName': 'First Name',
    'profile.lastName': 'Last Name',
    'profile.age': 'Age',
    'profile.gender': 'Gender',
    'profile.nationality': 'Nationality',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    'profile.japaneseLevel': 'Japanese Level',
    'profile.preferredDays': 'Preferred Work Days',
    'profile.preferredJobTypes': 'Preferred Job Types',
    'profile.addPhoto': 'Add Photo',
    'profile.save': 'Save Profile',
    'profile.male': 'Male',
    'profile.female': 'Female',
    'profile.other': 'Other',
    'filter.title': 'Filter',
    'filter.jobType': 'Job Type',
    'filter.wage': 'Wage',
    'filter.japanese': 'Japanese Level',
    'filter.workDays': 'Work Days',
    'filter.reset': 'Reset',
    'filter.apply': 'Apply Filters',
    'sort.wage': 'By Wage',
    'sort.commute': 'By Commute',
    'sort.date': 'By Date',
    'sort.title': 'Sort By',
    'empty.chosen': 'No chosen jobs yet',
    'empty.chosenSub': 'Jobs you like will appear here',
    'empty.refused': 'No refused jobs yet',
    'empty.refusedSub': 'Jobs you pass on will appear here',
    'language.select': 'Select Language',
  },
  uz: {
    'app.title': 'HyMatch',
    'app.subtitle': 'Mukammal qisman ish topish',
    'common.menu': 'Menyu',
    'tabs.jobs': 'Ishlar',
    'tabs.refused': 'Rad etilgan',
    'tabs.chosen': 'Tanlangan',
    'tabs.profile': 'Profil',
    'contact.title': 'Aloqa',
    'contact.phone': 'Telefon',
    'contact.email': 'Email',
    'contact.chat': 'Jonli chat',
    'contact.subtitle': 'Yordam kerakmi? Qo\'llab-quvvatlash jamoamiz bilan bog\'laning.',
    'contact.phoneDetail': 'Dush-Jum 9:00-18:00',
    'contact.emailDetail': '24 soat ichida javob',
    'contact.chatDetail': '24/7 mavjud',
    'profile.incomplete': 'Profil to\'liq emas',
    'profile.complete': 'Profilni to\'ldirish',
    'profile.edit': 'Profilni tahrirlash',
    'profile.basicInfo': 'Asosiy ma\'lumotlar',
    'profile.contactInfo': 'Aloqa ma\'lumotlari',
    'profile.workPreferences': 'Ish afzalliklari',
    'profile.firstName': 'Ism',
    'profile.lastName': 'Familiya',
    'profile.age': 'Yosh',
    'profile.gender': 'Jins',
    'profile.nationality': 'Millat',
    'profile.email': 'Email',
    'profile.phone': 'Telefon',
    'profile.japaneseLevel': 'Yapon tili darajasi',
    'profile.preferredDays': 'Afzal ko\'rilgan ish kunlari',
    'profile.preferredJobTypes': 'Afzal ko\'rilgan ish turlari',
    'profile.addPhoto': 'Rasm qo\'shish',
    'profile.save': 'Profilni saqlash',
    'profile.male': 'Erkak',
    'profile.female': 'Ayol',
    'profile.other': 'Boshqa',
    'filter.title': 'Filtr',
    'filter.jobType': 'Ish turi',
    'filter.wage': 'Maosh',
    'filter.japanese': 'Yapon tili darajasi',
    'filter.workDays': 'Ish kunlari',
    'filter.reset': 'Qayta o\'rnatish',
    'filter.apply': 'Filtrlarni qo\'llash',
    'sort.wage': 'Maosh bo\'yicha',
    'sort.commute': 'Yo\'l vaqti bo\'yicha',
    'sort.date': 'Sana bo\'yicha',
    'sort.title': 'Saralash',
    'empty.chosen': 'Hali tanlangan ishlar yo\'q',
    'empty.chosenSub': 'Yoqtirgan ishlaringiz shu yerda ko\'rinadi',
    'empty.refused': 'Hali rad etilgan ishlar yo\'q',
    'empty.refusedSub': 'O\'tkazib yuborilgan ishlar shu yerda ko\'rinadi',
    'language.select': 'Tilni tanlang',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ja');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}