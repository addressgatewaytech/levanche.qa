// Builds the Arabic (RTL) pages from the English ones at deploy time.
// Usage: node make-ar.js <inputDir> <outputDir>
const fs = require('fs');
const path = require('path');
const IN = process.argv[2] || '.';
const OUT = process.argv[3] || 'public';
let misses = 0;

function rep(s, a, b, all = true) {
  if (!s.includes(a)) { console.warn('  [make-ar] not found:', a.slice(0, 70)); misses++; return s; }
  return all ? s.split(a).join(b) : s.replace(a, b);
}

const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Aref+Ruqaa:wght@400;700&family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet">';
const RTL_CSS = `
/* ---- Arabic / RTL ---- */
html[lang=ar] body{font-family:'Tajawal',sans-serif;line-height:1.9}
[dir=rtl] .hero h1,[dir=rtl] .brand .t{font-family:'Cinzel',serif}
[dir=rtl] article ul,[dir=rtl] article ol{margin:0 22px 14px 0}
[dir=rtl] .company div:nth-child(odd){border-right:0;border-left:1px solid var(--line)}
[dir=rtl] .float-wa{right:auto;left:20px}
[dir=rtl] .close{right:auto;left:16px}
[dir=rtl] .card .tag{left:auto;right:14px}
[dir=rtl] .hero-img img{left:0}
@media(max-width:720px){[dir=rtl] .company div:nth-child(odd){border-left:0}}
`;

function common(s) {
  s = s.replace('<html lang="en">', '<html lang="ar" dir="rtl">');
  s = s.replace('</head>', FONTS + '\n</head>');
  // fonts: Arabic-friendly replacements (keep Cinzel only for the LEVANCHE wordmark)
  s = s.split("font-family:'Cinzel',serif").join("font-family:'Amiri',serif");
  s = s.split("font-family:'Jost',sans-serif").join("font-family:'Tajawal',sans-serif");
  s = s.split("font-family:'Jost'").join("font-family:'Tajawal'");
  s = s.split("font-family:'Cormorant Garamond',serif").join("font-family:'Amiri',serif");
  s = s.split("font-family:'Great Vibes',cursive").join("font-family:'Aref Ruqaa',serif");
  s = s.replace(/letter-spacing:[^;}]+/g, 'letter-spacing:0');
  s = s.replace('</style>', RTL_CSS + '</style>');
  // links to Arabic pages
  s = s.split('href="terms.html"').join('href="terms-ar.html"');
  s = s.split('href="refund.html"').join('href="refund-ar.html"');
  s = s.split('href="privacy.html"').join('href="privacy-ar.html"');
  s = s.split('href="index.html#shop"').join('href="index-ar.html#shop"');
  s = s.split('href="index.html"').join('href="index-ar.html"');
  // shared header/footer text
  s = rep(s, '✦ DUBAI LUXURY · KOREAN STYLE · ONLINE IN QATAR ✦', '✦ فخامة دبي · ستايل كوري · متجر إلكتروني في قطر ✦');
  s = rep(s, "LEVANCHE<small>LADY'S FASHION</small>", 'LEVANCHE<small>ليفانش · أزياء نسائية</small>');
  s = rep(s, '<h5>CUSTOMER CARE</h5><p>Phone / WhatsApp: ', '<h5>خدمة العملاء</h5><p>الهاتف / واتساب: ');
  s = rep(s, '<br>Email: <span data-info="email">', '<br>البريد الإلكتروني: <span data-info="email">');
  s = rep(s, '<h5>POLICIES</h5>', '<h5>السياسات</h5>');
  s = rep(s, '>Terms &amp; Conditions</a><a href="refund-ar.html">Return &amp; Refund Policy</a><a href="privacy-ar.html">Privacy Policy</a></div>\n    </div>',
             '>الشروط والأحكام</a><a href="refund-ar.html">سياسة الاستبدال والاسترجاع</a><a href="privacy-ar.html">سياسة الخصوصية</a></div>\n    </div>');
  s = rep(s, '<br>CR No. <span data-info="crNumber"></span> · E-commerce Licence No. <span data-info="ecomLicence">',
             '<br>رقم السجل التجاري: <span data-info="crNumber"></span> · رقم رخصة التجارة الإلكترونية: <span data-info="ecomLicence">');
  s = rep(s, '© 2026 Levanche · levanche.qa · All rights reserved', '© 2026 ليفانش · levanche.qa · جميع الحقوق محفوظة');
  return s;
}

// ======================= HOME PAGE =======================
function home(s) {
  s = common(s);
  s = rep(s, "<title>Levanche — Lady's Fashion, Qatar</title>", '<title>ليفانش — أزياء نسائية فاخرة في قطر | Levanche</title>');
  s = rep(s, `content="Levanche Lady's Fashion — a Qatar-based online boutique for Dubai luxury abayas, modest wear and Korean-inspired dresses."`,
             'content="ليفانش للأزياء النسائية — متجر إلكتروني في قطر للعبايات الفاخرة بطابع دبي والأزياء المحتشمة والفساتين بالستايل الكوري."');
  const T = [
    ['<a href="#shop">Shop</a>', '<a href="#shop">المتجر</a>'],
    ['<a href="#collections">Collections</a>', '<a href="#collections">المجموعات</a>'],
    ['<a href="#about">About</a>', '<a href="#about">من نحن</a>'],
    ['<a href="#contact">Contact</a>', '<a href="#contact">تواصل معنا</a>'],
    ['✦ A NEW BEGINNING ✦', '✦ بداية جديدة ✦'],
    ['<div class="tag">LADY\'S FASHION</div>', '<div class="tag">أزياء نسائية</div>'],
    ["<p>Carefully selected women's fashion inspired by Dubai luxury and contemporary Korean style — elegant, comfortable and made to last, at prices you'll love.</p>",
     '<p>أزياء نسائية مختارة بعناية، مستوحاة من فخامة دبي والستايل الكوري العصري — أناقة وراحة وجودة تدوم، بأسعار ستحبينها.</p>'],
    ['class="btn black">Shop the Collection</a>', 'class="btn black">تسوّقي المجموعة</a>'],
    ['class="btn line">Our Story</a>', 'class="btn line">قصتنا</a>'],
    ['<h4>Trendy Collections</h4><p>Fresh styles every season</p>', '<h4>مجموعات عصرية</h4><p>تصاميم جديدة كل موسم</p>'],
    ['<h4>Premium Quality</h4><p>Selected for fabric &amp; finish</p>', '<h4>جودة عالية</h4><p>أقمشة وتشطيبات مختارة</p>'],
    ['<h4>Stylish Choices</h4><p>Abayas, modest wear &amp; dresses</p>', '<h4>خيارات أنيقة</h4><p>عبايات وأزياء محتشمة وفساتين</p>'],
    ['<h4>Affordable Luxury</h4><p>Elegance at fair prices</p>', '<h4>فخامة بأسعار مناسبة</h4><p>أناقة بأسعار عادلة</p>'],
    ['<div class="script">Discover</div>\n        <h2>Our Collections</h2>', '<div class="script">اكتشفي</div>\n        <h2>مجموعاتنا</h2>'],
    ['alt="Luxury Abayas"><div class="lbl"><h3>LUXURY ABAYAS</h3><span>Dubai-inspired elegance</span>', 'alt="عبايات فاخرة"><div class="lbl"><h3>عبايات فاخرة</h3><span>أناقة مستوحاة من دبي</span>'],
    ['alt="Modest Wear"><div class="lbl"><h3>MODEST WEAR</h3><span>Everyday comfort, chic style</span>', 'alt="أزياء محتشمة"><div class="lbl"><h3>أزياء محتشمة</h3><span>راحة يومية بإطلالة أنيقة</span>'],
    ['alt="Maxi &amp; Dresses"><div class="lbl"><h3>MAXI &amp; DRESSES</h3><span>Korean-inspired silhouettes</span>', 'alt="فساتين ماكسي"><div class="lbl"><h3>فساتين وماكسي</h3><span>قصّات مستوحاة من الستايل الكوري</span>'],
    ['<div class="script">The Edit</div>\n        <h2>Shop Levanche</h2>', '<div class="script">تشكيلتنا</div>\n        <h2>تسوّقي من ليفانش</h2>'],
    ['<p>Tap any piece to see details</p>', '<p>اضغطي على أي قطعة لعرض التفاصيل</p>'],
    ['data-f="all">All</button>', 'data-f="all">الكل</button>'],
    ['data-f="Abaya">Abayas</button>', 'data-f="Abaya">عبايات</button>'],
    ['data-f="Modest Wear">Modest Wear</button>', 'data-f="Modest Wear">أزياء محتشمة</button>'],
    ['data-f="Dress">Dresses</button>', 'data-f="Dress">فساتين</button>'],
    ['<div class="script">About Us</div>\n        <h2>Fashion that feels like you</h2>', '<div class="script">من نحن</div>\n        <h2>أزياء تشبهكِ</h2>'],
    ['<p>Levanche is a Qatar-based online fashion store bringing stylish clothing to women.</p>', '<p>ليفانش متجر أزياء إلكتروني مقرّه قطر، يقدّم ملابس نسائية أنيقة وعصرية.</p>'],
    ['<p>We offer carefully selected collections inspired by Dubai luxury fashion and contemporary Korean styles, combining elegance, comfort, and quality.</p>',
     '<p>نقدّم مجموعات مختارة بعناية مستوحاة من أزياء دبي الفاخرة والأساليب الكورية المعاصرة، تجمع بين الأناقة والراحة والجودة.</p>'],
    ["<p>Our range includes women's dresses, modest wear, maxi dresses and other fashionable clothing — quality fashion at affordable prices, with an enjoyable shopping experience.</p>",
     '<p>تشمل تشكيلتنا الفساتين النسائية والأزياء المحتشمة وفساتين الماكسي وغيرها من الملابس العصرية — أزياء عالية الجودة بأسعار مناسبة وتجربة تسوّق ممتعة.</p>'],
    ['<span>OUR VISION</span>\n          <p>To become a trusted fashion destination in Qatar, offering stylish collections and excellent customer service.</p>',
     '<span>رؤيتنا</span>\n          <p>أن نكون وجهة الأزياء الموثوقة في قطر، بمجموعات أنيقة وخدمة عملاء متميزة.</p>'],
    ['<div class="script">Your support means everything to us!</div>', '<div class="script">دعمكم يعني لنا الكثير!</div>'],
    ['<h2>PLEASE FOLLOW, SHARE &amp; SUPPORT US</h2>', '<h2>تابعونا وشاركونا وادعمونا</h2>'],
    ['<p>Questions about sizes, availability or orders? Our team is happy to help you find your next favourite piece.</p>', '<p>لديكِ سؤال عن المقاسات أو التوفر أو الطلبات؟ فريقنا سعيد بمساعدتكِ في اختيار قطعتكِ المفضلة القادمة.</p>'],
    ['?text=Hello%20Levanche%2C%20I%27d%20like%20to%20know%20more%20about%20your%20collection." target="_blank" rel="noopener" class="btn gold">Chat on WhatsApp</a>',
     '?text=' + encodeURIComponent('مرحباً ليفانش، أود معرفة المزيد عن مجموعتكم.') + '" target="_blank" rel="noopener" class="btn gold">تواصلي عبر واتساب</a>'],
    ['style="color:#f0d796">Browse the Collection</a>', 'style="color:#f0d796">تصفّحي المجموعة</a>'],
    ['Phone / WhatsApp: +974 5519 5747 &nbsp;·&nbsp; Email: Levanchetrading@gmail.com', 'الهاتف / واتساب: <span dir="ltr">+974 5519 5747</span> &nbsp;·&nbsp; البريد الإلكتروني: Levanchetrading@gmail.com'],
    ['?text=Hello%20Levanche%21"', '?text=' + encodeURIComponent('مرحباً ليفانش!') + '"'],
    ['aria-label="Chat with Levanche on WhatsApp"', 'aria-label="تواصلي مع ليفانش عبر واتساب"'],
    ['<li><b>Best for</b><span id="mBest"></span></li>\n        <li><b>Fabric</b><span id="mFab"></span></li>', '<li><b>مناسب لـ</b><span id="mBest"></span></li>\n        <li><b>القماش</b><span id="mFab"></span></li>'],
    ['<span>Order on WhatsApp</span>', '<span>اطلبي عبر واتساب</span>'],
    ["`Hello Levanche, I'm interested in the ${p.name}${size?` (size ${size})`:''}. Is it available?`", "`مرحباً ليفانش، أنا مهتمة بـ ${p.name}${size?` (المقاس ${size})`:''}. هل هو متوفر؟`"],
    ['<div class="quick">VIEW DETAILS</div>', '<div class="quick">عرض التفاصيل</div>'],
    ["current.cat.toUpperCase() + ' · ' + current.tag", "current.catAr + ' · ' + current.tag"],
    ["'Choose your size, then tap to order on WhatsApp.'", "'اختاري المقاس، ثم اضغطي للطلب عبر واتساب.'"],
    ['`Size ${size} selected.`', '`تم اختيار المقاس ${size}.`'],
  ];
  for (const [a, b] of T) s = rep(s, a, b);

  const P = [
    ['p1','Abaya','عبايات','فخامة دبي','عباية نور الساتان بالفراشات','عباية سوداء مزينة بفراشات مخملية وتطريز خرز ناعم على الأكمام والذيل، مع أساور ساتان عريضة وحاشية ساتان، بياقة V وفتحة أمامية وأكمام واسعة. أنيقة ولافتة للنظر.','السهرات والأعياد والمناسبات الخاصة','كريب مع حواف ساتان'],
    ['p2','Abaya','عبايات','فخامة دبي','عباية ليلى بياقة مطرزة بالخرز','عباية سوداء بياقة مفصّلة مغطاة بتطريز خرز أسود، مع أساور مطرزة متناسقة. إغلاق أمامي مخفي وأكمام طويلة مستقيمة. عصرية وأنيقة.','العمل والمناسبات الرسمية والسهرات','كريب فاخر'],
    ['p3','Abaya','عبايات','فخامة دبي','عباية أميرة بالحواف النحاسية','عباية سوداء بشريط أمامي بلون نحاسي متباين ونقوش مطرزة متناثرة، بفتحة أمامية وأكمام كيمونو واسعة وقصّة منسدلة. دافئة وجذابة.','الأناقة اليومية والتجمعات العائلية','كريب ناعم'],
    ['p4','Abaya','عبايات','فخامة دبي','عباية زهرة بالبرسيم المخملي','عباية سوداء مزينة بزهور برسيم مخملية بإطار لامع ناعم، بياقة قائمة وإغلاق أمامي مخفي وأكمام طويلة. تفاصيل بنفس اللون، راقية جداً.','المناسبات وحفلات المساء','كريب مع تطبيقات مخملية'],
    ['p5','Abaya','عبايات','فخامة دبي','عباية رانيا بفيونكات الأورجانزا','عباية سوداء مفتوحة بفيونكات رمادية ناعمة، وأشرطة أورجانزا شفافة على الأكمام والذيل، مع حواف مطرزة بالخرز. ياقة V وأكمام جرسية واسعة. أنثوية ورقيقة.','الحفلات والأعراس والاحتفالات','كريب مع حواف أورجانزا'],
    ['p6','Modest Wear','أزياء محتشمة','ستايل كوري','فستان هنا الجينز المطرز بالورود','فستان قميص من الجينز بتطريز ورود ملوّن على الصدر والأكتاف، بياقة ماندرين وأزرار أمامية وأكمام طويلة، وذيل أطول من الخلف. فريد جداً.','الإطلالات اليومية المحتشمة والكاجوال','جينز ناعم'],
    ['p7','Dress','فساتين','ستايل كوري','فستان ميرا القميصي بنقشة الفهد','فستان قميص بنقشة الفهد بلون وردي هادئ، بياقة مفتوحة وأزرار أمامية وأكمام قصيرة وحزام للخصر لقصّة مريحة وجميلة. مرح وعملي.','الخروجات والبرانش والسفر','فيسكوز خفيف'],
    ['p8','Modest Wear','أزياء محتشمة','ستايل كوري','طقم سورا تونيك بالمربعات','تونيك بمربعات أبيض وأسود بياقة قميص وأزرار نصفية وأساور سوداء متباينة وفتحات جانبية، مع بنطال أسود واسع. أنيق ومريح.','العمل والجامعة والإطلالات شبه الرسمية','قطن مخلوط ناعم'],
    ['p9','Dress','فساتين','ستايل كوري','فستان يونا الماكسي المطرز','فستان ماكسي بيج بتطريز زهور بنفس اللون، بياقة دائرية وأكمام منفوخة بأساور وذيل بكشكشة متدرجة. ناعم ورومانسي ومحتشم.','المناسبات النهارية والأعياد والزيارات العائلية','قطن مطرز'],
  ];
  const arr = 'const products = [\n' + P.map(([id, cat, catAr, tag, name, desc, best, fabric]) =>
    '  ' + JSON.stringify({ id, name, cat, catAr, tag, desc, best, fabric })).join(',\n') + '\n];';
  const before = s;
  s = s.replace(/const products = \[[\s\S]*?\n\];/, arr);
  if (s === before) { console.warn('  [make-ar] products array not replaced'); misses++; }
  return s;
}

// ======================= POLICY PAGES =======================
const CO = `
<div class="company">
  <div><b>الاسم التجاري</b>ليفانش — أزياء نسائية (Levanche)</div>
  <div><b>الكيان القانوني</b><span data-info="legalName"></span></div>
  <div><b>رقم السجل التجاري</b><span data-info="crNumber"></span></div>
  <div><b>رقم رخصة التجارة الإلكترونية (وزارة التجارة والصناعة)</b><span data-info="ecomLicence"></span></div>
  <div><b>الهاتف / واتساب</b><span data-info="phone" dir="ltr"></span></div>
  <div><b>البريد الإلكتروني</b><span data-info="email"></span></div>
  <div><b>العنوان</b><span data-info="address"></span></div>
  <div><b>الموقع الإلكتروني</b>levanche.qa</div>
</div>`;
const I = k => `<span data-info="${k}"${k === 'phone' ? ' dir="ltr"' : ''}></span>`;

const TERMS_AR = `
<p class="lead">تنظّم هذه الشروط والأحكام استخدامك لموقع levanche.qa وأي عملية شراء تتم من ليفانش. باستخدامك للموقع أو تقديم طلب، فإنك توافقين على هذه الشروط. يُرجى قراءتها بعناية.</p>

<h2>1. من نحن</h2>
<p>يُدار هذا الموقع من قِبل ${I('legalName')}، وهي منشأة مسجلة في دولة قطر لدى وزارة التجارة والصناعة بموجب السجل التجاري رقم ${I('crNumber')}، ومرخّصة لممارسة نشاط التجارة الإلكترونية بموجب الرخصة رقم ${I('ecomLicence')}. ويُقصد بـ "ليفانش" و"نحن" ${I('legalName')}.</p>
${CO}

<h2>2. الأهلية والحسابات</h2>
<ul>
<li>يجب ألا يقل عمرك عن 18 عاماً، أو أن تستخدمي الموقع تحت إشراف ولي الأمر، لتقديم طلب.</li>
<li>توافقين على تقديم معلومات دقيقة وكاملة وحديثة (الاسم ورقم الهاتف وعنوان التوصيل والبريد الإلكتروني) عند الطلب.</li>
<li>في حال إنشاء حساب، تكونين مسؤولة عن سرية بيانات الدخول وعن جميع الأنشطة التي تتم من خلاله.</li>
</ul>

<h2>3. المنتجات والأوصاف</h2>
<ul>
<li>نبذل قصارى جهدنا لوصف منتجاتنا وتصويرها بدقة، بما في ذلك القماش والتصميم واللون والمقاسات المتاحة.</li>
<li>قد تظهر الألوان مختلفة قليلاً على الشاشة بسبب الإضاءة وإعدادات الجهاز. الاختلافات البسيطة في التطريز اليدوي أو الخرز أو التطبيقات جزء من التصميم ولا تُعد عيوباً.</li>
<li>إرشادات المقاسات للاسترشاد فقط. إن لم تكوني متأكدة، تواصلي معنا قبل الطلب وسنسعد بمساعدتك.</li>
<li>جميع المنتجات حسب التوفر. إذا أصبح منتج غير متوفر بعد طلبك، سنبلغك ونعرض بديلاً أو استرداداً كاملاً للمبلغ.</li>
</ul>

<h2>4. الأسعار والدفع</h2>
<ul>
<li>جميع الأسعار بالريال القطري وتشمل أي رسوم مطبقة ما لم يُذكر خلاف ذلك. تُعرض رسوم التوصيل، إن وجدت، قبل تأكيد الطلب.</li>
<li>نقبل وسائل الدفع الإلكتروني (مثل بطاقات الخصم والائتمان ووسائل الدفع المعتمدة الأخرى) المتاحة عند إتمام الطلب، وقد نوفر الدفع عند الاستلام. تتم معالجة المدفوعات بالبطاقات بشكل آمن عبر مزودي خدمات دفع مرخّصين، ولا نحتفظ ببيانات بطاقتك كاملة.</li>
<li>إذا ظهر منتج بسعر خاطئ بشكل واضح بسبب خطأ تقني أو مطبعي، سنتواصل معك قبل الشحن ويمكنك المتابعة بالسعر الصحيح أو الإلغاء مع استرداد كامل المبلغ.</li>
</ul>

<h2>5. الطلبات والتأكيد</h2>
<ul>
<li>طلبك هو عرض للشراء، ويُبرم العقد عند تأكيدنا للطلب برسالة أو بريد إلكتروني أو اتصال هاتفي.</li>
<li>سنزوّدك بفاتورة أو تأكيد طلب يوضح المنتجات والأسعار ورسوم التوصيل والمبلغ الإجمالي. يُرجى الاحتفاظ بها لدعم أي طلب استبدال أو استرجاع أو ضمان.</li>
<li>يجوز لنا رفض أو إلغاء أي طلب في حالات الاشتباه بالاحتيال أو خطأ التسعير أو عدم التوفر أو نقص بيانات التوصيل، وفي حال الدفع يُسترد المبلغ كاملاً.</li>
</ul>

<h2>6. التوصيل</h2>
<ul>
<li>نوصّل داخل دولة قطر، ويتم تأكيد موعد التوصيل المتوقع عند تأكيد طلبك.</li>
<li>يُرجى التأكد من وجود من يستلم الطلب. إذا تعذّر التوصيل بسبب عنوان غير صحيح أو عدم الرد، سنتواصل معك لإعادة الترتيب، وقد تُطبق رسوم توصيل إضافية.</li>
<li>يُرجى فحص الطرد عند الاستلام. إذا كان تالفاً أو غير صحيح أو ناقصاً، تواصلي معنا في أقرب وقت (راجعي <a href="refund-ar.html">سياسة الاستبدال والاسترجاع</a>).</li>
<li>تنتقل ملكية المنتجات ومسؤوليتها إليك عند تسليمها لك أو للمستلم الذي تحددينه.</li>
</ul>

<h2>7. إلغاء الطلب</h2>
<p>يمكنك إلغاء الطلب مجاناً قبل شحنه بالتواصل معنا. بعد الشحن، تُطبق <a href="refund-ar.html">سياسة الاستبدال والاسترجاع</a>.</p>

<h2>8. الاستبدال والاسترجاع واسترداد المبالغ</h2>
<p>تخضع عمليات الاستبدال والاسترجاع واسترداد المبالغ لـ <a href="refund-ar.html">سياسة الاستبدال والاسترجاع</a> الخاصة بنا، وهي جزء من هذه الشروط. لا يحدّ أي شيء في هذه الشروط من حقوقك بموجب قانون حماية المستهلك القطري رقم (8) لسنة 2008.</p>

<h2>9. الملكية الفكرية</h2>
<p>جميع محتويات هذا الموقع — بما فيها اسم وشعار ليفانش وصور المنتجات والنصوص والتصميم — مملوكة لليفانش أو للجهات المرخِّصة لها، ولا يجوز نسخها أو إعادة إنتاجها أو استخدامها تجارياً دون إذن كتابي منا.</p>

<h2>10. الاستخدام المقبول</h2>
<p>توافقين على عدم إساءة استخدام الموقع، بما في ذلك محاولة الدخول غير المصرح به أو إدخال برمجيات ضارة أو تقديم طلبات وهمية أو استخدام الموقع لأي غرض مخالف لقوانين دولة قطر، بما فيها القانون رقم (14) لسنة 2014 بشأن مكافحة الجرائم الإلكترونية.</p>

<h2>11. المسؤولية</h2>
<ul>
<li>نتحمّل مسؤولية توفير منتجات مطابقة لوصفها وخالية من العيوب وفقاً للقانون القطري.</li>
<li>في الحدود التي يسمح بها القانون، لا نتحمّل المسؤولية عن الخسائر غير المباشرة أو التبعية، أو عن التأخير الناتج عن ظروف خارجة عن إرادتنا.</li>
<li>لا يستثني أي شيء في هذه الشروط أي مسؤولية لا يجوز استثناؤها بموجب قوانين دولة قطر.</li>
</ul>

<h2>12. الخصوصية</h2>
<p>نتعامل مع بياناتك الشخصية وفقاً لـ <a href="privacy-ar.html">سياسة الخصوصية</a> والقانون القطري رقم (13) لسنة 2016 بشأن حماية خصوصية البيانات الشخصية.</p>

<h2>13. الشكاوى</h2>
<p>إذا لم تكوني راضية عن أي منتج أو خدمة، يُرجى التواصل مع خدمة العملاء أولاً على ${I('phone')} أو ${I('email')}. نسعى للرد على الشكاوى خلال يومي عمل وحلّها بأسرع وقت ممكن. وإذا لم تُحل الشكوى، يمكنك التواصل مع إدارة حماية المستهلك بوزارة التجارة والصناعة عبر قنواتها الرسمية (moci.gov.qa).</p>

<h2>14. القانون الواجب التطبيق</h2>
<p>تخضع هذه الشروط لقوانين دولة قطر، بما فيها القانون رقم (16) لسنة 2010 بشأن المعاملات والتجارة الإلكترونية والقانون رقم (8) لسنة 2008 بشأن حماية المستهلك، وتختص المحاكم القطرية المختصة بالنظر في أي نزاع.</p>

<h2>15. التعديلات على الشروط</h2>
<p>قد نقوم بتحديث هذه الشروط من وقت لآخر، وسيتم نشر النسخة المحدّثة على هذه الصفحة مع تاريخ سريان جديد. تخضع الطلبات المؤكدة للشروط السارية وقت الطلب.</p>
`;

const REFUND_AR = `
<p class="lead">نريدك أن تحبي كل قطعة من ليفانش. توضح هذه السياسة آلية الاستبدال والاسترجاع واسترداد المبالغ، وفقاً لقانون حماية المستهلك القطري رقم (8) لسنة 2008 ومتطلبات وزارة التجارة والصناعة بشأن الاستبدال والاسترجاع.</p>

<div class="callout"><b>حقوقك القانونية أولاً.</b> إذا كان المنتج معيباً أو تالفاً أو غير مطابق للوصف أو ليس ما طلبتِه، يحق لك دائماً الاستبدال مجاناً أو استرداد المبلغ كاملاً — ولا يمكن لأي سياسة متجر إلغاء هذا الحق.</div>

<h2>1. المنتجات المعيبة أو التالفة أو غير الصحيحة</h2>
<p>إذا وصلك المنتج تالفاً أو معيباً (مثل تمزق القماش أو تلف السحاب أو الأزرار أو عيوب الخياطة)، أو غير مطابق للوصف، أو ليس المنتج أو المقاس أو اللون الذي طلبتِه:</p>
<ul>
<li>تواصلي معنا على ${I('phone')} أو ${I('email')} مع رقم الطلب وصورة للمنتج، ويُفضّل خلال 7 أيام من الاستلام.</li>
<li>يحق لك اختيار <b>الاستبدال</b> أو <b>الإصلاح</b> أو <b>استرداد المبلغ كاملاً</b>. وإذا لم يتوفر بديل، نردّ لك كامل المبلغ.</li>
<li>نتحمّل جميع تكاليف التوصيل والاستلام، ونردّ أي رسوم توصيل مدفوعة.</li>
</ul>

<h2>2. تغيير الرأي — الاستبدال أو الاسترجاع</h2>
<p>إذا غيّرتِ رأيك أو لم يناسبك المقاس، يمكنك طلب الاستبدال أو الاسترجاع خلال <b>7 أيام من الاستلام</b>، بشرط:</p>
<ul>
<li>أن يكون المنتج غير ملبوس وغير مغسول وغير معدّل وبحالته الأصلية؛</li>
<li>أن تكون جميع البطاقات والملصقات الأصلية مثبتة، مع التغليف الأصلي إن أمكن؛</li>
<li>أن يكون المنتج خالياً من آثار العطور أو المكياج أو مزيل العرق أو أي بقع؛</li>
<li>تقديم الفاتورة أو تأكيد الطلب.</li>
</ul>
<p>في حالات تغيير الرأي، تتحمّل العميلة تكاليف توصيل الإرجاع ما لم نذكر خلاف ذلك. الاستبدال حسب توفر المخزون، وإذا لم يتوفر المقاس أو التصميم المطلوب نعرض استرداد المبلغ.</p>

<h2>3. منتجات لا يشملها الاسترجاع عند تغيير الرأي</h2>
<p>لأسباب صحية أو لأنها مخصصة، لا يمكن إرجاع ما يلي إلا إذا كان معيباً أو غير مطابق للوصف:</p>
<ul>
<li>المنتجات المعدّلة أو المفصّلة حسب الطلب (مثل الأطوال المخصصة)؛</li>
<li>المنتجات التي تم ارتداؤها أو غسلها أو إتلافها بعد الاستلام؛</li>
<li>منتجات التصفية أو البيع النهائي، إذا ذُكر ذلك بوضوح في صفحة المنتج قبل الشراء.</li>
</ul>

<h2>4. كيفية طلب الاستبدال أو الاسترجاع</h2>
<ol>
<li>تواصلي معنا على ${I('phone')} (واتساب) أو ${I('email')} مع اسمك ورقم الطلب والمنتج وسبب الطلب.</li>
<li>سنؤكد طلبك ونرتّب استلام المنتج أو نخبرك بمكان إرساله.</li>
<li>بعد استلام المنتج وفحصه (عادةً خلال يومي عمل)، نؤكد الاستبدال أو استرداد المبلغ.</li>
</ol>

<h2>5. استرداد المبالغ</h2>
<ul>
<li>تُرد المبالغ المعتمدة إلى <b>وسيلة الدفع الأصلية</b>. تتم معالجة استرداد مدفوعات البطاقات خلال 7 أيام عمل من الموافقة، وتعتمد مدة ظهور المبلغ على البنك.</li>
<li>تُرد مبالغ طلبات الدفع عند الاستلام بالتحويل البنكي أو بطريقة أخرى يتم الاتفاق عليها معك.</li>
<li>في حالات تغيير الرأي، لا تُرد رسوم التوصيل الأصلية. أما المنتجات المعيبة أو التالفة أو غير الصحيحة، فيُرد المبلغ كاملاً بما فيه رسوم التوصيل.</li>
</ul>

<h2>6. إلغاء الطلب</h2>
<p>يمكنك إلغاء الطلب مجاناً قبل شحنه، ويُرد أي مبلغ مدفوع كاملاً إلى وسيلة الدفع الأصلية.</p>

<h2>7. الشكاوى</h2>
<p>إذا لم تكوني راضية عن طريقة التعامل مع طلبك، يُرجى التواصل معنا أولاً لنصحّح الأمر. ويمكنك أيضاً التواصل مع إدارة حماية المستهلك بوزارة التجارة والصناعة عبر قنواتها الرسمية (moci.gov.qa).</p>
${CO}
`;

const PRIVACY_AR = `
<p class="lead">خصوصيتك تهمّنا. توضح سياسة الخصوصية هذه البيانات الشخصية التي تجمعها ليفانش، وأسباب جمعها، وكيفية حمايتها، وحقوقك، وفقاً للقانون القطري رقم (13) لسنة 2016 بشأن حماية خصوصية البيانات الشخصية.</p>

<h2>1. من نحن</h2>
<p>المسؤول عن معالجة البيانات هو ${I('legalName')} (السجل التجاري رقم ${I('crNumber')})، مشغّل موقع levanche.qa. لأي استفسار أو طلب يتعلق بالخصوصية، تواصلي معنا على ${I('email')} أو ${I('phone')}.</p>

<h2>2. البيانات الشخصية التي نجمعها</h2>
<ul>
<li><b>بيانات التواصل والطلبات:</b> الاسم ورقم الهاتف والبريد الإلكتروني وعنوان التوصيل والمنتجات المطلوبة والمقاسات وسجل الطلبات.</li>
<li><b>بيانات الدفع:</b> حالة الدفع ومراجع المعاملات. تتم معالجة مدفوعات البطاقات عبر مزودي خدمات دفع مرخّصين، ولا نستلم أو نحتفظ برقم بطاقتك كاملاً.</li>
<li><b>المراسلات:</b> الرسائل التي ترسلينها لنا عبر واتساب أو الهاتف أو البريد الإلكتروني أو وسائل التواصل الاجتماعي، بما فيها طلبات الاسترجاع والشكاوى.</li>
<li><b>البيانات التقنية:</b> معلومات أساسية مثل نوع الجهاز والمتصفح والصفحات التي تمت زيارتها، لضمان أمان الموقع وعمله بشكل صحيح.</li>
</ul>
<p>لا نجمع عمداً أي بيانات شخصية حساسة، وموقعنا غير موجّه للأطفال.</p>

<h2>3. أسباب استخدام بياناتك</h2>
<ul>
<li>معالجة الطلبات وتوصيلها ودعمها، وعمليات الاستبدال والاسترجاع واسترداد المبالغ؛</li>
<li>التواصل معك بشأن طلبك والرد على استفساراتك؛</li>
<li>منع الاحتيال والحفاظ على أمان موقعنا وخدماتنا؛</li>
<li>الوفاء بالتزاماتنا القانونية والمحاسبية والتنظيمية في قطر؛</li>
<li>إرسال الأخبار والعروض — <b>بموافقتك فقط</b>، ويمكنك إلغاء الاشتراك في أي وقت.</li>
</ul>
<p>نعالج بياناتك بموافقتك، أو عند الضرورة لتنفيذ العقد معك، أو للامتثال للقانون.</p>

<h2>4. مشاركة بياناتك</h2>
<p>لا نبيع بياناتك الشخصية أبداً، ونشاركها فقط عند الحاجة لخدمتك مع:</p>
<ul>
<li>شركاء التوصيل والشحن، لتوصيل طلبك؛</li>
<li>مزودي خدمات الدفع المرخّصين، لمعالجة المدفوعات والمبالغ المستردة؛</li>
<li>مزودي استضافة الموقع وخدمات تقنية المعلومات، بموجب التزامات السرية؛</li>
<li>الجهات الحكومية أو التنظيمية في قطر، عندما يتطلب القانون ذلك.</li>
</ul>
<p>قد يحتفظ بعض مزودي الخدمات بالبيانات خارج قطر، وفي هذه الحالة نتخذ الإجراءات المعقولة لضمان حماية كافية لبياناتك وفقاً للقانون القطري.</p>

<h2>5. ملفات تعريف الارتباط (الكوكيز)</h2>
<p>يستخدم موقعنا فقط ملفات تعريف الارتباط ووسائل التخزين الضرورية لعمله. وإذا استخدمنا مستقبلاً ملفات تحليلية أو تسويقية، سنطلب موافقتك أولاً ونحدّث هذه السياسة.</p>

<h2>6. كيف نحمي بياناتك</h2>
<p>نستخدم إجراءات تقنية وتنظيمية مناسبة لحماية بياناتك، بما فيها الاتصالات الآمنة (HTTPS) وتقييد الوصول والتعامل مع مزودي خدمات موثوقين. وفي حال حدوث اختراق للبيانات قد يسبب لك ضرراً جسيماً، سنبلغك ونبلغ الجهة المختصة وفقاً للقانون.</p>

<h2>7. مدة الاحتفاظ بالبيانات</h2>
<p>نحتفظ بالبيانات الشخصية فقط للمدة اللازمة للأغراض المذكورة — مثل سجلات الطلبات والفواتير للمدة التي تتطلبها القواعد التجارية والضريبية في قطر — ثم نحذفها أو نجعلها مجهولة الهوية بشكل آمن.</p>

<h2>8. حقوقك</h2>
<p>بموجب القانون رقم (13) لسنة 2016، يحق لك:</p>
<ul>
<li>معرفة كيفية معالجة بياناتك؛</li>
<li>الوصول إلى بياناتك الشخصية والحصول على نسخة منها؛</li>
<li>طلب تصحيح البيانات غير الدقيقة؛</li>
<li>طلب حذف بياناتك عندما لا تعود هناك حاجة إليها؛</li>
<li>سحب موافقتك، بما فيها على الرسائل التسويقية، في أي وقت؛</li>
<li>الاعتراض على المعالجة غير الضرورية.</li>
</ul>
<p>لتقديم طلب، تواصلي معنا على ${I('email')}، وسنرد خلال مدة معقولة. وإذا لم تكوني راضية عن ردّنا، يمكنك تقديم شكوى إلى الجهة المختصة بحماية البيانات في قطر (الوكالة الوطنية للأمن السيبراني — شؤون الحوكمة والضمان السيبراني الوطني).</p>

<h2>9. التعديلات على هذه السياسة</h2>
<p>قد نحدّث هذه السياسة من وقت لآخر، وستكون أحدث نسخة متاحة دائماً على هذه الصفحة مع تاريخ سريانها.</p>
`;

const PAGES = {
  'terms.html': ['Terms and Conditions', 'Terms &amp; Conditions', 'الشروط والأحكام', TERMS_AR],
  'refund.html': ['Return and Refund Policy', 'Return &amp; Refund Policy', 'سياسة الاستبدال والاسترجاع', REFUND_AR],
  'privacy.html': ['Privacy Policy', 'Privacy Policy', 'سياسة الخصوصية', PRIVACY_AR],
};

function policy(s, file) {
  const [plain, h1, ar, body] = PAGES[file];
  s = common(s);
  s = rep(s, `<title>${plain} — Levanche Lady's Fashion</title>`, `<title>${ar} — ليفانش للأزياء النسائية</title>`);
  s = rep(s, `<h1>${h1}</h1>`, `<h1>${ar}</h1>`);
  s = rep(s, '<div class="script">Levanche</div>', '<div class="script">ليفانش</div>');
  s = rep(s, 'Effective date: 18 November 2026', 'تاريخ السريان: 18 نوفمبر 2026');
  s = rep(s, '← Back to Shop', 'العودة إلى المتجر ←');
  // tabs
  s = s.replace(/(<div class="tabs">)([\s\S]*?)(<\/div>)/, (m, a, inner, c) => a + inner
    .replace('>Terms &amp; Conditions<', '>الشروط والأحكام<')
    .replace('>Return &amp; Refund Policy<', '>سياسة الاستبدال والاسترجاع<')
    .replace('>Privacy Policy<', '>سياسة الخصوصية<') + c);
  const a = s.indexOf('<article>') + 9, b = s.indexOf('</article>');
  return s.slice(0, a) + body + s.slice(b);
}

fs.mkdirSync(OUT, { recursive: true });
const h = home(fs.readFileSync(path.join(IN, 'index.html'), 'utf8'));
fs.writeFileSync(path.join(OUT, 'index-ar.html'), h);
for (const f of Object.keys(PAGES)) {
  const out = policy(fs.readFileSync(path.join(IN, f), 'utf8'), f);
  fs.writeFileSync(path.join(OUT, f.replace('.html', '-ar.html')), out);
}
console.log('[make-ar] Arabic pages written to ' + OUT + (misses ? ` (${misses} text blocks not translated)` : ' — all text translated'));
