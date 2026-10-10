import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers3,
  Menu,
  MoveUpLeft,
  Sparkles,
  X,
} from 'lucide-react'
import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from 'react-router-dom'
import { projects, services, type Project, type Service, type ServiceId } from './data'

const featuredProjects = projects
  .filter((project, index, allProjects) => allProjects.findIndex((item) => item.serviceId === project.serviceId) === index)
  .slice(0, 3)

const processSteps = [
  {
    number: '01',
    title: 'نفهم احتياجك',
    description: 'نبدأ بمعرفة طبيعة الموقع والاستخدام المطلوب قبل اقتراح الحل.',
  },
  {
    number: '02',
    title: 'نحدّد التفاصيل',
    description: 'نراجع المقاسات والخامات والتصميم بما يناسب المشروع.',
  },
  {
    number: '03',
    title: 'ننفّذ بعناية',
    description: 'نرتّب مراحل العمل ونعتني بالتفاصيل أثناء التصنيع والتركيب.',
  },
  {
    number: '04',
    title: 'نراجع ونسلّم',
    description: 'نراجع النتيجة النهائية ونتأكد من جاهزية الموقع للاستخدام.',
  },
]

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="شركة إنجاز، الصفحة الرئيسية">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M9 35 24 15l15 20v5H9v-5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M18 40V28h12v12M6 18h8m-10 7h7" stroke="#D9AD74" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="36" cy="12" r="2.2" fill="#D9AD74" />
        </svg>
      </span>
      <span className="brand-copy">
        <span className="brand-name">إنجاز</span>
        <span className="brand-caption">للمظلات والمقاولات</span>
      </span>
    </Link>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav
          className={`main-nav${menuOpen ? ' is-open' : ''}`}
          id="main-navigation"
          aria-label="التنقل الرئيسي"
        >
          <NavLink to="/" end onClick={closeMenu}>
            الرئيسية
          </NavLink>
          <NavLink to="/services" onClick={closeMenu}>
            خدماتنا
          </NavLink>
          <NavLink to="/projects" onClick={closeMenu}>
            مشاريعنا
          </NavLink>
        </nav>
        <div className="header-actions">
          <Link className="header-cta" to="/projects">
            <span>استكشف أعمالنا</span>
            <ArrowUpLeft size={17} strokeWidth={1.8} aria-hidden="true" />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
    </header>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return null
}

type EyebrowProps = {
  children: ReactNode
  light?: boolean
}

function Eyebrow({ children, light = false }: EyebrowProps) {
  return (
    <p className={`eyebrow${light ? ' eyebrow--light' : ''}`}>
      <span className="eyebrow-line" aria-hidden="true" />
      {children}
    </p>
  )
}

type PageIntroProps = {
  eyebrow: string
  title: ReactNode
  description: string
  image: string
  imageAlt: string
  code: string
  linkTo?: string
  linkLabel?: string
}

function PageIntro({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  code,
  linkTo = '/projects',
  linkLabel = 'استعرض ألبومات الأعمال',
}: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="container page-intro-inner">
        <div className="page-intro-copy">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="page-intro-links">
            <Link className="text-link" to={linkTo}>
              <span>{linkLabel}</span>
              <ArrowLeft size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="page-intro-visual">
          <img src={image} alt={imageAlt} />
          <span className="page-intro-visual-shade" aria-hidden="true" />
          <div className="page-intro-stamp" aria-hidden="true">
            <span className="page-intro-stamp-code">{code}</span>
            <span className="page-intro-stamp-label">إنجاز يبدأ من التفاصيل</span>
          </div>
          <span className="page-intro-corner" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
}

function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action && <div className="section-heading-action">{action}</div>}
    </div>
  )
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon
  const cardNumber = String(index + 1).padStart(2, '0')

  return (
    <article className="service-card">
      <Link
        className="service-card-image"
        to={`/projects?category=${service.id}`}
        aria-label={`استعرض ألبوم ${service.title} في صفحة مشاريعنا`}
      >
        <img src={service.image} alt={service.imageAlt} loading="lazy" />
        <span className="service-card-image-overlay" aria-hidden="true" />
        <span className="service-card-number">{cardNumber} / 07</span>
        <span className="service-photo-note">صورة توضيحية</span>
        <span className="service-card-icon" aria-hidden="true">
          <Icon size={21} strokeWidth={1.7} />
        </span>
      </Link>
      <div className="service-card-content">
        <div className="service-card-title-row">
          <div>
            <span className="service-card-kicker">{service.shortTitle}</span>
            <h3>{service.title}</h3>
          </div>
          <Link
            className="round-arrow"
            to={`/projects?category=${service.id}`}
            aria-label={`مشاريع ${service.title}`}
          >
            <ArrowUpLeft size={18} aria-hidden="true" />
          </Link>
        </div>
        <p>{service.description}</p>
        <ul className="service-highlights" aria-label={`مجالات ${service.title}`}>
          {service.highlights.map((highlight) => (
            <li key={highlight}>
              <Check size={13} aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <Eyebrow light>شركة إنجاز · للمظلات والمقاولات</Eyebrow>
            <h1 id="home-title">
              من الفكرة،<br />
              إلى <span>إنجازٍ يُعتمد عليه.</span>
            </h1>
            <p className="hero-description">
              ننفّذ المظلات والسواتر والسياجات الأمنية والشبوك، إلى جانب أعمال الحدادة والهناجر والتشطيبات والترميمات.
            </p>
            <div className="hero-actions">
              <Link className="button button--gold" to="/services">
                <span>اكتشف خدماتنا</span>
                <ArrowLeft size={18} aria-hidden="true" />
              </Link>
              <Link className="button button--ghost" to="/projects">
                <span>شاهد مشاريعنا</span>
                <MoveUpLeft size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-meta">
              <span>
                <BadgeCheck size={17} aria-hidden="true" />
                حلول تناسب احتياج الموقع
              </span>
              <span className="hero-meta-separator" aria-hidden="true" />
              <span>الرياض وجميع مناطق المملكة</span>
            </div>
          </div>
          <a className="hero-scroll" href="#overview" aria-label="انتقل إلى نبذة عن إنجاز">
            <span>اكتشف إنجاز</span>
            <ArrowDown size={17} aria-hidden="true" />
          </a>
          <div className="hero-index" aria-hidden="true">
            <span>01</span>
            <span className="hero-index-line" />
            <span>07</span>
          </div>
        </div>
      </section>

      <section className="service-ribbon" aria-label="مجالات خدمات إنجاز">
        <div className="container service-ribbon-inner">
          <span className="service-ribbon-label">ننجز في</span>
          {services.map((service) => (
            <span className="service-ribbon-item" key={service.id}>
              {service.title}
            </span>
          ))}
        </div>
      </section>

      <section className="section overview-section" id="overview">
        <div className="container overview-grid">
          <div className="overview-heading">
            <Eyebrow>عن شركة إنجاز</Eyebrow>
            <h2>تنفيذ يوازن بين <span>الجودة</span> واحتياج المكان.</h2>
          </div>
          <div className="overview-copy">
            <p>
              لكل موقع متطلباته، ولكل مشروع تفاصيله. في إنجاز نبدأ بفهم الاستخدام والمساحة، ثم نقدّم الحل المناسب ونعتني بمراحل التنفيذ حتى التسليم.
            </p>
            <Link className="text-link" to="/services">
              <span>تعرّف على طريقة عملنا</span>
              <ArrowLeft size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="overview-note">
            <span className="overview-note-icon"><Layers3 size={22} aria-hidden="true" /></span>
            <span className="overview-note-value">07</span>
            <span className="overview-note-label">مجالات تنفيذ متكاملة</span>
            <span className="overview-note-rule" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="section services-preview-section" id="services-overview">
        <div className="container">
          <SectionHeading
            eyebrow="حلول متكاملة"
            title="خدماتنا، من المساحة إلى أدق تفصيلة"
            description="مجالات متنوعة للمنازل والمنشآت والمواقع الصناعية، بخيارات تُبنى على احتياج مشروعك."
            action={
              <Link className="text-link" to="/services">
                <span>جميع الخدمات</span>
                <ArrowLeft size={17} aria-hidden="true" />
              </Link>
            }
          />
          <div className="service-grid service-grid--preview">
            {services.slice(0, 4).map((service, index) => (
              <ServiceCard service={service} index={index} key={service.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div className="container showcase-grid">
          <div className="showcase-image-wrap">
            <img
              src="/images/service-renovation.jpg"
              alt="صورة توضيحية لواجهة منزل بعد أعمال الترميم والتجديد"
              loading="lazy"
            />
            <div className="showcase-image-note">
              <span className="showcase-image-note-dot" aria-hidden="true" />
              <span>صورة توضيحية</span>
            </div>
            <div className="showcase-image-index" aria-hidden="true">ENJAZ · 2026</div>
          </div>
          <div className="showcase-copy">
            <Eyebrow>من التخطيط إلى التسليم</Eyebrow>
            <h2>خطوات واضحة،<br /><span>ونتيجة تليق بمشروعك.</span></h2>
            <p>
              سواء كان العمل مظلة لموقف، أو سياجًا لمرفق، أو ترميمًا لواجهة؛ نرتّب تفاصيل المشروع بما يساعد على تنفيذ متناسق وواضح من البداية.
            </p>
            <ul className="showcase-checklist">
              <li><Check size={16} aria-hidden="true" /><span>معاينة وفهم لطبيعة الموقع</span></li>
              <li><Check size={16} aria-hidden="true" /><span>اختيار حل وخامات مناسبة</span></li>
              <li><Check size={16} aria-hidden="true" /><span>متابعة التفاصيل حتى التسليم</span></li>
            </ul>
            <Link className="button button--dark" to="/services">
              <span>ابدأ باستكشاف الخدمات</span>
              <ArrowLeft size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-projects-section">
        <div className="container">
          <SectionHeading
            eyebrow="نماذج من الأعمال"
            title="شاهد مجالات التنفيذ عن قرب"
            description="تصفّح ألبومات الخدمات واختر المجال الذي تبحث عنه. الصور المعروضة توضيحية إلى حين إضافة الصور الأصلية للمشاريع."
            action={
              <Link className="text-link" to="/projects">
                <span>كل المشاريع</span>
                <ArrowLeft size={17} aria-hidden="true" />
              </Link>
            }
          />
          <div className="project-preview-grid">
            {featuredProjects.map((project, index) => {
              const service = services.find((item) => item.id === project.serviceId)
              return (
                <Link
                  className="project-preview-card"
                  to={`/projects?category=${project.serviceId}`}
                  key={project.id}
                >
                  <span className="project-preview-image">
                    <img src={project.image} alt={project.imageAlt} loading="lazy" />
                    <span className="project-preview-number">0{index + 1}</span>
                    <span className="project-preview-note">صورة توضيحية</span>
                    <span className="project-preview-arrow"><ArrowUpLeft size={18} aria-hidden="true" /></span>
                  </span>
                  <span className="project-preview-category">{service?.title}</span>
                  <span className="project-preview-title">{project.title}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <div className="process-heading">
            <div>
              <Eyebrow light>منهجية العمل</Eyebrow>
              <h2>أربع خطوات،<br /><span>من أول سؤال حتى آخر لمسة.</span></h2>
            </div>
            <p>وضوح التواصل وتنسيق المراحل يساعدان على إنجاز العمل بثقة واهتمام بالتفاصيل.</p>
          </div>
          <div className="process-grid">
            {processSteps.map((step) => (
              <article className="process-card" key={step.number}>
                <span className="process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        eyebrow="ابدأ من احتياجك"
        title="مشروعك القادم يبدأ بحل مناسب."
        description="تصفّح الخدمات أو شاهد ألبومات الأعمال لتتعرّف على نطاق التنفيذ الذي يناسبك."
        buttonLabel="استكشف مشاريعنا"
        to="/projects"
      />
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="خدمات إنجاز"
        title={<>حلول متكاملة،<br /><span>تنفيذ متقن.</span></>}
        description="ننفّذ مجموعة من أعمال المظلات والسواتر والسياجات والشبوك والحدادة والهناجر والتشطيبات، مع مراعاة احتياج كل موقع."
        image="/images/service-hangars.jpg"
        imageAlt="صورة توضيحية لهنجر معدني في موقع صناعي"
        code="07 / 01"
      />
      <section className="section services-page-section">
        <div className="container">
          <SectionHeading
            eyebrow="ما الذي ننفّذه؟"
            title="خدمات تغطي احتياج الموقع"
            description="اختر المجال للتعرّف على تفاصيل الخدمة ومشاهدة صورها التوضيحية في صفحة المشاريع."
          />
          <div className="service-grid service-grid--full">
            {services.map((service, index) => (
              <ServiceCard service={service} index={index} key={service.id} />
            ))}
          </div>
        </div>
      </section>
      <ProcessSection />
      <CallToAction
        eyebrow="هل تبحث عن خدمة محددة؟"
        title="تصفّح ألبوم الخدمة التي تهمك."
        description="تنتقل ألبومات المشاريع بين المظلات والسواتر والسياجات والشبوك وبقية مجالات التنفيذ."
        buttonLabel="انتقل إلى مشاريعنا"
        to="/projects"
      />
    </>
  )
}

function ProcessSection() {
  return (
    <section className="process-section process-section--light">
      <div className="container">
        <div className="process-heading process-heading--light">
          <div>
            <Eyebrow>آلية العمل</Eyebrow>
            <h2>منهج واضح،<br /><span>وتفاصيل محسوبة.</span></h2>
          </div>
          <p>نرتّب العمل على مراحل مفهومة حتى يكون كل قرار مرتبطًا باحتياج المشروع.</p>
        </div>
        <div className="process-grid">
          {processSteps.map((step) => (
            <article className="process-card" key={step.number}>
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectTile({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (project: Project) => void
}) {
  const service = services.find((item) => item.id === project.serviceId)

  return (
    <button className="project-tile" type="button" onClick={() => onOpen(project)}>
      <span className="project-tile-image">
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
        <span className="project-tile-shade" aria-hidden="true" />
        <span className="project-tile-count">ألبوم {String(index + 1).padStart(2, '0')}</span>
        <span className="project-tile-open" aria-hidden="true"><MoveUpLeft size={18} /></span>
        <span className="project-image-label">صورة توضيحية</span>
      </span>
      <span className="project-tile-info">
        <span className="project-tile-meta">
          <span>{service?.title}</span>
          <span className="project-tile-dot" aria-hidden="true" />
          <span>{project.context}</span>
        </span>
        <span className="project-tile-title">{project.title}</span>
        <span className="project-tile-description">{project.description}</span>
      </span>
    </button>
  )
}

function ProjectLightbox({
  project,
  onClose,
  onPrevious,
  onNext,
}: {
  project: Project
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}) {
  const service = services.find((item) => item.id === project.serviceId)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onPrevious()
      if (event.key === 'ArrowLeft') onNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, onNext, onPrevious])

  return (
    <div className="lightbox-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="lightbox-close" type="button" onClick={onClose} aria-label="إغلاق الصورة">
          <X size={22} />
        </button>
        <div className="lightbox-photo">
          <img src={project.image} alt={project.imageAlt} />
          <span className="lightbox-photo-caption">تصوّر توضيحي لمجال الخدمة</span>
          <button className="lightbox-control lightbox-control--previous" type="button" onClick={onPrevious} aria-label="الصورة السابقة">
            <ChevronRight size={22} />
          </button>
          <button className="lightbox-control lightbox-control--next" type="button" onClick={onNext} aria-label="الصورة التالية">
            <ChevronLeft size={22} />
          </button>
        </div>
        <div className="lightbox-content">
          <span className="lightbox-kicker">{service?.title} <span aria-hidden="true">·</span> {project.context}</span>
          <h2 id="lightbox-title">{project.title}</h2>
          <p>{project.description}</p>
          <span className="lightbox-note"><Sparkles size={15} aria-hidden="true" /> صورة عرض توضيحية</span>
        </div>
      </div>
    </div>
  )
}

function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const activeCategory: ServiceId | 'all' = services.some((service) => service.id === requestedCategory)
    ? (requestedCategory as ServiceId)
    : 'all'
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const visibleProjects = useMemo(
    () => activeCategory === 'all'
      ? projects
      : projects.filter((project) => project.serviceId === activeCategory),
    [activeCategory],
  )

  const selectCategory = (category: ServiceId | 'all') => {
    const nextParams = new URLSearchParams(searchParams)
    if (category === 'all') nextParams.delete('category')
    else nextParams.set('category', category)
    setSearchParams(nextParams)
  }

  const closeLightbox = useCallback(() => setActiveProject(null), [])
  const moveLightbox = useCallback((direction: number) => {
    setActiveProject((current) => {
      if (!current || visibleProjects.length < 2) return current
      const currentIndex = visibleProjects.findIndex((project) => project.id === current.id)
      const nextIndex = (currentIndex + direction + visibleProjects.length) % visibleProjects.length
      return visibleProjects[nextIndex] ?? current
    })
  }, [visibleProjects])
  const showPrevious = useCallback(() => moveLightbox(1), [moveLightbox])
  const showNext = useCallback(() => moveLightbox(-1), [moveLightbox])

  return (
    <>
      <PageIntro
        eyebrow="مشاريع وألبومات"
        title={<>أفكار تُرى،<br /><span>وتفاصيل تُلهم.</span></>}
        description="تصفّح صورًا توضيحية لمجالات التنفيذ، واختر ألبوم الخدمة للتعرّف على نوع الحلول المناسبة لمشروعك."
        image="/images/hero-enjaz.jpg"
        imageAlt="صورة توضيحية لمظلة سيارة في منزل حديث"
        code="07 / 02"
        linkTo="/services"
        linkLabel="تعرّف على خدماتنا"
      />
      <section className="section projects-page-section" id="albums">
        <div className="container">
          <div className="projects-heading-row">
            <SectionHeading
              eyebrow="معرض الخدمات"
              title="ألبومات حسب مجال العمل"
              description="اختر فئة لعرض صورها، أو افتح أي صورة لمشاهدتها بحجم أكبر."
            />
            <div className="photo-disclosure">
              <Sparkles size={17} aria-hidden="true" />
              <p>الصور الحالية توضيحية، وتُستبدل بصور المشاريع المنفّذة عند توفرها.</p>
            </div>
          </div>
          <div className="project-filters" role="group" aria-label="تصفية ألبومات المشاريع">
            <button
              type="button"
              className={`filter-chip${activeCategory === 'all' ? ' is-active' : ''}`}
              aria-pressed={activeCategory === 'all'}
              onClick={() => selectCategory('all')}
            >
              كل الألبومات <span>{String(projects.length).padStart(2, '0')}</span>
            </button>
            {services.map((service) => {
              const count = projects.filter((project) => project.serviceId === service.id).length
              return (
                <button
                  type="button"
                  className={`filter-chip${activeCategory === service.id ? ' is-active' : ''}`}
                  aria-pressed={activeCategory === service.id}
                  onClick={() => selectCategory(service.id)}
                  key={service.id}
                >
                  {service.title}
                  <span>{String(count).padStart(2, '0')}</span>
                </button>
              )
            })}
          </div>
          <div className="gallery-result-line" aria-live="polite">
            <span>الألبومات المعروضة</span>
            <span>{String(visibleProjects.length).padStart(2, '0')} صور</span>
          </div>
          {visibleProjects.length > 0 ? (
            <div className="project-gallery">
              {visibleProjects.map((project, index) => (
                <ProjectTile project={project} index={index} onOpen={setActiveProject} key={project.id} />
              ))}
            </div>
          ) : (
            <div className="empty-gallery">لا توجد صور في هذا الألبوم حاليًا.</div>
          )}
        </div>
      </section>
      <CallToAction
        eyebrow="هل وجدت المجال المناسب؟"
        title="تعرّف على تفاصيل الخدمة كاملة."
        description="انتقل إلى صفحة الخدمات للاطلاع على مجالات العمل وما يشمله كل منها."
        buttonLabel="عرض جميع الخدمات"
        to="/services"
      />
      {activeProject && (
        <ProjectLightbox
          project={activeProject}
          onClose={closeLightbox}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      )}
    </>
  )
}

type CallToActionProps = {
  eyebrow: string
  title: string
  description: string
  buttonLabel: string
  to: string
}

function CallToAction({ eyebrow, title, description, buttonLabel, to }: CallToActionProps) {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <Link className="button button--gold" to={to}>
          <span>{buttonLabel}</span>
          <ArrowLeft size={18} aria-hidden="true" />
        </Link>
        <span className="cta-watermark" aria-hidden="true">إ</span>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-column">
          <Brand />
          <p>حلول تنفيذ للمظلات والسواتر والسياجات الأمنية والشبوك والحدادة والهناجر والتشطيبات.</p>
        </div>
        <div className="footer-link-column">
          <span className="footer-column-title">تصفّح الموقع</span>
          <Link to="/">الرئيسية</Link>
          <Link to="/services">خدماتنا</Link>
          <Link to="/projects">مشاريعنا</Link>
        </div>
        <div className="footer-link-column">
          <span className="footer-column-title">مجالاتنا</span>
          <Link to="/projects?category=shades">المظلات</Link>
          <Link to="/projects?category=screens">السواتر</Link>
          <Link to="/projects?category=security-fences">السياجات الأمنية</Link>
          <Link to="/projects?category=mesh">الشبوك</Link>
          <Link to="/projects?category=metalwork">أعمال الحدادة</Link>
          <Link to="/projects?category=hangars">الهناجر</Link>
          <Link to="/projects?category=finishing">التشطيبات والترميمات</Link>
        </div>
        <div className="footer-note-column">
          <span className="footer-column-title">نطاق الخدمة</span>
          <span className="footer-location"><ArrowUpLeft size={16} aria-hidden="true" /> الرياض وجميع مناطق المملكة</span>
          <span className="footer-note">نبدأ من احتياج الموقع، ونبني الحل خطوة بخطوة.</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} شركة إنجاز. جميع الحقوق محفوظة.</span>
        <Link to="/projects">مصمّم بعناية، ومنفّذ بثقة <ArrowUpLeft size={14} aria-hidden="true" /></Link>
      </div>
    </footer>
  )
}

function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="container">
        <Eyebrow>صفحة غير موجودة</Eyebrow>
        <h1>يبدو أن هذا المسار غير متاح.</h1>
        <p>يمكنك العودة إلى الصفحة الرئيسية أو متابعة تصفّح خدمات ومشاريع إنجاز.</p>
        <Link className="button button--dark" to="/">
          <span>العودة للرئيسية</span>
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/our-services" element={<Navigate to="/services" replace />} />
          <Route path="/our-projects" element={<Navigate to="/projects" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
