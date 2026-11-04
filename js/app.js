/**
 * WEB TECHNOLOGIES PROJECT: UI COMPONENT SYSTEM
 * GDC Credit Management System - Frontend Application Logic
 * Stack: Semantic HTML5, CSS3, Vanilla ES6+ JavaScript
 */

(function () {
  'use strict';

  // ─── 1. Initial State & Data Store ──────────────────────────────────────
  const STORAGE_KEY = 'gdc_webtech_credits_v1';

  const defaultMembers = [
    { id: 'M01', name: 'Arjun Mehta', residentStatus: 'Hosteller', role: 'Lead Programmer', credits: 42, level: 7, tier: 'Elite', attendanceRate: 95 },
    { id: 'M02', name: 'Priya Sharma', residentStatus: 'Day Scholar', role: 'UI/UX Designer', credits: 38, level: 6, tier: 'Rising Star', attendanceRate: 92 },
    { id: 'M03', name: 'Rohan Gupta', residentStatus: 'Hosteller', role: 'Gameplay Engineer', credits: 28, level: 5, tier: 'Rising Star', attendanceRate: 85 },
    { id: 'M04', name: 'Sneha Iyer', residentStatus: 'Day Scholar', role: '3D Artist', credits: 34, level: 6, tier: 'Rising Star', attendanceRate: 88 },
    { id: 'M05', name: 'Karan Singh', residentStatus: 'Hosteller', role: 'Sound Designer', credits: 22, level: 4, tier: 'Contributor', attendanceRate: 78 },
    { id: 'M06', name: 'Ananya Nair', residentStatus: 'Hosteller', role: 'Story & Narrative', credits: 48, level: 8, tier: 'Elite', attendanceRate: 98 },
    { id: 'M07', name: 'Vikram Joshi', residentStatus: 'Day Scholar', role: 'QA Tester', credits: 16, level: 3, tier: 'Contributor', attendanceRate: 72 },
    { id: 'M08', name: 'Meera Pillai', residentStatus: 'Hosteller', role: 'VFX Artist', credits: 52, level: 9, tier: 'Legend', attendanceRate: 100 }
  ];

  const defaultActivities = [
    { id: 'TX-101', memberId: 'M01', memberName: 'Arjun Mehta', title: 'Game Jam 2024 - Engine Optimization', category: 'Event', credits: 10, date: '2026-10-28', type: 'positive' },
    { id: 'TX-102', memberId: 'M02', memberName: 'Priya Sharma', title: 'Design System Documentation', category: 'Bonus', credits: 6, date: '2026-10-25', type: 'positive' },
    { id: 'TX-103', memberId: 'M06', memberName: 'Ananya Nair', title: 'Weekly Sync & Lore Workshop', category: 'Meeting', credits: 4, date: '2026-10-22', type: 'positive' },
    { id: 'TX-104', memberId: 'M08', memberName: 'Meera Pillai', title: 'Evening Shader Architecture Session', category: 'Evening', credits: 8, date: '2026-10-18', type: 'positive' },
    { id: 'TX-105', memberId: 'M05', memberName: 'Karan Singh', title: 'Asset Submission Delay Penalty', category: 'Penalty', credits: -3, date: '2026-10-15', type: 'negative' }
  ];

  // Load from localStorage or use defaults
  let state = {
    members: [],
    activities: [],
    currentMemberId: 'M01',
    activeView: 'dashboard', // 'dashboard' or 'showcase'
    dashboardRole: 'member'  // 'member' or 'admin'
  };

  function initData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        state.members = parsed.members || defaultMembers;
        state.activities = parsed.activities || defaultActivities;
      } else {
        state.members = JSON.parse(JSON.stringify(defaultMembers));
        state.activities = JSON.parse(JSON.stringify(defaultActivities));
        saveData();
      }
    } catch (e) {
      state.members = JSON.parse(JSON.stringify(defaultMembers));
      state.activities = JSON.parse(JSON.stringify(defaultActivities));
    }
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        members: state.members,
        activities: state.activities
      }));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  function getActiveMember() {
    return state.members.find(m => m.id === state.currentMemberId) || state.members[0];
  }

  function recalculateTierAndLevel(member) {
    const pts = member.credits;
    if (pts >= 50) {
      member.level = 9;
      member.tier = 'Legend';
    } else if (pts >= 40) {
      member.level = 7;
      member.tier = 'Elite';
    } else if (pts >= 25) {
      member.level = 5;
      member.tier = 'Rising Star';
    } else if (pts >= 15) {
      member.level = 3;
      member.tier = 'Contributor';
    } else {
      member.level = 1;
      member.tier = 'Newcomer';
    }
  }

  // ─── 2. Toast Notification System ───────────────────────────────────────
  window.showToast = function (message, type = 'info', duration = 3500) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    } else {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `
      <div style="flex-shrink: 0">${iconSvg}</div>
      <div style="flex: 1">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => toast.remove(), 350);
    }, duration);
  };

  // ─── 3. Modal Dialog Manager ────────────────────────────────────────────
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // ─── 4. Renderers ───────────────────────────────────────────────────────
  function renderMemberProfile() {
    const member = getActiveMember();
    if (!member) return;

    // Avatar initials
    const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    const avatarEl = document.getElementById('profileAvatar');
    if (avatarEl) avatarEl.textContent = initials;

    // Names & Tags
    const nameEl = document.getElementById('profileName');
    if (nameEl) nameEl.textContent = member.name;

    const idEl = document.getElementById('profileId');
    if (idEl) idEl.textContent = member.id;

    const roleEl = document.getElementById('profileRole');
    if (roleEl) roleEl.textContent = member.role;

    const statusBadge = document.getElementById('profileStatusBadge');
    if (statusBadge) {
      statusBadge.textContent = member.residentStatus;
      statusBadge.className = member.residentStatus === 'Hosteller' ? 'badge badge-violet' : 'badge badge-cyan';
    }

    const tierBadge = document.getElementById('profileTierBadge');
    if (tierBadge) {
      tierBadge.textContent = member.tier;
      tierBadge.className = 'badge badge-amber';
    }

    // Stats
    const totalCreditsEl = document.getElementById('statTotalCredits');
    if (totalCreditsEl) totalCreditsEl.textContent = member.credits;

    const levelEl = document.getElementById('statLevel');
    if (levelEl) levelEl.textContent = `Lvl ${member.level}`;

    const attendanceEl = document.getElementById('statAttendance');
    if (attendanceEl) attendanceEl.textContent = `${member.attendanceRate}%`;

    // Circular Progress Ring (Circumference ~ 326.7)
    const ringEl = document.getElementById('circularGaugeProgress');
    const ringValEl = document.getElementById('circularGaugeVal');
    if (ringEl && ringValEl) {
      const targetPercent = Math.min(100, Math.round((member.credits / 60) * 100));
      const circumference = 2 * Math.PI * 52; // 326.72
      const offset = circumference - (targetPercent / 100) * circumference;
      ringEl.style.strokeDashoffset = offset;
      ringValEl.textContent = `${targetPercent}%`;
    }

    // Update active user status chip in Nav
    const navChip = document.getElementById('navUserChip');
    if (navChip) {
      navChip.innerHTML = `
        <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--accent-emerald);"></span>
        <span>${member.name} (${member.id})</span>
      `;
    }
  }

  function renderActivityFeed() {
    const list = document.getElementById('activityFeedList');
    if (!list) return;

    list.innerHTML = '';
    const relevant = state.activities.slice(0, 8);

    if (relevant.length === 0) {
      list.innerHTML = '<p style="color:var(--text-muted); font-size:0.875rem;">No recent activities logged.</p>';
      return;
    }

    relevant.forEach(item => {
      const isPositive = item.credits >= 0;
      const feedItem = document.createElement('div');
      feedItem.className = 'feed-item';
      feedItem.innerHTML = `
        <div class="feed-left">
          <div class="feed-icon" style="background:${isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)'};">
            ${isPositive
              ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
              : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'}
          </div>
          <div>
            <div class="feed-title">${item.title}</div>
            <div class="feed-meta">${item.memberName} · <span class="badge ${getCategoryBadge(item.category)}" style="font-size:0.65rem; padding:0.15rem 0.4rem;">${item.category}</span> · ${item.date}</div>
          </div>
        </div>
        <div class="feed-credit-badge ${isPositive ? 'credit-plus' : 'credit-minus'}">
          ${isPositive ? '+' : ''}${item.credits} pts
        </div>
      `;
      list.appendChild(feedItem);
    });
  }

  function getCategoryBadge(category) {
    switch (category) {
      case 'Meeting': return 'badge-cyan';
      case 'Event': return 'badge-violet';
      case 'Evening': return 'badge-amber';
      case 'Bonus': return 'badge-emerald';
      case 'Penalty': return 'badge-rose';
      default: return 'badge-violet';
    }
  }

  function renderMembersTable(filterText = '', filterStatus = 'All') {
    const tbody = document.getElementById('membersTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    const filtered = state.members.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(filterText.toLowerCase()) || m.id.toLowerCase().includes(filterText.toLowerCase()) || m.role.toLowerCase().includes(filterText.toLowerCase());
      const matchStatus = filterStatus === 'All' || m.residentStatus === filterStatus;
      return matchSearch && matchStatus;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:2rem;">No matching members found.</td></tr>';
      return;
    }

    // Sort descending by credits
    filtered.sort((a, b) => b.credits - a.credits);

    filtered.forEach((m, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color:var(--text-muted);">#${index + 1}</strong></td>
        <td>
          <div style="font-weight:600;">${m.name}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${m.id} · ${m.role}</div>
        </td>
        <td><span class="badge ${m.residentStatus === 'Hosteller' ? 'badge-violet' : 'badge-cyan'}">${m.residentStatus}</span></td>
        <td><strong style="color:var(--accent-cyan);">${m.credits} pts</strong></td>
        <td><span class="badge badge-amber">${m.tier}</span></td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="window.selectMember('${m.id}')">
            View
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function populateMemberSelects() {
    const memberSelect = document.getElementById('adminMemberSelect');
    const switcherSelect = document.getElementById('switchMemberSelect');

    if (memberSelect) {
      memberSelect.innerHTML = state.members.map(m => `<option value="${m.id}">${m.name} (${m.id})</option>`).join('');
    }

    if (switcherSelect) {
      switcherSelect.innerHTML = state.members.map(m => `<option value="${m.id}" ${m.id === state.currentMemberId ? 'selected' : ''}>${m.name} (${m.id})</option>`).join('');
    }
  }

  // ─── 5. Global Actions ──────────────────────────────────────────────────
  window.selectMember = function (memberId) {
    state.currentMemberId = memberId;
    renderMemberProfile();
    populateMemberSelects();
    window.switchView('dashboard');
    window.switchRole('member');
    window.showToast(`Switched active profile to ${getActiveMember().name}`, 'info');
  };

  window.switchView = function (viewName) {
    state.activeView = viewName;
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));

    const targetSection = document.getElementById(viewName === 'showcase' ? 'showcaseSection' : 'dashboardSection');
    const targetBtn = document.getElementById(viewName === 'showcase' ? 'tabBtnShowcase' : 'tabBtnDashboard');

    if (targetSection) targetSection.classList.add('active');
    if (targetBtn) targetBtn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.switchRole = function (role) {
    state.dashboardRole = role;
    const memberSection = document.getElementById('memberDashboardContent');
    const adminSection = document.getElementById('adminDashboardContent');
    const roleBtnMember = document.getElementById('roleToggleMember');
    const roleBtnAdmin = document.getElementById('roleToggleAdmin');

    if (role === 'admin') {
      if (memberSection) memberSection.style.display = 'none';
      if (adminSection) adminSection.style.display = 'block';
      if (roleBtnAdmin) { roleBtnAdmin.classList.add('active'); }
      if (roleBtnMember) { roleBtnMember.classList.remove('active'); }
      renderMembersTable();
    } else {
      if (memberSection) memberSection.style.display = 'block';
      if (adminSection) adminSection.style.display = 'none';
      if (roleBtnMember) { roleBtnMember.classList.add('active'); }
      if (roleBtnAdmin) { roleBtnAdmin.classList.remove('active'); }
      renderMemberProfile();
      renderActivityFeed();
    }
  };

  window.copySnippet = function (buttonEl) {
    const container = buttonEl.closest('.showcase-card');
    const codeEl = container ? container.querySelector('code') : null;
    if (codeEl) {
      navigator.clipboard.writeText(codeEl.textContent.trim()).then(() => {
        const origText = buttonEl.textContent;
        buttonEl.textContent = 'Copied!';
        buttonEl.style.color = '#10b981';
        setTimeout(() => {
          buttonEl.textContent = origText;
          buttonEl.style.color = '';
        }, 1800);
      }).catch(() => {
        window.showToast('Could not copy automatically.', 'error');
      });
    }
  };

  window.resetData = function () {
    if (confirm('Reset demo data to default initial state?')) {
      localStorage.removeItem(STORAGE_KEY);
      initData();
      renderMemberProfile();
      renderActivityFeed();
      renderMembersTable();
      populateMemberSelects();
      window.showToast('All system data reset to defaults.', 'success');
    }
  };

  // ─── 6. Event Listeners Setup ───────────────────────────────────────────
  function setupListeners() {
    // Quick Member Switcher in Header/Dashboard
    const switchSelect = document.getElementById('switchMemberSelect');
    if (switchSelect) {
      switchSelect.addEventListener('change', (e) => {
        window.selectMember(e.target.value);
      });
    }

    // Role switcher buttons
    const roleBtnMember = document.getElementById('roleToggleMember');
    const roleBtnAdmin = document.getElementById('roleToggleAdmin');
    if (roleBtnMember) roleBtnMember.addEventListener('click', () => window.switchRole('member'));
    if (roleBtnAdmin) roleBtnAdmin.addEventListener('click', () => window.switchRole('admin'));

    // Admin Credit Allocation Form Submit
    const creditForm = document.getElementById('adminCreditForm');
    if (creditForm) {
      creditForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const targetMemberId = document.getElementById('adminMemberSelect').value;
        const category = document.getElementById('adminCategorySelect').value;
        const pts = parseInt(document.getElementById('adminPointsInput').value, 10);
        const reason = document.getElementById('adminReasonInput').value.trim();

        if (isNaN(pts) || pts === 0) {
          window.showToast('Please enter a non-zero credit point value.', 'error');
          return;
        }

        if (!reason) {
          window.showToast('Please provide a reason or session description.', 'error');
          return;
        }

        const member = state.members.find(m => m.id === targetMemberId);
        if (!member) return;

        member.credits = Math.max(0, member.credits + pts);
        recalculateTierAndLevel(member);

        // Prepend new activity
        const newTx = {
          id: `TX-${Date.now().toString().slice(-4)}`,
          memberId: member.id,
          memberName: member.name,
          title: reason,
          category: category,
          credits: pts,
          date: new Date().toISOString().split('T')[0],
          type: pts > 0 ? 'positive' : 'negative'
        };

        state.activities.unshift(newTx);
        saveData();

        // Refresh views
        renderMemberProfile();
        renderActivityFeed();
        renderMembersTable();

        creditForm.reset();
        document.getElementById('adminPointsInput').value = '5';

        window.showToast(`Successfully logged ${pts > 0 ? '+' : ''}${pts} pts for ${member.name}!`, 'success');
      });
    }

    // Directory Search & Filter
    const searchInput = document.getElementById('memberSearchInput');
    const statusFilter = document.getElementById('statusFilterSelect');

    function handleFilter() {
      const q = searchInput ? searchInput.value : '';
      const s = statusFilter ? statusFilter.value : 'All';
      renderMembersTable(q, s);
    }

    if (searchInput) searchInput.addEventListener('input', handleFilter);
    if (statusFilter) statusFilter.addEventListener('change', handleFilter);

    // Modal background click or Escape key
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(modal => {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        });
      }
    });
  }

  // ─── 7. Bootstrap Application ───────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initData();
    populateMemberSelects();
    renderMemberProfile();
    renderActivityFeed();
    renderMembersTable();
    setupListeners();
  });

})();
