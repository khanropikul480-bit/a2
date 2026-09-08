/* VelvetGarbQuay - Haute Couture & Bespoke Atelier Controller */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeBtn(themeToggleBtn, currentTheme);

    themeToggleBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme');
      const next = active === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeBtn(themeToggleBtn, next);
    });
  }

  function updateThemeBtn(btn, theme) {
    btn.innerHTML = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
  }

  // 2. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }

  // 3. Interactive Atelier Garment & Yardage Calculator
  const garmentTypeSelect = document.getElementById('garmentType');
  const fabricSelect = document.getElementById('fabricType');
  const fullnessSelect = document.getElementById('drapeFullness');
  const calculateGarmentBtn = document.getElementById('calculateGarmentBtn');
  const resultItems = document.getElementById('resultItems');

  function calculateGarment() {
    if (!resultItems) return;
    const gType = garmentTypeSelect ? garmentTypeSelect.value : 'gown';
    const fType = fabricSelect ? fabricSelect.value : 'silk_velvet';
    const fullness = fullnessSelect ? fullnessSelect.value : 'tailored';

    let multiplier = 1.0;
    if (fullness === 'voluminous') multiplier = 1.4;
    if (fullness === 'minimal') multiplier = 0.85;

    let yardage = '', bastingHours = '', liningSpec = '', seamFinish = '', fittingCount = '', timeline = '';

    if (gType === 'gown') {
      const yards = (4.5 * multiplier).toFixed(1);
      const hours = Math.round(38 * multiplier);
      yardage = `${yards} meters continuous bolt`;
      bastingHours = `${hours} hours master artisan basting`;
      liningSpec = `100% Habotai Mulberry Silk (45g/m²) full bias lining`;
      seamFinish = `French seams with hand-rolled silk hem stitching`;
      fittingCount = `3 Muslin toiles + 2 Velvet drape fittings`;
      timeline = `4 to 6 weeks from pattern drafting`;
    } else if (gType === 'blazer') {
      const yards = (2.8 * multiplier).toFixed(1);
      const hours = Math.round(28 * multiplier);
      yardage = `${yards} meters tailored width`;
      bastingHours = `${hours} hours pad-stitched horsehair canvas shaping`;
      liningSpec = `Bemberg cupro twill with hand-tacked shoulder sleeveheads`;
      seamFinish = `Bound Hong Kong seam allowances with pick-stitched lapels`;
      fittingCount = `2 Skeleton canvas fittings + 1 final balance check`;
      timeline = `3 to 5 weeks`;
    } else if (gType === 'coat') {
      const yards = (5.2 * multiplier).toFixed(1);
      const hours = Math.round(44 * multiplier);
      yardage = `${yards} meters heavy-pile overcoat yardage`;
      bastingHours = `${hours} hours structured chest canvas & welt pockets`;
      liningSpec = `Quilted thermal silk or weighted duchess satin lining`;
      seamFinish = `Double-welt taped seams with horn button anchor loops`;
      fittingCount = `3 Multi-layer outer fittings`;
      timeline = `5 to 7 weeks`;
    } else {
      const yards = (3.2 * multiplier).toFixed(1);
      const hours = Math.round(20 * multiplier);
      yardage = `${yards} meters fluid bias drape`;
      bastingHours = `${hours} hours hand-pleated drape pinning`;
      liningSpec = `Self-faced silk satin waist yoke`;
      seamFinish = `Hand-overcast baby hem with invisible side zip setting`;
      fittingCount = `2 Drape and movement fittings`;
      timeline = `2 to 3 weeks`;
    }

    resultItems.innerHTML = `
      <li><strong>Required Fabric Yardage:</strong> ${yardage}</li>
      <li><strong>Hand-Basting & Canvas Time:</strong> ${bastingHours}</li>
      <li><strong>Interior Architecture & Lining:</strong> ${liningSpec}</li>
      <li><strong>Artisanal Edge & Seam Finish:</strong> ${seamFinish}</li>
      <li><strong>Atelier Fitting Protocol:</strong> ${fittingCount}</li>
      <li><strong>Estimated Creation Timeline:</strong> ${timeline}</li>
    `;
  }

  if (calculateGarmentBtn) {
    calculateGarmentBtn.addEventListener('click', calculateGarment);
  }
  if (garmentTypeSelect) {
    garmentTypeSelect.addEventListener('change', calculateGarment);
  }
  if (fabricSelect) {
    fabricSelect.addEventListener('change', calculateGarment);
  }
  if (fullnessSelect) {
    fullnessSelect.addEventListener('change', calculateGarment);
  }

  // 4. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // 5. Toast Notification Helper
  function showToast(msg) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 4000);
  }

  // 6. Newsletter Subscription
  const newsForms = document.querySelectorAll('.newsletter-form, #newsletterForm');
  newsForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`✨ Welcome! ${input.value} has been subscribed to Haute Gazette.`);
        input.value = '';
      }
    });
  });

  // 7. Contact / Salon Booking Form Simulation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('💌 Thank you! Your bespoke consultation request has been received.');
      contactForm.reset();
    });
  }
});