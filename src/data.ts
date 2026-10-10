import {
  Building2,
  Grid2X2,
  Hammer,
  Paintbrush,
  ShieldCheck,
  Sun,
  Warehouse,
  type LucideIcon,
} from 'lucide-react'

export type ServiceId =
  | 'shades'
  | 'screens'
  | 'security-fences'
  | 'mesh'
  | 'metalwork'
  | 'hangars'
  | 'finishing'

export type Service = {
  id: ServiceId
  title: string
  shortTitle: string
  description: string
  image: string
  imageAlt: string
  icon: LucideIcon
  highlights: string[]
}

export const services: Service[] = [
  {
    id: 'shades',
    title: 'المظلات',
    shortTitle: 'مظلات عملية وأنيقة',
    description:
      'حلول للمواقف والساحات الخارجية بتصاميم مدروسة وخامات مناسبة لأجواء المملكة، مع اهتمام بثبات الهيكل وانسجامه مع المكان.',
    image: '/images/service-shades.jpg',
    imageAlt: 'صورة توضيحية لمظلات سيارات في فناء منزل حديث',
    icon: Sun,
    highlights: ['مظلات سيارات', 'مظلات ساحات وممرات', 'خيارات تصميم متعددة'],
  },
  {
    id: 'screens',
    title: 'السواتر',
    shortTitle: 'خصوصية بتصميم متناسق',
    description:
      'سواتر للمنازل والمنشآت تجمع بين الخصوصية والمظهر المرتب، مع اختيار الشكل وطريقة التركيب بما يلائم الموقع.',
    image: '/images/service-screens.jpg',
    imageAlt: 'صورة توضيحية لسواتر خصوصية حول منزل حديث',
    icon: Building2,
    highlights: ['سواتر للمنازل', 'حلول للمنشآت', 'تشطيبات متناسقة'],
  },
  {
    id: 'security-fences',
    title: 'السياجات الأمنية',
    shortTitle: 'حماية حدود المواقع',
    description:
      'تنفيذ سياجات للمرافق والمواقع المختلفة مع مراعاة طبيعة الأرض ومتطلبات الحماية وسهولة الوصول.',
    image: '/images/service-security.jpg',
    imageAlt: 'صورة توضيحية لسياج أمني حول منشأة حديثة',
    icon: ShieldCheck,
    highlights: ['سياج محيطي', 'تنظيم المداخل', 'تركيب للمرافق والمنشآت'],
  },
  {
    id: 'mesh',
    title: 'الشبوك',
    shortTitle: 'تحديد عملي للمساحات',
    description:
      'شبوك للمزارع والملاعب والساحات ومواقع العمل، بخيارات مناسبة للاستخدام وطبيعة المساحة المطلوب تحديدها.',
    image: '/images/service-mesh.jpg',
    imageAlt: 'صورة توضيحية لشبك معدني حول ملعب خارجي',
    icon: Grid2X2,
    highlights: ['شبوك ملاعب', 'شبوك مزارع', 'حلول لتحديد المساحات'],
  },
  {
    id: 'metalwork',
    title: 'أعمال الحدادة',
    shortTitle: 'تصنيع معدني حسب الطلب',
    description:
      'أعمال حدادة وهياكل معدنية بتفاصيل دقيقة، من الدرج والدرابزين إلى البوابات والمظلات والهياكل الخاصة.',
    image: '/images/service-metalwork.jpg',
    imageAlt: 'صورة توضيحية لأعمال حدادة ودرج معدني داخل منزل',
    icon: Hammer,
    highlights: ['درج ودرابزين', 'بوابات وهياكل', 'تصنيع حسب المقاس'],
  },
  {
    id: 'hangars',
    title: 'الهناجر',
    shortTitle: 'مساحات جاهزة للعمل',
    description:
      'تنفيذ هناجر وهياكل للمستودعات والمرافق، مع عناية بالتخطيط الإنشائي واستغلال المساحة ومتطلبات الاستخدام.',
    image: '/images/service-hangars.jpg',
    imageAlt: 'صورة توضيحية لهناجر معدنية في موقع صناعي',
    icon: Warehouse,
    highlights: ['هناجر ومستودعات', 'هياكل معدنية', 'حلول للمواقع الصناعية'],
  },
  {
    id: 'finishing',
    title: 'التشطيبات والترميمات',
    shortTitle: 'تجديد يعيد للمكان قيمته',
    description:
      'أعمال تشطيب وترميم للمباني، تبدأ بتحديد الاحتياج وتنتهي بمراجعة التفاصيل للحصول على نتيجة متناسقة وعملية.',
    image: '/images/service-renovation.jpg',
    imageAlt: 'صورة توضيحية لواجهة منزل بعد أعمال ترميم وتجديد',
    icon: Paintbrush,
    highlights: ['ترميم الواجهات', 'أعمال التشطيب', 'تحسين المساحات القائمة'],
  },
]

export type Project = {
  id: string
  serviceId: ServiceId
  title: string
  context: string
  description: string
  image: string
  imageAlt: string
}

export const projects: Project[] = [
  {
    id: 'shade-courtyard',
    serviceId: 'shades',
    title: 'مظلات لموقف سكني',
    context: 'مساحات سكنية',
    description:
      'تصوّر لمظلات سيارات بهيكل أنيق يوفّر الظل ويحافظ على انسيابية الحركة في مدخل المنزل.',
    image: '/images/service-shades.jpg',
    imageAlt: 'تصوّر توضيحي لمظلات سيارات في مدخل منزل',
  },
  {
    id: 'shade-modern-villa',
    serviceId: 'shades',
    title: 'مظلّة بتصميم معاصر',
    context: 'مساحات سكنية',
    description:
      'تصوّر ثانٍ لمظلّة سيارات بخطوط انسيابية، مع مراعاة الظل وتناسق الهيكل مع واجهة المنزل.',
    image: '/images/hero-enjaz.jpg',
    imageAlt: 'تصوّر توضيحي لمظلّة سيارات بتصميم معاصر في منزل',
  },
  {
    id: 'privacy-screen',
    serviceId: 'screens',
    title: 'ساتر بلمسة عصرية',
    context: 'مساحات سكنية',
    description:
      'تصوّر لسواتر خصوصية متناسقة مع الواجهة، بتفاصيل هادئة وإطار معدني عملي.',
    image: '/images/service-screens.jpg',
    imageAlt: 'تصوّر توضيحي لساتر خصوصية حول فناء منزل',
  },
  {
    id: 'privacy-gate',
    serviceId: 'screens',
    title: 'ساتر وبوابة بخصوصية متناسقة',
    context: 'مساحات سكنية',
    description:
      'تصوّر إضافي لساتر وبوابة خارجية بخطوط متوازنة، يحددان المساحة ويحافظان على خصوصية الفناء.',
    image: '/images/service-screens-detail.jpg',
    imageAlt: 'تصوّر توضيحي لساتر وبوابة خصوصية حول فناء منزل',
  },
  {
    id: 'secure-perimeter',
    serviceId: 'security-fences',
    title: 'سياج محيطي لمنشأة',
    context: 'مرافق ومنشآت',
    description:
      'تصوّر لسياج محيطي يحدّد نطاق الموقع ويوفّر حماية عملية مع تنظيم نقاط الدخول.',
    image: '/images/service-security.jpg',
    imageAlt: 'تصوّر توضيحي لسياج أمني حول منشأة',
  },
  {
    id: 'secure-entry',
    serviceId: 'security-fences',
    title: 'تنظيم مدخل سياج أمني',
    context: 'مرافق ومنشآت',
    description:
      'تصوّر إضافي لسياج وبوابة دخول لمنشأة، مع خطوط تركيب واضحة وتفاصيل عملية للموقع.',
    image: '/images/service-security-detail.jpg',
    imageAlt: 'تصوّر توضيحي لسياج أمني وبوابة دخول لمنشأة',
  },
  {
    id: 'sports-mesh',
    serviceId: 'mesh',
    title: 'شبك لملعب خارجي',
    context: 'مرافق رياضية',
    description:
      'تصوّر لشبك معدني حول ملعب يساعد على تحديد المساحة والحفاظ على استخدامها اليومي.',
    image: '/images/service-mesh.jpg',
    imageAlt: 'تصوّر توضيحي لشبك ملعب خارجي',
  },
  {
    id: 'steel-staircase',
    serviceId: 'metalwork',
    title: 'تفاصيل معدنية حسب المقاس',
    context: 'أعمال حدادة',
    description:
      'تصوّر لدرج ودرابزين معدنيين يجمعان بين المتانة والخطوط البسيطة داخل مساحة معاصرة.',
    image: '/images/service-metalwork.jpg',
    imageAlt: 'تصوّر توضيحي لدرج ودرابزين معدني',
  },
  {
    id: 'steel-hangar',
    serviceId: 'hangars',
    title: 'هنجر لموقع صناعي',
    context: 'مرافق صناعية',
    description:
      'تصوّر لهنجر معدني واسع يتيح مساحة تشغيل مرنة للمستودعات والمرافق المختلفة.',
    image: '/images/service-hangars.jpg',
    imageAlt: 'تصوّر توضيحي لهنجر معدني في موقع صناعي',
  },
  {
    id: 'villa-renewal',
    serviceId: 'finishing',
    title: 'تجديد واجهة سكنية',
    context: 'تشطيبات وترميمات',
    description:
      'تصوّر لواجهة بعد أعمال تجديد وتشطيب، مع إبراز المواد والألوان بصورة متناسقة.',
    image: '/images/service-renovation.jpg',
    imageAlt: 'تصوّر توضيحي لواجهة منزل بعد التجديد',
  },
]
