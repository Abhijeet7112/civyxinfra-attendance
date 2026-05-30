import { useState, useEffect, useRef, useMemo } from "react";
const LOGO_B64 = "data:image/png;base64,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";


// ─── HELPERS ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 10);
const today = () => new Date().toISOString().slice(0, 10);
const monthLabel = (y, m) => new Date(y, m - 1).toLocaleString("default", { month: "long", year: "numeric" });
const daysInMonth = (y, m) => new Date(y, m, 0).getDate();
const dayName = (y, m, d) => new Date(y, m - 1, d).toLocaleString("default", { weekday: "short" });
const isWeekend = (y, m, d) => { const dn = new Date(y, m - 1, d).getDay(); return dn === 0 || dn === 6; };
const isOffDay = (y, m, d, workDays) => { const dn = new Date(y, m - 1, d).getDay(); return !(workDays || [1,2,3,4,5,6]).includes(dn); };
const initials = (name) => name.split(" ").map(p => p[0]).join("").toUpperCase().slice(0, 2);
const fmtCurrency = (n) => new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(n);

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const ROLES = ["Super Admin", "HR Manager", "Supervisor", "Employee"];
const DEPTS = ["Engineering", "Finance", "HR", "Operations", "Sales", "Management"];

const INIT_USERS = [
  { id: "u1", name: "Abhijeet", email: "abhijeet@civyxinfra.com", password: "Abhijeet@#2007", role: "Super Admin", dept: "Management", designation: "Director", salary: 150000, active: true, joinDate: "2020-01-01", deductLeaveOverride: "global" },
];

const PERMS = {
  "Super Admin":  ["dashboard", "users", "attendance", "attendance_mark", "leave", "salary", "reports", "settings"],
  "HR Manager":   ["dashboard", "users", "attendance", "attendance_mark", "leave", "salary", "reports"],
  "Supervisor":   ["dashboard", "attendance", "attendance_mark", "leave", "reports"],
  "Employee":     ["dashboard", "attendance", "leave"],
};

// Human-readable labels for permission keys shown in Access Control
const PERM_LABELS = {
  dashboard:       { label: "Dashboard",        color: "badge-blue" },
  users:           { label: "User Management",  color: "badge-purple" },
  attendance:      { label: "View Attendance",  color: "badge-green" },
  attendance_mark: { label: "Mark Attendance",  color: "badge-gold" },
  leave:           { label: "Leave Management", color: "badge-orange" },
  salary:          { label: "Salary",           color: "badge-red" },
  reports:         { label: "Reports",          color: "badge-blue" },
  settings:        { label: "Settings",         color: "badge-gray" },
};

const AVATAR_COLORS = ["#1a3a6b","#1a7a4a","#b86a00","#5a3a8a","#c0392b","#2471a3","#117a65","#6e2f8a"];
const avatarColor = (id) => AVATAR_COLORS[id.charCodeAt(1) % AVATAR_COLORS.length];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  "@import": "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --navy:#0d1b2e;--navy2:#162135;--navy3:#1c2d45;--navy4:#233452;
  --blue:#1854d4;--blue2:#2563eb;--blue3:#3b82f6;--blue-lt:#eff6ff;--blue-lt2:#dbeafe;
  --gold:#c9922a;--gold2:#d4a544;--gold-lt:#fffbeb;--gold-lt2:#fef3c7;
  --green:#059669;--green2:#10b981;--green-lt:#ecfdf5;--green-lt2:#d1fae5;
  --red:#dc2626;--red2:#ef4444;--red-lt:#fef2f2;--red-lt2:#fee2e2;
  --orange:#d97706;--orange-lt:#fffbeb;--orange-lt2:#fde68a;
  --purple:#7c3aed;--purple-lt:#f5f3ff;--purple-lt2:#ede9fe;
  --slate:#64748b;--slate2:#94a3b8;--slate3:#cbd5e1;
  --bg:#f1f5f9;--bg2:#e2e8f0;--bg3:#f8fafc;
  --white:#ffffff;--border:#e2e8f0;--border2:#cbd5e1;
  --text:#0f172a;--text2:#334155;--text3:#64748b;--text4:#94a3b8;
  --sidebar:240px;--topbar:60px;
  --shadow-sm:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.06);
  --shadow:0 4px 16px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.05);
  --shadow-lg:0 20px 50px rgba(0,0,0,.15),0 8px 20px rgba(0,0,0,.1);
  --radius:8px;--radius-lg:12px;--radius-xl:16px;
}
html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden}#root{width:100%;height:100%;display:block}html,body,#root{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);font-size:14px;line-height:1.5}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}

/* LAYOUT */
.erp-app{display:flex;height:100vh;width:100vw;overflow:hidden;position:fixed;top:0;left:0}
.sidebar{width:var(--sidebar);background:var(--navy);display:flex;flex-direction:column;flex-shrink:0;overflow-y:auto;position:relative;z-index:50;transition:width .2s}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}
.topbar{height:var(--topbar);background:var(--white);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 1.5rem;flex-shrink:0;box-shadow:var(--shadow-sm)}
.content{flex:1;overflow-y:auto;padding:1.5rem;background:var(--bg)}

/* SIDEBAR */
.sb-brand{padding:1.1rem 1.2rem 1rem;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:.7rem}
.sb-logo{width:36px;height:36px;background:var(--blue);border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.95rem;color:#fff;letter-spacing:-.02em;flex-shrink:0}
.sb-brand-text{font-size:.92rem;font-weight:700;color:#fff;line-height:1.2}
.sb-brand-text span{color:rgba(255,255,255,.4);font-weight:400;font-size:.68rem;display:block}
.sb-section{padding:.9rem 1rem .25rem;font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3)}
.nav-item{display:flex;align-items:center;gap:.65rem;padding:.6rem .9rem;margin:.05rem .5rem;border-radius:6px;cursor:pointer;color:rgba(255,255,255,.6);font-size:.83rem;font-weight:500;transition:all .15s;user-select:none;text-decoration:none}
.nav-item:hover{background:rgba(255,255,255,.07);color:rgba(255,255,255,.9)}
.nav-item.active{background:var(--blue);color:#fff;box-shadow:0 2px 8px rgba(37,99,235,.4)}
.nav-item svg{width:16px;height:16px;flex-shrink:0;opacity:.8}
.nav-item.active svg{opacity:1}
.sb-footer{margin-top:auto;padding:1rem;border-top:1px solid rgba(255,255,255,.08)}
.sb-user{display:flex;align-items:center;gap:.6rem;padding:.5rem;border-radius:6px;cursor:pointer;transition:background .15s}
.sb-user:hover{background:rgba(255,255,255,.07)}
.sb-info{flex:1;min-width:0}
.sb-name{font-size:.8rem;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sb-role{font-size:.67rem;color:rgba(255,255,255,.4)}
.sb-logout{background:none;border:none;color:rgba(255,255,255,.4);cursor:pointer;font-size:.78rem;display:flex;align-items:center;gap:.3rem;padding:.4rem .7rem;border-radius:4px;transition:all .15s;margin-top:.3rem;width:100%}
.sb-logout:hover{background:rgba(220,38,38,.15);color:#ef4444}

/* TOPBAR */
.tb-title{font-size:.95rem;font-weight:700;color:var(--text)}
.tb-sub{font-size:.73rem;color:var(--text3);margin-top:.05rem}
.tb-right{display:flex;align-items:center;gap:.8rem}
.tb-date{font-size:.75rem;color:var(--text3);font-family:'JetBrains Mono',monospace;background:var(--bg);padding:.3rem .7rem;border-radius:6px;border:1px solid var(--border)}
.tb-badge{background:var(--blue-lt);color:var(--blue);font-size:.72rem;font-weight:700;padding:.25rem .7rem;border-radius:20px;border:1px solid var(--blue-lt2)}
.tb-notif{width:32px;height:32px;border-radius:6px;border:1px solid var(--border);background:var(--white);display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;font-size:.9rem}
.tb-notif:hover{background:var(--bg)}

/* AVATAR */
.avatar{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;font-weight:700;color:#fff;flex-shrink:0;font-family:'Plus Jakarta Sans',sans-serif}
.av-sm{width:28px;height:28px;font-size:.7rem}
.av-md{width:36px;height:36px;font-size:.83rem}
.av-lg{width:44px;height:44px;font-size:1rem}
.av-xl{width:56px;height:56px;font-size:1.2rem}

/* CARDS */
.card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.3rem;box-shadow:var(--shadow-sm)}
.card-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.1rem}
.card-title{font-size:.88rem;font-weight:700;color:var(--text)}
.card-sub{font-size:.73rem;color:var(--text3);margin-top:.1rem}

/* STAT CARDS */
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.4rem}
.stat-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.2rem 1.3rem;display:flex;align-items:flex-start;gap:.9rem;box-shadow:var(--shadow-sm);transition:box-shadow .2s,transform .2s}
.stat-card:hover{box-shadow:var(--shadow);transform:translateY(-1px)}
.stat-icon{width:40px;height:40px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.stat-num{font-size:1.6rem;font-weight:800;color:var(--text);line-height:1;font-family:'JetBrains Mono',monospace;letter-spacing:-.02em}
.stat-lbl{font-size:.73rem;color:var(--text3);margin-top:.18rem;font-weight:500}
.stat-chg{font-size:.72rem;font-weight:600;margin-top:.3rem}

/* TABLES */
.tbl-wrap{overflow-x:auto;border-radius:var(--radius-lg);border:1px solid var(--border);box-shadow:var(--shadow-sm)}
table{width:100%;border-collapse:collapse;background:var(--white)}
thead{position:sticky;top:0;z-index:1}
th{background:var(--bg3);font-size:.7rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--text3);padding:.7rem 1rem;text-align:left;border-bottom:1px solid var(--border);white-space:nowrap}
td{padding:.75rem 1rem;border-bottom:1px solid var(--bg);font-size:.83rem;color:var(--text);vertical-align:middle}
tr:last-child td{border-bottom:none}
tbody tr:hover td{background:var(--bg3)}
.tbl-actions{display:flex;gap:.4rem;align-items:center}

/* BADGES */
.badge{display:inline-flex;align-items:center;gap:.25rem;font-size:.68rem;font-weight:700;padding:.2rem .6rem;border-radius:20px;letter-spacing:.01em;white-space:nowrap}
.badge-green{background:var(--green-lt);color:var(--green)}
.badge-red{background:var(--red-lt);color:var(--red)}
.badge-orange{background:var(--orange-lt);color:var(--orange)}
.badge-blue{background:var(--blue-lt);color:var(--blue)}
.badge-purple{background:var(--purple-lt);color:var(--purple)}
.badge-gray{background:var(--bg2);color:var(--text3)}
.badge-gold{background:var(--gold-lt);color:var(--gold)}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:.4rem;font-family:'Plus Jakarta Sans',sans-serif;font-size:.8rem;font-weight:600;padding:.5rem 1rem;border-radius:6px;border:none;cursor:pointer;transition:all .15s;white-space:nowrap;letter-spacing:.01em}
.btn:disabled{opacity:.5;cursor:not-allowed}
.btn-primary{background:var(--blue);color:#fff}
.btn-primary:hover:not(:disabled){background:var(--blue2)}
.btn-success{background:var(--green);color:#fff}
.btn-success:hover:not(:disabled){background:#047857}
.btn-danger{background:var(--red);color:#fff}
.btn-danger:hover:not(:disabled){background:#b91c1c}
.btn-warning{background:var(--orange);color:#fff}
.btn-warning:hover:not(:disabled){background:#b45309}
.btn-outline{background:transparent;color:var(--blue);border:1px solid var(--blue)}
.btn-outline:hover:not(:disabled){background:var(--blue-lt)}
.btn-ghost{background:transparent;color:var(--text2);border:1px solid var(--border)}
.btn-ghost:hover:not(:disabled){background:var(--bg);color:var(--text)}
.btn-gold{background:var(--gold);color:#fff}
.btn-gold:hover:not(:disabled){background:var(--gold2)}
.btn-sm{font-size:.75rem;padding:.35rem .75rem}
.btn-xs{font-size:.7rem;padding:.25rem .55rem}
.btn-icon{padding:.5rem;border-radius:6px}

/* FORMS */
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.form-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem}
.form-group{display:flex;flex-direction:column;gap:.3rem}
.form-group.full{grid-column:1/-1}
label{font-size:.75rem;font-weight:600;color:var(--text2)}
input,select,textarea{font-family:'Plus Jakarta Sans',sans-serif;font-size:.85rem;padding:.55rem .8rem;border:1px solid var(--border2);border-radius:6px;background:var(--white);color:var(--text);outline:none;transition:border-color .15s,box-shadow .15s;width:100%}
input:focus,select:focus,textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.08)}
textarea{resize:vertical;min-height:80px}
.form-actions{display:flex;gap:.6rem;justify-content:flex-end;margin-top:1.1rem;padding-top:1rem;border-top:1px solid var(--bg2)}
.form-hint{font-size:.7rem;color:var(--text3)}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:1000;display:flex;align-items:center;justify-content:center;padding:1rem;backdrop-filter:blur(2px)}
.modal{background:var(--white);border-radius:var(--radius-xl);width:100%;max-width:560px;max-height:92vh;overflow-y:auto;box-shadow:var(--shadow-lg);animation:modalIn .2s ease}
.modal-lg{max-width:740px}
.modal-xl{max-width:900px}
@keyframes modalIn{from{opacity:0;transform:translateY(-12px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.modal-hdr{padding:1.2rem 1.4rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:var(--white);z-index:2;border-radius:var(--radius-xl) var(--radius-xl) 0 0}
.modal-title{font-size:.92rem;font-weight:700;color:var(--text)}
.modal-sub{font-size:.73rem;color:var(--text3);margin-top:.1rem}
.modal-close{background:none;border:none;font-size:1.1rem;cursor:pointer;color:var(--text3);width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:5px;transition:all .15s}
.modal-close:hover{background:var(--bg);color:var(--text)}
.modal-body{padding:1.4rem}

/* PAGE */
.page-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.4rem;flex-wrap:wrap;gap:.8rem}
.page-title{font-size:1.1rem;font-weight:800;color:var(--text)}
.page-sub{font-size:.77rem;color:var(--text3);margin-top:.1rem}

/* SEARCH BAR */
.search-bar{display:flex;align-items:center;gap:.8rem;margin-bottom:1.1rem;flex-wrap:wrap}
.search-wrap{position:relative;flex:1;min-width:200px;max-width:300px}
.search-wrap input{padding-left:2rem}
.search-ic{position:absolute;left:.65rem;top:50%;transform:translateY(-50%);color:var(--text4);font-size:.85rem;pointer-events:none}

/* TABS */
.tabs{display:flex;gap:0;border-bottom:1px solid var(--border);margin-bottom:1.3rem}
.tab{padding:.6rem 1.1rem;font-size:.82rem;font-weight:500;color:var(--text3);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .15s;user-select:none}
.tab:hover{color:var(--text)}
.tab.active{color:var(--blue);border-bottom-color:var(--blue);font-weight:700}

/* ATTENDANCE MARK */
.att-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:.9rem}
.att-emp-card{background:var(--white);border:2px solid var(--border);border-radius:var(--radius-lg);padding:1rem;display:flex;flex-direction:column;gap:.7rem;transition:border-color .2s,box-shadow .2s}
.att-emp-card.marked-P{border-color:var(--green);background:var(--green-lt);box-shadow:0 0 0 3px rgba(5,150,105,.08)}
.att-emp-card.marked-A{border-color:var(--red);background:var(--red-lt);box-shadow:0 0 0 3px rgba(220,38,38,.08)}
.att-emp-card.marked-L{border-color:var(--orange);background:var(--orange-lt);box-shadow:0 0 0 3px rgba(217,119,6,.08)}
.att-emp-card.marked-H{border-color:var(--purple);background:var(--purple-lt);box-shadow:0 0 0 3px rgba(124,58,237,.08)}
.att-emp-card.marked-WO{border-color:var(--border2);background:var(--bg2)}
.att-btns{display:grid;grid-template-columns:1fr 1fr;gap:.35rem}
.att-btn{padding:.35rem .2rem;border:1.5px solid var(--border);border-radius:5px;background:#fff;font-size:.72rem;font-weight:700;cursor:pointer;text-align:center;transition:all .15s;letter-spacing:.03em}
.att-btn.P{border-color:var(--green);color:var(--green)}
.att-btn.P.act,.att-btn.P:hover{background:var(--green);color:#fff}
.att-btn.A{border-color:var(--red);color:var(--red)}
.att-btn.A.act,.att-btn.A:hover{background:var(--red);color:#fff}
.att-btn.L{border-color:var(--orange);color:var(--orange)}
.att-btn.L.act,.att-btn.L:hover{background:var(--orange);color:#fff}
.att-btn.H{border-color:var(--purple);color:var(--purple)}
.att-btn.H.act,.att-btn.H:hover{background:var(--purple);color:#fff}

/* REPORT TABLE */
.rpt-wrap{overflow-x:auto;border-radius:var(--radius-lg);border:1px solid var(--border);box-shadow:var(--shadow-sm)}
.rpt-tbl{border-collapse:collapse;background:var(--white);font-size:.72rem;min-width:100%}
.rpt-tbl th{background:var(--navy);color:#fff;padding:.5rem .5rem;font-size:.65rem;letter-spacing:.05em;text-transform:uppercase;border:1px solid rgba(255,255,255,.1);text-align:center;white-space:nowrap}
.rpt-tbl th:first-child{text-align:left;min-width:140px;position:sticky;left:0;z-index:2}
.rpt-tbl td{padding:.42rem .45rem;border:1px solid var(--border);text-align:center;white-space:nowrap;vertical-align:middle}
.rpt-tbl td:first-child{text-align:left;position:sticky;left:0;background:var(--white);z-index:1;font-weight:600}
.rpt-tbl tr:hover td:first-child{background:var(--bg3)}
.rc-P{background:#dcfce7;color:#15803d;font-weight:700}
.rc-A{background:#fee2e2;color:#b91c1c;font-weight:700}
.rc-L{background:#fef3c7;color:#b45309;font-weight:700}
.rc-H{background:#ede9fe;color:#6d28d9;font-weight:700}
.rc-WO{background:#f1f5f9;color:#94a3b8;font-size:.65rem}
.rc-empty{color:#e2e8f0}

/* SALARY CARD */
.salary-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-sm)}
.sal-hdr{background:linear-gradient(135deg,var(--navy) 0%,var(--navy3) 100%);padding:1.2rem 1.4rem;display:flex;align-items:center;justify-content:space-between}
.sal-emp-name{font-size:.95rem;font-weight:700;color:#fff}
.sal-month{font-size:.73rem;color:rgba(255,255,255,.55);margin-top:.1rem}
.sal-gross{font-size:1.5rem;font-weight:800;color:var(--gold2);font-family:'JetBrains Mono',monospace}
.sal-body{padding:1rem 1.4rem}
.sal-row{display:flex;justify-content:space-between;align-items:center;padding:.5rem 0;border-bottom:1px solid var(--bg);font-size:.82rem}
.sal-row:last-child{border-bottom:none;font-weight:700;font-size:.9rem;padding-top:.8rem;margin-top:.3rem;border-top:2px solid var(--border)}
.sal-deduct{color:var(--red);font-weight:600}

/* LEAVE */
.leave-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.2rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;transition:box-shadow .15s}
.leave-card:hover{box-shadow:var(--shadow)}

/* TOAST */
#erp-toast{position:fixed;bottom:1.5rem;right:1.5rem;background:var(--navy);color:#fff;padding:.8rem 1.2rem;border-radius:8px;font-size:.83rem;z-index:9999;opacity:0;transform:translateY(10px);transition:all .3s;pointer-events:none;max-width:300px;box-shadow:var(--shadow-lg);font-family:'Plus Jakarta Sans',sans-serif;font-weight:500}
#erp-toast.show{opacity:1;transform:translateY(0)}
#erp-toast.ok{background:var(--green)}
#erp-toast.err{background:var(--red)}

/* LOGIN */
.login-wrap{min-height:100vh;background:var(--navy);display:flex;align-items:center;justify-content:center;padding:1rem}
.login-box{background:var(--white);border-radius:var(--radius-xl);padding:2.5rem;width:100%;max-width:400px;box-shadow:var(--shadow-lg)}
.login-logo{width:52px;height:52px;background:var(--blue);border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.3rem;color:#fff;margin:0 auto 1.2rem;letter-spacing:-.02em}
.login-title{text-align:center;font-size:1.3rem;font-weight:800;color:var(--navy);margin-bottom:.3rem}
.login-sub{text-align:center;font-size:.8rem;color:var(--text3);margin-bottom:2rem}
.login-box .form-group{margin-bottom:.9rem}
.login-box button{width:100%;margin-top:.5rem;padding:.75rem;font-size:.9rem}
.login-error{background:var(--red-lt);color:var(--red);font-size:.78rem;padding:.6rem .9rem;border-radius:6px;margin-top:.5rem;border:1px solid var(--red-lt2);font-weight:500}
.login-hint{text-align:center;font-size:.73rem;color:var(--text4);margin-top:1.2rem}

/* SECTION DIVIDER */
.divider{border:none;border-top:1px solid var(--border);margin:1.2rem 0}

/* EMPTY */
.empty{text-align:center;padding:3rem 1rem;color:var(--text3)}
.empty-ic{font-size:2.5rem;margin-bottom:.8rem;opacity:.5}
.empty-txt{font-size:.88rem}

/* PRINT */
@media print{
  .no-print{display:none!important}
  .print-only{display:block!important}
  .erp-app{display:block}
  .sidebar,.topbar{display:none}
  .content{overflow:visible;padding:0}
  body{background:white;font-size:11px}
  .card,.stat-card,.salary-card{box-shadow:none;border:1px solid #ccc}
  @page{margin:15mm}
}
.print-only{display:none}

/* UTILS */
.flex{display:flex}.flex-col{flex-direction:column}.flex-1{flex:1}.items-center{align-items:center}.items-start{align-items:flex-start}.justify-between{justify-content:space-between}.justify-end{justify-content:flex-end}.gap-1{gap:.4rem}.gap-2{gap:.8rem}.gap-3{gap:1.2rem}.gap-4{gap:1.6rem}
.mt-1{margin-top:.4rem}.mt-2{margin-top:.8rem}.mt-3{margin-top:1.2rem}.mt-4{margin-top:1.6rem}
.mb-1{margin-bottom:.4rem}.mb-2{margin-bottom:.8rem}.mb-3{margin-bottom:1.2rem}
.w-full{width:100%}.text-sm{font-size:.8rem}.text-xs{font-size:.72rem}.text-muted{color:var(--text3)}.text-right{text-align:right}.font-bold{font-weight:700}.font-mono{font-family:'JetBrains Mono',monospace}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem}
.rounded{border-radius:var(--radius)}.rounded-lg{border-radius:var(--radius-lg)}
.p-2{padding:.8rem}.p-3{padding:1.2rem}
.separator{display:flex;align-items:center;gap:.8rem;margin:1rem 0;color:var(--text4);font-size:.72rem}.separator::before,.separator::after{content:'';flex:1;height:1px;background:var(--border)}
.info-box{background:var(--blue-lt);border:1px solid var(--blue-lt2);border-radius:6px;padding:.8rem 1rem;font-size:.8rem;color:var(--blue2)}
.warning-box{background:var(--orange-lt);border:1px solid var(--orange-lt2);border-radius:6px;padding:.8rem 1rem;font-size:.8rem;color:var(--orange)}

/* TOGGLE */
.toggle{display:flex;align-items:center;gap:.5rem;cursor:pointer;user-select:none}
.toggle-track{width:38px;height:20px;background:var(--border2);border-radius:10px;position:relative;transition:background .2s;flex-shrink:0}
.toggle-track.on{background:var(--green)}
.toggle-thumb{position:absolute;width:14px;height:14px;background:#fff;border-radius:50%;top:3px;left:3px;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,.2)}
.toggle-track.on .toggle-thumb{left:21px}
.toggle-label{font-size:.8rem;font-weight:500;color:var(--text2)}

/* SECTION CARD (for print reports) */
.print-report{background:white}
.print-hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:2px solid var(--navy)}
.print-company{font-size:1.4rem;font-weight:800;color:var(--navy)}
.print-report-title{font-size:.9rem;font-weight:600;color:var(--text3)}
`;

// ─── TOAST ────────────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, type = "ok") {
  const t = document.getElementById("erp-toast");
  if (!t) return;
  t.textContent = msg;
  t.className = `show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.className = ""), 3000);
}

// ─── ICONS (inline SVG) ───────────────────────────────────────────────────────
const Icon = ({ n, size = 16, col }) => {
  const paths = {
    dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
    users: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
    attendance: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",
    leave: "M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z",
    salary: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
    reports: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
    settings: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
    logout: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
    mark: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
    add: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
    del: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
    search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
    eye: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
    lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
    print: "M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z",
    download: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
    chevron: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
    info: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
    group: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={col || "currentColor"} style={{ flexShrink: 0 }}>
      <path d={paths[n] || ""} />
    </svg>
  );
};

// ─── LOCALSTORAGE HELPERS ────────────────────────────────────────────────────
function lsGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [users, setUsersRaw] = useState(() => lsGet("civyx_users", INIT_USERS));
  const [attendance, setAttendanceRaw] = useState(() => lsGet("civyx_attendance", {}));
  const [leaves, setLeavesRaw] = useState(() => lsGet("civyx_leaves", []));
  const [settings, setSettingsRaw] = useState(() => lsGet("civyx_settings", {
    companyName: "Civyx Infra",
    deductLeave: true,
    halfDayFactor: 0.5,
    weekOffPaid: true,
    holidayPaid: true,
    workDays: [1, 2, 3, 4, 5, 6],
  }));
  const [loggedIn, setLoggedIn] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [modal, setModal] = useState(null);

  const setUsers = (v) => { const next = typeof v === "function" ? v(users) : v; lsSet("civyx_users", next); setUsersRaw(next); };
  const setAttendance = (v) => { const next = typeof v === "function" ? v(attendance) : v; lsSet("civyx_attendance", next); setAttendanceRaw(next); };
  const setLeaves = (v) => { const next = typeof v === "function" ? v(leaves) : v; lsSet("civyx_leaves", next); setLeavesRaw(next); };
  const setSettings = (v) => { const next = typeof v === "function" ? v(settings) : v; lsSet("civyx_settings", next); setSettingsRaw(next); };

  const can = (perm) => loggedIn && (PERMS[loggedIn.role] || []).includes(perm);

  // ── LOGIN ──
  if (!loggedIn) return (
    <>
      <style>{css}</style>
      <div id="erp-toast" />
      <LoginScreen users={users} onLogin={setLoggedIn} />
    </>
  );

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard", perm: "dashboard" },
    { id: "users", label: "User Management", icon: "users", perm: "users" },
    { id: "attendance", label: loggedIn.role === "Employee" ? "My Attendance" : "Attendance", icon: "attendance", perm: "attendance" },
    { id: "attendance_mark", label: "Mark Attendance", icon: "mark", perm: "attendance_mark" },
    { id: "leave", label: loggedIn.role === "Employee" ? "My Leaves" : "Leave Management", icon: "leave", perm: "leave" },
    { id: "salary", label: "Salary", icon: "salary", perm: "salary" },
    { id: "reports", label: "Reports", icon: "reports", perm: "reports" },
    { id: "settings", label: "Settings", icon: "settings", perm: "settings" },
  ].filter(x => can(x.perm));

  const nowDate = new Date().toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <style>{css}</style>
      <div id="erp-toast" />
      <div className="erp-app">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sb-brand">
            <div className="sb-logo" style={{ background: "#fff", padding: 2 }}>
              <img src={LOGO_B64} alt="Civyx Infra" style={{ width: 32, height: 32, objectFit: "contain" }} />
            </div>
            <div className="sb-brand-text">
              Civyx Infra
              <span>ERP · Enterprise Suite</span>
            </div>
          </div>
          <div className="sb-section">Navigation</div>
          {navItems.map(n => (
            <div key={n.id} className={`nav-item${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
              <Icon n={n.icon} size={15} />
              <span>{n.label}</span>
            </div>
          ))}
          <div className="sb-footer">
            <div className="sb-user" onClick={() => setModal("profile")}>
              <div className="avatar av-sm" style={{ background: avatarColor(loggedIn.id) }}>{initials(loggedIn.name)}</div>
              <div className="sb-info">
                <div className="sb-name">{loggedIn.name}</div>
                <div className="sb-role">{loggedIn.role}</div>
              </div>
            </div>
            <button className="sb-logout" onClick={() => { setLoggedIn(null); setPage("dashboard"); }}>
              <Icon n="logout" size={14} /> Sign Out
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div>
              <div className="tb-title">{navItems.find(x => x.id === page)?.label || "Dashboard"}</div>
              <div className="tb-sub">{settings.companyName}</div>
            </div>
            <div className="tb-right">
              <div className="tb-date">{nowDate}</div>
              <div className="tb-badge">{loggedIn.role}</div>
            </div>
          </div>

          <div className="content">
            {page === "dashboard" && <Dashboard users={users} attendance={attendance} leaves={leaves} loggedIn={loggedIn} setPage={setPage} />}
            {page === "users" && <UserMgmt users={users} setUsers={setUsers} loggedIn={loggedIn} />}
            {page === "attendance" && <AttendancePage users={users} attendance={attendance} loggedIn={loggedIn} settings={settings} />}
            {page === "attendance_mark" && <MarkAttendance users={users} attendance={attendance} setAttendance={setAttendance} loggedIn={loggedIn} settings={settings} />}
            {page === "leave" && <LeavePage users={users} leaves={leaves} setLeaves={setLeaves} loggedIn={loggedIn} can={can} />}
            {page === "salary" && <SalaryPage users={users} attendance={attendance} settings={settings} loggedIn={loggedIn} />}
            {page === "reports" && <ReportsPage users={users} attendance={attendance} leaves={leaves} settings={settings} loggedIn={loggedIn} />}
            {page === "settings" && <SettingsPage settings={settings} setSettings={setSettings} />}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ users, onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const login = () => {
    const u = users.find(u => u.email === email && u.password === pass && u.active);
    if (u) { onLogin(u); setErr(""); }
    else setErr("Invalid credentials or account inactive.");
  };

  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="login-logo" style={{ background: "#fff", padding: 4, boxShadow: "0 2px 12px rgba(0,0,0,.12)" }}>
          <img src={LOGO_B64} alt="Civyx Infra" style={{ width: 44, height: 44, objectFit: "contain" }} />
        </div>
        <div className="login-title">Civyx Infra</div>
        <div className="login-sub">Enterprise Resource Planning · Secure Portal</div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@civyx.com" onKeyDown={e => e.key === "Enter" && login()} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && login()} />
        </div>
        {err && <div className="login-error">{err}</div>}
        <button className="btn btn-primary" onClick={login}>Sign In to ERP</button>
        <div className="login-hint">Contact your administrator for login credentials</div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ users, attendance, leaves, loggedIn, setPage }) {
  const now = new Date();
  const todayStr = today();
  const isEmployee = loggedIn.role === "Employee";

  // ── EMPLOYEE PERSONAL DASHBOARD ──
  if (isEmployee) {
    const me = users.find(u => u.id === loggedIn.id) || loggedIn;
    const myLeaves = leaves.filter(l => l.userId === me.id);
    const approvedLeaves = myLeaves.filter(l => l.status === "Approved").length;
    const pendingLeaves = myLeaves.filter(l => l.status === "Pending").length;

    // Today's attendance status
    const todayKey = `${todayStr}_${me.id}`;
    const todayStatus = attendance[todayKey] || null;

    // This month attendance summary
    const y = now.getFullYear(), m = now.getMonth() + 1;
    const days = new Date(y, m, 0).getDate();
    let P = 0, A = 0, L = 0, H = 0;
    for (let d = 1; d <= days; d++) {
      const key = `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}_${me.id}`;
      const v = attendance[key];
      if (v === "P") P++;
      else if (v === "A") A++;
      else if (v === "L") L++;
      else if (v === "H") H++;
    }

    const statusLabel = todayStatus === "P" ? "Present" : todayStatus === "A" ? "Absent" : todayStatus === "L" ? "On Leave" : todayStatus === "H" ? "Holiday" : "Not Marked";
    const statusClass = todayStatus === "P" ? "badge-green" : todayStatus === "A" ? "badge-red" : todayStatus === "L" ? "badge-orange" : todayStatus === "H" ? "badge-purple" : "badge-gray";

    const infoRows = [
      { label: "Full Name",    value: me.name },
      { label: "Employee ID",  value: me.id.toUpperCase() },
      { label: "Email",        value: me.email },
      { label: "Designation",  value: me.role },
      { label: "Department",   value: me.dept },
      { label: "Date Joined",  value: me.joinDate },
      { label: "Status",       value: me.active ? "Active" : "Inactive", badge: me.active ? "badge-green" : "badge-red" },
    ];

    return (
      <div>
        <div className="page-hdr">
          <div>
            <div className="page-title">Welcome back, {me.name.split(" ")[0]} 👋</div>
            <div className="page-sub">{new Date().toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
          </div>
        </div>

        {/* Profile + Today Status */}
        <div className="grid-2" style={{ marginBottom: "1.2rem" }}>
          <div className="card">
            <div className="card-hdr"><div className="card-title">My Profile</div></div>
            <div className="flex items-center gap-3" style={{ marginBottom: "1.2rem" }}>
              <div className="avatar av-xl" style={{ background: avatarColor(me.id) }}>{initials(me.name)}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>{me.name}</div>
                <div className="text-sm text-muted">{me.role} · {me.dept}</div>
                <div className="text-xs text-muted" style={{ marginTop: ".2rem" }}>ID: {me.id.toUpperCase()}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {infoRows.map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: ".55rem 0", borderBottom: "1px solid var(--bg)" }}>
                  <span className="text-xs text-muted" style={{ fontWeight: 600 }}>{r.label}</span>
                  {r.badge
                    ? <span className={`badge ${r.badge}`}>{r.value}</span>
                    : <span className="text-sm" style={{ fontWeight: 500, color: "var(--text)" }}>{r.value}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Today's status */}
            <div className="card" style={{ flex: "0 0 auto" }}>
              <div className="card-hdr"><div className="card-title">Today's Attendance</div></div>
              <div className="flex items-center gap-3">
                <div style={{ width: 48, height: 48, borderRadius: 12, background: todayStatus === "P" ? "var(--green-lt)" : todayStatus === "A" ? "var(--red-lt)" : todayStatus === "L" ? "var(--orange-lt)" : "var(--bg2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
                  {todayStatus === "P" ? "✅" : todayStatus === "A" ? "❌" : todayStatus === "L" ? "🏖️" : todayStatus === "H" ? "🎉" : "⏳"}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>{statusLabel}</div>
                  <div className="text-xs text-muted">{todayStr}</div>
                </div>
                <span className={`badge ${statusClass}`} style={{ marginLeft: "auto" }}>{statusLabel}</span>
              </div>
            </div>

            {/* This month summary */}
            <div className="card" style={{ flex: 1 }}>
              <div className="card-hdr"><div className="card-title">This Month's Summary</div><div className="card-sub">{new Date(now.getFullYear(), now.getMonth()).toLocaleString("default", { month: "long", year: "numeric" })}</div></div>
              <div className="stat-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: ".7rem", marginBottom: 0 }}>
                {[
                  { label: "Present", num: P, bg: "var(--green-lt)", col: "var(--green)" },
                  { label: "Absent",  num: A, bg: "var(--red-lt)",   col: "var(--red)" },
                  { label: "On Leave",num: L, bg: "var(--orange-lt)",col: "var(--orange)" },
                  { label: "Holiday", num: H, bg: "var(--purple-lt)",col: "var(--purple)" },
                ].map(s => (
                  <div key={s.label} style={{ background: s.bg, borderRadius: 8, padding: ".7rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: ".75rem", fontWeight: 600, color: s.col }}>{s.label}</span>
                    <span style={{ fontSize: "1.3rem", fontWeight: 800, color: s.col, fontFamily: "'JetBrains Mono',monospace" }}>{s.num}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leave summary */}
            <div className="card" style={{ flex: "0 0 auto" }}>
              <div className="card-hdr">
                <div className="card-title">My Leaves</div>
                <button className="btn btn-ghost btn-sm" onClick={() => setPage("leave")}>View All</button>
              </div>
              <div className="flex gap-3">
                <div style={{ flex: 1, textAlign: "center", background: "var(--orange-lt)", borderRadius: 8, padding: ".7rem" }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--orange)", fontFamily: "'JetBrains Mono',monospace" }}>{pendingLeaves}</div>
                  <div style={{ fontSize: ".72rem", color: "var(--orange)", fontWeight: 600 }}>Pending</div>
                </div>
                <div style={{ flex: 1, textAlign: "center", background: "var(--green-lt)", borderRadius: 8, padding: ".7rem" }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--green)", fontFamily: "'JetBrains Mono',monospace" }}>{approvedLeaves}</div>
                  <div style={{ fontSize: ".72rem", color: "var(--green)", fontWeight: 600 }}>Approved</div>
                </div>
                <div style={{ flex: 1, textAlign: "center", background: "var(--blue-lt)", borderRadius: 8, padding: ".7rem" }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--blue)", fontFamily: "'JetBrains Mono',monospace" }}>{myLeaves.length}</div>
                  <div style={{ fontSize: ".72rem", color: "var(--blue)", fontWeight: 600 }}>Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent leave applications */}
        {myLeaves.length > 0 && (
          <div className="card">
            <div className="card-hdr">
              <div className="card-title">Recent Leave Applications</div>
              <button className="btn btn-ghost btn-sm" onClick={() => setPage("leave")}>View All</button>
            </div>
            <div className="flex flex-col gap-1">
              {myLeaves.slice(-5).reverse().map(l => (
                <div key={l.id} className="flex items-center justify-between" style={{ padding: ".6rem 0", borderBottom: "1px solid var(--bg)" }}>
                  <div>
                    <div className="text-sm font-bold">{l.type} Leave</div>
                    <div className="text-xs text-muted">{l.from} → {l.to} · Applied: {l.appliedOn}</div>
                    <div className="text-xs" style={{ color: "var(--text2)", marginTop: ".1rem" }}>{l.reason}</div>
                  </div>
                  <span className={`badge ${l.status === "Approved" ? "badge-green" : l.status === "Rejected" ? "badge-red" : "badge-orange"}`}>{l.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── ADMIN / HR / SUPERVISOR DASHBOARD ──
  const activeUsers = users.filter(u => u.active);
  const todayAtt = Object.entries(attendance)
    .filter(([k]) => k.startsWith(todayStr))
    .reduce((a, [k, v]) => { a[k.split("_")[1]] = v; return a; }, {});

  const presentToday = Object.values(todayAtt).filter(v => v === "P").length;
  const absentToday  = Object.values(todayAtt).filter(v => v === "A").length;
  const pendingLeaves = leaves.filter(l => l.status === "Pending").length;

  const stats = [
    { label: "Total Employees", num: activeUsers.length, icon: "users", color: "background:var(--blue-lt);color:var(--blue)" },
    { label: "Present Today",   num: presentToday,       icon: "mark",  color: "background:var(--green-lt);color:var(--green)" },
    { label: "Absent Today",    num: absentToday,        icon: "info",  color: "background:var(--red-lt);color:var(--red)" },
    { label: "Pending Leaves",  num: pendingLeaves,      icon: "leave", color: "background:var(--orange-lt);color:var(--orange)" },
  ];

  const recentLeaves = leaves.slice(-5).reverse();

  return (
    <div>
      <div className="page-hdr">
        <div>
          <div className="page-title">Welcome back, {loggedIn.name.split(" ")[0]} 👋</div>
          <div className="page-sub">Here's what's happening at {new Date().toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "long" })}</div>
        </div>
      </div>

      <div className="stat-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ cssText: s.color }}><Icon n={s.icon} size={20} /></div>
            <div>
              <div className="stat-num">{s.num}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-hdr">
            <div>
              <div className="card-title">Department Overview</div>
              <div className="card-sub">Employee distribution by department</div>
            </div>
          </div>
          <table style={{ width: "100%" }}>
            <thead><tr><th>Department</th><th>Employees</th><th>Avg. Salary</th></tr></thead>
            <tbody>
              {DEPTS.map(d => {
                const emp = activeUsers.filter(u => u.dept === d);
                const avg = emp.length ? Math.round(emp.reduce((s, u) => s + u.salary, 0) / emp.length) : 0;
                return emp.length > 0 ? (
                  <tr key={d}>
                    <td><span className="badge badge-blue">{d}</span></td>
                    <td className="font-mono">{emp.length}</td>
                    <td className="font-mono text-sm">{fmtCurrency(avg)}</td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-hdr">
            <div>
              <div className="card-title">Recent Leave Requests</div>
              <div className="card-sub">Latest applications submitted</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setPage("leave")}>View All</button>
          </div>
          {recentLeaves.length === 0 ? (
            <div className="empty"><div className="empty-ic">📋</div><div className="empty-txt">No leave requests yet</div></div>
          ) : (
            <div className="flex flex-col gap-1">
              {recentLeaves.map(l => {
                const u = users.find(u => u.id === l.userId);
                return (
                  <div key={l.id} className="flex items-center justify-between" style={{ padding: ".6rem 0", borderBottom: "1px solid var(--bg)" }}>
                    <div className="flex items-center gap-2">
                      <div className="avatar av-sm" style={{ background: avatarColor(l.userId) }}>{u ? initials(u.name) : "?"}</div>
                      <div>
                        <div className="text-sm font-bold">{u?.name || "Unknown"}</div>
                        <div className="text-xs text-muted">{l.type} · {l.from} → {l.to}</div>
                      </div>
                    </div>
                    <span className={`badge ${l.status === "Approved" ? "badge-green" : l.status === "Rejected" ? "badge-red" : "badge-orange"}`}>{l.status}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-hdr">
          <div className="card-title">Today's Attendance Summary — {todayStr}</div>
        </div>
        {activeUsers.length === 0 ? (
          <div className="empty"><div className="empty-ic">👥</div><div className="empty-txt">No employees found</div></div>
        ) : (
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Employee</th><th>Department</th><th>Status</th><th>Role</th></tr></thead>
              <tbody>
                {activeUsers.map(u => {
                  const st = todayAtt[u.id] || "—";
                  return (
                    <tr key={u.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar av-sm" style={{ background: avatarColor(u.id) }}>{initials(u.name)}</div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{u.name}</div>
                            <div className="text-xs text-muted">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{u.dept}</td>
                      <td>
                        {st === "—" ? <span className="badge badge-gray">Not Marked</span> :
                          <span className={`badge ${st === "P" ? "badge-green" : st === "A" ? "badge-red" : st === "L" ? "badge-orange" : "badge-purple"}`}>
                            {st === "P" ? "Present" : st === "A" ? "Absent" : st === "L" ? "On Leave" : "Holiday"}
                          </span>}
                      </td>
                      <td><span className="badge badge-gray">{u.role}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── USER MANAGEMENT ──────────────────────────────────────────────────────────
function UserMgmt({ users, setUsers, loggedIn }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [modal, setModal] = useState(null);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Employee", dept: DEPTS[0], salary: "", active: true, joinDate: today() });

  const isSA = loggedIn.role === "Super Admin";
  const isHR = loggedIn.role === "HR Manager" || isSA;

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.dept.toLowerCase().includes(q);
    const matchR = roleFilter === "All" || u.role === roleFilter;
    return matchQ && matchR;
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", email: "", password: "", role: "Employee", dept: DEPTS[0], designation: "", salary: "", active: true, joinDate: today(), deductLeaveOverride: "global" });
    setModal("user");
  };
  const openEdit = (u) => {
    setEditing(u);
    setForm({ ...u });
    setModal("user");
  };

  const save = () => {
    if (!form.name || !form.email || !form.salary) return showToast("Fill all required fields", "err");
    if (!editing && !form.password) return showToast("Password is required for new user", "err");
    if (editing) {
      setUsers(prev => prev.map(u => u.id === editing.id ? { ...u, ...form, salary: Number(form.salary) } : u));
      showToast("User updated successfully");
    } else {
      if (users.find(u => u.email === form.email)) return showToast("Email already exists", "err");
      setUsers(prev => [...prev, { ...form, id: uid(), salary: Number(form.salary) }]);
      showToast("User created successfully", "ok");
    }
    setModal(null);
  };

  const toggleActive = (u) => {
    if (u.id === loggedIn.id) return showToast("Cannot deactivate your own account", "err");
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, active: !x.active } : x));
    showToast(`User ${u.active ? "deactivated" : "activated"}`);
  };

  const del = (u) => {
    if (u.id === loggedIn.id) return showToast("Cannot delete your own account", "err");
    setDeleteTarget(u);
  };
  const confirmDelete = () => {
    setUsers(prev => prev.filter(x => x.id !== deleteTarget.id));
    showToast("User deleted");
    setDeleteTarget(null);
  };

  const canEditRole = (target) => {
    if (isSA) return true;
    if (isHR && target.role === "Employee") return true;
    return false;
  };

  return (
    <div>
      <div className="page-hdr">
        <div>
          <div className="page-title">User Management</div>
          <div className="page-sub">{users.length} total users · {users.filter(u => u.active).length} active</div>
        </div>
        {isHR && <button className="btn btn-primary" onClick={openAdd}><Icon n="add" size={15} />Add User</button>}
      </div>

      <div className="search-bar">
        <div className="search-wrap">
          <span className="search-ic"><Icon n="search" size={14} /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, dept…" />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ width: 160 }}>
          <option value="All">All Roles</option>
          {ROLES.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Employee</th><th>Role</th><th>Designation</th><th>Department</th><th>Salary</th><th>Joined</th><th>Status</th><th>Leave Deduction</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="avatar av-sm" style={{ background: avatarColor(u.id) }}>{initials(u.name)}</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{u.name}</div>
                      <div className="text-xs text-muted">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${u.role === "Super Admin" ? "badge-purple" : u.role === "HR Manager" ? "badge-blue" : u.role === "Supervisor" ? "badge-gold" : "badge-gray"}`}>
                    {u.role}
                  </span>
                </td>
                <td className="text-sm" style={{ color: "var(--text2)" }}>{u.designation || <span className="text-muted">—</span>}</td>
                <td>{u.dept}</td>
                <td className="font-mono text-sm">{fmtCurrency(u.salary)}</td>
                <td className="text-muted text-sm">{u.joinDate}</td>
                <td>
                  <span className={`badge ${u.active ? "badge-green" : "badge-red"}`}>{u.active ? "Active" : "Inactive"}</span>
                </td>
                <td>
                  <span className={`badge ${u.deductLeaveOverride === "global" ? "badge-blue" : u.deductLeaveOverride === "yes" ? "badge-red" : "badge-green"}`}>
                    {u.deductLeaveOverride === "global" ? "Global" : u.deductLeaveOverride === "yes" ? "Deducted" : "Paid"}
                  </span>
                </td>
                <td>
                  <div className="tbl-actions">
                    {canEditRole(u) && <button className="btn btn-ghost btn-xs" onClick={() => openEdit(u)}><Icon n="edit" size={12} />Edit</button>}
                    {isSA && u.id !== loggedIn.id && (
                      <>
                        <button className="btn btn-xs" style={{ background: u.active ? "var(--orange-lt)" : "var(--green-lt)", color: u.active ? "var(--orange)" : "var(--green)", border: u.active ? "1px solid var(--orange-lt2)" : "1px solid var(--green-lt2)" }} onClick={() => toggleActive(u)}>
                          {u.active ? "Deactivate" : "Activate"}
                        </button>
                        <button className="btn btn-danger btn-xs" onClick={() => del(u)}><Icon n="del" size={12} /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal === "user" && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal">
            <div className="modal-hdr">
              <div>
                <div className="modal-title">{editing ? "Edit User" : "Add New User"}</div>
                <div className="modal-sub">{editing ? `Editing ${editing.name}` : "Create a new employee account"}</div>
              </div>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group full">
                  <label>Full Name *</label>
                  <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Ahmad Raza" />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="user@civyx.com" />
                </div>
                <div className="form-group">
                  <label>Password {editing ? "(leave blank to keep)" : "*"}</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPass ? "text" : "password"} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" />
                    <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: ".6rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text3)" }}>
                      <Icon n="eye" size={15} />
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} disabled={!isSA}>
                    {ROLES.map(r => <option key={r}>{r}</option>)}
                  </select>
                  {!isSA && <div className="form-hint">Only Super Admin can change roles</div>}
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <input value={form.designation || ""} onChange={e => setForm(p => ({ ...p, designation: e.target.value }))} placeholder="e.g. Site Engineer, Project Manager…" />
                  <div className="form-hint">Job title shown on profile and salary slip</div>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select value={form.dept} onChange={e => setForm(p => ({ ...p, dept: e.target.value }))}>
                    {DEPTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Monthly Salary (PKR) *</label>
                  <input type="number" value={form.salary} onChange={e => setForm(p => ({ ...p, salary: e.target.value }))} placeholder="75000" />
                </div>
                <div className="form-group">
                  <label>Join Date</label>
                  <input type="date" value={form.joinDate} onChange={e => setForm(p => ({ ...p, joinDate: e.target.value }))} />
                </div>
                <div className="form-group" style={{ justifyContent: "flex-end" }}>
                  <label>Account Status</label>
                  <div className="toggle" onClick={() => setForm(p => ({ ...p, active: !p.active }))}>
                    <div className={`toggle-track ${form.active ? "on" : ""}`}><div className="toggle-thumb" /></div>
                    <span className="toggle-label">{form.active ? "Active" : "Inactive"}</span>
                  </div>
                </div>
                <div className="form-group full">
                  <label>Leave Deduction Setting</label>
                  <div style={{ display: "flex", gap: ".5rem", marginTop: ".2rem" }}>
                    {[
                      { val: "global", label: "Use Global Setting", desc: "Follow company-wide policy", color: "var(--blue)" },
                      { val: "no",     label: "Paid Leave",         desc: "Never deduct leave days",   color: "var(--green)" },
                      { val: "yes",    label: "Unpaid Leave",       desc: "Always deduct leave days",  color: "var(--red)" },
                    ].map(opt => {
                      const active = (form.deductLeaveOverride || "global") === opt.val;
                      return (
                        <div key={opt.val} onClick={() => setForm(p => ({ ...p, deductLeaveOverride: opt.val }))}
                          style={{
                            flex: 1, padding: ".6rem .8rem", borderRadius: 8, cursor: "pointer",
                            border: `2px solid ${active ? opt.color : "var(--border2)"}`,
                            background: active ? `${opt.color}15` : "var(--white)",
                            transition: "all .15s"
                          }}>
                          <div style={{ fontWeight: 700, fontSize: ".78rem", color: active ? opt.color : "var(--text2)" }}>{opt.label}</div>
                          <div style={{ fontSize: ".68rem", color: "var(--text3)", marginTop: ".15rem" }}>{opt.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="form-actions">
                <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={save}>{editing ? "Save Changes" : "Create User"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteTarget && (
        <div className="overlay">
          <div className="modal" style={{ maxWidth: 400 }}>
            <div className="modal-hdr">
              <div><div className="modal-title">Delete User</div><div className="modal-sub">This action cannot be undone</div></div>
              <button className="modal-close" onClick={() => setDeleteTarget(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: ".88rem", color: "var(--text2)", marginBottom: "1.2rem" }}>
                Are you sure you want to delete <strong>{deleteTarget.name}</strong>? All their data will be permanently removed.
              </p>
              <div className="form-actions" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
                <button className="btn btn-ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={confirmDelete}>Delete User</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ATTENDANCE PAGE ──────────────────────────────────────────────────────────
function AttendancePage({ users, attendance, loggedIn, settings }) {
  const now = new Date();
  const [selY, setSelY] = useState(now.getFullYear());
  const [selM, setSelM] = useState(now.getMonth() + 1);
  const [search, setSearch] = useState("");

  const activeUsers = users.filter(u => u.active && (loggedIn.role === "Employee" ? u.id === loggedIn.id : true));
  const filtered = activeUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.dept.toLowerCase().includes(search.toLowerCase()));
  const days = daysInMonth(selY, selM);
  const cols = Array.from({ length: days }, (_, i) => i + 1);

  const workDays = settings?.workDays || [1,2,3,4,5,6];
  const getStatus = (uid, d) => {
    const key = `${selY}-${String(selM).padStart(2, "0")}-${String(d).padStart(2, "0")}_${uid}`;
    if (attendance[key]) return attendance[key];
    if (isOffDay(selY, selM, d, workDays)) return "WO";
    return "";
  };

  const getSummary = (uid) => {
    const s = { P: 0, A: 0, L: 0, H: 0, WO: 0 };
    cols.forEach(d => { const v = getStatus(uid, d); if (v) s[v] = (s[v] || 0) + 1; });
    return s;
  };

  const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - 2 + i);

  return (
    <div>
      <div className="page-hdr">
        <div>
          <div className="page-title">Attendance Register</div>
          <div className="page-sub">{monthLabel(selY, selM)}</div>
        </div>
        <div className="flex gap-2">
          <select value={selM} onChange={e => setSelM(Number(e.target.value))} style={{ width: 130 }}>
            {Array.from({ length: 12 }, (_, i) => <option key={i} value={i + 1}>{new Date(2000, i).toLocaleString("default", { month: "long" })}</option>)}
          </select>
          <select value={selY} onChange={e => setSelY(Number(e.target.value))} style={{ width: 90 }}>
            {years.map(y => <option key={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <div className="search-bar">
        <div className="search-wrap">
          <span className="search-ic"><Icon n="search" size={14} /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee…" />
        </div>
        <div className="flex gap-2 text-xs text-muted items-center">
          {[["P","Present","badge-green"],["A","Absent","badge-red"],["L","Leave","badge-orange"],["H","Holiday","badge-purple"],["WO","Weekend","badge-gray"]].map(([k,l,b]) => (
            <span key={k} className={`badge ${b}`}>{k} = {l}</span>
          ))}
        </div>
      </div>

      <div className="rpt-wrap">
        <table className="rpt-tbl">
          <thead>
            <tr>
              <th>Employee / Date →</th>
              {cols.map(d => (
                <th key={d} style={isOffDay(selY, selM, d, workDays) ? { background: "#374151", color: "#9ca3af" } : {}}>
                  {d}<br /><span style={{ fontSize: ".55rem", opacity: .7 }}>{dayName(selY, selM, d)}</span>
                </th>
              ))}
              <th>P</th><th>A</th><th>L</th><th>H</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => {
              const sum = getSummary(u.id);
              return (
                <tr key={u.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{u.name}</div>
                    <div style={{ fontSize: ".68rem", color: "var(--text3)" }}>{u.dept}</div>
                  </td>
                  {cols.map(d => {
                    const st = getStatus(u.id, d);
                    return (
                      <td key={d} className={`rc-${st || "empty"}`}>{st || "·"}</td>
                    );
                  })}
                  <td style={{ background: "var(--green-lt)", color: "var(--green)", fontWeight: 700 }}>{sum.P}</td>
                  <td style={{ background: "var(--red-lt)", color: "var(--red)", fontWeight: 700 }}>{sum.A}</td>
                  <td style={{ background: "var(--orange-lt)", color: "var(--orange)", fontWeight: 700 }}>{sum.L}</td>
                  <td style={{ background: "var(--purple-lt)", color: "var(--purple)", fontWeight: 700 }}>{sum.H}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── MARK ATTENDANCE ─────────────────────────────────────────────────────────
function MarkAttendance({ users, attendance, setAttendance, loggedIn, settings }) {
  const now = new Date();
  const [selDate, setSelDate] = useState(today());
  const [deptFilter, setDeptFilter] = useState("All");
  const [search, setSearch] = useState("");

  const activeUsers = users.filter(u => u.active);
  const filtered = activeUsers.filter(u =>
    (deptFilter === "All" || u.dept === deptFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()))
  );

  const getKey = (uid) => `${selDate}_${uid}`;
  const getMark = (uid) => attendance[getKey(uid)] || null;

  const mark = (uid, status) => {
    setAttendance(prev => ({ ...prev, [getKey(uid)]: status }));
  };

  const markAll = (status) => {
    const updates = {};
    filtered.forEach(u => { updates[getKey(u.id)] = status; });
    setAttendance(prev => ({ ...prev, ...updates }));
    showToast(`All marked as ${status === "P" ? "Present" : status === "A" ? "Absent" : status}`, "ok");
  };

  const workDays = settings?.workDays || [1,2,3,4,5,6];
  const isWknd = isOffDay(...selDate.split("-").map(Number), workDays);
  const markedCount = filtered.filter(u => getMark(u.id)).length;

  return (
    <div>
      <div className="page-hdr">
        <div>
          <div className="page-title">Mark Attendance</div>
          <div className="page-sub">{markedCount}/{filtered.length} employees marked for {selDate}</div>
        </div>
        <div className="flex gap-2 items-center">
          <input type="date" value={selDate} onChange={e => setSelDate(e.target.value)} style={{ width: 160 }} />
          <button className="btn btn-success btn-sm" onClick={() => markAll("P")}> All Present</button>
          <button className="btn btn-danger btn-sm" onClick={() => markAll("A")}> All Absent</button>
        </div>
      </div>

      {isWknd && <div className="warning-box mb-3">⚠️ Selected date is a weekend. You can still mark attendance if required.</div>}

      <div className="search-bar">
        <div className="search-wrap">
          <span className="search-ic"><Icon n="search" size={14} /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee…" />
        </div>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} style={{ width: 160 }}>
          <option value="All">All Departments</option>
          {DEPTS.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <div className="att-grid">
        {filtered.map(u => {
          const m = getMark(u.id);
          return (
            <div key={u.id} className={`att-emp-card${m ? ` marked-${m}` : ""}`}>
              <div className="flex items-center gap-2">
                <div className="avatar av-md" style={{ background: avatarColor(u.id) }}>{initials(u.name)}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: ".88rem" }}>{u.name}</div>
                  <div className="text-xs text-muted">{u.dept}</div>
                  {m && <span className={`badge ${m === "P" ? "badge-green" : m === "A" ? "badge-red" : m === "L" ? "badge-orange" : "badge-purple"}`} style={{ marginTop: ".2rem" }}>
                    {m === "P" ? "Present" : m === "A" ? "Absent" : m === "L" ? "On Leave" : "Holiday"}
                  </span>}
                </div>
              </div>
              <div className="att-btns">
                {[["P","Present"],["A","Absent"],["L","Leave"],["H","Holiday"]].map(([k, l]) => (
                  <button key={k} className={`att-btn ${k}${m === k ? " act" : ""}`} onClick={() => mark(u.id, k)}>{l}</button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── LEAVE PAGE ───────────────────────────────────────────────────────────────
function LeavePage({ users, leaves, setLeaves, loggedIn, can }) {
  const [modal, setModal] = useState(null);
  const [tab, setTab] = useState("all");
  const [form, setForm] = useState({ userId: loggedIn.id, type: "Annual", from: today(), to: today(), reason: "" });
  const [deleteTarget, setDeleteTarget] = useState(null); // step 1 target
  const [deleteConfirm, setDeleteConfirm] = useState(false); // step 2 flag

  const isHR = can("salary");
  const isSA = loggedIn.role === "Super Admin";

  const filtered = leaves.filter(l => {
    if (!isHR) return l.userId === loggedIn.id;
    if (tab === "pending")  return l.status === "Pending";
    if (tab === "approved") return l.status === "Approved";
    if (tab === "rejected") return l.status === "Rejected";
    return true;
  });

  const apply = () => {
    if (!form.reason) return showToast("Please provide a reason", "err");
    if (form.from > form.to) return showToast("Invalid date range", "err");
    setLeaves(prev => [...prev, { ...form, id: uid(), status: "Pending", appliedOn: today() }]);
    showToast("Leave application submitted", "ok");
    setModal(null);
    setForm({ userId: loggedIn.id, type: "Annual", from: today(), to: today(), reason: "" });
  };

  const decide = (id, status) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    showToast(`Leave ${status}`, status === "Approved" ? "ok" : "err");
  };

  const withdraw = (id) => {
    setLeaves(prev => prev.filter(l => l.id !== id));
    showToast("Application withdrawn");
  };

  // Step 1: open confirmation modal
  const requestDelete = (l) => {
    setDeleteTarget(l);
    setDeleteConfirm(false);
  };
  // Step 2: final delete
  const confirmDelete = () => {
    setLeaves(prev => prev.filter(l => l.id !== deleteTarget.id));
    showToast("Leave record permanently deleted", "ok");
    setDeleteTarget(null);
    setDeleteConfirm(false);
  };
  const cancelDelete = () => {
    setDeleteTarget(null);
    setDeleteConfirm(false);
  };

  const userName = (id) => users.find(u => u.id === id)?.name || "Unknown";
  const userDept = (id) => users.find(u => u.id === id)?.dept || "";

  const tabs = isHR
    ? [["all","All"],["pending","Pending"],["approved","Approved"],["rejected","Rejected"]]
    : [["all","My Leaves"]];

  return (
    <div>
      <div className="page-hdr">
        <div>
          <div className="page-title">Leave Management</div>
          <div className="page-sub">{filtered.length} applications</div>
        </div>
        <button className="btn btn-primary" onClick={() => setModal("apply")}><Icon n="add" size={15} />Apply for Leave</button>
      </div>

      <div className="tabs">
        {tabs.map(([k, l]) => <div key={k} className={`tab${tab === k ? " active" : ""}`} onClick={() => setTab(k)}>{l}</div>)}
      </div>

      {filtered.length === 0 ? (
        <div className="empty"><div className="empty-ic">📅</div><div className="empty-txt">No leave applications found</div></div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map(l => {
            const isResolved = l.status === "Approved" || l.status === "Rejected";
            return (
              <div className="leave-card" key={l.id}>
                <div className="flex items-center gap-2" style={{ flex: 1 }}>
                  <div className="avatar av-md" style={{ background: avatarColor(l.userId) }}>{initials(userName(l.userId))}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: ".88rem" }}>{userName(l.userId)}</div>
                    <div className="text-xs text-muted">{userDept(l.userId)} · {l.type} Leave · {l.from} to {l.to} · Applied: {l.appliedOn}</div>
                    <div className="text-xs" style={{ marginTop: ".2rem", color: "var(--text2)" }}>{l.reason}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${l.status === "Approved" ? "badge-green" : l.status === "Rejected" ? "badge-red" : "badge-orange"}`}>{l.status}</span>
                  {isHR && l.status === "Pending" && (
                    <>
                      <button className="btn btn-success btn-xs" onClick={() => decide(l.id, "Approved")}>Approve</button>
                      <button className="btn btn-danger btn-xs" onClick={() => decide(l.id, "Rejected")}>Reject</button>
                    </>
                  )}
                  {(l.userId === loggedIn.id && l.status === "Pending") && (
                    <button className="btn btn-ghost btn-xs" onClick={() => withdraw(l.id)}>Withdraw</button>
                  )}
                  {isSA && isResolved && (
                    <button className="btn btn-danger btn-xs" onClick={() => requestDelete(l)} title="Delete record">
                      <Icon n="del" size={12} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2-step delete confirmation modal */}
      {deleteTarget && (
        <div className="overlay">
          <div className="modal" style={{ maxWidth: 420 }}>
            <div className="modal-hdr">
              <div>
                <div className="modal-title">Delete Leave Record</div>
                <div className="modal-sub">
                  {!deleteConfirm ? "Step 1 of 2 — Review" : "Step 2 of 2 — Final Confirmation"}
                </div>
              </div>
              <button className="modal-close" onClick={cancelDelete}>✕</button>
            </div>
            <div className="modal-body">
              {/* Record summary */}
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "1rem", marginBottom: "1rem" }}>
                <div className="flex items-center gap-2" style={{ marginBottom: ".6rem" }}>
                  <div className="avatar av-sm" style={{ background: avatarColor(deleteTarget.userId) }}>{initials(userName(deleteTarget.userId))}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: ".88rem" }}>{userName(deleteTarget.userId)}</div>
                    <div className="text-xs text-muted">{userDept(deleteTarget.userId)}</div>
                  </div>
                  <span className={`badge ${deleteTarget.status === "Approved" ? "badge-green" : "badge-red"}`} style={{ marginLeft: "auto" }}>{deleteTarget.status}</span>
                </div>
                <div className="text-xs text-muted">{deleteTarget.type} Leave · {deleteTarget.from} → {deleteTarget.to}</div>
                <div className="text-xs" style={{ color: "var(--text2)", marginTop: ".3rem" }}>{deleteTarget.reason}</div>
              </div>

              {!deleteConfirm ? (
                /* Step 1 */
                <>
                  <div className="warning-box" style={{ marginBottom: "1rem" }}>
                    ⚠️ You are about to permanently delete this leave record. This action <strong>cannot be undone</strong>. Please confirm you want to proceed.
                  </div>
                  <div className="form-actions" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
                    <button className="btn btn-ghost" onClick={cancelDelete}>Cancel</button>
                    <button className="btn btn-warning" onClick={() => setDeleteConfirm(true)}>Yes, Proceed to Delete</button>
                  </div>
                </>
              ) : (
                /* Step 2 */
                <>
                  <div style={{ background: "var(--red-lt)", border: "1px solid var(--red-lt2)", borderRadius: 6, padding: ".8rem 1rem", marginBottom: "1rem" }}>
                    <div style={{ fontWeight: 700, color: "var(--red)", fontSize: ".85rem", marginBottom: ".3rem" }}>🚨 Final Warning</div>
                    <div style={{ fontSize: ".8rem", color: "var(--red)" }}>
                      This will <strong>permanently delete</strong> the leave record for <strong>{userName(deleteTarget.userId)}</strong>. There is no way to recover it.
                    </div>
                  </div>
                  <div className="form-actions" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
                    <button className="btn btn-ghost" onClick={cancelDelete}>Cancel</button>
                    <button className="btn btn-danger" onClick={confirmDelete}><Icon n="del" size={14} />Delete Permanently</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {modal === "apply" && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal">
            <div className="modal-hdr">
              <div className="modal-title">Apply for Leave</div>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                {isHR && (
                  <div className="form-group full">
                    <label>Employee</label>
                    <select value={form.userId} onChange={e => setForm(p => ({ ...p, userId: e.target.value }))}>
                      {users.filter(u => u.active).map(u => <option key={u.id} value={u.id}>{u.name} — {u.dept}</option>)}
                    </select>
                  </div>
                )}
                <div className="form-group">
                  <label>Leave Type</label>
                  <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                    {["Annual","Sick","Casual","Maternity","Paternity","Unpaid"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group" />
                <div className="form-group">
                  <label>From Date</label>
                  <input type="date" value={form.from} onChange={e => setForm(p => ({ ...p, from: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input type="date" value={form.to} onChange={e => setForm(p => ({ ...p, to: e.target.value }))} />
                </div>
                <div className="form-group full">
                  <label>Reason *</label>
                  <textarea value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} placeholder="Please describe the reason for leave…" />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={apply}>Submit Application</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SALARY ───────────────────────────────────────────────────────────────────
function SalaryPage({ users, attendance, settings, loggedIn }) {
  const now = new Date();
  const [selY, setSelY] = useState(now.getFullYear());
  const [selM, setSelM] = useState(now.getMonth() + 1);
  const [selUser, setSelUser] = useState(null);

  const activeUsers = users.filter(u => u.active);
  const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - 2 + i);

  const workDays = settings?.workDays || [1,2,3,4,5,6];
  const calcSalary = (u) => {
    const days = daysInMonth(selY, selM);
    const workingDays = Array.from({ length: days }, (_, i) => i + 1).filter(d => !isOffDay(selY, selM, d, workDays)).length;
    let P = 0, A = 0, L = 0, H = 0, WO = 0;
    Array.from({ length: days }, (_, i) => i + 1).forEach(d => {
      const key = `${selY}-${String(selM).padStart(2, "0")}-${String(d).padStart(2, "0")}_${u.id}`;
      const v = attendance[key];
      if (v === "P") P++;
      else if (v === "A") A++;
      else if (v === "L") L++;
      else if (v === "H") H++;
      else if (isOffDay(selY, selM, d, workDays)) WO++;
    });

    const perDay = u.salary / workingDays;
    let deductions = 0;
    if (A > 0) deductions += A * perDay;
    // Per-employee override: "yes" always deduct, "no" never deduct, "global" use settings
    const override = u.deductLeaveOverride || "global";
    const shouldDeductLeave = override === "yes" ? true : override === "no" ? false : settings.deductLeave;
    if (shouldDeductLeave && L > 0) deductions += L * perDay;

    const netSalary = Math.max(0, u.salary - deductions);
    return { P, A, L, H, WO, workingDays, perDay, deductions, netSalary, gross: u.salary };
  };

  const printSlip = (u) => {
    const s = calcSalary(u);
    const w = window.open("", "_blank");
    w.document.write(generateSlipHTML(u, s, selY, selM, settings));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 500);
  };

  return (
    <div>
      <div className="page-hdr">
        <div>
          <div className="page-title">Salary Management</div>
          <div className="page-sub">{monthLabel(selY, selM)} · {activeUsers.length} employees</div>
        </div>
        <div className="flex gap-2">
          <select value={selM} onChange={e => setSelM(Number(e.target.value))} style={{ width: 130 }}>
            {Array.from({ length: 12 }, (_, i) => <option key={i} value={i + 1}>{new Date(2000, i).toLocaleString("default", { month: "long" })}</option>)}
          </select>
          <select value={selY} onChange={e => setSelY(Number(e.target.value))} style={{ width: 90 }}>
            {years.map(y => <option key={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <div className="tbl-wrap mb-3">
        <table>
          <thead>
            <tr><th>Employee</th><th>Dept</th><th>Gross Salary</th><th>Present</th><th>Absent</th><th>Leave</th><th>Deductions</th><th>Net Salary</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {activeUsers.map(u => {
              const s = calcSalary(u);
              return (
                <tr key={u.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar av-sm" style={{ background: avatarColor(u.id) }}>{initials(u.name)}</div>
                      <div style={{ fontWeight: 600 }}>{u.name}</div>
                    </div>
                  </td>
                  <td>{u.dept}</td>
                  <td className="font-mono">{fmtCurrency(s.gross)}</td>
                  <td><span className="badge badge-green">{s.P}</span></td>
                  <td><span className="badge badge-red">{s.A}</span></td>
                  <td><span className="badge badge-orange">{s.L}</span></td>
                  <td className="font-mono" style={{ color: s.deductions > 0 ? "var(--red)" : "var(--green)" }}>
                    {s.deductions > 0 ? `- ${fmtCurrency(s.deductions)}` : "—"}
                  </td>
                  <td className="font-mono font-bold">{fmtCurrency(s.netSalary)}</td>
                  <td>
                    <div className="tbl-actions">
                      <button className="btn btn-ghost btn-xs" onClick={() => setSelUser(u)}><Icon n="eye" size={12} />View</button>
                      <button className="btn btn-primary btn-xs" onClick={() => printSlip(u)}><Icon n="print" size={12} />Slip</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selUser && (() => {
        const s = calcSalary(selUser);
        return (
          <div className="overlay" onClick={e => e.target === e.currentTarget && setSelUser(null)}>
            <div className="modal">
              <div className="modal-hdr">
                <div>
                  <div className="modal-title">Salary Detail — {selUser.name}</div>
                  <div className="modal-sub">{monthLabel(selY, selM)}</div>
                </div>
                <button className="modal-close" onClick={() => setSelUser(null)}>✕</button>
              </div>
              <div className="modal-body">
                <div className="salary-card">
                  <div className="sal-hdr">
                    <div>
                      <div className="sal-emp-name">{selUser.name}</div>
                      <div className="sal-month">{selUser.dept} · {selUser.role} · {monthLabel(selY, selM)}</div>
                    </div>
                    <div>
                      <div className="sal-gross">{fmtCurrency(s.netSalary)}</div>
                      <div style={{ color: "rgba(255,255,255,.5)", fontSize: ".72rem", textAlign: "right" }}>Net Payable</div>
                    </div>
                  </div>
                  <div className="sal-body">
                    <div className="sal-row"><span>Gross Salary</span><span className="font-mono">{fmtCurrency(s.gross)}</span></div>
                    <div className="sal-row"><span>Working Days in Month</span><span>{s.workingDays}</span></div>
                    <div className="sal-row"><span>Per Day Rate</span><span className="font-mono">{fmtCurrency(Math.round(s.perDay))}</span></div>
                    <div className="sal-row"><span>Days Present</span><span className="badge badge-green">{s.P}</span></div>
                    <div className="sal-row"><span>Days Absent</span><span className="badge badge-red">{s.A}</span></div>
                    <div className="sal-row"><span>Days on Leave</span><span className="badge badge-orange">{s.L}</span></div>
                    <div className="sal-row"><span>Holidays / Weekend</span><span>{s.H + s.WO}</span></div>
                    {s.A > 0 && <div className="sal-row"><span className="sal-deduct">Absent Deduction ({s.A} days)</span><span className="sal-deduct font-mono">- {fmtCurrency(Math.round(s.A * s.perDay))}</span></div>}
                    {(() => {
                      const override = selUser.deductLeaveOverride || "global";
                      const shouldDeduct = override === "yes" ? true : override === "no" ? false : settings.deductLeave;
                      if (s.L > 0 && shouldDeduct) return <div className="sal-row"><span className="sal-deduct">Leave Deduction ({s.L} days)</span><span className="sal-deduct font-mono">- {fmtCurrency(Math.round(s.L * s.perDay))}</span></div>;
                      if (s.L > 0 && !shouldDeduct) return <div className="sal-row"><span style={{ color: "var(--green)" }}>Leave ({s.L} days — Paid)</span><span className="badge badge-green">No Deduction</span></div>;
                      return null;
                    })()}
                    <div className="sal-row"><span>Net Payable Salary</span><span className="font-mono" style={{ fontSize: "1.1rem", color: "var(--green)" }}>{fmtCurrency(s.netSalary)}</span></div>
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn btn-ghost" onClick={() => setSelUser(null)}>Close</button>
                  <button className="btn btn-primary" onClick={() => printSlip(selUser)}><Icon n="print" size={14} />Print Salary Slip</button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─── REPORTS PAGE ─────────────────────────────────────────────────────────────
function ReportsPage({ users, attendance, leaves, settings, loggedIn }) {
  const now = new Date();
  const [selY, setSelY] = useState(now.getFullYear());
  const [selM, setSelM] = useState(now.getMonth() + 1);
  const [tab, setTab] = useState("individual");
  const [selUser, setSelUser] = useState(users.find(u => u.active)?.id || "");
  const [selDept, setSelDept] = useState("All");
  const [deductLeave, setDeductLeave] = useState(settings.deductLeave);
  const activeUsers = users.filter(u => u.active);
  const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - 2 + i);

  const workDays = settings?.workDays || [1,2,3,4,5,6];
  const calcSalary = (u) => {
    const days = daysInMonth(selY, selM);
    const workingDays = Array.from({ length: days }, (_, i) => i + 1).filter(d => !isOffDay(selY, selM, d, workDays)).length;
    let P = 0, A = 0, L = 0, H = 0;
    Array.from({ length: days }, (_, i) => i + 1).forEach(d => {
      const key = `${selY}-${String(selM).padStart(2, "0")}-${String(d).padStart(2, "0")}_${u.id}`;
      const v = attendance[key];
      if (v === "P") P++;
      else if (v === "A") A++;
      else if (v === "L") L++;
      else if (v === "H") H++;
    });
    const perDay = u.salary / workingDays;
    let deductions = A * perDay;
    const override = u.deductLeaveOverride || "global";
    const shouldDeductLeave = override === "yes" ? true : override === "no" ? false : deductLeave;
    if (shouldDeductLeave && L > 0) deductions += L * perDay;
    return { P, A, L, H, workingDays, perDay, deductions, netSalary: Math.max(0, u.salary - deductions), gross: u.salary };
  };

  const printIndividual = () => {
    const u = users.find(x => x.id === selUser);
    if (!u) return;
    const s = calcSalary(u);
    const days = daysInMonth(selY, selM);
    const cols = Array.from({ length: days }, (_, i) => i + 1);
    const getStatus = (d) => {
      const key = `${selY}-${String(selM).padStart(2, "0")}-${String(d).padStart(2, "0")}_${u.id}`;
      return attendance[key] || (isOffDay(selY, selM, d, workDays) ? "WO" : "");
    };
    const w = window.open("", "_blank");
    w.document.write(generateIndividualReportHTML(u, s, selY, selM, cols, getStatus, settings, deductLeave));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 500);
  };

  const printGroup = () => {
    const grpUsers = activeUsers.filter(u => selDept === "All" || u.dept === selDept);
    const days = daysInMonth(selY, selM);
    const cols = Array.from({ length: days }, (_, i) => i + 1);
    const getStatus = (uid, d) => {
      const key = `${selY}-${String(selM).padStart(2, "0")}-${String(d).padStart(2, "0")}_${uid}`;
      return attendance[key] || (isOffDay(selY, selM, d, workDays) ? "WO" : "");
    };
    const w = window.open("", "_blank");
    w.document.write(generateGroupReportHTML(grpUsers, selY, selM, cols, getStatus, calcSalary, settings, selDept, deductLeave));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 500);
  };

  const printSummary = () => {
    const grpUsers = activeUsers.filter(u => selDept === "All" || u.dept === selDept);
    const w = window.open("", "_blank");
    w.document.write(generateSummaryReportHTML(grpUsers, selY, selM, calcSalary, settings, selDept, deductLeave));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 500);
  };

  const u = users.find(x => x.id === selUser);
  const sel_s = u ? calcSalary(u) : null;

  return (
    <div>
      <div className="page-hdr">
        <div className="page-title">Reports & Exports</div>
        <div className="flex gap-2">
          <select value={selM} onChange={e => setSelM(Number(e.target.value))} style={{ width: 130 }}>
            {Array.from({ length: 12 }, (_, i) => <option key={i} value={i + 1}>{new Date(2000, i).toLocaleString("default", { month: "long" })}</option>)}
          </select>
          <select value={selY} onChange={e => setSelY(Number(e.target.value))} style={{ width: 90 }}>
            {years.map(y => <option key={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-hdr"><div className="card-title">⚙️ Report Settings</div></div>
        <div className="flex items-center gap-3">
          <div className="toggle" onClick={() => setDeductLeave(!deductLeave)}>
            <div className={`toggle-track ${deductLeave ? "on" : ""}`}><div className="toggle-thumb" /></div>
            <span className="toggle-label">Deduct Leave from Salary</span>
          </div>
          <div className="text-xs text-muted">When ON, approved leave days are deducted from salary calculation in reports</div>
        </div>
      </div>

      <div className="tabs">
        <div className={`tab${tab === "individual" ? " active" : ""}`} onClick={() => setTab("individual")}>Individual Report</div>
        <div className={`tab${tab === "group" ? " active" : ""}`} onClick={() => setTab("group")}>Group Report</div>
        <div className={`tab${tab === "summary" ? " active" : ""}`} onClick={() => setTab("summary")}>Salary Summary</div>
      </div>

      {tab === "individual" && (
        <div>
          <div className="card mb-3">
            <div className="card-hdr">
              <div className="card-title">Individual Attendance & Salary Report</div>
              <div className="flex gap-2">
                <select value={selUser} onChange={e => setSelUser(e.target.value)} style={{ width: 220 }}>
                  {activeUsers.map(u => <option key={u.id} value={u.id}>{u.name} — {u.dept}</option>)}
                </select>
                <button className="btn btn-primary btn-sm" onClick={printIndividual}><Icon n="print" size={14} />Print / Export PDF</button>
              </div>
            </div>
            {u && sel_s && (
              <div className="grid-2 mt-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="avatar av-lg" style={{ background: avatarColor(u.id) }}>{initials(u.name)}</div>
                    <div>
                      <div className="font-bold">{u.name}</div>
                      <div className="text-xs text-muted">{u.dept} · {u.role}</div>
                      <div className="text-xs text-muted">Joined: {u.joinDate}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {[["P","Present","badge-green"],[u.A||sel_s.A,"A","Absent","badge-red"],[sel_s.L,"L","Leave","badge-orange"],[sel_s.H,"H","Holiday","badge-purple"]].map((x, i) => {
                      const val = i === 0 ? sel_s.P : i === 1 ? sel_s.A : i === 2 ? sel_s.L : sel_s.H;
                      const lbl = i === 0 ? "Present" : i === 1 ? "Absent" : i === 2 ? "Leave" : "Holiday";
                      const cls = i === 0 ? "badge-green" : i === 1 ? "badge-red" : i === 2 ? "badge-orange" : "badge-purple";
                      return <span key={i} className={`badge ${cls}`}>{lbl}: {val}</span>;
                    })}
                  </div>
                </div>
                <div className="salary-card">
                  <div className="sal-hdr" style={{ padding: ".9rem 1.1rem" }}>
                    <div>
                      <div style={{ color: "rgba(255,255,255,.6)", fontSize: ".73rem" }}>Net Salary</div>
                      <div className="sal-gross" style={{ fontSize: "1.2rem" }}>{fmtCurrency(sel_s.netSalary)}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "rgba(255,255,255,.5)", fontSize: ".7rem" }}>Gross: {fmtCurrency(sel_s.gross)}</div>
                      <div style={{ color: "var(--red2)", fontSize: ".7rem" }}>Deductions: {fmtCurrency(Math.round(sel_s.deductions))}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "group" && (
        <div>
          <div className="card mb-3">
            <div className="card-hdr">
              <div className="card-title">Group Attendance Report</div>
              <div className="flex gap-2">
                <select value={selDept} onChange={e => setSelDept(e.target.value)} style={{ width: 180 }}>
                  <option value="All">All Departments</option>
                  {DEPTS.map(d => <option key={d}>{d}</option>)}
                </select>
                <button className="btn btn-primary btn-sm" onClick={printGroup}><Icon n="print" size={14} />Print Group Report</button>
              </div>
            </div>
            <div className="info-box">
              📊 This will generate a full attendance matrix for {selDept === "All" ? "all departments" : selDept} for {monthLabel(selY, selM)}. Each row is an employee, each column is a day.
            </div>
          </div>

          <div className="tbl-wrap">
            <table>
              <thead>
                <tr><th>Employee</th><th>Dept</th><th>P</th><th>A</th><th>L</th><th>H</th><th>Net Salary</th></tr>
              </thead>
              <tbody>
                {activeUsers.filter(u => selDept === "All" || u.dept === selDept).map(u => {
                  const s = calcSalary(u);
                  return (
                    <tr key={u.id}>
                      <td style={{ fontWeight: 600 }}>{u.name}</td>
                      <td>{u.dept}</td>
                      <td><span className="badge badge-green">{s.P}</span></td>
                      <td><span className="badge badge-red">{s.A}</span></td>
                      <td><span className="badge badge-orange">{s.L}</span></td>
                      <td><span className="badge badge-purple">{s.H}</span></td>
                      <td className="font-mono font-bold">{fmtCurrency(s.netSalary)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "summary" && (
        <div>
          <div className="card mb-3">
            <div className="card-hdr">
              <div className="card-title">Salary Summary Report</div>
              <div className="flex gap-2">
                <select value={selDept} onChange={e => setSelDept(e.target.value)} style={{ width: 180 }}>
                  <option value="All">All Departments</option>
                  {DEPTS.map(d => <option key={d}>{d}</option>)}
                </select>
                <button className="btn btn-primary btn-sm" onClick={printSummary}><Icon n="print" size={14} />Print Summary</button>
              </div>
            </div>
          </div>

          {(() => {
            const grpUsers = activeUsers.filter(u => selDept === "All" || u.dept === selDept);
            const totalGross = grpUsers.reduce((s, u) => s + calcSalary(u).gross, 0);
            const totalDeduct = grpUsers.reduce((s, u) => s + calcSalary(u).deductions, 0);
            const totalNet = grpUsers.reduce((s, u) => s + calcSalary(u).netSalary, 0);
            return (
              <>
                <div className="stat-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                  <div className="stat-card">
                    <div className="stat-icon" style={{ background: "var(--blue-lt)" }}><Icon n="salary" size={20} col="var(--blue)" /></div>
                    <div><div className="stat-num">{fmtCurrency(totalGross)}</div><div className="stat-lbl">Total Gross</div></div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon" style={{ background: "var(--red-lt)" }}><Icon n="info" size={20} col="var(--red)" /></div>
                    <div><div className="stat-num">{fmtCurrency(Math.round(totalDeduct))}</div><div className="stat-lbl">Total Deductions</div></div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon" style={{ background: "var(--green-lt)" }}><Icon n="mark" size={20} col="var(--green)" /></div>
                    <div><div className="stat-num">{fmtCurrency(Math.round(totalNet))}</div><div className="stat-lbl">Total Net Payable</div></div>
                  </div>
                </div>
                <div className="tbl-wrap">
                  <table>
                    <thead><tr><th>#</th><th>Employee</th><th>Department</th><th>Gross</th><th>Present Days</th><th>Absent Days</th><th>Deductions</th><th>Net Payable</th></tr></thead>
                    <tbody>
                      {grpUsers.map((u, i) => {
                        const s = calcSalary(u);
                        return (
                          <tr key={u.id}>
                            <td className="text-muted">{i + 1}</td>
                            <td>
                              <div className="flex items-center gap-2">
                                <div className="avatar av-sm" style={{ background: avatarColor(u.id) }}>{initials(u.name)}</div>
                                <div style={{ fontWeight: 600 }}>{u.name}</div>
                              </div>
                            </td>
                            <td>{u.dept}</td>
                            <td className="font-mono">{fmtCurrency(s.gross)}</td>
                            <td><span className="badge badge-green">{s.P}</span></td>
                            <td><span className="badge badge-red">{s.A}</span></td>
                            <td className="font-mono" style={{ color: s.deductions > 0 ? "var(--red)" : "inherit" }}>{s.deductions > 0 ? `- ${fmtCurrency(Math.round(s.deductions))}` : "—"}</td>
                            <td className="font-mono font-bold">{fmtCurrency(s.netSalary)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

// ─── SETTINGS PAGE ────────────────────────────────────────────────────────────
function SettingsPage({ settings, setSettings }) {
  const [form, setForm] = useState({ ...settings });
  useEffect(() => { setForm({ ...settings }); }, [settings]);
  const save = () => { const saved = { ...form }; setSettings(saved); showToast("Settings saved successfully", "ok"); };

  return (
    <div>
      <div className="page-hdr"><div className="page-title">System Settings</div></div>
      <div className="grid-2">
        <div className="card">
          <div className="card-hdr"><div className="card-title">Company Information</div></div>
          <div className="form-group">
            <label>Company Name</label>
            <input value={form.companyName} onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))} />
          </div>
        </div>

        <div className="card">
          <div className="card-hdr"><div className="card-title">Working Days</div><div className="card-sub">Select which days employees are required to work</div></div>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: ".8rem" }}>
            {[
              { d: 1, label: "Mon" }, { d: 2, label: "Tue" }, { d: 3, label: "Wed" },
              { d: 4, label: "Thu" }, { d: 5, label: "Fri" }, { d: 6, label: "Sat" }, { d: 0, label: "Sun" }
            ].map(({ d, label }) => {
              const active = (form.workDays || [1,2,3,4,5,6]).includes(d);
              return (
                <button key={d} onClick={() => {
                  const cur = form.workDays || [1,2,3,4,5,6];
                  const next = active ? cur.filter(x => x !== d) : [...cur, d];
                  if (next.length === 0) return showToast("At least one working day required", "err");
                  setForm(p => ({ ...p, workDays: next }));
                }} style={{
                  padding: ".45rem .9rem", borderRadius: 6, border: "2px solid",
                  borderColor: active ? "var(--blue)" : "var(--border2)",
                  background: active ? "var(--blue)" : "var(--white)",
                  color: active ? "#fff" : "var(--text3)",
                  fontWeight: 700, fontSize: ".8rem", cursor: "pointer", transition: "all .15s",
                  fontFamily: "inherit"
                }}>
                  {label}
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <div style={{ fontSize: ".72rem", color: "var(--text3)", marginBottom: ".5rem" }}>Quick presets:</div>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              {[
                { label: "Mon – Fri (5 days)", days: [1,2,3,4,5] },
                { label: "Mon – Sat (6 days)", days: [1,2,3,4,5,6] },
                { label: "All 7 days", days: [0,1,2,3,4,5,6] },
              ].map(({ label, days }) => (
                <button key={label} onClick={() => setForm(p => ({ ...p, workDays: days }))}
                  style={{ padding: ".3rem .75rem", borderRadius: 5, border: "1px solid var(--border2)", background: "var(--bg)", color: "var(--text2)", fontSize: ".75rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="info-box" style={{ marginTop: ".8rem" }}>
            📅 <strong>{(form.workDays || [1,2,3,4,5,6]).length} working days/week</strong> — Off days show as <strong>WO</strong> in attendance and are excluded from salary calculation.
          </div>
        </div>

        <div className="card">
          <div className="card-hdr"><div className="card-title">Salary & Attendance Policy</div></div>
          <div className="flex flex-col gap-3">
            <div className="toggle" onClick={() => setForm(p => ({ ...p, deductLeave: !p.deductLeave }))}>
              <div className={`toggle-track ${form.deductLeave ? "on" : ""}`}><div className="toggle-thumb" /></div>
              <span className="toggle-label">Deduct salary on approved leave</span>
            </div>
            <div className="toggle" onClick={() => setForm(p => ({ ...p, weekOffPaid: !p.weekOffPaid }))}>
              <div className={`toggle-track ${form.weekOffPaid ? "on" : ""}`}><div className="toggle-thumb" /></div>
              <span className="toggle-label">Weekend Off considered paid</span>
            </div>
            <div className="toggle" onClick={() => setForm(p => ({ ...p, holidayPaid: !p.holidayPaid }))}>
              <div className={`toggle-track ${form.holidayPaid ? "on" : ""}`}><div className="toggle-thumb" /></div>
              <span className="toggle-label">Public Holidays considered paid</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-hdr"><div className="card-title">Role Access Control</div><div className="card-sub">Permissions granted to each system role</div></div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
            {ROLES.map(r => (
              <div key={r} style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ background: r === "Super Admin" ? "var(--purple-lt)" : r === "HR Manager" ? "var(--blue-lt)" : r === "Supervisor" ? "var(--gold-lt)" : "var(--bg2)", padding: ".55rem 1rem", display: "flex", alignItems: "center", gap: ".6rem", borderBottom: "1px solid var(--border)" }}>
                  <span className={`badge ${r === "Super Admin" ? "badge-purple" : r === "HR Manager" ? "badge-blue" : r === "Supervisor" ? "badge-gold" : "badge-gray"}`}>{r}</span>
                  <span style={{ fontSize: ".72rem", color: "var(--text3)" }}>{(PERMS[r] || []).length} permissions</span>
                </div>
                <div style={{ padding: ".6rem 1rem", display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                  {(PERMS[r] || []).map(p => {
                    const info = PERM_LABELS[p] || { label: p, color: "badge-gray" };
                    return <span key={p} className={`badge ${info.color}`}>{info.label}</span>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-3">
        <button className="btn btn-primary" onClick={save}>Save Settings</button>
      </div>
    </div>
  );
}

// ─── PRINT HTML GENERATORS ────────────────────────────────────────────────────
function generateSlipHTML(u, s, y, m, settings) {
  const override = u.deductLeaveOverride || "global";
  const shouldDeductLeave = override === "yes" ? true : override === "no" ? false : settings.deductLeave;
  return `<!DOCTYPE html><html><head><title>Salary Slip - ${u.name}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;background:#fff;padding:0}
.slip{max-width:700px;margin:0 auto;padding:30px}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #0d1b2e;padding-bottom:15px;margin-bottom:20px}
.co{font-size:22px;font-weight:800;color:#0d1b2e}
.slip-title{text-align:right;font-size:13px;color:#64748b}
.slip-title strong{display:block;font-size:16px;color:#0d1b2e;font-weight:700}
.emp-hdr{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:15px;display:flex;justify-content:space-between;margin-bottom:20px}
.emp-info{font-size:13px}
.emp-name{font-size:17px;font-weight:700;margin-bottom:5px}
.ep{color:#64748b;margin-bottom:3px}
.net-box{text-align:right}
.net-lbl{font-size:12px;color:#64748b}
.net-amt{font-size:24px;font-weight:800;color:#059669;font-family:'Courier New',monospace}
table{width:100%;border-collapse:collapse;margin-bottom:15px}
th{background:#0d1b2e;color:#fff;padding:8px 12px;text-align:left;font-size:12px;letter-spacing:.05em}
td{padding:9px 12px;border-bottom:1px solid #f1f5f9;font-size:13px}
tr:last-child td{border-bottom:none}
.deduct{color:#dc2626;font-weight:600}
.total-row td{border-top:2px solid #0d1b2e;font-weight:700;font-size:14px;background:#f0fdf4}
.footer{margin-top:30px;display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:12px}
.sig-box{margin-top:40px;display:flex;justify-content:space-between}
.sig{text-align:center;width:180px}
.sig-line{border-top:1px solid #94a3b8;padding-top:6px;font-size:12px;color:#64748b}
@media print{body{padding:0}.slip{padding:15px}}
</style></head><body>
<div class="slip">
<div class="hdr">
  <div style="display:flex;align-items:center;gap:12px">
    <img src="${LOGO_B64}" alt="Logo" style="width:60px;height:60px;object-fit:contain" />
    <div>
      <div class="co">${settings.companyName}</div>
      <div style="font-size:13px;color:#64748b;margin-top:3px">Human Resource Department</div>
    </div>
  </div>
  <div class="slip-title"><strong>SALARY SLIP</strong>${new Date(y, m - 1).toLocaleString("default", { month: "long", year: "numeric" })}</div>
</div>
<div class="emp-hdr">
  <div class="emp-info">
    <div class="emp-name">${u.name}</div>
    <div class="ep">Department: ${u.dept}</div>
    <div class="ep">Designation: ${u.role}</div>
    <div class="ep">Joined: ${u.joinDate}</div>
    <div class="ep">Email: ${u.email}</div>
  </div>
  <div class="net-box">
    <div class="net-lbl">NET PAYABLE</div>
    <div class="net-amt">${fmtCurrency(s.netSalary)}</div>
    <div style="font-size:11px;color:#64748b;margin-top:4px">For ${new Date(y, m - 1).toLocaleString("default", { month: "long", year: "numeric" })}</div>
  </div>
</div>
<table>
  <thead><tr><th>Earnings</th><th style="text-align:right">Amount</th></tr></thead>
  <tbody>
    <tr><td>Basic / Gross Salary</td><td style="text-align:right;font-family:'Courier New',monospace">${fmtCurrency(s.gross)}</td></tr>
  </tbody>
</table>
<table>
  <thead><tr><th>Attendance Summary</th><th style="text-align:right">Days</th></tr></thead>
  <tbody>
    <tr><td>Working Days in Month</td><td style="text-align:right">${s.workingDays}</td></tr>
    <tr><td>Days Present</td><td style="text-align:right">${s.P}</td></tr>
    <tr><td>Days Absent</td><td style="text-align:right">${s.A}</td></tr>
    <tr><td>Days on Leave</td><td style="text-align:right">${s.L}</td></tr>
    <tr><td>Per Day Rate</td><td style="text-align:right;font-family:'Courier New',monospace">${fmtCurrency(Math.round(s.perDay))}</td></tr>
  </tbody>
</table>
<table>
  <thead><tr><th>Deductions</th><th style="text-align:right">Amount</th></tr></thead>
  <tbody>
    ${s.A > 0 ? `<tr><td class="deduct">Absent Deduction (${s.A} days × ${fmtCurrency(Math.round(s.perDay))})</td><td style="text-align:right;font-family:'Courier New',monospace" class="deduct">- ${fmtCurrency(Math.round(s.A * s.perDay))}</td></tr>` : ""}
    ${shouldDeductLeave && s.L > 0 ? `<tr><td class="deduct">Leave Deduction (${s.L} days × ${fmtCurrency(Math.round(s.perDay))})</td><td style="text-align:right;font-family:'Courier New',monospace" class="deduct">- ${fmtCurrency(Math.round(s.L * s.perDay))}</td></tr>` : ""}
    ${!shouldDeductLeave && s.L > 0 ? `<tr><td style="color:#059669">Leave (${s.L} days — Paid, No Deduction)</td><td style="text-align:right;color:#059669">—</td></tr>` : ""}
    ${s.deductions === 0 ? `<tr><td style="color:#059669">No deductions</td><td style="text-align:right;color:#059669">—</td></tr>` : ""}
    <tr class="total-row"><td>NET PAYABLE SALARY</td><td style="text-align:right;font-family:'Courier New',monospace;color:#059669;font-size:16px">${fmtCurrency(s.netSalary)}</td></tr>
  </tbody>
</table>
<div class="sig-box">
  <div class="sig"><div class="sig-line">Employee Signature</div></div>
  <div class="sig"><div class="sig-line">HR Manager Signature</div></div>
  <div class="sig"><div class="sig-line">Director Signature</div></div>
</div>
<div class="footer">
  <span>Generated: ${new Date().toLocaleString()}</span>
  <span>${settings.companyName} — Confidential Document</span>
</div>
</div></body></html>`;
}

function generateIndividualReportHTML(u, s, y, m, cols, getStatus, settings, deductLeave) {
  const override = u.deductLeaveOverride || "global";
  const shouldDeductLeave = override === "yes" ? true : override === "no" ? false : deductLeave;
  const statusColor = { P: "#dcfce7", A: "#fee2e2", L: "#fef3c7", H: "#ede9fe", WO: "#f1f5f9", "": "#fff" };
  const statusTextColor = { P: "#15803d", A: "#b91c1c", L: "#b45309", H: "#6d28d9", WO: "#94a3b8", "": "#ccc" };
  const rows = cols.map(d => {
    const st = getStatus(d);
    return `<td style="background:${statusColor[st]||"#fff"};color:${statusTextColor[st]||"#ccc"};font-weight:${st&&st!=="WO"?"700":"400"};text-align:center;padding:4px 3px;border:1px solid #e2e8f0;font-size:10px">${st || "·"}</td>`;
  }).join("");

  return `<!DOCTYPE html><html><head><title>Attendance Report - ${u.name}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;padding:20px;font-size:12px}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #0d1b2e;padding-bottom:12px;margin-bottom:16px}
.co{font-size:20px;font-weight:800;color:#0d1b2e}
h2{font-size:15px;color:#0d1b2e;text-align:right}
.emp-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px;margin-bottom:14px;display:flex;justify-content:space-between}
table{width:100%;border-collapse:collapse;margin-bottom:12px;font-size:10px}
th{background:#0d1b2e;color:#fff;padding:5px 4px;text-align:center}
th:first-child{text-align:left;min-width:140px}
td:first-child{font-weight:600;padding:5px 6px;border:1px solid #e2e8f0;font-size:11px}
.sum-tbl td{padding:7px 10px;border:none;border-bottom:1px solid #f1f5f9;font-size:12px}
.sum-tbl .total{font-weight:700;background:#f0fdf4;border-top:2px solid #0d1b2e}
.footer{margin-top:20px;font-size:10px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:8px;display:flex;justify-content:space-between}
</style></head><body>
<div class="hdr">
  <div style="display:flex;align-items:center;gap:10px">
    <img src="${LOGO_B64}" alt="Logo" style="width:52px;height:52px;object-fit:contain" />
    <div><div class="co">${settings.companyName}</div><div style="color:#64748b">Individual Attendance & Salary Report</div></div>
  </div>
  <div><h2>${new Date(y, m - 1).toLocaleString("default", { month: "long", year: "numeric" })}</h2></div>
</div>
<div class="emp-box">
  <div>
    <div style="font-size:16px;font-weight:700">${u.name}</div>
    <div style="color:#64748b;margin-top:3px">${u.dept} · ${u.role} · Joined: ${u.joinDate}</div>
  </div>
  <div style="text-align:right">
    <div style="font-size:12px;color:#64748b">Net Payable Salary</div>
    <div style="font-size:22px;font-weight:800;color:#059669;font-family:'Courier New',monospace">${fmtCurrency(s.netSalary)}</div>
    <div style="font-size:11px;color:#94a3b8">Gross: ${fmtCurrency(s.gross)} | Deductions: ${fmtCurrency(Math.round(s.deductions))}</div>
  </div>
</div>
<div style="font-weight:700;margin-bottom:6px;font-size:12px">ATTENDANCE CALENDAR</div>
<table>
  <thead>
    <tr>
      <th style="text-align:left">Employee</th>
      ${cols.map(d => `<th style="${isOffDay(y, m, d, settings.workDays) ? "background:#374151" : ""}">${d}<br/><span style="font-size:7px;opacity:.7">${dayName(y, m, d)}</span></th>`).join("")}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${u.name}<br/><span style="font-size:9px;color:#64748b">${u.dept}</span></td>
      ${rows}
    </tr>
  </tbody>
</table>
<div style="display:flex;gap:16px">
  <div style="flex:1">
    <div style="font-weight:700;margin-bottom:6px;font-size:12px">ATTENDANCE SUMMARY</div>
    <table class="sum-tbl">
      <tr><td>Working Days</td><td style="text-align:right;font-weight:600">${s.workingDays}</td></tr>
      <tr><td>Days Present</td><td style="text-align:right;color:#15803d;font-weight:600">${s.P}</td></tr>
      <tr><td>Days Absent</td><td style="text-align:right;color:#b91c1c;font-weight:600">${s.A}</td></tr>
      <tr><td>Days on Leave</td><td style="text-align:right;color:#b45309;font-weight:600">${s.L}</td></tr>
      <tr><td>Holidays</td><td style="text-align:right;color:#6d28d9;font-weight:600">${s.H}</td></tr>
    </table>
  </div>
  <div style="flex:1">
    <div style="font-weight:700;margin-bottom:6px;font-size:12px">SALARY BREAKDOWN</div>
    <table class="sum-tbl">
      <tr><td>Gross Salary</td><td style="text-align:right;font-family:'Courier New',monospace">${fmtCurrency(s.gross)}</td></tr>
      <tr><td>Per Day Rate</td><td style="text-align:right;font-family:'Courier New',monospace">${fmtCurrency(Math.round(s.perDay))}</td></tr>
      ${s.A > 0 ? `<tr><td style="color:#b91c1c">Absent Deduction (${s.A}d)</td><td style="text-align:right;color:#b91c1c;font-family:'Courier New',monospace">- ${fmtCurrency(Math.round(s.A * s.perDay))}</td></tr>` : ""}
      ${shouldDeductLeave && s.L > 0 ? `<tr><td style="color:#b45309">Leave Deduction (${s.L}d)</td><td style="text-align:right;color:#b45309;font-family:'Courier New',monospace">- ${fmtCurrency(Math.round(s.L * s.perDay))}</td></tr>` : ""}
      ${!shouldDeductLeave && s.L > 0 ? `<tr><td style="color:#059669">Leave (${s.L}d — Paid)</td><td style="text-align:right;color:#059669">—</td></tr>` : ""}
      <tr class="total"><td>NET PAYABLE</td><td style="text-align:right;color:#059669;font-family:'Courier New',monospace;font-size:14px">${fmtCurrency(s.netSalary)}</td></tr>
    </table>
  </div>
</div>
<div style="margin-top:25px;display:flex;justify-content:space-between">
  ${["Employee Signature","HR Manager","Authorized Signatory"].map(l => `<div style="text-align:center;width:160px"><div style="border-top:1px solid #94a3b8;padding-top:5px;font-size:10px;color:#64748b">${l}</div></div>`).join("")}
</div>
<div class="footer"><span>Generated: ${new Date().toLocaleString()}</span><span>CONFIDENTIAL — ${settings.companyName}</span></div>
</body></html>`;
}

function generateGroupReportHTML(grpUsers, y, m, cols, getStatus, calcSalary, settings, dept, deductLeave) {
  const statusColor = { P: "#dcfce7", A: "#fee2e2", L: "#fef3c7", H: "#ede9fe", WO: "#f1f5f9", "": "#fff" };
  const statusTextColor = { P: "#15803d", A: "#b91c1c", L: "#b45309", H: "#6d28d9", WO: "#94a3b8", "": "#ccc" };

  const rows = grpUsers.map(u => {
    const s = calcSalary(u);
    const cells = cols.map(d => {
      const st = getStatus(u.id, d);
      return `<td style="background:${statusColor[st]||"#fff"};color:${statusTextColor[st]||"#ccc"};font-weight:${st&&st!=="WO"?"700":"400"};text-align:center;padding:3px 2px;border:1px solid #e2e8f0;font-size:9px">${st || "·"}</td>`;
    }).join("");
    return `<tr>
      <td style="font-weight:600;padding:5px 6px;border:1px solid #e2e8f0;white-space:nowrap;font-size:10px">${u.name}<br/><span style="font-size:8px;color:#64748b">${u.dept}</span></td>
      ${cells}
      <td style="text-align:center;background:#dcfce7;color:#15803d;font-weight:700;font-size:10px;border:1px solid #e2e8f0">${s.P}</td>
      <td style="text-align:center;background:#fee2e2;color:#b91c1c;font-weight:700;font-size:10px;border:1px solid #e2e8f0">${s.A}</td>
      <td style="text-align:center;font-family:'Courier New',monospace;font-size:10px;font-weight:700;border:1px solid #e2e8f0">${fmtCurrency(s.netSalary)}</td>
    </tr>`;
  }).join("");

  return `<!DOCTYPE html><html><head><title>Group Report</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;padding:15px;font-size:11px}
.hdr{display:flex;justify-content:space-between;border-bottom:3px solid #0d1b2e;padding-bottom:10px;margin-bottom:12px}
.co{font-size:18px;font-weight:800;color:#0d1b2e}
table{width:100%;border-collapse:collapse;font-size:9px}
th{background:#0d1b2e;color:#fff;padding:4px 3px;text-align:center;white-space:nowrap}
th:first-child{text-align:left;min-width:120px}
.footer{margin-top:15px;font-size:9px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:8px;display:flex;justify-content:space-between}
@page{size:A3 landscape;margin:10mm}
</style></head><body>
<div class="hdr">
  <div style="display:flex;align-items:center;gap:10px">
    <img src="${LOGO_B64}" alt="Logo" style="width:46px;height:46px;object-fit:contain" />
    <div><div class="co">${settings.companyName}</div><div style="color:#64748b">Group Attendance Report · ${dept === "All" ? "All Departments" : dept}</div></div>
  </div>
  <div style="text-align:right"><div style="font-size:14px;font-weight:700">${new Date(y, m - 1).toLocaleString("default", { month: "long", year: "numeric" })}</div><div style="color:#64748b;font-size:10px">Total: ${grpUsers.length} employees</div></div>
</div>
<table>
  <thead>
    <tr>
      <th style="text-align:left">Employee / Dept</th>
      ${cols.map(d => `<th style="${isOffDay(y, m, d, settings.workDays) ? "background:#374151" : ""}">${d}<br/><span style="font-size:6px">${dayName(y, m, d)}</span></th>`).join("")}
      <th style="background:#065f46">P</th><th style="background:#991b1b">A</th><th>Net Salary</th>
    </tr>
  </thead>
  <tbody>${rows}</tbody>
</table>
<div class="footer"><span>Generated: ${new Date().toLocaleString()}</span><span>CONFIDENTIAL — ${settings.companyName}</span></div>
</body></html>`;
}

function generateSummaryReportHTML(grpUsers, y, m, calcSalary, settings, dept, deductLeave) {
  const totalGross = grpUsers.reduce((s, u) => s + calcSalary(u).gross, 0);
  const totalNet = grpUsers.reduce((s, u) => s + calcSalary(u).netSalary, 0);
  const totalDeduct = grpUsers.reduce((s, u) => s + calcSalary(u).deductions, 0);

  const rows = grpUsers.map((u, i) => {
    const s = calcSalary(u);
    return `<tr style="${i % 2 === 0 ? "" : "background:#f8fafc"}">
      <td style="padding:7px 10px">${i + 1}</td>
      <td style="padding:7px 10px;font-weight:600">${u.name}</td>
      <td style="padding:7px 10px">${u.dept}</td>
      <td style="padding:7px 10px">${u.role}</td>
      <td style="padding:7px 10px;text-align:center;background:#dcfce7;color:#15803d;font-weight:700">${s.P}</td>
      <td style="padding:7px 10px;text-align:center;background:#fee2e2;color:#b91c1c;font-weight:700">${s.A}</td>
      <td style="padding:7px 10px;text-align:center;background:#fef3c7;color:#b45309;font-weight:700">${s.L}</td>
      <td style="padding:7px 10px;text-align:right;font-family:'Courier New',monospace">${fmtCurrency(s.gross)}</td>
      <td style="padding:7px 10px;text-align:right;color:#b91c1c;font-family:'Courier New',monospace">${s.deductions > 0 ? `- ${fmtCurrency(Math.round(s.deductions))}` : "—"}</td>
      <td style="padding:7px 10px;text-align:right;font-family:'Courier New',monospace;font-weight:700;color:#059669">${fmtCurrency(s.netSalary)}</td>
    </tr>`;
  }).join("");

  return `<!DOCTYPE html><html><head><title>Salary Summary</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;padding:25px;font-size:12px}
.hdr{display:flex;justify-content:space-between;border-bottom:3px solid #0d1b2e;padding-bottom:12px;margin-bottom:16px}
.co{font-size:20px;font-weight:800;color:#0d1b2e}
.sum-box{display:flex;gap:16px;margin-bottom:16px}
.sum-card{flex:1;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px}
.sum-num{font-size:18px;font-weight:800;font-family:'Courier New',monospace}
.sum-lbl{font-size:11px;color:#64748b;margin-top:2px}
table{width:100%;border-collapse:collapse}
th{background:#0d1b2e;color:#fff;padding:8px 10px;text-align:left;font-size:11px;letter-spacing:.03em}
td{border-bottom:1px solid #e2e8f0;font-size:12px}
.total-row td{font-weight:700;background:#f0fdf4;border-top:2px solid #0d1b2e;padding:9px 10px}
.footer{margin-top:20px;font-size:10px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:10px;display:flex;justify-content:space-between}
.sig-box{margin-top:30px;display:flex;justify-content:space-between}
.sig{text-align:center;width:160px}
.sig-line{border-top:1px solid #94a3b8;padding-top:5px;font-size:10px;color:#64748b}
@media print{body{padding:15px}}
</style></head><body>
<div class="hdr">
  <div style="display:flex;align-items:center;gap:10px">
    <img src="${LOGO_B64}" alt="Logo" style="width:52px;height:52px;object-fit:contain" />
    <div><div class="co">${settings.companyName}</div><div style="color:#64748b">Monthly Salary Summary — ${dept === "All" ? "All Departments" : dept}</div></div>
  </div>
  <div style="text-align:right"><div style="font-size:14px;font-weight:700">${new Date(y, m - 1).toLocaleString("default", { month: "long", year: "numeric" })}</div><div style="color:#94a3b8;font-size:11px">${grpUsers.length} employees · Leave deduction: ${deductLeave ? "Yes" : "No"}</div></div>
</div>
<div class="sum-box">
  <div class="sum-card"><div class="sum-num">${fmtCurrency(totalGross)}</div><div class="sum-lbl">Total Gross Payroll</div></div>
  <div class="sum-card" style="border-color:#fee2e2"><div class="sum-num" style="color:#dc2626">${fmtCurrency(Math.round(totalDeduct))}</div><div class="sum-lbl">Total Deductions</div></div>
  <div class="sum-card" style="border-color:#d1fae5"><div class="sum-num" style="color:#059669">${fmtCurrency(Math.round(totalNet))}</div><div class="sum-lbl">Total Net Payable</div></div>
</div>
<table>
  <thead><tr><th>#</th><th>Employee Name</th><th>Department</th><th>Designation</th><th style="text-align:center">P</th><th style="text-align:center">A</th><th style="text-align:center">L</th><th style="text-align:right">Gross</th><th style="text-align:right">Deductions</th><th style="text-align:right">Net Payable</th></tr></thead>
  <tbody>
    ${rows}
    <tr class="total-row">
      <td colspan="7">TOTAL (${grpUsers.length} Employees)</td>
      <td style="text-align:right;font-family:'Courier New',monospace">${fmtCurrency(totalGross)}</td>
      <td style="text-align:right;color:#dc2626;font-family:'Courier New',monospace">- ${fmtCurrency(Math.round(totalDeduct))}</td>
      <td style="text-align:right;color:#059669;font-family:'Courier New',monospace;font-size:14px">${fmtCurrency(Math.round(totalNet))}</td>
    </tr>
  </tbody>
</table>
<div class="sig-box">
  <div class="sig"><div class="sig-line">HR Manager</div></div>
  <div class="sig"><div class="sig-line">Finance Department</div></div>
  <div class="sig"><div class="sig-line">Authorized Signatory</div></div>
</div>
<div class="footer"><span>Generated: ${new Date().toLocaleString()} · Leave Deduction: ${deductLeave ? "Enabled" : "Disabled"}</span><span>CONFIDENTIAL — ${settings.companyName}</span></div>
</body></html>`;
}