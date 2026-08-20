(function() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const resultsContainer = document.getElementById('results');
  const filterTags = document.getElementById('filterTags');
  const statsBar = document.getElementById('statsBar');
  const resultCount = document.getElementById('resultCount');
  const detailModal = document.getElementById('detailModal');
  const modalContent = document.getElementById('modalContent');

  let currentCategory = 'all';
  let currentSearchTerm = '';

  function searchFood(term, category) {
    let results = foodDatabase;

    if (category !== 'all') {
      results = results.filter(f => f.category === category);
    }

    if (term && term.trim() !== '') {
      const lowerTerm = term.toLowerCase().trim();
      results = results.filter(f => {
        if (f.name.toLowerCase().includes(lowerTerm)) return true;
        if (f.aliases && f.aliases.some(a => a.toLowerCase().includes(lowerTerm))) return true;
        return false;
      });
    }

    return results;
  }

  function renderResults(foods) {
    resultsContainer.innerHTML = '';

    if (foods.length === 0) {
      resultsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>未找到相关食品</h3>
          <p>请尝试其他关键词或更换分类筛选</p>
        </div>
      `;
      statsBar.classList.remove('visible');
      return;
    }

    statsBar.classList.add('visible');
    resultCount.textContent = `找到 ${foods.length} 种食品`;

    foods.forEach(food => {
      const card = document.createElement('div');
      card.className = 'food-card';
      card.innerHTML = `
        <div class="food-header">
          <div>
            <div class="food-name">${food.name}</div>
          </div>
          <span class="food-category">${food.category}</span>
        </div>
        <div class="food-calories">${food.calories} <span class="unit">千卡/100g</span></div>
        <div class="food-serving">每 ${food.serving}</div>
        <div class="nutri-grid">
          <div class="nutri-item">
            <div class="nutri-value">${food.protein}g</div>
            <div class="nutri-label">蛋白质</div>
          </div>
          <div class="nutri-item">
            <div class="nutri-value">${food.fat}g</div>
            <div class="nutri-label">脂肪</div>
          </div>
          <div class="nutri-item">
            <div class="nutri-value">${food.carbs}g</div>
            <div class="nutri-label">碳水</div>
          </div>
        </div>
      `;
      card.addEventListener('click', () => showDetail(food));
      resultsContainer.appendChild(card);
    });
  }

  function showDetail(food) {
    const dvValues = calculateDV(food);

    modalContent.innerHTML = `
      <div class="modal-header">
        <h2 style="font-size:1.6rem;margin-bottom:4px;">${food.name}</h2>
        <span style="font-size:0.9rem;opacity:0.9;">${food.category} · 每${food.serving}</span>
        <button class="modal-close" id="modalClose">✕</button>
      </div>
      <div class="modal-body">
        <div class="modal-section">
          <div class="modal-section-title">能量与三大营养素</div>
          <table class="nutri-table">
            <tr>
              <th>营养成分</th>
              <th class="amount">含量</th>
              <th class="dv">% 每日参考值</th>
            </tr>
            <tr>
              <td>能量</td>
              <td class="amount">${food.calories} 千卡</td>
              <td class="dv">${dvValues.calories}%</td>
            </tr>
            <tr>
              <td>蛋白质</td>
              <td class="amount">${food.protein} g</td>
              <td class="dv">${dvValues.protein}%</td>
            </tr>
            <tr>
              <td>脂肪</td>
              <td class="amount">${food.fat} g</td>
              <td class="dv">${dvValues.fat}%</td>
            </tr>
            <tr>
              <td>碳水化合物</td>
              <td class="amount">${food.carbs} g</td>
              <td class="dv">${dvValues.carbs}%</td>
            </tr>
            <tr>
              <td>膳食纤维</td>
              <td class="amount">${food.fiber} g</td>
              <td class="dv">${dvValues.fiber}%</td>
            </tr>
            <tr>
              <td>糖分</td>
              <td class="amount">${food.sugar} g</td>
              <td class="dv">${dvValues.sugar}%</td>
            </tr>
          </table>
        </div>

        <div class="modal-section">
          <div class="modal-section-title">矿物质</div>
          <table class="nutri-table">
            <tr>
              <th>矿物质</th>
              <th class="amount">含量</th>
              <th class="dv">% 每日参考值</th>
            </tr>
            <tr>
              <td>钠</td>
              <td class="amount">${food.sodium} mg</td>
              <td class="dv">${dvValues.sodium}%</td>
            </tr>
            <tr>
              <td>钾</td>
              <td class="amount">${food.potassium} mg</td>
              <td class="dv">${dvValues.potassium}%</td>
            </tr>
            <tr>
              <td>胆固醇</td>
              <td class="amount">${food.cholesterol} mg</td>
              <td class="dv">${dvValues.cholesterol}%</td>
            </tr>
            <tr>
              <td>钙</td>
              <td class="amount">${food.calcium} mg</td>
              <td class="dv">${dvValues.calcium}%</td>
            </tr>
            <tr>
              <td>铁</td>
              <td class="amount">${food.iron} mg</td>
              <td class="dv">${dvValues.iron}%</td>
            </tr>
            <tr>
              <td>镁</td>
              <td class="amount">${food.magnesium} mg</td>
              <td class="dv">${dvValues.magnesium}%</td>
            </tr>
          </table>
        </div>

        <div class="modal-section">
          <div class="modal-section-title">维生素</div>
          <table class="nutri-table">
            <tr>
              <th>维生素</th>
              <th class="amount">含量</th>
              <th class="dv">% 每日参考值</th>
            </tr>
            <tr>
              <td>维生素A</td>
              <td class="amount">${food.vitaminA} IU</td>
              <td class="dv">${dvValues.vitaminA}%</td>
            </tr>
            <tr>
              <td>维生素C</td>
              <td class="amount">${food.vitaminC} mg</td>
              <td class="dv">${dvValues.vitaminC}%</td>
            </tr>
            <tr>
              <td>维生素D</td>
              <td class="amount">${food.vitaminD} μg</td>
              <td class="dv">${dvValues.vitaminD}%</td>
            </tr>
            <tr>
              <td>维生素B12</td>
              <td class="amount">${food.vitaminB12} μg</td>
              <td class="dv">${dvValues.vitaminB12}%</td>
            </tr>
          </table>
        </div>

        <div class="modal-section">
          <div class="modal-section-title">营养亮点</div>
          ${generateHighlights(food)}
          <div class="health-tip">
            <strong>💡 健康提示：</strong>${food.healthTip}
          </div>
        </div>

        <!-- 生活化摄入建议 -->
        ${generateIntakeTip(food)}
      </div>
    `;

    detailModal.classList.add('active');

    document.getElementById('modalClose').addEventListener('click', closeModal);
  }

  function calculateDV(food) {
    const dv = {
      calories: 2000, protein: 50, fat: 70, carbs: 275, fiber: 28, sugar: 50,
      sodium: 2300, potassium: 2000, cholesterol: 300,
      calcium: 1000, iron: 18, magnesium: 400,
      vitaminA: 3000, vitaminC: 90, vitaminD: 20, vitaminB12: 2.4
    };

    return {
      calories: Math.round((food.calories / dv.calories) * 100),
      protein: Math.round((food.protein / dv.protein) * 100),
      fat: Math.round((food.fat / dv.fat) * 100),
      carbs: Math.round((food.carbs / dv.carbs) * 100),
      fiber: Math.round((food.fiber / dv.fiber) * 100),
      sugar: Math.round((food.sugar / dv.sugar) * 100),
      sodium: Math.round((food.sodium / dv.sodium) * 100),
      potassium: Math.round((food.potassium / dv.potassium) * 100),
      cholesterol: Math.round((food.cholesterol / dv.cholesterol) * 100),
      calcium: Math.round((food.calcium / dv.calcium) * 100),
      iron: Math.round((food.iron / dv.iron) * 100),
      magnesium: Math.round((food.magnesium / dv.magnesium) * 100),
      vitaminA: Math.round((food.vitaminA / dv.vitaminA) * 100),
      vitaminC: Math.round((food.vitaminC / dv.vitaminC) * 100),
      vitaminD: Math.round((food.vitaminD / dv.vitaminD) * 100),
      vitaminB12: Math.round((food.vitaminB12 / dv.vitaminB12) * 100)
    };
  }

  function generateHighlights(food) {
    const highlights = [];
    const dv = calculateDV(food);

    if (dv.protein >= 20) highlights.push(`<div class="health-tip" style="background:#e8f5e9;border-color:#2e7d32;"><strong>💪 高蛋白：</strong>蛋白质含量${food.protein}g，${dv.protein}%每日参考值，适合增肌人群</div>`);
    if (dv.vitaminC >= 50) highlights.push(`<div class="health-tip" style="background:#e3f2fd;border-color:#1565c0;"><strong>🍊 富含维C：</strong>维生素C含量${food.vitaminC}mg，${dv.vitaminC}%每日参考值，增强免疫力</div>`);
    if (dv.calcium >= 30) highlights.push(`<div class="health-tip" style="background:#f3e5f5;border-color:#6a1b9a;"><strong>🦴 高钙：</strong>钙含量${food.calcium}mg，${dv.calcium}%每日参考值，有益骨骼健康</div>`);
    if (dv.iron >= 20) highlights.push(`<div class="health-tip" style="background:#fff3e0;border-color:#e65100;"><strong>🩸 补铁：</strong>铁含量${food.iron}mg，${dv.iron}%每日参考值，预防贫血</div>`);
    if (dv.fiber >= 20) highlights.push(`<div class="health-tip" style="background:#f1f8e9;border-color:#558b2f;"><strong>🌿 高纤维：</strong>膳食纤维含量${food.fiber}g，${dv.fiber}%每日参考值，促进肠道健康</div>`);
    if (dv.potassium >= 15) highlights.push(`<div class="health-tip" style="background:#fff8e1;border-color:#f57f17;"><strong>⚡ 富钾：</strong>钾含量${food.potassium}mg，${dv.potassium}%每日参考值，维持正常血压</div>`);
    if (dv.vitaminA >= 30) highlights.push(`<div class="health-tip" style="background:#ffebee;border-color:#c62828;"><strong>👁️ 富含维A：</strong>维生素A含量${food.vitaminA}IU，${dv.vitaminA}%每日参考值，保护视力</div>`);
    if (food.fat < 5 && food.protein >= 15) highlights.push(`<div class="health-tip" style="background:#fce4ec;border-color:#ad1457;"><strong>🔥 低脂高蛋白：</strong>脂肪含量低，蛋白质含量高，适合减脂人群</div>`);

    if (highlights.length === 0) {
      return '';
    }
    return highlights.join('');
  }

  function generateIntakeTip(food) {
    if (!food.intakeTip) return '';

    return `
      <div class="intake-tip-card">
        <div class="intake-tip-header">
          <span class="intake-tip-icon">💡</span>
          <span class="intake-tip-title">生活化摄入建议</span>
        </div>
        <div class="intake-tip-body">
          <div class="intake-tip-food-name">${food.name}</div>
          <p class="intake-tip-text">${food.intakeTip}</p>
        </div>
        <div class="intake-tip-footer">
          <span class="intake-tip-note">温馨提示：以上建议仅供参考，具体摄入量请根据个人情况调整</span>
        </div>
      </div>
    `;
  }

  function closeModal() {
    detailModal.classList.remove('active');
  }

  function performSearch() {
    currentSearchTerm = searchInput.value.trim();
    const results = searchFood(currentSearchTerm, currentCategory);
    renderResults(results);
  }

  // Event listeners
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });
  searchInput.addEventListener('input', debounce(performSearch, 300));

  filterTags.addEventListener('click', (e) => {
    if (e.target.classList.contains('tag')) {
      document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.dataset.category;
      performSearch();
    }
  });

  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function debounce(fn, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

};

  // Daily Soul Question Rotation
  const soulQuestions = [
    "今天喝够水了吗？",
    "久坐一小时了，站起来伸个懒腰吧！",
    "今天的绿叶菜吃够了吗？",
    "晚上准备几点睡？",
    "刚才那顿饭，是不是吃太快了？",
    "你有多久没吃新鲜水果了？",
    "今天有没有给自己一点放松的时间？",
    "睡前是不是又忍不住刷手机了？",
    "今天的蛋白质摄入达标了吗？",
    "出门前，别忘了带上你的水杯哦~"
  ];

  function initSoulCard() {
    const soulBody = document.getElementById('soulCardBody');
    if (!soulBody) return;

    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const index = dayOfYear % soulQuestions.length;

    soulBody.style.opacity = '0';
    soulBody.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
      soulBody.textContent = soulQuestions[index];
      soulBody.style.opacity = '1';
    }, 300);
  }

  initSoulCard();

  // Initialize
  renderResults(searchFood('', 'all'));
})();