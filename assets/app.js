;(function(){
  document.documentElement.setAttribute('dir','rtl')

  // Parallax background scroll var with throttling
  let scrollY = 0
  let ticking = false
  
  function onScroll(){
    scrollY = window.scrollY || 0
    if (!ticking) {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--scrollY', String(scrollY))
        ticking = false
      })
      ticking = true
    }
  }
  window.addEventListener('scroll', onScroll, { passive:true })
  onScroll()

  // ============================================
  // FLOATING PARTICLES - FAST & GLOWING ACROSS ENTIRE PAGE
  // ============================================
  
  function createFloatingParticles() {
    if (document.body && document.body.classList && document.body.classList.contains('low-perf')) {
      const containerSkip = document.getElementById('particles-container')
      if (containerSkip) containerSkip.innerHTML = ''
      return
    }
    const container = document.getElementById('particles-container')
    if (!container) return
    
    // Configuration - MORE particles for intensive effect
    const particleCount = 100 // Increased for more intensive glow
    const sizes = ['small', 'medium', 'large', 'small', 'medium', 'small', 'medium'] // More variety
    
    // Clear existing particles first
    container.innerHTML = ''
    
    // Create particles scattered across entire page
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = `particle ${sizes[Math.floor(Math.random() * sizes.length)]}`
      
      // Random position across ENTIRE viewport (0-100% both X and Y)
      const left = Math.random() * 100
      const top = Math.random() * 100
      particle.style.left = `${left}%`
      particle.style.top = `${top}%`
      
      // FASTER animation duration
      const duration = 4 + Math.random() * 6 // 4-10 seconds (MUCH FASTER!)
      particle.style.animationDuration = `${duration}s`
      
      // Random delay for staggered fade in/out effect
      const delay = Math.random() * -15 // Start at different points in animation
      particle.style.animationDelay = `${delay}s`
      
      // MORE DRAMATIC drift direction (both X and Y)
      const driftX = (Math.random() - 0.5) * 100 // -50px to 50px horizontal drift
      const driftY = (Math.random() - 0.5) * 100 // -50px to 50px vertical drift
      particle.style.setProperty('--driftX', `${driftX}px`)
      particle.style.setProperty('--driftY', `${driftY}px`)
      
      // Add particle to container
      container.appendChild(particle)
    }
  }
  
  // Initialize particles when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createFloatingParticles)
  } else {
    createFloatingParticles()
  }
  
  // Recreate particles on window resize for responsive behavior
  let resizeTimeout
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(createFloatingParticles, 500)
  })

  // ============================================
  // LOW PERFORMANCE MODE TOGGLE (Global)
  // ============================================
  const LOW_PERF_KEY = 'lowPerfEnabled'
  function applyLowPerfMode(enabled){
    document.body.classList.toggle('low-perf', !!enabled)
    if (enabled){
      const pc = document.getElementById('particles-container')
      if (pc) pc.innerHTML = ''
    } else {
      // Recreate particles when turning back on
      try { createFloatingParticles() } catch(e){}
    }
  }
  // initialize from storage
  const savedLowPerf = (function(){
    try{ return localStorage.getItem(LOW_PERF_KEY) === '1' }catch(e){ return false }
  })()

  // Enhance page titles to consistent blue style
  ;(function enhancePageTitles(){
    const headings = document.querySelectorAll('main h1')
    headings.forEach(function(h){
      // Unify classes and always ensure inversion so headings render blue consistently
      h.classList.add('neon-title','no-glow','ruqaa','page-title','ruqaa-invert')
    })
  })()
  if (savedLowPerf) applyLowPerfMode(true)

  // ============================================
  // UNIFIED HEADER BUILDER (Sync navbar across pages)
  // ============================================
  // Mark home page on body for scoped CSS (e.g., dividers)
  ;(function markHome(){
    const page = (location.pathname.split('/').pop() || 'index.html')
    if (page === '' || page === 'index.html') {
      document.body.classList.add('is-home')
    }
  })()
  ;(function synchronizeHeader(){
    const header = document.querySelector('.site-header')
    if (!header) return
    // Build consistent header structure
    const html = [
      '<div class="container header-inner">',
      '  <div class="nav-area">',
      '    <button class="nav-toggle" aria-expanded="false" aria-label="فتح القائمة"><span></span><span></span><span></span></button>',
      '    <nav class="site-nav" aria-label="التنقل الرئيسي">',
      '      <button class="nav-back" aria-label="رجوع" title="رجوع">✕</button>',
      '      <div class="mobile-nav-header">',
      '        <h2 class="mobile-nav-title ruqaa ruqaa-invert">أعربلي</h2>',
      '      </div>',
      '      <ul>',
      '        <li><a href="index.html">الرئيسية</a></li>',
      '        <li><a href="tool.html"><span class="ruqaa ruqaa-invert no-glow">أعربلي</span></a></li>',
      '        <li><a href="rules.html">قواعد النحو</a></li>',
      '        <li><a href="history.html">التاريخ</a></li>',
      '        <li><a href="progress.html">التقدم</a></li>',
      '        <li><a href="blog.html">المدونة</a></li>',
      '        <li><a href="about.html">من نحن</a></li>',
      '        <li><a href="contact.html">اتصل بنا</a></li>',
      '      </ul>',
      '    </nav>',
      '  </div>',
      '  <a href="index.html" class="brand" aria-label="الانتقال إلى الرئيسية">',
      '    <img src="public/logo.png" alt="شعار أعربلي - نظام الإعراب بالذكاء الاصطناعي" class="logo" />',
      '  </a>',
      '</div>'
    ].join('')
    header.innerHTML = html
    // Set active link based on current path
    const path = (location.pathname.split('/').pop() || 'index.html')
    const links = header.querySelectorAll('.site-nav a')
    links.forEach(function(a){
      const href = a.getAttribute('href')
      if (href === path) a.classList.add('active')
    })
  })()

  // Hide .html extensions visually by rewriting hrefs on load
  document.querySelectorAll('a[href$=".html"]').forEach(function(a){
    try{
      const url = new URL(a.getAttribute('href'), location.href)
      const path = url.pathname.replace(/index\.html$/,'').replace(/\.html$/,'')
      a.setAttribute('data-clean-href', path || '/')
      // Optional: update displayed status bar on hover via title
      if (!a.getAttribute('title')) a.setAttribute('title', path || '/')
    }catch(e){}
  })

  // Service worker registration (if available)
  if ('serviceWorker' in navigator){
    const onLoad = function(){ navigator.serviceWorker.register('/sw.js').catch(()=>{}) }
    if (document.readyState === 'complete') onLoad(); else window.addEventListener('load', onLoad, { once:true })
  }

  // API helpers
  const API_CONFIG = {
    get baseUrl(){
      // Always use production API
      return 'https://i3rbly.youssef.cv'
    },
    endpoints: { 
      parse:'/v1/parse', 
      blog:'/v1/blog', 
      contact:'/v1/contact',
      diacritize:'/v1/diacritize'
    },
    timeout: 15000,
  }

  // Performance optimizations
  const PERFORMANCE_CONFIG = {
    DEBOUNCE_DELAY: 300,
    THROTTLE_DELAY: 100,
    CACHE_SIZE: 100,
    MAX_RETRIES: 3
  };

  // Request cache for API calls
  const requestCache = new Map();
  const MAX_CACHE_SIZE = PERFORMANCE_CONFIG.CACHE_SIZE;

  // Debounce function for input handling
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle function for scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Optimized cache management
  function manageCache() {
    if (requestCache.size > MAX_CACHE_SIZE) {
      const firstKey = requestCache.keys().next().value;
      requestCache.delete(firstKey);
    }
  }

  // Get authentication token from server (more secure approach)
  async function getAuthToken() {
    try {
      const response = await fetch('/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          timestamp: Math.floor(Date.now() / 1000).toString(),
          userAgent: navigator.userAgent,
          origin: window.location.origin
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.token;
      }
    } catch (error) {
      console.error('Failed to get auth token:', error);
    }
    return null;
  }

  // Optimized API request function
  async function makeOptimizedRequest(url, options = {}) {
    const cacheKey = `${url}_${JSON.stringify(options)}`;
    
    // Check cache first
    if (requestCache.has(cacheKey)) {
      const cached = requestCache.get(cacheKey);
      if (Date.now() - cached.timestamp < 300000) { // 5 minutes
        return cached.data;
      }
    }
    
    // Get secure authentication token from server
    const authToken = await getAuthToken();
    if (!authToken) {
      throw new Error('Failed to get authentication token');
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'X-Requested-With': 'XMLHttpRequest',
          ...options.headers
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache successful responses
      requestCache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      manageCache();
      
      return data;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  function request(path, opts){
    const controller = new AbortController()
    const id = setTimeout(()=> controller.abort(), API_CONFIG.timeout)
    
    // Add security headers
    const timestamp = Math.floor(Date.now() / 1000)
    const data = opts?.body || ''
    // Use a simple signature for development - in production this should be proper HMAC
    const signature = btoa(timestamp + data + 'i3rbly-secure-key-2024')
    
    const secureHeaders = {
      'Content-Type': 'application/json',
      'X-API-Signature': signature,
      'X-Timestamp': timestamp.toString(),
      'X-Requested-With': 'XMLHttpRequest',
      ...((opts&&opts.headers)||{})
    }
    
    return fetch(API_CONFIG.baseUrl + path, { ...(opts||{}), signal: controller.signal, headers: secureHeaders })
      .then(async res=>{ clearTimeout(id); if(!res.ok) throw new Error('HTTP '+res.status); return await res.json() })
      .catch(async e=>{
        clearTimeout(id)
        // Fallback to mock for development or on network errors
        return mock(path, opts)
      })
  }

  function mock(path, opts){
    // Enhanced mock data with detailed grammar analysis like the original site
    if (path.includes('/parse')) {
      // Return detailed mock analysis with comprehensive grammar information
      return { 
        ok: true, 
        html: '<span data-i3rab="فعل ماضٍ ناقص ناسخ مبني على الفتح الظاهر">كَانَ</span> <span data-i3rab="فعل مضارع مبني للمجهول مرفوع وعلامة رفعه الضمة الظاهرة، ونائب الفاعل ضمير مستتر تقديره هو">يُولَدُ</span> <span data-i3rab="اسم كان مؤخر مرفوع وعلامة رفعه الضمة الظاهرة على آخره">طِفْلٌ</span> <span data-i3rab="حرف جر مبني على السكون لا محل له من الإعراب">عَلَى</span> <span data-i3rab="اسم مجرور وعلامة جره الكسرة الظاهرة على آخره، والجار والمجرور متعلقان بالفعل يُولَدُ">الْفِطْرَةِ</span>' 
      };
    }
    if (path.includes('/blog')){
      return { ok:true, posts:[
        { id:1,  title:'أساسيات الإعراب: ما هو الإعراب؟', date:'2025-09-06', excerpt:'الإعراب هو تغيير يطرأ على أواخر الكلمات العربية تبعاً لتغير موقعها في الجملة.', content:'<p>الإعراب هو تغيير يطرأ على أواخر الكلمات العربية تبعاً لتغير موقعها في الجملة، وهو الذي يحدد وظيفة الكلمة النحوية.</p><ul><li>الرفع: الضمة.</li><li>النصب: الفتحة.</li><li>الجر: الكسرة.</li><li>الجزم: السكون.</li></ul>' },
        { id:2,  title:'علامات الإعراب الأصلية', date:'2025-09-07', excerpt:'العلامات الأصلية للإعراب هي الضمة والفتحة والكسرة والسكون.', content:'<p>أربع علامات أصلية للإعراب: الضمة، الفتحة، الكسرة، السكون مع أمثلة توضيحية.</p>' },
        { id:3,  title:'الفاعل: دليلك الكامل', date:'2025-09-08', excerpt:'الفاعل هو من قام بالفعل ويكون دائماً مرفوعاً.', content:'<p>الفاعل اسم مرفوع يدل على من قام بالفعل. قد يكون ظاهراً أو ضميراً مستتراً.</p>' },
        { id:4,  title:'الممنوع من الصرف', date:'2025-09-20', excerpt:'هو الاسم الذي لا يقبل التنوين ويجر بالفتحة في مواضع.', content:'<p>الممنوع من الصرف لا يقبل التنوين ويجر بالفتحة نيابة عن الكسرة إلا إذا أضيف أو عُرِّف بأل.</p><ul><li>العَلَم على وزن فُعَلاء.</li><li>صيغة منتهى الجموع.</li><li>العَدَل والوصفية مع الأوزان الخاصة.</li></ul>' },
        { id:5,  title:'الفرق بين النعت والحال', date:'2025-09-19', excerpt:'النعت يتبع المنعوت، والحال يبين هيئة صاحبه.', content:'<p>النعت وصف للاسم يتبعه في إعرابه. الحال يبين هيئة صاحبه ويكون منصوباً.</p><p>مثال: جاء الطالب <strong>المجتهدُ</strong> (نعت). جاء الطالب <strong>مسرعاً</strong> (حال).</p>' },
        { id:6,  title:'الأسماء الخمسة وشروط إعرابها', date:'2025-09-18', excerpt:'ترفع بالواو وتنصب بالألف وتجر بالياء بشروط.', content:'<p>الأسماء الخمسة: أب، أخ، حم، فو، ذو. تُعرب بالحروف بشروط منها الإضافة وعدم التصغير.</p>' }
      ] }
    }
    return { ok:false }
  }

  // Text helpers
  function stripTashkeel(text){
    const TASHKEEL_REGEX = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g
    return String(text||'').replace(TASHKEEL_REGEX, '')
  }

  function getI3rabText(html, originalSentence){
    const container = document.createElement('div')
    container.innerHTML = html || ''
    const parts = []
    container.querySelectorAll('span').forEach(function(span){
      const word = span.textContent || ''
      const gram = span.getAttribute('data-i3rab') || span.getAttribute('title') || ''
      if (word) parts.push(word+': '+gram)
    })
    let result = ''
    if (originalSentence) result += originalSentence+"\n\n"
    result += parts.join('\n')
    result += '\n\n____________ i3rab given by https://i3rbly.com ______________'
    return result
  }

  // Grammar helper functions (GLOBAL - needed by renderAsLines)
  let colorsEnabled = true
  
  const grammarInfo = {
    'فعل': { class: 'grammar-verb', tooltip: 'الفعل: كلمة تدل على حدث مقترن بزمن معين' },
    'مفعول': { class: 'grammar-noun', tooltip: 'المفعول: اسم منصوب يدل على من وقع عليه الفعل أو اتصف به' },
    'فاعل': { class: 'grammar-noun', tooltip: 'الفاعل: اسم مرفوع يدل على من قام بالفعل أو اتصف به' },
    'مبتدأ': { class: 'grammar-noun', tooltip: 'المبتدأ: اسم مرفوع يقع في أول الجملة الاسمية ويحتاج إلى خبر' },
    'خبر': { class: 'grammar-noun', tooltip: 'الخبر: اسم مرفوع يكمل مع المبتدأ معنى الجملة الاسمية' },
    'حرف': { class: 'grammar-particle', tooltip: 'الحرف: كلمة لا معنى لها إلا مع غيرها من الكلمات' },
    'اسم': { class: 'grammar-noun', tooltip: 'الاسم: كلمة تدل على شخص أو شيء أو مكان أو صفة' },
    'ضمير': { class: 'grammar-pronoun', tooltip: 'الضمير: كلمة تدل على متكلم أو مخاطب أو غائب' },
    'التاء': { class: 'grammar-letter', tooltip: 'التاء: حرف يدل على ضمير المتكلم في الفعل' },
    'الواو': { class: 'grammar-letter', tooltip: 'الواو: حرف يدل على ضمير الجماعة أو علامة رفع' },
    'الألف': { class: 'grammar-letter', tooltip: 'الألف: حرف للتفريق أو علامة نصب أو علامة رفع' },
    'الياء': { class: 'grammar-letter', tooltip: 'الياء: حرف يدل على ضمير المخاطبة أو علامة جر' },
    'جملة': { class: 'grammar-clause', tooltip: 'الجملة: مجموعة كلمات تعطي معنى تاماً ومفهوماً' },
    'شبه': { class: 'grammar-clause', tooltip: 'شبه الجملة: جار ومجرور أو ظرف مكان أو زمان' },
    'مرفوع': { class: 'grammar-noun', tooltip: 'مرفوع: حالة إعرابية تدل على الرفع بالضمة أو ما ينوب عنها' },
    'منصوب': { class: 'grammar-noun', tooltip: 'منصوب: حالة إعرابية تدل على النصب بالفتحة أو ما ينوب عنها' },
    'مجرور': { class: 'grammar-noun', tooltip: 'مجرور: حالة إعرابية تدل على الجر بالكسرة أو ما ينوب عنها' },
    'مبني': { class: 'grammar-noun', tooltip: 'مبني: كلمة لا تتغير حركة آخرها مهما تغير موقعها في الجملة' },
    'معرب': { class: 'grammar-noun', tooltip: 'معرب: كلمة تتغير حركة آخرها حسب موقعها في الجملة' },
    'مضاف': { class: 'grammar-noun', tooltip: 'المضاف: اسم يضاف إلى اسم آخر ويأخذ إعرابه' },
    'مضاف إليه': { class: 'grammar-noun', tooltip: 'المضاف إليه: اسم مجرور يضاف إليه المضاف' },
    'نعت': { class: 'grammar-noun', tooltip: 'النعت: صفة تتبع المنعوت في إعرابه ونوعه وعدده' },
    'منعوت': { class: 'grammar-noun', tooltip: 'المنعوت: الموصوف الذي يتبعه النعت' },
    'توكيد': { class: 'grammar-noun', tooltip: 'التوكيد: تابع يذكر لتأكيد معنى متبوعه وإزالة الشك عنه' },
    'بدل': { class: 'grammar-noun', tooltip: 'البدل: تابع يذكر عوضاً عن متبوعه أو بياناً له' },
    'عطف': { class: 'grammar-noun', tooltip: 'العطف: تابع يذكر بعد حرف عطف يربطه بما قبله' },
    'جار': { class: 'grammar-particle', tooltip: 'الجار: حرف جر يدخل على الاسم فيجره' },
    'ظرف': { class: 'grammar-noun', tooltip: 'الظرف: اسم يدل على زمان أو مكان وقوع الفعل' },
    'حال': { class: 'grammar-noun', tooltip: 'الحال: اسم منصوب يبين هيئة صاحب الحال عند وقوع الفعل' },
    'تمييز': { class: 'grammar-noun', tooltip: 'التمييز: اسم منصوب يوضح المقصود من اسم مبهم قبله' },
    'استثناء': { class: 'grammar-noun', tooltip: 'الاستثناء: إخراج ما بعد أداة الاستثناء من حكم ما قبلها' },
    'نداء': { class: 'grammar-noun', tooltip: 'النداء: طلب إقبال المنادى عليه بحرف نداء' },
    'منادى': { class: 'grammar-noun', tooltip: 'المنادى: اسم منصوب يطلب إقباله بحرف النداء' }
  }

  function getGrammarClass(grammar) {
    if (!colorsEnabled) return ''
    for (const [key, info] of Object.entries(grammarInfo)) {
      if (grammar.includes(key)) return info.class
    }
    return ''
  }

  function getGrammarTooltip(grammar) {
    for (const [key, info] of Object.entries(grammarInfo)) {
      if (grammar.includes(key)) return info.tooltip
    }
    return ''
  }

  function renderAsLines(containerEl, html, originalSentence){
    containerEl.textContent = ''
    
    // Ensure container has proper styling for mobile
    containerEl.style.width = '100%'
    containerEl.style.maxWidth = '100%'
    containerEl.style.boxSizing = 'border-box'
    containerEl.style.overflow = 'hidden'
    
    const container = document.createElement('div')
    container.innerHTML = html || ''
    const items = []
    
    // Check if mobile once at the start
    const isMobile = window.innerWidth <= 720
    
    // Look for spans with data-i3rab attribute first
    container.querySelectorAll('span[data-i3rab]').forEach(function(span){
      const word = span.textContent || ''
      const gram = span.getAttribute('data-i3rab') || ''
      if (word && gram) items.push({ word, gram })
    })
    
    // If no data-i3rab spans found, look for any spans
    if (items.length === 0) {
      container.querySelectorAll('span').forEach(function(span){
      const word = span.textContent || ''
      const gram = span.getAttribute('data-i3rab') || span.getAttribute('title') || ''
      if (word) items.push({ word, gram })
    })
    }
    
    const frag = document.createDocumentFragment()
    
    // Add sentence title box if originalSentence is provided
    if (originalSentence){
      const title = document.createElement('div')
      
      // Use isMobile from outer scope
      title.style.cssText = `
        text-align: center;
        font-size: ${isMobile ? '1.2rem' : '1.4rem'};
        font-weight: bold;
        margin-bottom: ${isMobile ? '20px' : '24px'};
        padding: ${isMobile ? '14px' : '16px'};
        border: 2px solid var(--neon);
        border-radius: ${isMobile ? '10px' : '12px'};
        background: rgba(24, 255, 243, 0.05);
        color: var(--text);
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        word-wrap: break-word;
        overflow-wrap: break-word;
      `
      title.textContent = originalSentence
      frag.appendChild(title)
    }
    
    items.forEach(function(item){
      const row = document.createElement('div')
      row.className = 'token'
      
      // Use isMobile from outer scope
      row.style.cssText = `
        padding: ${isMobile ? '10px 12px' : '6px 12px'};
        margin: ${isMobile ? '6px 0' : '3px 0'};
        background: rgba(255, 255, 255, 0.02);
        border-radius: ${isMobile ? '8px' : '4px'};
        text-align: right;
        direction: rtl;
        font-size: ${isMobile ? '0.9rem' : '0.95rem'};
        line-height: 1.6;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        word-wrap: break-word;
        overflow-wrap: break-word;
      `
      
      // Get word color based on grammar
      const grammarClass = getGrammarClass(item.gram)
      const grammarTooltip = getGrammarTooltip(item.gram)
      let wordColor = '#18fff3'
      if (grammarClass.includes('verb')) {
        wordColor = '#ff6b6b'
      } else if (grammarClass.includes('noun')) {
        wordColor = '#64c8ff'
      } else if (grammarClass.includes('particle')) {
        wordColor = '#96ff96'
      } else if (grammarClass.includes('pronoun')) {
        wordColor = '#ffc864'
      } else if (grammarClass.includes('letter')) {
        wordColor = '#e6b3ff'
      }
      
      // Create interactive word with hover tooltip
      const wordSpan = document.createElement('span')
      wordSpan.className = 'interactive-word'
      
      // Use isMobile from outer scope
      wordSpan.style.cssText = `
        color: ${wordColor};
        font-weight: 600;
        cursor: pointer;
        padding: ${isMobile ? '3px 6px' : '2px 6px'};
        border-radius: 4px;
        transition: all 0.2s ease;
        position: relative;
        display: inline-block;
        max-width: 100%;
        word-break: break-word;
        overflow-wrap: break-word;
      `
      wordSpan.textContent = item.word
      wordSpan.title = grammarTooltip || 'مرر الماوس لمعرفة المفهوم النحوي'
      
      // Add hover effects
      wordSpan.addEventListener('mouseenter', function(e) {
        this.style.background = 'rgba(24, 255, 243, 0.15)'
        this.style.boxShadow = '0 0 8px rgba(24, 255, 243, 0.3)'
        this.style.transform = 'translateY(-1px)'
        
        // Show tooltip if grammar info available
        if (grammarTooltip) {
          showTooltip(this, grammarTooltip)
        }
      })
      
      wordSpan.addEventListener('mouseleave', function() {
        this.style.background = 'transparent'
        this.style.boxShadow = 'none'
        this.style.transform = 'translateY(0)'
        hideTooltip()
      })
      
      const gramSpan = document.createElement('span')
      gramSpan.style.color = 'rgba(255,255,255,0.7)'
      gramSpan.textContent = ' : ' + item.gram
      
      row.appendChild(wordSpan)
      row.appendChild(gramSpan)
      
      frag.appendChild(row)
    })
    containerEl.appendChild(frag)
  }

  // Home page posts
  const homePostsGrid = document.getElementById('home-posts')
  if (homePostsGrid){
    request(API_CONFIG.endpoints.blog, { method:'GET' }).then(function(res){
      const posts = (res&&res.posts)||[]
      const first = posts.slice(0,10)
      const frag = document.createDocumentFragment()
      first.forEach(function(p){
        const card = document.createElement('div')
        card.className = 'card'
        const h3 = document.createElement('h3')
        h3.style.color = 'var(--neon)'
        h3.style.margin = '0 0 8px'
        h3.textContent = p.title
        const pEl = document.createElement('p')
        pEl.style.margin = '0 0 12px'
        pEl.style.color = 'var(--muted)'
        // Show excerpt or truncated content
        const excerpt = p.excerpt || (p.content ? p.content.substring(0, 100) + '...' : '')
        pEl.textContent = excerpt
        const row = document.createElement('div')
        row.style.display = 'flex'
        row.style.justifyContent = 'space-between'
        row.style.alignItems = 'center'
        const date = document.createElement('div')
        date.style.fontSize = '.9rem'
        date.style.color = '#8aa9b0'
        date.textContent = p.date || ''
        const link = document.createElement('a')
        link.className = 'button'
        link.href = 'blog-post.html?id='+p.id
        link.textContent = 'أقرأ المزيد'
        row.appendChild(date); row.appendChild(link)
        card.appendChild(h3); card.appendChild(pEl); card.appendChild(row)
        frag.appendChild(card)
      })
      homePostsGrid.appendChild(frag)
    })
  }

  // Blog list page
  const blogGrid = document.getElementById('blog-grid')
  const blogToggle = document.getElementById('blog-toggle')
  if (blogGrid){
    let allPosts = []
    let expanded = false
    function render(){
      blogGrid.textContent = ''
      const items = expanded ? allPosts : allPosts.slice(0,6)
      const frag = document.createDocumentFragment()
      items.forEach(function(p){
        const card = document.createElement('div')
        card.className = 'blog-card'
        // Show excerpt or truncated content
        const excerpt = p.excerpt || (p.content ? p.content.substring(0, 150) + '...' : 'اقرأ المزيد لمعرفة التفاصيل')
        card.innerHTML = `
          <div>
            <h3>${p.title}</h3>
            <p>${excerpt}</p>
          </div>
          <div class="blog-meta">
            <span class="blog-date">${p.date ? new Date(p.date).toLocaleDateString('ar-EG') : ''}</span>
            <a href="blog-post.html?id=${p.id}" class="read-more">أقرأ المزيد</a>
          </div>
        `
        frag.appendChild(card)
      })
      blogGrid.appendChild(frag)
      if (blogToggle) blogToggle.textContent = expanded ? 'إخفاء' : 'عرض جميع المقالات'
    }
    request(API_CONFIG.endpoints.blog, { method:'GET' }).then(function(res){ allPosts = (res&&res.posts)||[]; render() })
    if (blogToggle){ blogToggle.addEventListener('click', function(){ expanded = !expanded; render() }) }
  }

  // Blog post page
  const blogPostContainer = document.getElementById('blog-post-container')
  if (blogPostContainer){
    const params = new URLSearchParams(location.search)
    // Support both /blog/123 via Netlify rewrite and direct ?id=123
    let id = params.get('id')
    if (!id){
      const path = location.pathname
      const match = path.match(/\/blog\/(\d+)/)
      if (match) id = match[1]
    }
    const postId = Number(id)
    if (!postId){ blogPostContainer.innerHTML = '<div class="card">المقال غير موجود</div>'; return }
    request(API_CONFIG.endpoints.blog, { method:'GET' }).then(function(res){
      const all = (res&&res.posts)||[]
      const post = all.find(function(x){ return Number(x.id)===postId })
      if (!post){ blogPostContainer.innerHTML = '<div class="card">المقال غير موجود</div>'; return }
      const article = document.createElement('article')
      article.className = 'card'
      article.style.maxWidth = '900px'
      article.style.margin = '0 auto'
      const headRow = document.createElement('div')
      headRow.style.display = 'flex'
      headRow.style.justifyContent = 'space-between'
      headRow.style.alignItems = 'center'
      headRow.style.marginBottom = '10px'
      const back = document.createElement('a')
      back.href = 'blog.html'
      back.className = 'button'
      back.textContent = 'رجوع'
      headRow.appendChild(back)
      const h1 = document.createElement('h1')
      h1.className = 'ruqaa ruqaa-invert'
      h1.style.marginTop = '0'
      h1.textContent = post.title
      const date = document.createElement('div')
      date.style.fontSize = '.9rem'
      date.style.color = '#8aa9b0'
      date.style.marginBottom = '12px'
      date.textContent = post.date
      const excerpt = document.createElement('p')
      excerpt.style.color = 'var(--muted)'
      excerpt.style.fontSize = '1.1rem'
      excerpt.style.lineHeight = '1.6'
      excerpt.textContent = post.excerpt || ''
      const content = document.createElement('div')
      content.innerHTML = post.content || ''
      article.appendChild(headRow)
      article.appendChild(h1)
      article.appendChild(date)
      article.appendChild(excerpt)
      article.appendChild(content)
      blogPostContainer.appendChild(article)
    })
  }

    // Tool page
    const parseForm = document.getElementById('parse-form')
    if (parseForm){
      const input = document.getElementById('sentence')
      const outputWrap = document.getElementById('parse-output')
      const loader = document.getElementById('parse-loader')
      const errorBox = document.getElementById('parse-error')
      const copyResult = document.getElementById('copy-result')
      const copyStatus = document.getElementById('copy-status')
      const colorToggle = document.getElementById('color-toggle')
      const saveSentence = document.getElementById('save-sentence')

// State management
let sentenceHistory = JSON.parse(localStorage.getItem('sentenceHistory') || '[]')
let userProgress = JSON.parse(localStorage.getItem('userProgress') || '{"totalSentences": 0, "correctParsings": 0, "favoriteSentences": 0}')

    // Progress tracking
    function updateProgress(type, increment = 1) {
      userProgress[type] = (userProgress[type] || 0) + increment
      localStorage.setItem('userProgress', JSON.stringify(userProgress))
    }

    function saveToHistory(sentence, result) {
      // Normalize sentence for comparison (trim and normalize spaces)
      const normalizeSentence = (str) => {
        return str.trim().replace(/\s+/g, ' ')
      }
      
      const normalizedInput = normalizeSentence(sentence)
      
      // Check if this exact sentence already exists in history
      const existingIndex = sentenceHistory.findIndex(h => 
        normalizeSentence(h.sentence) === normalizedInput
      )
      
      if (existingIndex !== -1) {
        // Sentence already exists - update its timestamp and move to top
        const existingItem = sentenceHistory[existingIndex]
        existingItem.timestamp = new Date().toISOString()
        existingItem.result = result // Update the result in case it changed
        existingItem.sentence = sentence // Update with current version (in case spacing changed)
        
        // Remove from old position and add to beginning
        sentenceHistory.splice(existingIndex, 1)
        sentenceHistory.unshift(existingItem)
        
        localStorage.setItem('sentenceHistory', JSON.stringify(sentenceHistory))
        
        // Show feedback that this was updated, not added
        console.log('📝 Sentence updated in history (duplicate detected)')
        
        // Don't update progress counter for duplicates
        return true // Return true to indicate this was a duplicate update
      }
      
      // New unique sentence - create new item
      const historyItem = {
        id: Date.now(),
        sentence: sentence,
        result: result,
        timestamp: new Date().toISOString(),
        isFavorite: false
      }
      
      sentenceHistory.unshift(historyItem)
      
      // Limit history to 100 items
      if (sentenceHistory.length > 100) {
        sentenceHistory = sentenceHistory.slice(0, 100)
      }
      
      localStorage.setItem('sentenceHistory', JSON.stringify(sentenceHistory))
      
      console.log('✅ New sentence added to history')
      
      // Only update progress for new unique sentences
      updateProgress('totalSentences')
      
      return false // Return false to indicate this was a new entry
    }

    function toggleFavorite(historyId) {
      const item = sentenceHistory.find(h => h.id === historyId)
      if (item) {
        item.isFavorite = !item.isFavorite
        localStorage.setItem('sentenceHistory', JSON.stringify(sentenceHistory))
        updateProgress('favoriteSentences', item.isFavorite ? 1 : -1)
      }
    }

    // Grammar rules database
    const grammarRules = [
      {
        id: 1,
        title: 'المبتدأ والخبر',
        category: 'نحو',
        description: 'المبتدأ اسم مرفوع يقع في أول الجملة الاسمية، والخبر اسم مرفوع يكمل مع المبتدأ معنى الجملة',
        examples: [
          'الطالب مجتهد - الطالب: مبتدأ، مجتهد: خبر',
          'الكتاب مفيد - الكتاب: مبتدأ، مفيد: خبر'
        ]
      },
      {
        id: 2,
        title: 'الفاعل',
        category: 'نحو',
        description: 'الفاعل اسم مرفوع يدل على من قام بالفعل أو اتصف به',
        examples: [
          'قرأ الطالب - الطالب: فاعل مرفوع',
          'جاء المعلم - المعلم: فاعل مرفوع'
        ]
      },
      {
        id: 3,
        title: 'المفعول به',
        category: 'نحو',
        description: 'المفعول به اسم منصوب يدل على من وقع عليه الفعل',
        examples: [
          'قرأ الطالب الكتاب - الكتاب: مفعول به منصوب',
          'أكل الطفل التفاحة - التفاحة: مفعول به منصوب'
        ]
      },
      {
        id: 4,
        title: 'الضمائر المتصلة',
        category: 'صرف',
        description: 'الضمائر المتصلة ضمائر تتصل بالفعل أو الاسم وتدل على المتكلم أو المخاطب أو الغائب',
        examples: [
          'رأيتك - التاء: ضمير متصل في محل رفع فاعل',
          'كتابي - الياء: ضمير متصل في محل جر مضاف إليه'
        ]
      },
      {
        id: 5,
        title: 'حروف الجر',
        category: 'نحو',
        description: 'حروف الجر حروف تدخل على الأسماء فتجعلها مجرورة',
        examples: [
          'ذهبت إلى المدرسة - إلى: حرف جر، المدرسة: اسم مجرور',
          'جلس على الكرسي - على: حرف جر، الكرسي: اسم مجرور'
        ]
      }
    ]

    function setLoading(v){ if (loader) loader.style.display = v ? '' : 'none' }
    function setError(msg){ if (errorBox){ errorBox.textContent = msg||''; errorBox.style.display = msg ? '' : 'none' } }
    function setOutput(html){
      if (!outputWrap) {
        return
      }
      
      outputWrap.textContent = ''
      outputWrap.dataset.rawHtml = html || ''
      
      if (html){ 
        renderAsLines(outputWrap, html, input.value) 
        
        // Show the output if it was hidden
        outputWrap.style.display = 'block'
        outputWrap.style.minHeight = '200px'
      } else {
        // ONLY show "no result" message if we're intentionally clearing (not during loading)
        // Don't clear if there's already content
        if (outputWrap.children.length === 0) {
          outputWrap.style.minHeight = '100px'
          outputWrap.innerHTML = '<p style="text-align:center;color:var(--muted);padding:40px 20px;">لا توجد نتيجة بعد. اكتب جملة واضغط "أعربلي"</p>'
        }
      }
    }

    // Optimized parse form submission with debouncing
    const debouncedParse = debounce(async function(sentence) {
      if (!sentence) return
      
      setLoading(true); setError(''); // DON'T clear output here - wait for result
      
      try {
        // Use old API format that works
        const res = await fetch(API_CONFIG.baseUrl + API_CONFIG.endpoints.parse, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sentence: sentence })
        });
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data && data.html){
          setOutput(data.html)
          outputWrap.dataset.rawHtml = data.html
          
          // Save to history and show save button
          if (data.html && !data.html.includes('خطأ')) {
            const isDuplicate = saveToHistory(sentence, data.html)
            
            // Show notification if duplicate
            if (isDuplicate && copyStatus) {
              copyStatus.textContent = '🔄 تم تحديث الوقت في السجل'
              copyStatus.style.color = '#18fff3'
              setTimeout(() => {
                copyStatus.textContent = ''
              }, 3000)
            }
            
            if (saveSentence) {
              saveSentence.style.display = 'inline-flex'
            }
          }
        }
        else{
          const errMsg = (data && data.error) === 'timeout'
            ? 'انتهت مهلة الطلب. يرجى المحاولة مجدداً بعد لحظات.'
            : 'حدث خطأ في التحليل. يرجى المحاولة مرة أخرى.'
          setError(errMsg)
        }
      } catch (error) {
        console.error('Parse error:', error)
        setError('فشل في الاتصال بالخادم. تحقق من اتصال الإنترنت.')
      } finally {
        setLoading(false)
        hideSubmitLoading()
      }
    }, PERFORMANCE_CONFIG.DEBOUNCE_DELAY);

    parseForm.addEventListener('submit', function(e){
      e.preventDefault()
      
      const hasImage = uploadedImageBlob !== null
      const hasText = input.value.trim()
      
      // Allow submission if either image or text is present
      if (!hasText && !hasImage) {
        setError('يرجى إدخال جملة صحيحة أو رفع صورة.')
        return
      }
      
      // Show loading animation
      showSubmitLoading()
      
      if (hasImage) {
        // Process image upload
        processImageUpload()
      } else {
        // Process text
        debouncedParse(hasText)
      }
    })

    if (copyResult){
      copyResult.addEventListener('click', function(){
        const fullText = getI3rabText(outputWrap.dataset.rawHtml||'', input.value)
        navigator.clipboard.writeText(fullText)
          .then(function(){ 
            copyStatus.textContent = 'تم النسخ!'
            setTimeout(function(){ copyStatus.textContent = '' }, 2000)
          })
          .catch(function(){})
      })
    }
    
    // Color toggle functionality
    if (colorToggle) {
      colorToggle.addEventListener('click', function(){
        colorsEnabled = !colorsEnabled
        this.setAttribute('data-enabled', colorsEnabled)
        this.classList.toggle('disabled', !colorsEnabled)
        
        // Re-render the current output with new color settings
        if (outputWrap.dataset.rawHtml) {
          renderAsLines(outputWrap, outputWrap.dataset.rawHtml, input.value)
        }
      })
    }
    
    // Save sentence functionality
    if (saveSentence) {
      saveSentence.addEventListener('click', function(){
        const currentSentence = input.value
        const currentResult = outputWrap.dataset.rawHtml
        
        if (currentSentence && currentResult) {
          let existingItem = sentenceHistory.find(h => h.sentence === currentSentence)
          
          if (existingItem) {
            // Toggle existing item
            existingItem.isFavorite = !existingItem.isFavorite
            updateProgress('favoriteSentences', existingItem.isFavorite ? 1 : -1)
          } else {
            // Create new item
            const newItem = {
              sentence: currentSentence,
              result: currentResult,
              timestamp: new Date().toISOString(),
              isFavorite: true
            }
            sentenceHistory.unshift(newItem)
            updateProgress('favoriteSentences', 1)
          }
          
          // Update localStorage
          localStorage.setItem('sentenceHistory', JSON.stringify(sentenceHistory))
          
          // Update button text
          const isFavorite = existingItem ? existingItem.isFavorite : true
          this.innerHTML = `<span>${isFavorite ? '⭐' : '💾'}</span><span>${isFavorite ? 'مفضل' : 'حفظ'}</span>`
        }
      })
    }
    
    // Diacritization button functionality
    const diacritizeBtn = document.getElementById('diacritize-btn')
    if (diacritizeBtn) {
      diacritizeBtn.addEventListener('click', async function(){
        const text = input.value.trim()
        if (!text) {
          setError('يرجى إدخال نص أولاً.')
          return
        }
        
        // Show loading state
        const originalText = this.innerHTML
        this.innerHTML = '<span>⏳</span><span>جاري التشكيل...</span>'
        this.disabled = true
        
        try {
          // Use the correct API endpoint for diacritization
          const response = await fetch(API_CONFIG.baseUrl + API_CONFIG.endpoints.diacritize, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ text: text })
          })
          
          const data = await response.json()
          
          if (response.ok && data.diacritized_text) {
            input.value = data.diacritized_text
            setError('') // Clear any previous errors
          } else {
            setError(data.error || 'حدث خطأ في التشكيل.')
          }
        } catch (error) {
          console.error('Diacritization error:', error)
          setError('حدث خطأ في الاتصال بالخادم.')
        } finally {
          // Restore button state
          this.innerHTML = originalText
          this.disabled = false
        }
      })
    }
    
  }

  // Rules page functionality
  const rulesGrid = document.getElementById('rules-grid')
  const rulesSearch = document.getElementById('rules-search')
  const filterBtns = document.querySelectorAll('.filter-btn')
  
  if (rulesGrid) {
    let currentFilter = 'all'
    let searchTerm = ''
    
    // Grammar rules database
    const grammarRules = [
      {
        id: 1,
        title: 'المبتدأ والخبر',
        category: 'nahw',
        description: 'المبتدأ اسم مرفوع يقع في أول الجملة الاسمية، والخبر اسم مرفوع يكمل مع المبتدأ معنى الجملة',
        examples: [
          'الطالب مجتهد - الطالب: مبتدأ، مجتهد: خبر',
          'الكتاب مفيد - الكتاب: مبتدأ، مفيد: خبر'
        ]
      },
      {
        id: 2,
        title: 'الفاعل',
        category: 'nahw',
        description: 'الفاعل اسم مرفوع يدل على من قام بالفعل أو اتصف به',
        examples: [
          'قرأ الطالب - الطالب: فاعل مرفوع',
          'جاء المعلم - المعلم: فاعل مرفوع'
        ]
      },
      {
        id: 3,
        title: 'المفعول به',
        category: 'nahw',
        description: 'المفعول به اسم منصوب يدل على من وقع عليه الفعل',
        examples: [
          'قرأ الطالب الكتاب - الكتاب: مفعول به منصوب',
          'أكل الطفل التفاحة - التفاحة: مفعول به منصوب'
        ]
      },
      {
        id: 4,
        title: 'الضمائر المتصلة',
        category: 'saraf',
        description: 'الضمائر المتصلة ضمائر تتصل بالفعل أو الاسم وتدل على المتكلم أو المخاطب أو الغائب',
        examples: [
          'رأيتك - التاء: ضمير متصل في محل رفع فاعل',
          'كتابي - الياء: ضمير متصل في محل جر مضاف إليه'
        ]
      },
      {
        id: 5,
        title: 'حروف الجر',
        category: 'nahw',
        description: 'حروف الجر حروف تدخل على الأسماء فتجعلها مجرورة',
        examples: [
          'ذهبت إلى المدرسة - إلى: حرف جر، المدرسة: اسم مجرور',
          'جلس على الكرسي - على: حرف جر، الكرسي: اسم مجرور'
        ]
      },
      {
        id: 6,
        title: 'النعت والحال',
        category: 'nahw',
        description: 'النعت صفة تتبع المنعوت، والحال يبين هيئة صاحبه',
        examples: [
          'جاء الطالب المجتهد - المجتهد: نعت',
          'جاء الطالب مسرعاً - مسرعاً: حال'
        ]
      },
      {
        id: 16,
        title: 'كان وأخواتها',
        category: 'nahw',
        description: 'أفعال ناسخة تدخل على الجملة الاسمية فترفع المبتدأ ويسمى اسمها، وتنصب الخبر ويسمى خبرها',
        examples: [
          'كان الطالب مجتهداً - الطالب: اسم كان مرفوع، مجتهداً: خبر كان منصوب',
          'أصبح الجو بارداً - الجو: اسم أصبح مرفوع، بارداً: خبر أصبح منصوب'
        ]
      },
      {
        id: 17,
        title: 'إن وأخواتها',
        category: 'nahw',
        description: 'حروف ناسخة تدخل على الجملة الاسمية فتنصب المبتدأ ويسمى اسمها، وترفع الخبر ويسمى خبرها',
        examples: [
          'إن العلم نافع - العلم: اسم إن منصوب، نافع: خبر إن مرفوع',
          'لعل الفرج قريب - الفرج: اسم لعل منصوب، قريب: خبر لعل مرفوع'
        ]
      },
      {
        id: 18,
        title: 'نائب الفاعل',
        category: 'nahw',
        description: 'اسم مرفوع يحل محل الفاعل بعد حذفه وبناء الفعل للمجهول',
        examples: [
          'كُتِبَ الدرسُ - الدرس: نائب فاعل مرفوع',
          'فُتِحَت المدرسةُ - المدرسة: نائب فاعل مرفوع'
        ]
      },
      {
        id: 19,
        title: 'المفعول المطلق',
        category: 'nahw',
        description: 'مصدر منصوب يذكر بعد فعل من لفظه لتوكيد معناه أو بيان نوعه أو عدده',
        examples: [
          'ضرب المعلم التلميذ ضرباً - ضرباً: مفعول مطلق منصوب',
          'فرحت فرحاً شديداً - فرحاً: مفعول مطلق منصوب'
        ]
      },
      {
        id: 20,
        title: 'المفعول لأجله',
        category: 'nahw',
        description: 'مصدر قلبي منصوب يذكر لبيان سبب وقوع الفعل',
        examples: [
          'أذاكر طلباً للنجاح - طلباً: مفعول لأجله منصوب',
          'قمت إجلالاً للمعلم - إجلالاً: مفعول لأجله منصوب'
        ]
      },
      {
        id: 21,
        title: 'المفعول فيه (الظرف)',
        category: 'nahw',
        description: 'اسم منصوب يبين زمان أو مكان وقوع الفعل',
        examples: [
          'جئت يوم الجمعة - يوم: ظرف زمان منصوب',
          'جلست أمام المعلم - أمام: ظرف مكان منصوب'
        ]
      },
      {
        id: 22,
        title: 'المفعول معه',
        category: 'nahw',
        description: 'اسم منصوب يقع بعد واو بمعنى "مع" يفيد المصاحبة',
        examples: [
          'سرت والنيل - النيل: مفعول معه منصوب',
          'استيقظت وطلوع الشمس - طلوع: مفعول معه منصوب'
        ]
      },
      {
        id: 23,
        title: 'التمييز',
        category: 'nahw',
        description: 'اسم نكرة منصوب يزيل الإبهام عن المميز',
        examples: [
          'اشتريت عشرين كتاباً - كتاباً: تمييز منصوب',
          'طاب محمد نفساً - نفساً: تمييز منصوب'
        ]
      },
      {
        id: 24,
        title: 'الاستثناء',
        category: 'nahw',
        description: 'إخراج اسم يقع بعد أداة استثناء من الحكم الذي قبلها',
        examples: [
          'حضر الطلاب إلا محمداً - محمداً: مستثنى منصوب',
          'ما نجح إلا المجتهد - المجتهد: بدل من الضمير المستتر مرفوع'
        ]
      },
      {
        id: 25,
        title: 'النداء',
        category: 'nahw',
        description: 'طلب إقبال المنادى بحرف من حروف النداء',
        examples: [
          'يا طالبُ العلم - طالب: منادى مبني على الضم',
          'يا محمدُ - محمد: منادى مبني على الضم'
        ]
      },
      {
        id: 26,
        title: 'الإضافة',
        category: 'nahw',
        description: 'نسبة بين اسمين يسمى الأول مضافاً والثاني مضافاً إليه، والمضاف إليه مجرور دائماً',
        examples: [
          'كتاب الطالب - الطالب: مضاف إليه مجرور',
          'بيت المعلم - المعلم: مضاف إليه مجرور'
        ]
      },
      {
        id: 27,
        title: 'التوابع',
        category: 'nahw',
        description: 'أسماء تتبع ما قبلها في الإعراب: النعت، والعطف، والتوكيد، والبدل',
        examples: [
          'جاء محمد والطالب - الطالب: معطوف مرفوع',
          'رأيت الطالب نفسه - نفسه: توكيد منصوب'
        ]
      },
      {
        id: 28,
        title: 'أسلوب الشرط',
        category: 'nahw',
        description: 'أسلوب يتكون من أداة شرط وفعل الشرط وجوابه، وفعلا الشرط والجواب مجزومان',
        examples: [
          'إن تدرس تنجح - تدرس: فعل الشرط مجزوم، تنجح: جواب الشرط مجزوم',
          'من يجتهد ينل المراد - يجتهد: فعل الشرط، ينل: جواب الشرط'
        ]
      },
      {
        id: 7,
        title: 'الممنوع من الصرف',
        category: 'saraf',
        description: 'هو الاسم الذي لا يقبل التنوين ويجر بالفتحة في مواضع',
        examples: [
          'العَلَم على وزن فُعَلاء',
          'صيغة منتهى الجموع'
        ]
      },
      {
        id: 8,
        title: 'الأسماء الخمسة',
        category: 'saraf',
        description: 'ترفع بالواو وتنصب بالألف وتجر بالياء بشروط',
        examples: [
          'أب، أخ، حم، فو، ذو',
          'تُعرب بالحروف بشروط منها الإضافة'
        ]
      },
      {
        id: 29,
        title: 'الفعل الصحيح والمعتل',
        category: 'saraf',
        description: 'الفعل الصحيح ما خلت أصوله من حروف العلة، والمعتل ما كان أحد أصوله حرف علة',
        examples: [
          'كتب - فعل صحيح سالم',
          'قال - فعل معتل (ناقص)، وعد - فعل معتل (مثال)'
        ]
      },
      {
        id: 30,
        title: 'المجرد والمزيد',
        category: 'saraf',
        description: 'الفعل المجرد ما كانت جميع حروفه أصلية، والمزيد ما زيد على أصوله حرف أو أكثر',
        examples: [
          'كتب - فعل ثلاثي مجرد',
          'أكرم، تكاتب، استخرج - أفعال مزيدة'
        ]
      },
      {
        id: 31,
        title: 'الميزان الصرفي',
        category: 'saraf',
        description: 'وزن الكلمة بوضع الفاء للحرف الأول والعين للثاني واللام للثالث',
        examples: [
          'كتب - فَعَل',
          'مكتوب - مَفْعُول، كاتب - فاعِل'
        ]
      },
      {
        id: 32,
        title: 'المثنى وجمع المذكر السالم',
        category: 'saraf',
        description: 'المثنى يُرفع بالألف ويُنصب ويُجر بالياء، وجمع المذكر السالم يُرفع بالواو ويُنصب ويُجر بالياء',
        examples: [
          'الطالبان - مثنى مرفوع، الطالبَيْن - مثنى منصوب',
          'المعلمون - جمع مذكر سالم مرفوع، المعلمين - جمع مذكر سالم منصوب'
        ]
      },
      {
        id: 33,
        title: 'جمع المؤنث السالم وجمع التكسير',
        category: 'saraf',
        description: 'جمع المؤنث السالم يُرفع بالضمة ويُنصب ويُجر بالكسرة، وجمع التكسير يتغير بناؤه',
        examples: [
          'المعلمات - جمع مؤنث سالم، يُنصب بالكسرة',
          'كتب، رجال، علماء - جموع تكسير'
        ]
      },
      {
        id: 34,
        title: 'المصدر الميمي واسم المرة والهيئة',
        category: 'saraf',
        description: 'المصدر الميمي مصدر يبدأ بميم زائدة، واسم المرة يدل على حدوث الفعل مرة واحدة',
        examples: [
          'مَكْتَب، مَجْلِس - مصادر ميمية',
          'ضَرْبَة - اسم مرة، جِلْسَة - اسم هيئة'
        ]
      },
      {
        id: 35,
        title: 'اسم الفاعل واسم المفعول',
        category: 'saraf',
        description: 'اسم الفاعل يدل على من قام بالفعل، واسم المفعول يدل على من وقع عليه الفعل',
        examples: [
          'كاتب - اسم فاعل من كتب',
          'مكتوب - اسم مفعول من كتب'
        ]
      },
      {
        id: 36,
        title: 'الصفة المشبهة وصيغ المبالغة',
        category: 'saraf',
        description: 'الصفة المشبهة تدل على صفة ثابتة، وصيغ المبالغة تدل على كثرة الفعل',
        examples: [
          'حَسَن، كريم - صفات مشبهة',
          'غفَّار، علاَّمة، مِقْدام - صيغ مبالغة'
        ]
      },
      {
        id: 37,
        title: 'اسم الزمان والمكان',
        category: 'saraf',
        description: 'اسما مشتقان يدلان على زمان أو مكان وقوع الفعل',
        examples: [
          'مَكْتَب - اسم مكان من كتب',
          'مَوْعِد - اسم زمان من وعد'
        ]
      },
      {
        id: 38,
        title: 'اسم التفضيل',
        category: 'saraf',
        description: 'اسم مشتق على وزن "أفعل" يدل على أن شيئين اشتركا في صفة وزاد أحدهما على الآخر',
        examples: [
          'أكبر، أجمل، أفضل',
          'محمد أكبر من علي'
        ]
      },
      {
        id: 39,
        title: 'اسم الآلة',
        category: 'saraf',
        description: 'اسم مشتق يدل على الأداة التي يحصل بها الفعل، له أوزان قياسية',
        examples: [
          'مِفتاح، مِنشار - على وزن مِفعال',
          'مِطرقة، مِكنسة - على وزن مِفعلة'
        ]
      },
      {
        id: 40,
        title: 'النسب',
        category: 'saraf',
        description: 'إلحاق ياء مشددة مكسور ما قبلها بآخر الاسم للدلالة على نسبته إلى المجرد منها',
        examples: [
          'مصر - مصريّ',
          'علم - علميّ، عرب - عربيّ'
        ]
      },
      {
        id: 41,
        title: 'التصغير',
        category: 'saraf',
        description: 'تغيير في بنية الكلمة للدلالة على صغر الحجم أو القلة أو التحقير أو التحبب',
        examples: [
          'كتاب - كُتَيِّب',
          'رجل - رُجَيْل، بيت - بُيَيْت'
        ]
      },
      {
        id: 42,
        title: 'الإعلال والإبدال',
        category: 'saraf',
        description: 'الإعلال تغيير حرف العلة، والإبدال جعل حرف مكان حرف آخر',
        examples: [
          'قال أصلها قَوَل - إعلال بالقلب',
          'اتّصل أصلها اوتصل - إبدال الواو تاء'
        ]
      },
      {
        id: 43,
        title: 'الإدغام',
        category: 'saraf',
        description: 'إدخال حرف ساكن في حرف متحرك بحيث يصيران حرفاً واحداً مشدداً',
        examples: [
          'مَدَّ أصلها مَدَدَ',
          'فَرَّ أصلها فَرَرَ'
        ]
      },
      {
        id: 44,
        title: 'الحذف والزيادة',
        category: 'saraf',
        description: 'حذف حرف من الكلمة أو زيادة حرف عليها لغرض صرفي',
        examples: [
          'قُلْ أصلها قُوْل - حذف الواو',
          'أحمر على وزن أفعل - زيادة الألف'
        ]
      },
      {
        id: 45,
        title: 'الأفعال الخمسة',
        category: 'saraf',
        description: 'أفعال مضارعة اتصلت بها ألف الاثنين أو واو الجماعة أو ياء المخاطبة',
        examples: [
          'يكتبان، تكتبان - يكتبون، تكتبون - تكتبين',
          'ترفع بثبوت النون وتنصب وتجزم بحذفها'
        ]
      },
      {
        id: 46,
        title: 'المبني للمجهول',
        category: 'saraf',
        description: 'تغيير صيغة الفعل لإخفاء الفاعل وإقامة المفعول به مقامه',
        examples: [
          'كُتِبَ الدرس - الماضي المبني للمجهول',
          'يُكتَب الدرس - المضارع المبني للمجهول'
        ]
      },
      {
        id: 47,
        title: 'اسم الآلة السماعي',
        category: 'saraf',
        description: 'أسماء آلة سُمعت عن العرب على غير الأوزان القياسية',
        examples: [
          'سيف، سكين، قلم، فأس',
          'تعلّم سماعاً ولا تُقاس عليها'
        ]
      },
      {
        id: 48,
        title: 'المصادر الصناعية',
        category: 'saraf',
        description: 'مصادر تُصاغ بزيادة ياء مشددة وتاء مربوطة على آخر الاسم',
        examples: [
          'إنسان - إنسانية',
          'حر - حرية، وطن - وطنية'
        ]
      },
      {
        id: 49,
        title: 'اسم المنسوب',
        category: 'saraf',
        description: 'اسم يُلحق بآخره ياء مشددة مكسور ما قبلها ليدل على الانتساب',
        examples: [
          'الشام - شامي',
          'الإسلام - إسلامي، الكويت - كويتي'
        ]
      },
      {
        id: 50,
        title: 'الاشتقاق الكبير والأكبر',
        category: 'saraf',
        description: 'الاشتقاق الكبير (القلب المكاني) والأكبر (الإبدال) من طرق توليد الكلمات',
        examples: [
          'جَذَب - جَبَذ (اشتقاق كبير)',
          'صراط - سراط (اشتقاق أكبر)'
        ]
      },
      {
        id: 9,
        title: 'التشبيه',
        category: 'balagha',
        description: 'التشبيه هو عقد مماثلة بين شيئين أو أكثر وإرادة اشتراكهما في صفة أو أكثر بأداة',
        examples: [
          'محمد كالأسد في الشجاعة - تشبيه مفصل',
          'العلم نور - تشبيه بليغ بحذف الأداة ووجه الشبه'
        ]
      },
      {
        id: 10,
        title: 'الاستعارة',
        category: 'balagha',
        description: 'الاستعارة هي تشبيه حُذف أحد طرفيه، وهي من أبلغ المجازات',
        examples: [
          'رأيت أسداً يخطب - استعارة تصريحية (شبه الرجل بالأسد وحذف المشبه)',
          'له يد بيضاء عندي - استعارة مكنية (شبه اليد بشيء له لون)'
        ]
      },
      {
        id: 11,
        title: 'الكناية',
        category: 'balagha',
        description: 'الكناية هي لفظ أطلق وأريد به لازم معناه مع جواز إرادة المعنى الأصلي',
        examples: [
          'فلان كثير الرماد - كناية عن الكرم',
          'نظيف اليد - كناية عن الأمانة والعفة'
        ]
      },
      {
        id: 12,
        title: 'الطباق والمقابلة',
        category: 'balagha',
        description: 'الطباق الجمع بين الشيء وضده، والمقابلة الجمع بين معنيين متوافقين أو أكثر ثم الإتيان بما يقابلهما',
        examples: [
          'تحسبهم أيقاظاً وهم رقود - طباق إيجابي',
          'فليضحكوا قليلاً وليبكوا كثيراً - مقابلة بين ضحك/بكاء وقليل/كثير'
        ]
      },
      {
        id: 13,
        title: 'الجناس',
        category: 'balagha',
        description: 'الجناس هو تشابه اللفظين في النطق واختلافهما في المعنى',
        examples: [
          'الصيف صيف - جناس تام (الصيف: الفصل، صيف: فعل ماضٍ من صاف)',
          'يوم تبيض وجوه وتسود وجوه - جناس ناقص'
        ]
      },
      {
        id: 14,
        title: 'الأمر والنهي البلاغيان',
        category: 'balagha',
        description: 'قد يخرج الأمر والنهي عن معناهما الأصلي إلى معانٍ بلاغية تُفهم من السياق',
        examples: [
          'كُلُوا وَاشْرَبُوا - أمر للإباحة',
          'فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ - أمر للحث والتشجيع'
        ]
      },
      {
        id: 15,
        title: 'الاستفهام البلاغي',
        category: 'balagha',
        description: 'استفهام لا يُراد به طلب الفهم، بل يخرج لمعانٍ بلاغية كالتعجب والإنكار',
        examples: [
          'هَلْ جَزَاءُ الْإِحْسَانِ إِلَّا الْإِحْسَانُ - استفهام للتقرير',
          'أَأَنتَ فَعَلْتَ هَذَا - استفهام للتعجب والإنكار'
        ]
      }
    ]
    
    function renderRules() {
      rulesGrid.innerHTML = ''
      
      const filteredRules = grammarRules.filter(rule => {
        const matchesFilter = currentFilter === 'all' || rule.category === currentFilter
        const matchesSearch = !searchTerm || 
          rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rule.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesFilter && matchesSearch
      })
      
      filteredRules.forEach(rule => {
        const card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `
          <h3 style="color: var(--neon); margin-bottom: 12px;">${rule.title}</h3>
          <p style="color: var(--text); margin-bottom: 16px; line-height: 1.6;">${rule.description}</p>
          <div style="background: rgba(24,255,243,0.1); padding: 12px; border-radius: 8px; margin-top: 12px;">
            <h4 style="color: var(--accent); margin-bottom: 8px; font-size: 14px;">أمثلة:</h4>
            ${rule.examples.map(example => `<div style="color: var(--text); margin: 4px 0; font-size: 14px;">${example}</div>`).join('')}
          </div>
        `
        rulesGrid.appendChild(card)
      })
    }
    
    // Filter button functionality
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'))
        this.classList.add('active')
        currentFilter = this.dataset.filter
        renderRules()
      })
    })
    
    // Search functionality
    if (rulesSearch) {
      rulesSearch.addEventListener('input', function() {
        searchTerm = this.value
        renderRules()
      })
    }
    
    // Initial render
    renderRules()
  }

  // Mobile navigation functionality with improved animations and accessibility
  const navToggle = document.querySelector('.nav-toggle')
  const siteNav = document.querySelector('.site-nav')
  const navBack = document.querySelector('.nav-back')
  const siteHeader = document.querySelector('.site-header')
  
  if (navToggle && siteNav) {
    function closeNav() {
      navToggle.setAttribute('aria-expanded', 'false')
      navToggle.setAttribute('aria-label', 'فتح القائمة')
      siteNav.classList.remove('open')
      document.body.classList.remove('nav-open')
      
      // Remove event listener to prevent memory leaks
      document.removeEventListener('keydown', handleEscapeKey)
    }
    
    function openNav() {
      navToggle.setAttribute('aria-expanded', 'true')
      navToggle.setAttribute('aria-label', 'إغلاق القائمة')
      siteNav.classList.add('open')
      document.body.classList.add('nav-open')
      
      // Add escape key listener
      document.addEventListener('keydown', handleEscapeKey)
      
      // Focus on first nav link for accessibility
      setTimeout(() => {
        const firstLink = siteNav.querySelector('a')
        if (firstLink) firstLink.focus()
      }, 300)
    }
    
    function handleEscapeKey(e) {
      if (e.key === 'Escape') {
        closeNav()
      }
    }
    
    navToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true'
      if (isExpanded) {
        closeNav()
      } else {
        openNav()
      }
    })
    
    // Back button functionality
    if (navBack) {
      navBack.addEventListener('click', function() {
        closeNav()
      })
    }

    
    // Close mobile nav when clicking on nav links
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        closeNav()
      })
    })
    
    // Handle window resize - close nav if switching to desktop
    let resizeTimer
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 720 && siteNav.classList.contains('open')) {
          closeNav()
        }
      }, 250)
    })
  }
  
  // Enhanced scroll behavior for navbar
  if (siteHeader) {
    let lastScrollTop = 0
    let scrollTicking = false
    
    function updateHeaderOnScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      // Add scrolled class for styling
      if (scrollTop > 50) {
        siteHeader.classList.add('scrolled')
      } else {
        siteHeader.classList.remove('scrolled')
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
      scrollTicking = false
    }
    
    window.addEventListener('scroll', function() {
      if (!scrollTicking) {
        requestAnimationFrame(updateHeaderOnScroll)
        scrollTicking = true
      }
    }, { passive: true })
  }

  // Insert Low Performance toggle into header
  ;(function initPerfToggle(){
    const headerInner = document.querySelector('.header-inner')
    if (!headerInner) return
    const toggleWrap = document.createElement('div')
    toggleWrap.className = 'perf-toggle'
    const label = document.createElement('span')
    label.className = 'perf-toggle-label'
    label.textContent = 'وضع الأداء المنخفض'
    const switchBtn = document.createElement('button')
    switchBtn.className = 'perf-switch'
    switchBtn.type = 'button'
    switchBtn.setAttribute('role','switch')
    switchBtn.setAttribute('aria-label','تفعيل وضع الأداء المنخفض')
    switchBtn.setAttribute('aria-checked', savedLowPerf ? 'true' : 'false')
    const knob = document.createElement('span')
    knob.className = 'knob'
    switchBtn.appendChild(knob)
    toggleWrap.appendChild(label)
    toggleWrap.appendChild(switchBtn)

    // Place near navigation area, before brand for better RTL alignment
    const navArea = document.querySelector('.nav-area')
    if (navArea && navArea.parentElement === headerInner){
      navArea.appendChild(toggleWrap)
    } else {
      headerInner.appendChild(toggleWrap)
    }

    switchBtn.addEventListener('click', function(){
      const next = this.getAttribute('aria-checked') !== 'true'
      this.setAttribute('aria-checked', next ? 'true' : 'false')
      applyLowPerfMode(next)
      try{ localStorage.setItem(LOW_PERF_KEY, next ? '1' : '0') }catch(e){}
    })
  })()

  // Footer dynamic year and last-updated
  var yearEl = document.getElementById('year')
  if (yearEl){ yearEl.textContent = String(new Date().getFullYear()) }
  document.querySelectorAll('.last-updated').forEach(function(el){ el.textContent = new Date().toLocaleDateString('ar-EG') })

  // Google AdSense: ensure script present then push all ad slots
  ;(function initAdsense(){
    var clientId = 'ca-pub-2789303242179184'
    var hasScript = Array.from(document.scripts).some(function(s){ return (s.src||'').indexOf('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js') !== -1 })
    if (!hasScript){
      var s = document.createElement('script')
      s.async = true
      s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + clientId
      s.crossOrigin = 'anonymous'
      document.head.appendChild(s)
    }
    function pushAll(){
      var slots = document.querySelectorAll('.ad-placeholder .adsbygoogle, .adsense-container .adsbygoogle, ins.adsbygoogle')
      slots.forEach(function(){ try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch(e){} })
    }
    // expose helper for dynamic slots
    window.pushAds = pushAll
    // try pushing soon and again after a small delay
    setTimeout(pushAll, 300)
    setTimeout(pushAll, 1200)
  })()

  // Tooltip functionality
  let currentTooltip = null

  function showTooltip(element, text) {
    // Remove existing tooltip
    hideTooltip()
    
    // Create tooltip element
    const tooltip = document.createElement('div')
    tooltip.className = 'js-tooltip'
    tooltip.textContent = text
    
    // Check if mobile
    const isMobile = window.innerWidth <= 720
    
    tooltip.style.cssText = `
      position: absolute;
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.97), rgba(20, 20, 20, 0.97));
      color: #ffffff;
      padding: ${isMobile ? '12px 14px' : '14px 18px'};
      border-radius: ${isMobile ? '8px' : '10px'};
      font-size: ${isMobile ? '0.85rem' : '0.95rem'};
      font-weight: 500;
      z-index: 99999;
      pointer-events: none;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7), 0 0 0 2px rgba(24, 255, 243, 0.4);
      border: 2px solid rgba(24, 255, 243, 0.5);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      max-width: ${isMobile ? '85vw' : '320px'};
      white-space: normal;
      text-align: ${isMobile ? 'right' : 'center'};
      line-height: 1.5;
      font-family: "Cairo", sans-serif;
      direction: rtl;
    `
    
    // Position tooltip
    const rect = element.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    
    // For mobile, center the tooltip horizontally
    if (isMobile) {
      tooltip.style.left = '50%'
      tooltip.style.top = (rect.bottom + scrollTop + 8) + 'px'
      tooltip.style.transform = 'translateX(-50%)'
    } else {
      tooltip.style.left = (rect.left + scrollLeft + rect.width / 2) + 'px'
      tooltip.style.top = (rect.bottom + scrollTop + 8) + 'px'
      tooltip.style.transform = 'translateX(-50%)'
    }
    
    // Add to DOM
    document.body.appendChild(tooltip)
    currentTooltip = tooltip
    
    // Animate in
    requestAnimationFrame(() => {
      tooltip.style.opacity = '1'
      tooltip.style.transform = 'translateX(-50%) translateY(4px)'
    })
  }

  function hideTooltip() {
    if (currentTooltip) {
      currentTooltip.style.opacity = '0'
      currentTooltip.style.transform = 'translateX(-50%) translateY(0)'
      
      setTimeout(() => {
        if (currentTooltip && currentTooltip.parentNode) {
          currentTooltip.parentNode.removeChild(currentTooltip)
        }
        currentTooltip = null
      }, 300)
    }
  }

  // History page functionality
  const historyGrid = document.getElementById('history-grid')
  const historyEmpty = document.getElementById('history-empty')
  const exportHistoryBtn = document.getElementById('export-history')
  const historySearch = document.getElementById('history-search')
  
  if (historyGrid) {
    let currentFilter = 'all'
    let searchTerm = ''
    
    function renderHistory() {
      const historyData = localStorage.getItem('sentenceHistory')
      
      const history = JSON.parse(historyData || '[]')
      
      // Filter history based on current filter and search term
      let filteredHistory = history
      
      // Apply category filter
      if (currentFilter === 'fav') {
        filteredHistory = filteredHistory.filter(h => h.isFavorite)
      } else if (currentFilter === 'recent') {
        filteredHistory = filteredHistory.slice(0, 10)
      }
      
      // Apply search filter
      if (searchTerm) {
        filteredHistory = filteredHistory.filter(h => 
          h.sentence.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      
      // Show/hide empty state
      if (filteredHistory.length === 0) {
        historyGrid.style.display = 'none'
        if (historyEmpty) historyEmpty.style.display = 'block'
        return
      }
      
      historyGrid.style.display = 'grid'
      if (historyEmpty) historyEmpty.style.display = 'none'
      
      // Clear grid
      historyGrid.innerHTML = ''
      
      // Render each history item
      filteredHistory.forEach(item => {
        const card = document.createElement('div')
        card.className = 'card'
        card.style.position = 'relative'
        
        // Format date
        const date = new Date(item.timestamp)
        const dateStr = date.toLocaleDateString('ar-EG', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
        
        // Create card header with sentence and buttons
        const header = document.createElement('div')
        header.style.display = 'flex'
        header.style.justifyContent = 'space-between'
        header.style.alignItems = 'start'
        header.style.marginBottom = '12px'
        
        const sentenceTitle = document.createElement('h3')
        sentenceTitle.style.color = 'var(--neon)'
        sentenceTitle.style.margin = '0'
        sentenceTitle.style.flex = '1'
        sentenceTitle.style.fontSize = 'clamp(16px, 3vw, 20px)'
        sentenceTitle.textContent = item.sentence
        
        const buttonGroup = document.createElement('div')
        buttonGroup.style.display = 'flex'
        buttonGroup.style.gap = '8px'
        
        const favoriteBtn = document.createElement('button')
        favoriteBtn.className = 'button toggle-favorite'
        favoriteBtn.setAttribute('data-id', item.id)
        favoriteBtn.style.padding = '8px 12px'
        favoriteBtn.style.fontSize = '18px'
        favoriteBtn.textContent = item.isFavorite ? '⭐' : '☆'
        favoriteBtn.title = item.isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'
        
        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'button delete-history'
        deleteBtn.setAttribute('data-id', item.id)
        deleteBtn.style.padding = '8px 12px'
        deleteBtn.style.fontSize = '18px'
        deleteBtn.textContent = '🗑️'
        deleteBtn.title = 'حذف'
        
        buttonGroup.appendChild(favoriteBtn)
        buttonGroup.appendChild(deleteBtn)
        
        header.appendChild(sentenceTitle)
        header.appendChild(buttonGroup)
        card.appendChild(header)
        
        // Date
        const dateEl = document.createElement('div')
        dateEl.style.fontSize = '0.9rem'
        dateEl.style.color = 'var(--muted)'
        dateEl.style.marginBottom = '12px'
        dateEl.textContent = dateStr
        card.appendChild(dateEl)
        
        // Parse output - render it properly WITHOUT grammar coloring/tooltips (to avoid scope issues)
        const outputContainer = document.createElement('div')
        outputContainer.className = 'parse-output'
        outputContainer.style.padding = '12px'
        outputContainer.style.background = 'rgba(0,0,0,0.3)'
        outputContainer.style.borderRadius = '8px'
        outputContainer.style.maxHeight = '300px'
        outputContainer.style.overflowY = 'auto'
        outputContainer.style.marginBottom = '12px'
        
        // Simple render without calling getGrammarClass/getGrammarTooltip
        if (item.result) {
          const container = document.createElement('div')
          container.innerHTML = item.result || ''
          const items = []
          
          container.querySelectorAll('span[data-i3rab]').forEach(function(span){
            const word = span.textContent || ''
            const gram = span.getAttribute('data-i3rab') || ''
            if (word && gram) items.push({ word, gram })
          })
          
          items.forEach(function(itm){
            const row = document.createElement('div')
            row.className = 'token'
            row.style.fontSize = '1.1rem'
            row.style.lineHeight = '1.6'
            row.style.padding = '8px 12px'
            row.style.margin = '4px 0'

            const word = document.createElement('span')
            word.style.fontWeight = 'bold'
            word.style.color = 'var(--neon)'
            word.style.fontSize = '1.15rem'
            word.textContent = itm.word

            const gram = document.createElement('span')
            gram.style.color = 'var(--text)'
            gram.textContent = ': '+itm.gram

            row.appendChild(word)
            row.appendChild(gram)
            outputContainer.appendChild(row)
          })
        } else {
          outputContainer.innerHTML = '<p style="text-align:center;color:var(--muted);padding:20px;">لا توجد نتيجة</p>'
        }
        
        card.appendChild(outputContainer)
        
        // Copy button
        const copyBtn = document.createElement('button')
        copyBtn.className = 'button copy-history'
        copyBtn.setAttribute('data-id', item.id)
        copyBtn.style.fontSize = '0.9rem'
        copyBtn.innerHTML = '📋 نسخ النتيجة'
        
        card.appendChild(copyBtn)
        historyGrid.appendChild(card)
      })
      
      // Add event listeners
      document.querySelectorAll('.toggle-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
          const id = this.getAttribute('data-id')
          toggleFavorite(id)
          renderHistory()
        })
      })
      
      document.querySelectorAll('.delete-history').forEach(btn => {
        btn.addEventListener('click', function() {
          if (confirm('هل أنت متأكد من حذف هذه الجملة؟')) {
            const id = this.getAttribute('data-id')
            deleteHistory(id)
            renderHistory()
          }
        })
      })
      
      document.querySelectorAll('.copy-history').forEach(btn => {
        btn.addEventListener('click', function() {
          const id = this.getAttribute('data-id')
          copyHistory(id)
          this.textContent = '✅ تم النسخ!'
          setTimeout(() => {
            this.textContent = '📋 نسخ النتيجة'
          }, 2000)
        })
      })
    }
    
    function toggleFavorite(id) {
      const history = JSON.parse(localStorage.getItem('sentenceHistory') || '[]')
      const item = history.find(h => h.id == id) // Use == for flexible comparison
      if (item) {
        item.isFavorite = !item.isFavorite
        localStorage.setItem('sentenceHistory', JSON.stringify(history))
      }
    }
    
    function deleteHistory(id) {
      let history = JSON.parse(localStorage.getItem('sentenceHistory') || '[]')
      history = history.filter(h => h.id != id) // Use != for flexible comparison
      localStorage.setItem('sentenceHistory', JSON.stringify(history))
    }
    
    function copyHistory(id) {
      const history = JSON.parse(localStorage.getItem('sentenceHistory') || '[]')
      const item = history.find(h => h.id == id) // Use == for flexible comparison
      if (item) {
        const text = getI3rabText(item.result, item.sentence)
        navigator.clipboard.writeText(text).catch(() => {})
      }
    }
    
    // Filter buttons
    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', function() {
        currentFilter = this.getAttribute('data-filter')
        
        // Update active state
        document.querySelectorAll('[data-filter]').forEach(b => {
          b.classList.remove('active')
        })
        this.classList.add('active')
        
        renderHistory()
      })
    })
    
    // Export history
    if (exportHistoryBtn) {
      exportHistoryBtn.addEventListener('click', function() {
        const history = JSON.parse(localStorage.getItem('sentenceHistory') || '[]')
        if (history.length === 0) {
          alert('لا توجد جمل محفوظة لتصديرها')
          return
        }
        
        let exportText = 'تاريخ الإعراب - أعربلي\n'
        exportText += '='.repeat(50) + '\n\n'
        
        history.forEach((item, index) => {
          const date = new Date(item.timestamp).toLocaleDateString('ar-EG')
          exportText += `${index + 1}. ${item.sentence}\n`
          exportText += `التاريخ: ${date}${item.isFavorite ? ' ⭐' : ''}\n`
          exportText += getI3rabText(item.result, '') + '\n'
          exportText += '-'.repeat(50) + '\n\n'
        })
        
        // Create download
        const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `i3rbly-history-${new Date().toISOString().split('T')[0]}.txt`
        a.click()
        URL.revokeObjectURL(url)
      })
    }
    
    // Search functionality
    if (historySearch) {
      historySearch.addEventListener('input', function() {
        searchTerm = this.value.trim()
        renderHistory()
      })
    }
    
    // Initial render
    renderHistory()
  }

  // Progress page
  const progressStats = document.getElementById('progress-stats')
  const progressAchievements = document.getElementById('progress-achievements')
  const progressGoals = document.getElementById('progress-goals')
  const streakElement = document.getElementById('streak')
  
  if (progressStats || progressAchievements) {
    const progress = JSON.parse(localStorage.getItem('userProgress') || '{"totalSentences": 0, "correctParsings": 0, "favoriteSentences": 0}')
    const history = JSON.parse(localStorage.getItem('sentenceHistory') || '[]')
    
    // Calculate streak
    function calculateStreak() {
      if (history.length === 0) return 0
      
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      let streak = 0
      let currentDate = new Date(today)
      
      for (let i = 0; i < 30; i++) {
        const dayStart = new Date(currentDate)
        const dayEnd = new Date(currentDate)
        dayEnd.setHours(23, 59, 59, 999)
        
        const hasActivity = history.some(item => {
          const itemDate = new Date(item.timestamp)
          return itemDate >= dayStart && itemDate <= dayEnd
        })
        
        if (hasActivity) {
          streak++
          currentDate.setDate(currentDate.getDate() - 1)
        } else if (i > 0) {
          break
        } else {
          currentDate.setDate(currentDate.getDate() - 1)
        }
      }
      
      return streak
    }
    
    const streak = calculateStreak()
    if (streakElement) streakElement.textContent = streak
    
    // Render stats
    if (progressStats) {
      const stats = [
        { icon: '📝', label: 'إجمالي الجمل', value: progress.totalSentences || 0, color: '#18fff3' },
        { icon: '⭐', label: 'الجمل المفضلة', value: progress.favoriteSentences || 0, color: '#ffc864' },
        { icon: '📚', label: 'جمل اليوم', value: history.filter(h => {
          const itemDate = new Date(h.timestamp)
          const today = new Date()
          return itemDate.toDateString() === today.toDateString()
        }).length, color: '#96ff96' },
        { icon: '🎯', label: 'متوسط الدقة', value: progress.totalSentences > 0 ? Math.round((progress.correctParsings || 0) / progress.totalSentences * 100) + '%' : '0%', color: '#ff6b6b' }
      ]
      
      const statsHTML = stats.map(stat => `
        <div style="
          padding: 16px;
          margin: 8px 0;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          border: 1px solid rgba(24, 255, 243, 0.15);
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
        " class="stat-card">
          <div style="font-size: 2rem;">${stat.icon}</div>
          <div style="flex: 1;">
            <div style="color: var(--muted); font-size: 0.9rem; margin-bottom: 4px;">${stat.label}</div>
            <div style="color: ${stat.color}; font-size: 1.8rem; font-weight: 700;">${stat.value}</div>
          </div>
        </div>
      `).join('')
      
      progressStats.innerHTML = statsHTML
      
      // Add hover effects
      document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
          this.style.background = 'rgba(24, 255, 243, 0.05)'
          this.style.borderColor = 'rgba(24, 255, 243, 0.3)'
          this.style.transform = 'translateY(-2px)'
        })
        card.addEventListener('mouseleave', function() {
          this.style.background = 'rgba(255, 255, 255, 0.02)'
          this.style.borderColor = 'rgba(24, 255, 243, 0.15)'
          this.style.transform = 'translateY(0)'
        })
      })
    }
    
    // Render achievements
    if (progressAchievements) {
      const achievements = [
        { icon: '🌟', title: 'البداية', desc: 'أعرب أول جملة', unlocked: progress.totalSentences >= 1 },
        { icon: '🔥', title: 'متحمس', desc: 'أعرب 10 جمل', unlocked: progress.totalSentences >= 10 },
        { icon: '💪', title: 'مجتهد', desc: 'أعرب 50 جملة', unlocked: progress.totalSentences >= 50 },
        { icon: '🏆', title: 'خبير', desc: 'أعرب 100 جملة', unlocked: progress.totalSentences >= 100 },
        { icon: '⭐', title: 'محب للتنظيم', desc: 'احفظ 5 جمل مفضلة', unlocked: progress.favoriteSentences >= 5 },
        { icon: '🎯', title: 'الثبات', desc: '7 أيام متتالية', unlocked: streak >= 7 },
      ]
      
      const achievementsHTML = achievements.map(ach => `
        <div style="
          padding: 12px;
          margin: 6px 0;
          background: ${ach.unlocked ? 'rgba(24, 255, 243, 0.08)' : 'rgba(255, 255, 255, 0.02)'};
          border-radius: 6px;
          border: 1px solid ${ach.unlocked ? 'rgba(24, 255, 243, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: ${ach.unlocked ? '1' : '0.5'};
          transition: all 0.3s ease;
        ">
          <div style="font-size: 1.8rem; filter: ${ach.unlocked ? 'none' : 'grayscale(100%)'};">${ach.icon}</div>
          <div style="flex: 1;">
            <div style="font-weight: 600; color: ${ach.unlocked ? 'var(--neon)' : 'var(--muted)'}; margin-bottom: 2px;">${ach.title}</div>
            <div style="font-size: 0.85rem; color: var(--muted);">${ach.desc}</div>
          </div>
          ${ach.unlocked ? '<div style="color: var(--neon); font-size: 1.2rem;">✓</div>' : '<div style="color: var(--muted); font-size: 1.2rem;">🔒</div>'}
        </div>
      `).join('')
      
      progressAchievements.innerHTML = achievementsHTML
    }
    
    // Render goals
    if (progressGoals) {
      const goals = [
        { title: 'هدف يومي', target: 5, current: history.filter(h => {
          const itemDate = new Date(h.timestamp)
          const today = new Date()
          return itemDate.toDateString() === today.toDateString()
        }).length, icon: '📅' },
        { title: 'هدف أسبوعي', target: 20, current: history.filter(h => {
          const itemDate = new Date(h.timestamp)
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          return itemDate >= weekAgo
        }).length, icon: '📊' },
        { title: 'هدف شهري', target: 100, current: history.filter(h => {
          const itemDate = new Date(h.timestamp)
          const monthAgo = new Date()
          monthAgo.setDate(monthAgo.getDate() - 30)
          return itemDate >= monthAgo
        }).length, icon: '🎯' }
      ]
      
      const goalsHTML = goals.map(goal => {
        const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100))
        return `
          <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.5rem;">${goal.icon}</span>
                <span style="font-weight: 600; color: var(--text);">${goal.title}</span>
              </div>
              <span style="color: var(--neon); font-weight: 600;">${goal.current} / ${goal.target}</span>
            </div>
            <div style="
              width: 100%;
              height: 12px;
              background: rgba(255, 255, 255, 0.05);
              border-radius: 20px;
              overflow: hidden;
              border: 1px solid rgba(24, 255, 243, 0.2);
            ">
              <div style="
                width: ${percentage}%;
                height: 100%;
                background: linear-gradient(90deg, #18fff3, #00d4ff);
                border-radius: 20px;
                transition: width 0.5s ease;
                box-shadow: 0 0 10px rgba(24, 255, 243, 0.5);
              "></div>
            </div>
            <div style="text-align: left; margin-top: 4px; font-size: 0.85rem; color: var(--muted);">
              ${percentage}% مكتمل
            </div>
          </div>
        `
      }).join('')
      
      progressGoals.innerHTML = goalsHTML
    }
  }

  // ============================================
  // IMAGE UPLOAD & CROP FUNCTIONALITY - MODERN UI
  // ============================================
  
  const uploadImageBtn = document.getElementById('upload-image-btn')
  const imageFileInput = document.getElementById('image-file-input')
  const imageCropModal = document.getElementById('image-crop-modal')
  const cropCanvas = document.getElementById('crop-canvas')
  const previewCanvas = document.getElementById('preview-canvas')
  const cancelCropBtn = document.getElementById('cancel-crop')
  const analyzeCropBtn = document.getElementById('analyze-crop')
  const modalClose = document.querySelector('.modal-close')
  const modalOverlay = document.querySelector('.modal-overlay')
  const imagePreviewContainer = document.getElementById('image-preview-container')
  const imagePreview = document.getElementById('image-preview')
  const removeImageBtn = document.getElementById('remove-image')
  const inputContainer = document.getElementById('input-container')
  const submitBtn = document.getElementById('submit-btn')
  const submitLoader = document.getElementById('submit-loader')
  const cropBox = document.getElementById('crop-box')
  
  // Action buttons
  const cropUploadBtn = document.getElementById('crop-upload')
  const rotateLeftBtn = document.getElementById('crop-rotate-left')
  const rotateRightBtn = document.getElementById('crop-rotate-right')
  const zoomInBtn = document.getElementById('crop-zoom-in')
  const zoomOutBtn = document.getElementById('crop-zoom-out')
  const resetBtn = document.getElementById('crop-reset')
  
  let uploadedImageBlob = null
  
  if (uploadImageBtn && imageFileInput && imageCropModal && cropCanvas) {
    let currentImage = null
    let ctx = cropCanvas.getContext('2d')
    let previewCtx = previewCanvas ? previewCanvas.getContext('2d') : null
    let scale = 1
    let rotation = 0
    let isDragging = false
    let isDraggingCropBox = false
    let isResizing = false
    let resizeHandle = null
    let startX = 0
    let startY = 0
    let offsetX = 0
    let offsetY = 0
    let initialScale = 1
    
    // Crop box dimensions (percentage of canvas)
    let cropLeft = 10
    let cropTop = 10  
    let cropWidth = 80
    let cropHeight = 80
    
    // Crop box initial position for dragging
    let cropStartX = 0
    let cropStartY = 0
    
    // Open file picker when button clicked
    uploadImageBtn.addEventListener('click', function() {
      imageFileInput.click()
    })
    
    // Upload new image from within modal
    if (cropUploadBtn) {
      cropUploadBtn.addEventListener('click', function() {
        imageFileInput.click()
      })
    }
    
    // Handle file selection
    imageFileInput.addEventListener('change', function(e) {
      const file = e.target.files[0]
      if (!file) return
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('يرجى اختيار ملف صورة صحيح')
        imageFileInput.value = '' // Reset
        return
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('حجم الصورة كبير جداً. الحد الأقصى 10 ميجابايت')
        imageFileInput.value = '' // Reset
        return
      }
      
      // Read and display image
      const reader = new FileReader()
      reader.onload = function(event) {
        const img = new Image()
        img.onload = function() {
          currentImage = img
          imageWidth = img.width
          imageHeight = img.height
          
          // Set canvas size after modal is shown
          showModal()
          
          // Wait for modal to render, then set canvas size
          setTimeout(() => {
            const wrapper = document.querySelector('.crop-canvas-wrapper')
            const canvasSize = wrapper ? Math.min(wrapper.clientWidth, wrapper.clientHeight) : 350
            
            cropCanvas.width = canvasSize
            cropCanvas.height = canvasSize
            
            if (previewCanvas) {
              previewCanvas.width = 120
              previewCanvas.height = 120
            }
            
            // Calculate initial scale to fit image
            const scaleX = canvasSize / img.width
            const scaleY = canvasSize / img.height
            initialScale = Math.min(scaleX, scaleY) * 0.8
            
            // Reset controls
            scale = initialScale
            rotation = 0
            offsetX = 0
            offsetY = 0
            
            // Reset crop box to center
            cropLeft = 10
            cropTop = 10
            cropWidth = 80
            cropHeight = 80
            
            // Draw image and initialize crop box
            drawImage()
          }, 100)
        }
        img.onerror = function() {
          setError('حدث خطأ في تحميل الصورة')
          imageFileInput.value = '' // Reset
        }
        img.src = event.target.result
      }
      reader.onerror = function() {
        setError('حدث خطأ في قراءة الملف')
        imageFileInput.value = '' // Reset
      }
      reader.readAsDataURL(file)
    })
    
    // Update crop box position visually
    function updateCropBox() {
      if (!cropBox) return
      
      // Calculate pixel positions
      const canvasWidth = cropCanvas.width
      const canvasHeight = cropCanvas.height
      
      const leftPx = (cropLeft / 100) * canvasWidth
      const topPx = (cropTop / 100) * canvasHeight
      const widthPx = (cropWidth / 100) * canvasWidth
      const heightPx = (cropHeight / 100) * canvasHeight
      
      cropBox.style.left = leftPx + 'px'
      cropBox.style.top = topPx + 'px'
      cropBox.style.width = widthPx + 'px'
      cropBox.style.height = heightPx + 'px'
    }
    
    // Draw image on canvas
    function drawImage() {
      if (!currentImage || !ctx) return
      
      // Clear main canvas
      ctx.clearRect(0, 0, cropCanvas.width, cropCanvas.height)
      
      // Fill with semi-transparent background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, cropCanvas.width, cropCanvas.height)
      
      ctx.save()
      
      // Move to center
      ctx.translate(cropCanvas.width / 2, cropCanvas.height / 2)
      
      // Apply rotation
      ctx.rotate((rotation * Math.PI) / 180)
      
      // Apply scale
      ctx.scale(scale, scale)
      
      // Draw image centered with offset
      const imgWidth = currentImage.width
      const imgHeight = currentImage.height
      
      ctx.drawImage(
        currentImage,
        -imgWidth / 2 + offsetX / scale,
        -imgHeight / 2 + offsetY / scale,
        imgWidth,
        imgHeight
      )
      
      ctx.restore()
      
      // Update crop box and preview
      updateCropBox()
      updatePreview()
    }
    
    // Update preview canvas
    function updatePreview() {
      if (!previewCanvas || !previewCtx || !currentImage) return
      
      previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height)
      
      // Fill preview background
      previewCtx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      previewCtx.fillRect(0, 0, previewCanvas.width, previewCanvas.height)
      
      previewCtx.save()
      
      previewCtx.translate(previewCanvas.width / 2, previewCanvas.height / 2)
      previewCtx.rotate((rotation * Math.PI) / 180)
      
      // Calculate preview scale based on main canvas
      const previewRatio = previewCanvas.width / cropCanvas.width
      const combinedScale = scale * previewRatio
      previewCtx.scale(combinedScale, combinedScale)
      
      const imgWidth = currentImage.width
      const imgHeight = currentImage.height
      
      previewCtx.drawImage(
        currentImage,
        -imgWidth / 2 + (offsetX / scale) * (1 / previewRatio),
        -imgHeight / 2 + (offsetY / scale) * (1 / previewRatio),
        imgWidth,
        imgHeight
      )
      
      previewCtx.restore()
    }
    
    // Button controls
    if (rotateLeftBtn) {
      rotateLeftBtn.addEventListener('click', function() {
        rotation = (rotation - 90) % 360
        drawImage()
      })
    }
    
    if (rotateRightBtn) {
      rotateRightBtn.addEventListener('click', function() {
        rotation = (rotation + 90) % 360
        drawImage()
      })
    }
    
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', function() {
        scale = Math.min(scale * 1.2, initialScale * 5)
        drawImage()
      })
    }
    
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', function() {
        scale = Math.max(scale / 1.2, initialScale * 0.5)
        drawImage()
      })
    }
    
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        scale = initialScale
        rotation = 0
        offsetX = 0
        offsetY = 0
        
        // Reset crop box to center position
        cropLeft = 10
        cropTop = 10
        cropWidth = 80
        cropHeight = 80
        
        drawImage()
      })
    }
    
    // Crop Box Event Handlers
    if (cropBox) {
      const handles = cropBox.querySelectorAll('.crop-handle')
      
      // Handle dragging
      cropBox.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('crop-handle')) {
          // Resize mode
          isResizing = true
          resizeHandle = e.target.className.split(' ').find(c => c === 'nw' || c === 'ne' || c === 'sw' || c === 'se')
        } else {
          // Drag mode
          isDraggingCropBox = true
        }
        
        const rect = cropCanvas.getBoundingClientRect()
        cropStartX = e.clientX - rect.left
        cropStartY = e.clientY - rect.top
        e.stopPropagation()
        e.preventDefault()
      })
      
      cropBox.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('crop-handle')) {
          isResizing = true
          resizeHandle = e.target.className.split(' ').find(c => c === 'nw' || c === 'ne' || c === 'sw' || c === 'se')
        } else {
          isDraggingCropBox = true
        }
        
        const touch = e.touches[0]
        const rect = cropCanvas.getBoundingClientRect()
        cropStartX = touch.clientX - rect.left
        cropStartY = touch.clientY - rect.top
        e.stopPropagation()
        e.preventDefault()
      }, { passive: false })
    }
    
    // Canvas dragging - Mouse events (for moving image)
    cropCanvas.addEventListener('mousedown', function(e) {
      if (isDraggingCropBox || isResizing) return
      isDragging = true
      const rect = cropCanvas.getBoundingClientRect()
      startX = e.clientX - rect.left - offsetX
      startY = e.clientY - rect.top - offsetY
      cropCanvas.style.cursor = 'grabbing'
      e.preventDefault()
    })
    
    window.addEventListener('mousemove', function(e) {
      if (isDraggingCropBox) {
        // Move crop box
        const rect = cropCanvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        
        const deltaX = mouseX - cropStartX
        const deltaY = mouseY - cropStartY
        
        const canvasWidth = cropCanvas.width
        const canvasHeight = cropCanvas.height
        
        // Calculate new position
        let newLeft = cropLeft + (deltaX / canvasWidth) * 100
        let newTop = cropTop + (deltaY / canvasHeight) * 100
        
        // Constrain within bounds (0 to 100 - cropWidth/Height)
        cropLeft = Math.max(0, Math.min(100 - cropWidth, newLeft))
        cropTop = Math.max(0, Math.min(100 - cropHeight, newTop))
        
        cropStartX = mouseX
        cropStartY = mouseY
        
        updateCropBox()
        updatePreview()
        e.preventDefault()
      } else if (isResizing) {
        // Resize crop box
        const rect = cropCanvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        
        const canvasWidth = cropCanvas.width
        const canvasHeight = cropCanvas.height
        
        const deltaX = (mouseX - cropStartX) / canvasWidth * 100
        const deltaY = (mouseY - cropStartY) / canvasHeight * 100
        
        if (resizeHandle === 'se') {
          // Southeast: increase width and height
          cropWidth = Math.max(10, Math.min(100 - cropLeft, cropWidth + deltaX))
          cropHeight = Math.max(10, Math.min(100 - cropTop, cropHeight + deltaY))
        } else if (resizeHandle === 'sw') {
          // Southwest: decrease width from left, increase height
          let newWidth = cropWidth - deltaX
          newWidth = Math.max(10, Math.min(cropLeft + cropWidth, newWidth))
          let newLeft = cropLeft + cropWidth - newWidth
          newLeft = Math.max(0, newLeft)
          cropWidth = cropLeft + cropWidth - newLeft
          cropLeft = newLeft
          cropHeight = Math.max(10, Math.min(100 - cropTop, cropHeight + deltaY))
        } else if (resizeHandle === 'ne') {
          // Northeast: increase width, decrease height from top
          cropWidth = Math.max(10, Math.min(100 - cropLeft, cropWidth + deltaX))
          let newHeight = cropHeight - deltaY
          newHeight = Math.max(10, Math.min(cropTop + cropHeight, newHeight))
          let newTop = cropTop + cropHeight - newHeight
          newTop = Math.max(0, newTop)
          cropHeight = cropTop + cropHeight - newTop
          cropTop = newTop
        } else if (resizeHandle === 'nw') {
          // Northwest: decrease both from top-left
          let newWidth = cropWidth - deltaX
          newWidth = Math.max(10, Math.min(cropLeft + cropWidth, newWidth))
          let newLeft = cropLeft + cropWidth - newWidth
          newLeft = Math.max(0, newLeft)
          cropWidth = cropLeft + cropWidth - newLeft
          cropLeft = newLeft
          
          let newHeight = cropHeight - deltaY
          newHeight = Math.max(10, Math.min(cropTop + cropHeight, newHeight))
          let newTop = cropTop + cropHeight - newHeight
          newTop = Math.max(0, newTop)
          cropHeight = cropTop + cropHeight - newTop
          cropTop = newTop
        }
        
        cropStartX = mouseX
        cropStartY = mouseY
        
        updateCropBox()
        updatePreview()
        e.preventDefault()
      } else if (isDragging) {
        // Move image
      const rect = cropCanvas.getBoundingClientRect()
      offsetX = e.clientX - rect.left - startX
      offsetY = e.clientY - rect.top - startY
      drawImage()
      e.preventDefault()
      }
    })
    
    window.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false
        cropCanvas.style.cursor = 'move'
      }
      isDraggingCropBox = false
      isResizing = false
      resizeHandle = null
    })
    
    // Touch events for mobile
    cropCanvas.addEventListener('touchstart', function(e) {
      if (isDraggingCropBox || isResizing) return
      e.preventDefault()
      const touch = e.touches[0]
      const rect = cropCanvas.getBoundingClientRect()
      isDragging = true
      startX = touch.clientX - rect.left - offsetX
      startY = touch.clientY - rect.top - offsetY
    })
    
    window.addEventListener('touchmove', function(e) {
      if (isDraggingCropBox) {
        e.preventDefault()
        const touch = e.touches[0]
        const rect = cropCanvas.getBoundingClientRect()
        const touchX = touch.clientX - rect.left
        const touchY = touch.clientY - rect.top
        
        const deltaX = touchX - cropStartX
        const deltaY = touchY - cropStartY
        
        const canvasWidth = cropCanvas.width
        const canvasHeight = cropCanvas.height
        
        // Calculate new position
        let newLeft = cropLeft + (deltaX / canvasWidth) * 100
        let newTop = cropTop + (deltaY / canvasHeight) * 100
        
        // Constrain within bounds
        cropLeft = Math.max(0, Math.min(100 - cropWidth, newLeft))
        cropTop = Math.max(0, Math.min(100 - cropHeight, newTop))
        
        cropStartX = touchX
        cropStartY = touchY
        
        updateCropBox()
        updatePreview()
      } else if (isResizing) {
        e.preventDefault()
        const touch = e.touches[0]
        const rect = cropCanvas.getBoundingClientRect()
        const touchX = touch.clientX - rect.left
        const touchY = touch.clientY - rect.top
        
        const canvasWidth = cropCanvas.width
        const canvasHeight = cropCanvas.height
        
        const deltaX = (touchX - cropStartX) / canvasWidth * 100
        const deltaY = (touchY - cropStartY) / canvasHeight * 100
        
        if (resizeHandle === 'se') {
          cropWidth = Math.max(10, Math.min(100 - cropLeft, cropWidth + deltaX))
          cropHeight = Math.max(10, Math.min(100 - cropTop, cropHeight + deltaY))
        } else if (resizeHandle === 'sw') {
          let newWidth = cropWidth - deltaX
          newWidth = Math.max(10, Math.min(cropLeft + cropWidth, newWidth))
          let newLeft = cropLeft + cropWidth - newWidth
          newLeft = Math.max(0, newLeft)
          cropWidth = cropLeft + cropWidth - newLeft
          cropLeft = newLeft
          cropHeight = Math.max(10, Math.min(100 - cropTop, cropHeight + deltaY))
        } else if (resizeHandle === 'ne') {
          cropWidth = Math.max(10, Math.min(100 - cropLeft, cropWidth + deltaX))
          let newHeight = cropHeight - deltaY
          newHeight = Math.max(10, Math.min(cropTop + cropHeight, newHeight))
          let newTop = cropTop + cropHeight - newHeight
          newTop = Math.max(0, newTop)
          cropHeight = cropTop + cropHeight - newTop
          cropTop = newTop
        } else if (resizeHandle === 'nw') {
          let newWidth = cropWidth - deltaX
          newWidth = Math.max(10, Math.min(cropLeft + cropWidth, newWidth))
          let newLeft = cropLeft + cropWidth - newWidth
          newLeft = Math.max(0, newLeft)
          cropWidth = cropLeft + cropWidth - newLeft
          cropLeft = newLeft
          
          let newHeight = cropHeight - deltaY
          newHeight = Math.max(10, Math.min(cropTop + cropHeight, newHeight))
          let newTop = cropTop + cropHeight - newHeight
          newTop = Math.max(0, newTop)
          cropHeight = cropTop + cropHeight - newTop
          cropTop = newTop
        }
        
        cropStartX = touchX
        cropStartY = touchY
        
        updateCropBox()
        updatePreview()
      } else if (isDragging) {
      e.preventDefault()
      const touch = e.touches[0]
      const rect = cropCanvas.getBoundingClientRect()
      offsetX = touch.clientX - rect.left - startX
      offsetY = touch.clientY - rect.top - startY
      drawImage()
      }
    }, { passive: false })
    
    window.addEventListener('touchend', function() {
      isDragging = false
      isDraggingCropBox = false
      isResizing = false
      resizeHandle = null
    })
    
    // Show modal
    function showModal() {
      if (imageCropModal) {
        imageCropModal.style.display = 'flex'
        setTimeout(() => {
          imageCropModal.classList.add('show')
        }, 10)
        document.body.style.overflow = 'hidden'
      }
    }
    
    // Hide modal
    function hideModal() {
      if (imageCropModal) {
        imageCropModal.classList.remove('show')
        setTimeout(() => {
          imageCropModal.style.display = 'none'
        }, 300)
        document.body.style.overflow = ''
      }
    }
    
    // Close modal events
    if (modalClose) {
      modalClose.addEventListener('click', function() {
        hideModal()
        imageFileInput.value = ''
      })
    }
    
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function() {
        hideModal()
        imageFileInput.value = ''
      })
    }
    
    if (cancelCropBtn) {
      cancelCropBtn.addEventListener('click', function() {
        hideModal()
        imageFileInput.value = ''
      })
    }
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && imageCropModal && imageCropModal.classList.contains('show')) {
        hideModal()
        imageFileInput.value = ''
      }
    })
    
    // Analyze/Crop image
    if (analyzeCropBtn) {
      analyzeCropBtn.addEventListener('click', async function() {
        if (!currentImage) return
        
        try {
          // Create a temporary canvas for cropping
          const cropOutputCanvas = document.createElement('canvas')
          const cropOutputCtx = cropOutputCanvas.getContext('2d')
          
          // Calculate crop area in pixels
          const canvasWidth = cropCanvas.width
          const canvasHeight = cropCanvas.height
          const cropX = (cropLeft / 100) * canvasWidth
          const cropY = (cropTop / 100) * canvasHeight
          const cropW = (cropWidth / 100) * canvasWidth
          const cropH = (cropHeight / 100) * canvasHeight
          
          // Set output canvas size to crop dimensions
          cropOutputCanvas.width = cropW
          cropOutputCanvas.height = cropH
          
          // Draw the cropped portion
          cropOutputCtx.drawImage(
            cropCanvas,
            cropX, cropY, cropW, cropH,  // Source rectangle
            0, 0, cropW, cropH           // Destination rectangle
          )
          
          // Convert cropped canvas to blob
          uploadedImageBlob = await new Promise(resolve => {
            cropOutputCanvas.toBlob(resolve, 'image/jpeg', 0.9)
          })
          
          if (!uploadedImageBlob) {
            setError('حدث خطأ في معالجة الصورة')
            return
          }
          
          // Create preview URL
          const previewUrl = URL.createObjectURL(uploadedImageBlob)
          
          // Update preview image
          if (imagePreview) {
            imagePreview.src = previewUrl
            imagePreview.style.display = 'block'
            imagePreview.style.visibility = 'visible'
            imagePreview.style.opacity = '1'
          }
          
          // Close modal first
          hideModal()
          
          // Wait for modal to close, then show preview
          setTimeout(() => {
            // Show image preview container in overlay mode
            if (imagePreviewContainer && inputContainer) {
              // Enable image mode
              inputContainer.classList.add('image-mode')
              
              // Show preview
              imagePreviewContainer.style.display = 'block'
              imagePreviewContainer.style.visibility = 'visible'
              requestAnimationFrame(() => {
                imagePreviewContainer.style.opacity = '1'
                imagePreviewContainer.style.pointerEvents = 'auto'
              })
            }
            
            // Transform submit button to upload mode
            if (submitBtn) {
              submitBtn.classList.add('uploading')
            }
          }, 300)
          
        } catch (error) {
          console.error('Crop error:', error)
          setError('حدث خطأ في معالجة الصورة')
        }
      })
    }
    
    // Remove image button
    if (removeImageBtn) {
      removeImageBtn.addEventListener('click', function() {
        // Clear image
        uploadedImageBlob = null
        
        // Hide preview with animation
        if (imagePreviewContainer && inputContainer) {
          imagePreviewContainer.style.opacity = '0'
          imagePreviewContainer.style.pointerEvents = 'none'
          
          setTimeout(() => {
            imagePreviewContainer.style.display = 'none'
            // Remove image mode
            inputContainer.classList.remove('image-mode')
          }, 300)
        }
        
        // Reset submit button
        if (submitBtn) {
          submitBtn.classList.remove('uploading')
        }
        
        // Reset file input
        imageFileInput.value = ''
        
        // Clear any errors
        setError('')
      })
    }
  }
  
  // Show submit loading animation
  function showSubmitLoading() {
    if (submitLoader) {
      submitLoader.style.display = 'block'
    }
    if (submitBtn) {
      submitBtn.disabled = true
      submitBtn.style.opacity = '0.7'
    }
  }
  
  // Hide submit loading animation
  function hideSubmitLoading() {
    if (submitLoader) {
      submitLoader.style.display = 'none'
    }
    if (submitBtn) {
      submitBtn.disabled = false
      submitBtn.style.opacity = '1'
    }
  }
  
  // Process image upload and OCR
  async function processImageUpload() {
    if (!uploadedImageBlob) {
      hideSubmitLoading()
      return
    }
    
    try {
      // Create FormData
      const formData = new FormData()
      formData.append('image', uploadedImageBlob, 'image.jpg')
      
      // Send to AI for OCR and analysis
      const response = await fetch(API_CONFIG.baseUrl + '/v1/ocr-parse', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data && data.text) {
        // Fill the sentence input with extracted text
        const sentenceInput = document.getElementById('sentence')
        if (sentenceInput) {
          sentenceInput.value = data.text
        }
        
        // If we got grammar analysis, display it
        if (data.html) {
          setOutput(data.html)
          const outputWrap = document.getElementById('parse-output')
          if (outputWrap) {
            outputWrap.dataset.rawHtml = data.html
          }
          
          // Save to history
          saveToHistory(data.text, data.html)
          const saveSentence = document.getElementById('save-sentence')
          if (saveSentence) {
            saveSentence.style.display = 'inline-flex'
          }
        }
      } else {
        setError('لم يتم العثور على نص عربي في الصورة. حاول مرة أخرى.')
      }
      
    } catch (error) {
      console.error('OCR analysis error:', error)
      setError('حدث خطأ في تحليل الصورة. يرجى كتابة الجملة يدوياً.')
    } finally {
      hideSubmitLoading()
    }
  }

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================
  
  const scrollToTopBtn = document.querySelector('.scroll-to-top')
  
  if (scrollToTopBtn) {
    // Show/hide button on scroll - FIXED: Now appears when scrolling down, not just at bottom
    function checkScrollPosition() {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      
      // Show button if scrolled down more than 300px (increased from 200px for better UX)
      if (scrollPosition > 300) {
        scrollToTopBtn.classList.add('visible')
      } else {
        scrollToTopBtn.classList.remove('visible')
      }
    }
    
    // Throttle scroll event for better performance
    let scrollTimeout
    function throttledScrollCheck() {
      if (scrollTimeout) {
        return
      }
      scrollTimeout = setTimeout(() => {
        checkScrollPosition()
        scrollTimeout = null
      }, 100)
    }
    
    // Check on scroll with throttling
    window.addEventListener('scroll', throttledScrollCheck, { passive: true })
    
    // Check on load
    checkScrollPosition()
    
    // Smooth scroll to top on click
    scrollToTopBtn.addEventListener('click', function(e) {
      e.preventDefault()
      
      // Add a click animation
      this.style.transform = 'scale(0.9)'
      setTimeout(() => {
        this.style.transform = ''
      }, 150)
      
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  }

})();


