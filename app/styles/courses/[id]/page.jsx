
import Link from 'next/link';
import styles from './page.module.scss';

// داده موقت (بعداً از API می‌آید)
const getCourse = (id) => {
  const courses = {
    1: {
      id: 1,
      title: 'React از صفر تا صد',
      instructor: 'علی رضایی',
      description: 'در این دوره شما React را از پایه تا پیشرفته یاد می‌گیرید. شامل پروژه‌های عملی و تمرین‌های متنوع.',
      longDescription: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.',
      price: 499000,
      students: 1234,
      duration: '۲۴ ساعت',
      level: 'مبتدی تا پیشرفته',
      lessons: [
        { id: 1, title: 'مقدمه React', duration: '۱:۳۰:۰۰', free: true },
        { id: 2, title: 'JSX و کامپوننت‌ها', duration: '۲:۱۵:۰۰', free: true },
        { id: 3, title: 'useState و مدیریت state', duration: '۱:۴۵:۰۰', free: false },
        { id: 4, title: 'useEffect و عوارض جانبی', duration: '۲:۰۰:۰۰', free: false },
      ],
      requirements: ['آشنایی با HTML/CSS', 'جاوااسکریپت متوسط', 'نصب VS Code'],
      tags: ['React', 'جاوااسکریپت', 'فرانت‌اند']
    },
    2: {
      id: 2,
      title: 'Next.js پیشرفته',
      instructor: 'سارا کریمی',
      description: 'Next.js را به صورت حرفه‌ای یاد بگیرید و سایت‌های سریع و سئو شده بسازید.',
      longDescription: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...',
      price: 599000,
      students: 856,
      duration: '۱۸ ساعت',
      level: 'پیشرفته',
      lessons: [],
      requirements: ['React متوسط', 'آشنایی با Next.js پایه'],
      tags: ['Next.js', 'React', 'SSR']
    },
    3: {
      id: 3,
      title: 'TypeScript پروژه محور',
      instructor: 'رضا احمدی',
      description: 'TypeScript را با پروژه‌های عملی و واقعی یاد بگیرید.',
      longDescription: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...',
      price: 399000,
      students: 2341,
      duration: '۱۲ ساعت',
      level: 'متوسط',
      lessons: [],
      requirements: ['جاوااسکریپت متوسط'],
      tags: ['TypeScript', 'جاوااسکریپت']
    }
  };
  
  return courses[id];
};

export default async function CourseDetailPage({ params }) {
  const { id } = await params;
  const course = getCourse(id);
  
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">دوره یافت نشد</h1>
        <Link href="/" className="text-primary hover:underline">
          ← بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* مسیر (Breadcrumb) */}
      <div className={styles.breadcrumb}>
        <Link href="/">خانه</Link>
        <span>/</span>
        <Link href="/courses">دوره‌ها</Link>
        <span>/</span>
        <span>{course.title}</span>
      </div>
      
      {/* هدر دوره */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.description}>{course.description}</p>
          <div className={styles.meta}>
            <span className={styles.metaItem}>👨‍🏫 {course.instructor}</span>
            <span className={styles.metaItem}>🎓 {course.students} دانشجو</span>
            <span className={styles.metaItem}>⏱️ {course.duration}</span>
            <span className={styles.metaItem}>📊 {course.level}</span>
          </div>
          <div className={styles.priceBox}>
            <span className={styles.price}>{course.price.toLocaleString()} تومان</span>
            <button className={styles.purchaseButton}>
              خرید دوره
            </button>
          </div>
        </div>
      </div>
      
      {/* محتوای اصلی */}
      <div className={styles.content}>
        {/* ستون راست: اطلاعات اصلی */}
        <div className={styles.main}>
          {/* توضیحات */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>توضیحات دوره</h2>
            <p className={styles.sectionText}>{course.longDescription}</p>
          </section>
          
          {/* سرفصل‌ها */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>سرفصل‌های دوره</h2>
            <div className={styles.lessons}>
              {course.lessons.map((lesson, index) => (
                <div key={lesson.id} className={styles.lesson}>
                  <div className={styles.lessonInfo}>
                    <span className={styles.lessonNumber}>{index + 1}</span>
                    <span className={styles.lessonTitle}>{lesson.title}</span>
                  </div>
                  <div className={styles.lessonMeta}>
                    <span className={styles.lessonDuration}>⏱️ {lesson.duration}</span>
                    {lesson.free && (
                      <span className={styles.lessonFree}>رایگان</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* پیش‌نیازها */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>پیش‌نیازها</h2>
            <ul className={styles.requirements}>
              {course.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </section>
        </div>
        
        {/* ستون چپ: سایدبار */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>این دوره شامل</h3>
            <ul className={styles.includesList}>
              <li>✅ {course.lessons.length} جلسه ویدیویی</li>
              <li>✅ {course.duration} آموزش</li>
              <li>✅ دسترسی مادام‌العمر</li>
              <li>✅ گواهی پایان دوره</li>
              <li>✅ پشتیبانی در تلگرام</li>
            </ul>
          </div>
          
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>برچسب‌ها</h3>
            <div className={styles.tags}>
              {course.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>اشتراک گذاری</h3>
            <div className={styles.shareButtons}>
              <button className={styles.shareButton}>📧</button>
              <button className={styles.shareButton}>📱</button>
              <button className={styles.shareButton}>💬</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}