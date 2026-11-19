export type PlaceCategory = 'makkah' | 'madinah' | 'wells' | 'battles'

export type Place = {
  id: string
  name: string
  category: PlaceCategory
  coords: [number, number]
  subtitle: string
  description: string
}

export const categoryLabels: Record<PlaceCategory, string> = {
  makkah: 'معالم مكة',
  madinah: 'معالم المدينة',
  wells: 'الآبار',
  battles: 'الغزوات',
}

export const categoryColors: Record<PlaceCategory, string> = {
  makkah: '#1f4d3a',
  madinah: '#2f6f8f',
  wells: '#b8862b',
  battles: '#a63d2f',
}

export const places: Place[] = [
  {
    id: 'kaaba',
    name: 'المسجد الحرام والكعبة',
    category: 'makkah',
    coords: [21.4225, 39.8262],
    subtitle: 'أول بيت وضع للناس',
    description:
      'شارك النبي ﷺ في بنائها قبل البعثة، وفيها جهر بالدعوة، وطهّرها من الأصنام يوم الفتح.',
  },
  {
    id: 'birthplace',
    name: 'موضع المولد الشريف',
    category: 'makkah',
    coords: [21.4239, 39.8291],
    subtitle: 'شِعب بني هاشم',
    description: 'الموضع الذي يُذكر أنه وُلد فيه النبي ﷺ، وتقوم عليه اليوم مكتبة مكة المكرمة.',
  },
  {
    id: 'hira',
    name: 'غار حراء',
    category: 'makkah',
    coords: [21.4575, 39.8592],
    subtitle: 'جبل النور · مهبط الوحي',
    description:
      'كان ﷺ يتحنث فيه الليالي، وفيه نزل عليه جبريل عليه السلام بأول آيات القرآن: ﴿اقرأ﴾.',
  },
  {
    id: 'thawr',
    name: 'غار ثور',
    category: 'makkah',
    coords: [21.3772, 39.8497],
    subtitle: 'مخبأ الهجرة',
    description:
      'جنوب مكة، اختبأ فيه النبي ﷺ وأبو بكر ثلاث ليال قبل انطلاقهما إلى المدينة.',
  },
  {
    id: 'arqam',
    name: 'دار الأرقم',
    category: 'makkah',
    coords: [21.4229, 39.8277],
    subtitle: 'عند جبل الصفا',
    description: 'أول مقر للدعوة السرية، يجتمع فيه النبي ﷺ بأصحابه يعلمهم ويربيهم.',
  },
  {
    id: 'shib',
    name: 'شِعب أبي طالب',
    category: 'makkah',
    coords: [21.4262, 39.8318],
    subtitle: 'موضع المقاطعة',
    description: 'حوصر فيه بنو هاشم وبنو المطلب نحو ثلاث سنوات حتى نُقضت الصحيفة.',
  },
  {
    id: 'quba',
    name: 'مسجد قباء',
    category: 'madinah',
    coords: [24.4393, 39.6172],
    subtitle: 'أول مسجد أسس على التقوى',
    description: 'أسسه النبي ﷺ عند وصوله مهاجرًا قبل دخوله المدينة.',
  },
  {
    id: 'nabawi',
    name: 'المسجد النبوي',
    category: 'madinah',
    coords: [24.4672, 39.6112],
    subtitle: 'مسجده ﷺ',
    description:
      'بناه ﷺ عند مبرك ناقته، وكان مركز العلم والحكم والعبادة في دولة الإسلام الأولى.',
  },
  {
    id: 'house',
    name: 'منزل النبي ﷺ (الحجرات)',
    category: 'madinah',
    coords: [24.4673, 39.6125],
    subtitle: 'حجرة عائشة رضي الله عنها',
    description:
      'بُنيت حجرات أمهات المؤمنين ملاصقة للمسجد شرقًا، وكانت متواضعة من اللبن وسعف النخل، وفي حجرة عائشة توفي ﷺ ودُفن.',
  },
  {
    id: 'zamzam',
    name: 'بئر زمزم',
    category: 'wells',
    coords: [21.4223, 39.8265],
    subtitle: 'بجوار الكعبة',
    description: 'البئر المباركة التي حفرها عبد المطلب جد النبي ﷺ بعد أن طُمرت زمانًا.',
  },
  {
    id: 'rumah',
    name: 'بئر رومة',
    category: 'wells',
    coords: [24.5167, 39.5833],
    subtitle: 'بئر عثمان رضي الله عنه',
    description:
      'اشتراها عثمان بن عفان رضي الله عنه وجعلها للمسلمين بعد أن قال ﷺ: «من يشتري بئر رومة فله الجنة».',
  },
  {
    id: 'aris',
    name: 'بئر أريس (بئر الخاتم)',
    category: 'wells',
    coords: [24.4409, 39.6149],
    subtitle: 'قرب مسجد قباء',
    description: 'جلس عليها النبي ﷺ، وسقط فيها خاتمه من يد عثمان رضي الله عنه في خلافته.',
  },
  {
    id: 'bayruha',
    name: 'بئر حاء',
    category: 'wells',
    coords: [24.4682, 39.6118],
    subtitle: 'بستان أبي طلحة',
    description:
      'كان النبي ﷺ يدخلها ويشرب من ماء فيها طيب، وتصدق بها أبو طلحة لما نزل قوله تعالى: ﴿لن تنالوا البر حتى تنفقوا مما تحبون﴾.',
  },
  {
    id: 'ghars',
    name: 'بئر غرس',
    category: 'wells',
    coords: [24.4579, 39.6292],
    subtitle: 'شرق قباء',
    description: 'من الآبار التي شرب منها النبي ﷺ، ويُروى أنه أوصى أن يُغسَّل من مائها.',
  },
  {
    id: 'badr',
    name: 'غزوة بدر الكبرى',
    category: 'battles',
    coords: [23.7769, 38.7908],
    subtitle: '17 رمضان · 2هـ',
    description:
      'يوم الفرقان؛ خرج فيه نحو 313 من المسلمين، فنصرهم الله على نحو ألف من قريش.',
  },
  {
    id: 'uhud',
    name: 'غزوة أحد',
    category: 'battles',
    coords: [24.4985, 39.6136],
    subtitle: 'شوال · 3هـ',
    description: 'عند جبل أحد وجبل الرماة، وفيها استشهد حمزة رضي الله عنه وسبعون من الصحابة.',
  },
  {
    id: 'khandaq',
    name: 'غزوة الأحزاب (الخندق)',
    category: 'battles',
    coords: [24.4783, 39.5973],
    subtitle: 'شوال · 5هـ',
    description: 'حفر المسلمون الخندق بمشورة سلمان الفارسي، وحاصرت الأحزاب المدينة قرابة شهر.',
  },
  {
    id: 'hudaybiyyah',
    name: 'صلح الحديبية',
    category: 'battles',
    coords: [21.444, 39.614],
    subtitle: 'ذو القعدة · 6هـ',
    description: 'بيعة الرضوان تحت الشجرة، ثم الصلح الذي سماه الله فتحًا مبينًا.',
  },
  {
    id: 'khaybar',
    name: 'غزوة خيبر',
    category: 'battles',
    coords: [25.696, 39.292],
    subtitle: 'محرم · 7هـ',
    description: 'فُتحت حصون خيبر، وأعطى ﷺ الراية لعلي بن أبي طالب رضي الله عنه.',
  },
  {
    id: 'fath',
    name: 'فتح مكة',
    category: 'battles',
    coords: [21.4335, 39.8215],
    subtitle: 'رمضان · 8هـ',
    description: 'دخلها ﷺ بعشرة آلاف، وعفا عن أهلها، وتحطمت الأصنام حول الكعبة.',
  },
  {
    id: 'hunayn',
    name: 'غزوة حنين',
    category: 'battles',
    coords: [21.55, 40.09],
    subtitle: 'شوال · 8هـ',
    description:
      'أعجبت المسلمين كثرتهم فلم تغن عنهم شيئًا في أولها، ثم ثبت النبي ﷺ ومن معه فكان النصر.',
  },
  {
    id: 'tabuk',
    name: 'غزوة تبوك',
    category: 'battles',
    coords: [28.3835, 36.5662],
    subtitle: 'رجب · 9هـ',
    description: 'غزوة العسرة في شدة الحر، وفيها تجلت نفقات الصحابة وظهر أمر المنافقين.',
  },
]

export type RouteStop = { name: string; coords: [number, number] }

export const hijraRoute: RouteStop[] = [
  { name: 'مكة المكرمة', coords: [21.4225, 39.8262] },
  { name: 'غار ثور', coords: [21.3772, 39.8497] },
  { name: 'باتجاه الساحل', coords: [21.36, 39.55] },
  { name: 'عُسفان', coords: [21.92, 39.36] },
  { name: 'قُديد', coords: [22.38, 39.12] },
  { name: 'الخرّار', coords: [22.85, 39.05] },
  { name: 'مُدلجة', coords: [23.35, 39.1] },
  { name: 'العَرْج', coords: [23.85, 39.35] },
  { name: 'ركوبة', coords: [24.2, 39.5] },
  { name: 'قباء', coords: [24.4393, 39.6172] },
  { name: 'المدينة المنورة', coords: [24.4672, 39.6112] },
]
