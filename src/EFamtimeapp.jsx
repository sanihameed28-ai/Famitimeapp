import { useState, useEffect, useRef, useCallback } from "react";

const LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAA0CAYAAADMk7uRAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAMj0lEQVR42u1Za3Cc5XV+znm/22p3vVrJkmzJtmRZsrEcwGALAzZRMJOAKcYFsnJpqYEfQNNMSAfadCYdulaGCTNNmrSBaRo7JpBOKXgz0JQmEIMJC9Q29pgRFMtGF1uyLWRsXazrXr7vfU9/7LrQDMXyBUpnfH6/++7znMt7nnM+4IJdsAv2eTBqASz6/4Y6AaitgPqQBgGJhPrcezv5O96+tLGx5q65c++7p3Z++7pFDWsBIJHAtIhYn6W3EwBaAd0GBCDC2vlzV1fk9YbwxNi6MglKXUtBTKQcAJqOgz4PBKgFUK8BQQrQKQDLLrpo9uKpkduiIneEs7kVpaJBIDjEuRAr2xFTW/hpC4D0/w2Bj3o7XfT2urlzryszwZ2RsRM3xYjjJVrABHGYjc1gW6BsMuwBMwu3pPFZR+Bjvd2Ynfhqqa83RIPs8ihp2KKgSAJXMSwmZoIiGJAQAAEZmQsAS9KQz4TAx3l7fV3DNaH86J3R0aFbyoXKHBIwGbGJtMcMizQ5ihQZQkYCAAwhMBmGx7qmeK/5TAic8nZzbdOsJj1xW0Tn/7gkN7oiCoGFADYr7TDBBotFYnksyFoOejXtg2Nla/38ssD4RlMhAo42YYgQE33qESAkQWv/Zd5VMyeCu0L5wVvKgXIPGkpYPIJWyiEbLDYFls02hsHmmGW/PKztLX/X1/nc3QsXbphrgp/CiAFIaRgocNWcJVfFjwLDAAqszjeBBKBSgL7t542r5vmTr8UlBxsERaRdtmFBwKzJgyhh4KSxx8ds58l9TmxLquPtdhSRUU53TMLAI1IoVAAsQmgpjkeOAsNSPHfeCTQV741r/8o5EogizilmxyIjSgIrDIUMeRhQvH/M0k/uzFnPpLt7ewsgwfcBahMQvBWPdteP+BMR+JE8YASAEoRKMlIF4HArwAD0eSewpBjWCPzLIooFxpBFhm2l+CQUTrD1mwEVevKx6qrnkE5nAWAroPYBQoXiNAIQta8buqXu8W5FtBQCIQEcVhQjmjldLGebQgYghIQWR8RwznLcQchkXrlP98F+fHPPezsAAF0HkGyBhTRM6+94MgUw0KYnpaYLTEtJiwAiNphdS6oBoKkFdLp2cMYEkgATYFY1NtTbfnbpUVY9JxU/sVuprdsPHOwEACaCCPDXScNtG6HR2spIpf5HQe4rgpuyaZ/WlCAxMCA48KGFpt2N+UwJbCyCcAEcciIb/tJbuPSRrsMPbz9wqLNw4l47JhJbHJd5bW1kQCRIpTSIBMnkf/9fR7FRndTmrZxhCBERASSCsJHyQjP+FKQEFQls7+o6COAgsB8AsOhLddeXNen73NiLdQOd97t+rjS+2HPfyQweFn/k4L9ab7/0ZF9bWxbJJKOtTZqK9xzzYgfGpyZ0HL4y4AAwYDHzPlprp8FzdtbSAiudpqBmfuMlc76c3RirN7eUzGTAy2J88Cs43rMBpDLgIIdcZgzB6OE9uu+NRw7ueeU5EAEiDMDgykTo4YFdndUmNycLFbjkW93i7HrkyPtXS2FCMOcthYoanRIJqHQawbLbIxsW3z20o2alviVSp40X93WoVExVwysmUnHCsD1Lc6hc27F52qtZ2ewuWZ9qaPmjhyCikExiK6CwK5Xx2e5SBJAYMWA4zBVgFi6A/0Qnn8n0Qx0dhQs3bkxQe7pjvllw1y/KmqpibnTMtzzX0kEdDx2+nSZPXk65iQYSKWFLCVuOZi/WrUkaWM2oWR1RrjPy1GMvx5fda+0d2GuurCxfPtMEVxgjBgQ1QYqy1Ys3Hz1xNJMEOP0JqXQmNSCrVixeoW74h72trdcGNas2PF1V/tXygW5bl5QM25ot6CCEIFcBBkBWBlBZ5IMoHHsM85c+qo73rJPBI+u0u2Tln9dMHXlj897NvwIAzbInAEEAEgg8jXBDLle2qyAnzu0VShbOUMtlTQ2l1tCu8Au3vfp7q5f9ZN5lNzYHkTJh11JZvwa5bBWgS2Db41D2KAgaSgSudwRV85+C5QxgRvVOIhWQV3WxFalr/u5cSBwARozqyRKgUKgLZmNlMFQJAB2nSaHTEuhIFARVKDT0UNydRKmXX1lu9957+fiPZSntJEtP6oAErirUmhgRgYIIo7LxZ1iw4gGUVv0WJl+GUOgIwqX7WUxMu9VLLzELl90KAN2lbt+4qAkhYjImX2oJxxxvQaGZtZw9gUQCKpWC/uLyhc2lztQdHosJu9BK54Ps4dco+va30NT+db9++Pkc50enfHJBTpSoyMR1BqF4HL4JQSAQEOYt+R5mVP4WVqxe3NlLVgNA+s133vcN99qkTYht7yjx7nGLdicBRjptzrkPxJ3h70RsMCnWRKQcQIAZyGsDT/q92r4fygzzs5He0LVDEzVrPY4tKNd2CU9ONiBS8YZYigkMkAGs0CS80k6MD32JnHhVtQBERGayrm4AHPrCfrF+9Aipb+E/38tNR06r03n/KyvmfrnMm2yzLNHMBdlLJEQQIbARVqw1k6uyoYp8e7h0cPukjA0MTFLUz8rSUElsioOpGPyxWvH9ChruX4ORw9eDrQhl+t/FQ507nsiBsgviFbF+sf7tR709D8vwsMFpXp/TRqApBQESqsR+5W/DHkMoCESIFRvKBaGAlVghO6+CvJhACcRYBI5ZUcufFZ76ZdWsnm2Dx/qvOdRzrJWkdGGt44Qs8XMQbYQpgLIAsGVGgRyI8PNDXY+dktvFbj+tkfJ/rYG2Invfdh6dJPSHLNtlFZCQi9F82Q2HpyJrRnLhXWI77FrExIERBCYQEs0hKnG4oi7/cv3lXV8LVb/7UDd98GaPQZDjiENkGdYUiEi2C0AGRlMS4ASgip1Xpvu2n6aRdUhX78Rbs5zLnjAzMjlHqavHs9ZPt75y+NGevtHud3omttTPrnzbF7fOczDP4YDEkAEEIgLAZtfR0XhwqLxycFueTrx7dFxiA360PmwB7lj7sy+Ovt/5YsurUE/2pXXHGQCfthY6VQsAsKb5ooXDeckvnp35hQlk+zGe8di2bfuOAMBtK+taS0qmHgx7+StcY5APROuiwDQCUspABTn4gTp23Lv4g15rZWz/3p135/rffBUtLRbS6eDsBvNpnvvGDXAefRG5xHXzftgQH/6zfFbhpG+dnArCW6by0b//5esFIrdeV7c+amUejNhBMyEPP4AWAkFABiAbCiRTmApoZDIoe/5YJrrx9d2dvUUs5lMhkEyC29pg1rTUL2+Indxd6vk5rW32tXa0sTGew0geoS3HObz5hRcOdALA7asv+gPPnXwgzBPNQgECXcgOAxFoR4gDHsk50j8Wb9yxt7unWI9nTGBaYq6yEtzRAXyhcdaqihJZMzPCJZYNpQgBI9AO63DI8q/2gvw9i2orFsyrLu199rXu7e3dY5sbaioOGMtq9Miv8sGiQAwOjKssHs1Fvr1tZ+/zLS2w+vo+eXg/H/NAsam0RB5Y3/cnEcp9M1YSzMlJAD9jgrxP4muxAwATGTvwdeiZCYp+P/VSR/v61TMfrwrn7875OhAwWwo06YePd03UN/7Hjh0TRRByNgSmFYFTkvbm66sX3bR84p6XOpb8Y+qV5d9bXHekH6wWRENWlWcHChZrhgQ2+zwjIpeOZvlQbHb1kUp7YpOCZk2siIxxLIeP5UJ/9fJr777ekYAqyvSzsukNNC2Fc7Wudc/CUrStv6Tj6F8ktv3k4KCz7bv/3N90ZCR8x2Cm5EBIOSoWcpzyiE1Z7R59Ol/7gzI68TclnnYFCEh04DDzaM7q6j9Z8eMkwKnU2YOfVgQEoGv7YG6+elH1wln+M1Evr4m0Ey8xl5dF/G9es6hqSe+g8+zmXx98aEFt5T6LzCw75Nb1Z5xvt7/Y/uaC2vgwgPmuQ/VKGVZw6P2sd396x3tvowWqr+/cCNB0CABA643NVZdU5LbMjY/eGHIIYxOBnsoKyIKayioMBt6vv//Ue2sBMve1LlkppSt3b9q0KTiV22tb5t80M5RPZsUg+M2qK5uSKWlrOzfwZzXU33vrxV+8KJ59sCycvzEaYmtoKieWZvSetPbvPDHjim1Xv5OhjwBLJsEb2yAFfSPU3HxF2Z49e4amozTP/8e55Ic186d/eOnSH9y9cNM/fX3O4S3fmJ2/84bK605tK04N/x+zEDj/oM54rZiA2ppIgFpTetXX/j1+VfhX37GC4d/v7o9cmkptOd1KnHAOT+b53AvR1q0JznxwWalUNd2s4DrlA51PrLn//jxN88PEBTvXzdyHkdjKANDa2qovuPOCXbDP3v4L5kyc8T3B/8wAAAAASUVORK5CYII=";

// ─── Theme ──────────────────────────────────────────────────────────
const BG    = "linear-gradient(160deg,#e0f2fe 0%,#bae6fd 35%,#7dd3fc 65%,#38bdf8 100%)";
const CARD  = "rgba(255,255,255,0.62)";
const CARDB = "1px solid rgba(255,255,255,0.75)";
const GRAD  = [
  "linear-gradient(135deg,#2563eb,#1d4ed8)",
  "linear-gradient(135deg,#ec4899,#be185d)",
  "linear-gradient(135deg,#10b981,#047857)",
  "linear-gradient(135deg,#f59e0b,#b45309)",
  "linear-gradient(135deg,#8b5cf6,#6d28d9)",
  "linear-gradient(135deg,#14b8a6,#0d9488)",
  "linear-gradient(135deg,#f97316,#c2410c)",
  "linear-gradient(135deg,#06b6d4,#0e7490)",
];

// ─── PeerJS peer ID for a username ──────────────────────────────────
// prefix "famtime-" + username (lowercase, no spaces)
// This means both caller and callee use the SAME known ID — no room codes needed
const toPeerId = u => "famtime-" + (u || "").toLowerCase().replace(/[^a-z0-9]/g, "");

// ─── Storage ─────────────────────────────────────────────────────────
const sv = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} };
const ld = (k, d) => { try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : d; } catch (_) { return d; } };
const K  = { U:"ft3_users", P:"ft3_profile", C:"ft3_contacts", R:"ft3_recents", M:"ft3_missed" };

// ─── Helpers ──────────────────────────────────────────────────────────
const inits   = n => (n||"").trim().split(" ").map(w => w[0]||"").join("").toUpperCase().slice(0,2) || "?";
const fmtSec  = s => Math.floor(s/60) + ":" + String(s % 60).padStart(2,"0");
const nowStr  = () => new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
const nowFull = () => { const d=new Date(); return d.toLocaleDateString([],{month:"short",day:"numeric"}) + " " + d.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}); };
const greet   = () => { const h=new Date().getHours(); return h<12?"Good morning \u2600\ufe0f":h<17?"Good afternoon \ud83c\udf24":"Good evening \ud83c\udf19"; };

// ─── Static styles ────────────────────────────────────────────────────
const S = {
  page:    { fontFamily:"system-ui,sans-serif", minHeight:"100vh", width:"100%", maxWidth:"100vw", overflowX:"hidden", background:BG },
  card:    { background:CARD, backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", border:CARDB, borderRadius:22, padding:"clamp(14px,4vw,22px)", margin:"12px 14px", width:"calc(100% - 28px)", boxSizing:"border-box" },
  topBar:  { background:"rgba(255,255,255,0.58)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", padding:"13px 16px 11px", borderBottom:"1px solid rgba(255,255,255,0.7)", position:"sticky", top:0, zIndex:50 },
  tabBar:  { position:"fixed", left:0, right:0, bottom:0, width:"100%", display:"flex", background:"rgba(255,255,255,0.68)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", borderTop:"1px solid rgba(255,255,255,0.7)", padding:"7px 0 12px", zIndex:50 },
  inp:     { width:"100%", padding:"13px 15px", borderRadius:13, border:"1.5px solid rgba(14,165,233,0.4)", background:"rgba(255,255,255,0.7)", color:"#0c4a6e", fontSize:17, outline:"none", boxSizing:"border-box", fontFamily:"system-ui,sans-serif" },
  lbl:     { display:"block", fontSize:12, color:"#0284c7", fontWeight:600, letterSpacing:.7, textTransform:"uppercase", marginBottom:5 },
  btnBlue: { display:"block", width:"100%", padding:15, borderRadius:14, border:"none", background:"linear-gradient(135deg,#0ea5e9,#0284c7)", color:"#fff", fontSize:17, fontWeight:700, cursor:"pointer", marginBottom:10 },
  btnTeal: { display:"block", width:"100%", padding:15, borderRadius:14, border:"none", background:"linear-gradient(135deg,#14b8a6,#0d9488)", color:"#fff", fontSize:17, fontWeight:700, cursor:"pointer", marginBottom:10 },
  btnRed:  { display:"block", width:"100%", padding:15, borderRadius:14, border:"none", background:"linear-gradient(135deg,#ef4444,#b91c1c)", color:"#fff", fontSize:17, fontWeight:700, cursor:"pointer", marginBottom:10 },
  btnGhost:{ display:"block", width:"100%", padding:15, borderRadius:14, border:"1.5px solid rgba(14,165,233,0.45)", background:"rgba(255,255,255,0.5)", color:"#0369a1", fontSize:16, fontWeight:600, cursor:"pointer", marginBottom:10 },
  btnGreen:{ display:"block", width:"100%", padding:15, borderRadius:14, border:"none", background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", fontSize:17, fontWeight:700, cursor:"pointer", marginBottom:10 },
};

const AI_STEPS = [
  { q:"Hello! I will help you set up Famtime.\n\nFirst — what is your first name?", lbl:"First name",    key:"first", t:"text"     },
  { q:"Lovely! And your last name?",                                                   lbl:"Last name",     key:"last",  t:"text"     },
  { q:"Choose a username. This is what family will use to call you.",                  lbl:"Username",      key:"user",  t:"text"     },
  { q:"Now create a password.",                                                         lbl:"Password",      key:"pass",  t:"password" },
  { q:"Your phone number?",                                                             lbl:"Phone number",  key:"phone", t:"tel"      },
  { q:"What city and country are you in?",                                             lbl:"City, Country", key:"loc",   t:"text"     },
];

const AI_ANS = {
  call:      "Tap any contact on the home screen or in Contacts. Both people need Famtime open. The other person just needs to tap Answer when they see the incoming call!",
  group:     "Tap More > Start Group Call, select people and press Start.",
  favourite: "In Contacts, tap the star \u2606 next to any contact to add them to Favourites.",
  delete:    "In Contacts, tap the bin icon next to a contact and confirm.",
  add:       "Tap the Contacts tab, then + Add. Fill in their name and their Famtime username.",
  username:  "The other person\'s Famtime username is what they chose when they signed up. Ask them to check in Settings. You need it to call them.",
  missed:    "Missed calls appear in the Recents tab with a red icon. Tap Call to call them back.",
  password:  "Tap \'Forgot password?\' on the sign-in screen.",
  default:   "I can help with calls, contacts, favourites, and settings. What would you like to know? \uD83D\uDE0A",
};

// ══════════════════════════════════════════════════════════════════════
// STABLE COMPONENTS (module-level — never remount, fixes typing bug)
// ══════════════════════════════════════════════════════════════════════
const Field = ({ lbl, type, val, onChange, placeholder, autoFocus }) => (
  <div style={{marginBottom:14}}>
    <label style={S.lbl}>{lbl}</label>
    <input style={S.inp} type={type||"text"} value={val}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder||""} autoFocus={!!autoFocus}
      autoComplete="off" autoCorrect="off" spellCheck={false} />
  </div>
);

const TabBar = ({ active, onTab, missedCount }) => (
  <div style={S.tabBar}>
    {[["fav","home","\u2b50","Favourites"],["recents","recents","\ud83d\udd50","Recents"],["contacts","contacts","\ud83d\udc65","Contacts"],["more","more","\u22ef","More"]].map(([id,sc,icon,lbl]) => (
      <div key={id} onClick={() => onTab(sc)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",padding:"3px 0",position:"relative"}}>
        <span style={{fontSize:22}}>{icon}</span>
        {id==="recents" && missedCount > 0 && (
          <span style={{position:"absolute",top:0,right:"18%",background:"#ef4444",color:"#fff",borderRadius:50,fontSize:9,fontWeight:700,padding:"1px 5px",minWidth:16,textAlign:"center"}}>{missedCount}</span>
        )}
        <span style={{fontSize:10,color:active===id?"#0284c7":"#7dd3fc",fontWeight:active===id?700:500}}>{lbl}</span>
      </div>
    ))}
  </div>
);

const BackBtn = ({ onBack, title }) => (
  <div style={{...S.topBar,display:"flex",alignItems:"center",gap:12}}>
    <button onClick={onBack} style={{background:"rgba(255,255,255,0.6)",border:CARDB,borderRadius:"50%",width:36,height:36,color:"#0369a1",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>&#8592;</button>
    <span style={{fontSize:19,fontWeight:700,color:"#0c4a6e"}}>{title}</span>
  </div>
);

// ══════════════════════════════════════════════════════════════════════
//  MAIN APP
// ══════════════════════════════════════════════════════════════════════
export default function App() {

  // Responsive viewport handling
  useEffect(() => {
    const updateViewport = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => window.removeEventListener('resize', updateViewport);
  }, []);


  // ── persisted ─────────────────────────────────────────────────────
  const [users,    setUsers]    = useState(() => ld(K.U, {}));
  const [profile,  setProfile]  = useState(() => ld(K.P, {name:"",last:"",user:"",phone:"",loc:"",logged:false}));
  const [contacts, setContacts] = useState(() => ld(K.C, []));
  const [recents,  setRecents]  = useState(() => ld(K.R, []));
  const [missed,   setMissed]   = useState(() => ld(K.M, []));

  // ── nav ───────────────────────────────────────────────────────────
  const [screen,    setScreen]    = useState("welcome");
  const [navHist,   setNavHist]   = useState([]);
  const [activeTab, setActiveTab] = useState("fav");

  // ── toast ─────────────────────────────────────────────────────────
  const [toast, setToast] = useState("");
  const toastT = useRef(null);

  // ── form state (individual useState → no remount/typing bug) ──────
  const [sfFirst, setSfFirst] = useState("");
  const [sfLast,  setSfLast]  = useState("");
  const [sfUser,  setSfUser]  = useState("");
  const [sfPass,  setSfPass]  = useState("");
  const [sfPhone, setSfPhone] = useState("");
  const [sfLoc,   setSfLoc]   = useState("");
  const [siUser,  setSiUser]  = useState("");
  const [siPass,  setSiPass]  = useState("");
  const [siErr,   setSiErr]   = useState("");
  const [aiStep,  setAiStep]  = useState(0);
  const [aiData,  setAiData]  = useState({});
  const [aiInp,   setAiInp]   = useState("");
  const [ncName,  setNcName]  = useState("");
  const [ncUser,  setNcUser]  = useState("");  // their Famtime username — used to call
  const [ncPhone, setNcPhone] = useState("");
  const [ncNick,  setNcNick]  = useState("");
  const [ncFav,   setNcFav]   = useState(false);
  const [editId,  setEditId]  = useState(null);
  const [ecName,  setEcName]  = useState("");
  const [ecUser,  setEcUser]  = useState("");
  const [ecPhone, setEcPhone] = useState("");
  const [ecFav,   setEcFav]   = useState(false);
  const [search,  setSearch]  = useState("");
  const [modal,   setModal]   = useState(null);
  const [selGrp,  setSelGrp]  = useState([]);
  const [grpSecs, setGrpSecs] = useState(0);
  const [aiChat,  setAiChat]  = useState([{who:"ai",txt:"Hello! I am your Famtime assistant \uD83E\uDD16\n\nAsk me anything!"}]);
  const [aiChatInp, setAiChatInp] = useState("");

  // ── call state ────────────────────────────────────────────────────
  const [callId,       setCallId]       = useState(null);   // contact id being called
  const [callSecs,     setCallSecs]     = useState(0);
  const [callActive,   setCallActive]   = useState(false);
  const [callStatus,   setCallStatus]   = useState("");
  const [isMuted,      setIsMuted]      = useState(false);
  const [isVideo,      setIsVideo]      = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);   // {callerName, callerUser, mediaCall}
  const [missedRing,   setMissedRing]   = useState(null);   // timeout for auto-missed
  const callTimer  = useRef(null);
  const grpTimer   = useRef(null);
  const inboxPeer  = useRef(null);  // persistent peer that listens for incoming calls
  const activePeer = useRef(null);  // peer used for outgoing calls
  const activeCall = useRef(null);  // the MediaConnection
  const localSt    = useRef(null);
  const remoteVid  = useRef(null);
  const localVid   = useRef(null);
  const [peerReady, setPeerReady] = useState(false);

  // ── persist ────────────────────────────────────────────────────────
  useEffect(() => sv(K.U, users),    [users]);
  useEffect(() => sv(K.P, profile),  [profile]);
  useEffect(() => sv(K.C, contacts), [contacts]);
  useEffect(() => sv(K.R, recents.slice(0,30)), [recents]);
  useEffect(() => sv(K.M, missed.slice(0,50)),  [missed]);

  // ── load PeerJS then boot inbox peer ─────────────────────────────
  useEffect(() => {
    const load = () => {
      if (window.Peer) { setPeerReady(true); return; }
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.2/peerjs.min.js";
      s.onload  = () => setPeerReady(true);
      s.onerror = () => console.warn("PeerJS CDN failed");
      document.head.appendChild(s);
    };
    load();
  }, []);

  // ── once PeerJS ready + user logged in → open inbox peer ──────────
  useEffect(() => {
    if (!peerReady || !profile.logged || !profile.user) return;
    openInboxPeer(profile.user);
    return () => {
      if (inboxPeer.current && !inboxPeer.current.destroyed) {
        try { inboxPeer.current.destroy(); } catch(_) {}
      }
    };
  }, [peerReady, profile.logged, profile.user]); // eslint-disable-line

  // ── auto-login ────────────────────────────────────────────────────
  useEffect(() => {
    if (profile.logged) { setScreen("home"); setNavHist([]); }
  }, []); // eslint-disable-line

  // ─────────────────────────────────────────────────────────────────
  //  INBOX PEER — listens for calls using username as peer ID
  // ─────────────────────────────────────────────────────────────────
  const openInboxPeer = useCallback((username) => {
    if (!window.Peer) return;
    const pid = toPeerId(username);
    // If already open with same ID, skip
    if (inboxPeer.current && !inboxPeer.current.destroyed && inboxPeer.current.id === pid) return;
    if (inboxPeer.current && !inboxPeer.current.destroyed) {
      try { inboxPeer.current.destroy(); } catch(_) {}
    }
    const p = new window.Peer(pid, {
      host: "0.peerjs.com", port: 443, path: "/", secure: true,
      config: { iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "turn:openrelay.metered.ca:80",    username:"openrelayproject", credential:"openrelayproject" },
        { urls: "turn:openrelay.metered.ca:443",   username:"openrelayproject", credential:"openrelayproject" },
      ]}
    });
    inboxPeer.current = p;

    p.on("open", id => {
      console.log("Inbox peer open:", id);
      console.log("Peer ready for calls");
      setPeerReady(true);
    });

    p.on("disconnected", () => {
      console.log("Peer disconnected, reconnecting...");
      try {
        p.reconnect();
      } catch (_) {}
    });

    p.on("call", mediaCall => {
      // Extract caller info from metadata
      const callerName = mediaCall.metadata?.callerName || "Unknown";
      const callerUser = mediaCall.metadata?.callerUser || "";
      // Show incoming call UI
      setIncomingCall({ callerName, callerUser, mediaCall });
      // Auto-log as missed after 30 seconds if not answered
      const t = setTimeout(() => {
        setIncomingCall(curr => {
          if (curr && curr.mediaCall === mediaCall) {
            // Still ringing — log missed
            const m = { name: callerName, user: callerUser, time: nowFull(), type: "missed" };
            setMissed(prev => [m, ...prev.slice(0,49)]);
            setRecents(prev => [{ name:callerName, time:nowStr(), dur:"Missed", icon:"\uD83D\uDCDE" }, ...prev.slice(0,29)]);
            try { mediaCall.close(); } catch(_) {}
            return null;
          }
          return curr;
        });
      }, 30000);
      setMissedRing(t);
    });

    p.on("error", e => {
      // ID taken = someone else registered same username, retry with suffix
      if (e.type === "unavailable-id") {
        console.warn("Peer ID taken, retrying...");
        setTimeout(() => openInboxPeer(username), 3000);
      }
    });
  }, []);

  // ─────────────────────────────────────────────────────────────────
  //  ANSWER incoming call
  // ─────────────────────────────────────────────────────────────────
  const answerCall = useCallback((withVideo) => {
    if (!incomingCall) return;
    const { callerName, callerUser, mediaCall } = incomingCall;
    clearTimeout(missedRing);
    setIncomingCall(null);
    setCallStatus("Connecting...");
    setCallActive(false);
    setIsVideo(withVideo);

    // Find or create contact entry for display
    const existingContact = contacts.find(c => (c.famUser||"").toLowerCase() === callerUser.toLowerCase());
    if (!existingContact) {
      // Add to recents with caller name
      setRecents(r => [{ name:callerName, time:nowStr(), dur:"\u2014", icon:"\uD83D\uDCDE" }, ...r.slice(0,29)]);
    }

    navigator.mediaDevices.getUserMedia({ audio: true, video: withVideo })
      .then(stream => {
        localSt.current = stream;
        if (withVideo && localVid.current) { localVid.current.srcObject = stream; localVid.current.style.display = "block"; }
        activeCall.current = mediaCall;
        mediaCall.answer(stream);
        mediaCall.on("stream", remoteStream => {
          setCallStatus("Connected \u2713");
          setCallActive(true);
          if (remoteVid.current) { remoteVid.current.srcObject = remoteStream; remoteVid.current.style.opacity = "1"; }
          startCallTimer();
        });
        mediaCall.on("close", () => endCall());
        mediaCall.on("error", () => endCall());
        setScreen("call-active");
      })
      .catch(() => showToast("Please allow microphone access to answer calls"));
  }, [incomingCall, missedRing, contacts]); // eslint-disable-line

  const declineCall = useCallback(() => {
    if (!incomingCall) return;
    clearTimeout(missedRing);
    try { incomingCall.mediaCall.close(); } catch(_) {}
    // Log as missed from caller's perspective — here we just dismiss
    setIncomingCall(null);
  }, [incomingCall, missedRing]);

  // ─────────────────────────────────────────────────────────────────
  //  OUTGOING CALL — calls the other person by their Famtime username
  // ─────────────────────────────────────────────────────────────────
  const doCall = useCallback((contactId, withVideo) => {
    const c = contacts.find(x => x.id === contactId);
    if (!c) return;
    const theirUsername = c.famUser || "";
    if (!theirUsername.trim()) {
      showToast("Add " + c.name + "\u2019s Famtime username to call them");
      return;
    }
    if (!peerReady || !window.Peer) { showToast("Call system loading..."); return; }

    setCallId(contactId);
    setCallActive(false);
    setCallSecs(0);
    setIsVideo(withVideo);
    setCallStatus("Calling " + c.name + "...");
    setScreen("call-active");
    setRecents(r => [{ name:c.name, time:nowStr(), dur:"\u2014", icon:withVideo?"\uD83D\uDCF9":"\uD83D\uDCDE" }, ...r.slice(0,29)]);

    navigator.mediaDevices.getUserMedia({ audio:true, video:withVideo })
      .then(stream => {
        localSt.current = stream;
        if (withVideo && localVid.current) { localVid.current.srcObject = stream; localVid.current.style.display = "block"; }

        // Reuse the persistent inbox peer instead of creating a new peer every call
        const p = inboxPeer.current;

        if (!p) {
          setCallStatus("Connection system not ready");
          showToast("Please wait a moment and try again");
          return;
        }

        activePeer.current = p;

        p.on("open", () => {
          const theirPeerId = toPeerId(theirUsername);
          setCallStatus("Ringing " + c.name + "...");
          console.log("Calling peer:", theirPeerId);

          let call;

          try {
            call = p.call(theirPeerId, stream, {
              metadata: {
                callerName: profile.name || profile.user,
                callerUser: profile.user,
                video: withVideo,
              }
            });
          } catch (err) {
            console.error("Call failed:", err);
            setCallStatus("Connection failed");
            showToast("Unable to reach user");
            return;
          }
          activeCall.current = call;

          call.on("stream", remoteStream => {
            setCallStatus("Connected \u2713");
            setCallActive(true);
            if (remoteVid.current) { remoteVid.current.srcObject = remoteStream; remoteVid.current.style.opacity = "1"; }
            startCallTimer();
          });
          call.on("close", () => endCall());
          call.on("error", e => {
            setCallStatus("Could not connect \u2014 make sure " + c.name + " has Famtime open");
            showToast(c.name + " did not answer");
            // Log missed on caller side too
            setMissed(prev => [{ name:c.name, user:theirUsername, time:nowFull(), type:"outgoing-missed" }, ...prev.slice(0,49)]);
            setRecents(r => { const u=[...r]; if(u[0]&&u[0].dur==="\u2014") u[0].dur="No answer"; return u; });
          });
        });

        p.on("error", e => {
          setCallStatus("Error: " + e.type);
          showToast("Call failed: " + e.type);
        });
      })
      .catch(() => showToast("Please allow microphone/camera access"));
  }, [contacts, peerReady, profile]); // eslint-disable-line

  // ─────────────────────────────────────────────────────────────────
  //  CALL TIMER / CLEANUP
  // ─────────────────────────────────────────────────────────────────
  const startCallTimer = useCallback(() => {
    clearInterval(callTimer.current);
    let s = 0; setCallSecs(0);
    callTimer.current = setInterval(() => { s++; setCallSecs(s); }, 1000);
  }, []);

  const cleanupCall = useCallback(() => {
    clearInterval(callTimer.current);
    try { if (activeCall.current)                               activeCall.current.close();    } catch(_) {}
    try { if (activePeer.current && !activePeer.current.destroyed) activePeer.current.destroy(); } catch(_) {}
    try { if (localSt.current) localSt.current.getTracks().forEach(t => t.stop());             } catch(_) {}
    activeCall.current = null; activePeer.current = null; localSt.current = null;
    if (remoteVid.current) { remoteVid.current.srcObject = null; remoteVid.current.style.opacity = "0"; }
    if (localVid.current)  { localVid.current.srcObject = null;  localVid.current.style.display  = "none"; }
    setCallActive(false); setCallSecs(0); setIsMuted(false);
  }, []);

  const endCall = useCallback(() => {
    setRecents(r => {
      const u = [...r];
      if (u[0] && u[0].dur === "\u2014") {
        const m = Math.floor(callSecs / 60);
        u[0].dur = m > 0 ? m + " min" : callSecs > 0 ? callSecs + " sec" : "No answer";
      }
      return u;
    });
    cleanupCall();
    goBack();
  }, [cleanupCall, callSecs]); // eslint-disable-line

  // ─────────────────────────────────────────────────────────────────
  //  NAVIGATION
  // ─────────────────────────────────────────────────────────────────
  const goTo = useCallback((s, noHist) => {
    if (!noHist) setNavHist(h => [...h, screen]);
    setScreen(s);
    if (s === "contacts") setSearch("");
  }, [screen]);

  const goBack = useCallback(() => {
    setNavHist(h => {
      if (!h.length) return h;
      setScreen(h[h.length - 1]);
      return h.slice(0, -1);
    });
  }, []);

  const goTab = useCallback((s) => {
    const m = {home:"fav", recents:"recents", contacts:"contacts", more:"more"};
    setActiveTab(m[s] || "fav");
    setScreen(s);
    setNavHist([]);
    if (s === "recents") setMissed([]); // clear missed badge when viewing recents
  }, []);

  // ─────────────────────────────────────────────────────────────────
  //  TOAST
  // ─────────────────────────────────────────────────────────────────
  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToast(""), 3200);
  }, []);

  // ─────────────────────────────────────────────────────────────────
  //  ACCOUNTS
  // ─────────────────────────────────────────────────────────────────
  const registerUser = (data) => {
    const key = (data.user || "").trim().toLowerCase();
    if (!key)                             { showToast("Username is required"); return false; }
    if (!data.pass || data.pass.length < 4) { showToast("Password must be at least 4 characters"); return false; }
    if (users[key])                       { showToast("Username already taken — choose another"); return false; }
    const u = { ...users, [key]: { pass:data.pass, name:data.first||data.name||"", last:data.last||"", phone:data.phone||"", loc:data.loc||"" } };
    setUsers(u); sv(K.U, u);
    return true;
  };

  const doLogin = useCallback(() => {
    const key = siUser.trim().toLowerCase();
    if (!key) { setSiErr("Please enter your username."); return; }
    const all = ld(K.U, {});
    if (!all[key])             { setSiErr("Username not found. Please check and try again."); return; }
    if (all[key].pass !== siPass) { setSiErr("Incorrect password. Please try again."); return; }
    setSiErr("");
    const u = all[key];
    const p = { name:u.name, last:u.last||"", user:siUser.trim(), phone:u.phone||"", loc:u.loc||"", logged:true };
    setProfile(p); sv(K.P, p);
    setScreen("home"); setNavHist([]);
  }, [siUser, siPass]);

  const applyProfile = (p) => {
    const full = { ...p, logged:true };
    setProfile(full); sv(K.P, full);
    setScreen("home"); setNavHist([]);
  };

  const doSignup = () => {
    if (!sfFirst.trim()) { showToast("First name is required"); return; }
    const ok = registerUser({ first:sfFirst, last:sfLast, user:sfUser, pass:sfPass, phone:sfPhone, loc:sfLoc, name:sfFirst });
    if (!ok) return;
    applyProfile({ name:sfFirst.trim(), last:sfLast.trim(), user:sfUser.trim(), phone:sfPhone.trim(), loc:sfLoc.trim() });
  };

  const aiNext = () => {
    if (!aiInp.trim()) return;
    const d = { ...aiData, [AI_STEPS[aiStep].key]: aiInp.trim() };
    setAiData(d); setAiInp("");
    if (aiStep >= AI_STEPS.length - 1) {
      const ok = registerUser(d); if (!ok) return;
      applyProfile({ name:d.first||"User", last:d.last||"", user:d.user||"", phone:d.phone||"", loc:d.loc||"" });
    } else { setAiStep(s => s + 1); }
  };

  const logout = () => {
    cleanupCall();
    if (inboxPeer.current && !inboxPeer.current.destroyed) try { inboxPeer.current.destroy(); } catch(_) {}
    inboxPeer.current = null;
    const p = {name:"",last:"",user:"",phone:"",loc:"",logged:false};
    setProfile(p); sv(K.P, p);
    setScreen("welcome"); setNavHist([]);
  };

  // ─────────────────────────────────────────────────────────────────
  //  CONTACTS
  // ─────────────────────────────────────────────────────────────────
  const addContact = () => {
    if (!ncName.trim())  { showToast("Name is required"); return; }
    if (!ncUser.trim())  { showToast("Their Famtime username is required to call them"); return; }
    const c = { id:Date.now(), name:(ncNick||ncName).trim(), famUser:ncUser.trim().toLowerCase(), phone:ncPhone.trim(), fav:ncFav, color:GRAD[contacts.length % GRAD.length] };
    setContacts(p => [...p, c]);
    setNcName(""); setNcUser(""); setNcPhone(""); setNcNick(""); setNcFav(false);
    showToast(c.name + " added! \uD83D\uDC4B");
    goBack();
  };

  const saveEdit = () => {
    if (!ecName.trim()) { showToast("Name required"); return; }
    setContacts(p => p.map(c => c.id === editId ? { ...c, name:ecName.trim(), famUser:ecUser.trim().toLowerCase(), phone:ecPhone.trim()||c.phone, fav:ecFav } : c));
    showToast("Contact updated \u2713"); goBack();
  };

  const delContact = (id) => {
    const c = contacts.find(x => x.id === id);
    setContacts(p => p.filter(x => x.id !== id));
    setModal(null);
    if (screen === "edit") goBack();
    showToast((c ? c.name : "Contact") + " deleted");
  };

  const toggleFav = (id) => {
    setContacts(p => p.map(c => {
      if (c.id !== id) return c;
      showToast(c.fav ? c.name+" removed from Favourites" : c.name+" added to Favourites \u2B50");
      return { ...c, fav: !c.fav };
    }));
  };

  // ─────────────────────────────────────────────────────────────────
  //  AI CHAT
  // ─────────────────────────────────────────────────────────────────
  const sendAiMsg = () => {
    if (!aiChatInp.trim()) return;
    const q = aiChatInp.trim(); setAiChatInp("");
    const key = Object.keys(AI_ANS).find(k => q.toLowerCase().includes(k)) || "default";
    setAiChat(c => [...c, {who:"user",txt:q}, {who:"ai",txt:AI_ANS[key]}]);
  };

  // ─────────────────────────────────────────────────────────────────
  //  GROUP CALL
  // ─────────────────────────────────────────────────────────────────
  const launchGroup = () => {
    if (!selGrp.length) { showToast("Select at least one person"); return; }
    clearInterval(grpTimer.current); let s = 0; setGrpSecs(0);
    grpTimer.current = setInterval(() => { s++; setGrpSecs(s); }, 1000);
    goTo("group-call");
  };

  const callee = contacts.find(x => x.id === callId) || null;
  const missedCount = missed.length;

  // ══════════════════════════════════════════════════════════════════
  //  RENDER
  // ══════════════════════════════════════════════════════════════════
  const renderScreen = () => {
    switch (screen) {

    case "welcome": return (
      <div style={{...S.page,display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div style={S.card}>
          <div style={{textAlign:"center",marginBottom:22}}>
            <img src={LOGO} style={{width:52,height:56,objectFit:"contain",display:"block",margin:"0 auto 14px"}} alt="Famtime" />
            <div style={{fontSize:30,fontWeight:800,color:"#0c4a6e",letterSpacing:-.5}}>Famtime</div>
            <div style={{fontSize:14,color:"#0284c7",marginTop:5,lineHeight:1.6}}>Connect with your loved ones<br/>anytime and anywhere</div>
          </div>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,#38bdf8,transparent)",margin:"0 0 20px"}} />
          <button style={S.btnBlue} onClick={() => goTo("onboard")}>Get Started</button>
          <button style={S.btnGhost} onClick={() => { setSiUser(""); setSiPass(""); setSiErr(""); goTo("signin"); }}>I already have an account</button>
        </div>
      </div>
    );

    case "onboard": return (
      <div style={{...S.page,display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div style={S.card}>
          <div style={{textAlign:"center",marginBottom:18}}>
            <div style={{fontSize:46,marginBottom:10}}>&#129302;</div>
            <div style={{fontSize:20,fontWeight:700,color:"#0c4a6e",marginBottom:8}}>Would you like help signing up?</div>
            <p style={{fontSize:15,color:"#0369a1",lineHeight:1.7}}>Our AI assistant guides you step by step.</p>
          </div>
          <button style={S.btnBlue} onClick={() => { setAiStep(0); setAiData({}); setAiInp(""); goTo("ai-signup"); }}>Yes, guide me &#128578;</button>
          <button style={S.btnGhost} onClick={() => { setSfFirst(""); setSfLast(""); setSfUser(""); setSfPass(""); setSfPhone(""); setSfLoc(""); goTo("signup"); }}>No, I will do it myself</button>
        </div>
      </div>
    );

    case "ai-signup": {
      const step = AI_STEPS[Math.min(aiStep, AI_STEPS.length-1)];
      return (
        <div style={S.page}>
          <BackBtn onBack={goBack} title="Create Account" />
          <div style={{margin:"12px 14px 0",background:"rgba(14,165,233,0.1)",border:"1px solid rgba(14,165,233,0.28)",borderRadius:18,padding:"14px 16px"}}>
            <div style={{fontSize:11,color:"#0284c7",fontWeight:600,letterSpacing:.8,textTransform:"uppercase",marginBottom:5}}>AI Assistant</div>
            <div style={{fontSize:15,color:"#0c4a6e",lineHeight:1.75,whiteSpace:"pre-line"}}>{step.q}</div>
          </div>
          <div style={S.card}>
            <Field lbl={step.lbl} type={step.t} val={aiInp} onChange={setAiInp} placeholder="Type here..." autoFocus />
            <button style={S.btnBlue} onClick={aiNext}>{aiStep >= AI_STEPS.length-1 ? "Finish ✓" : "Next →"}</button>
          </div>
        </div>
      );
    }

    case "signup": return (
      <div style={S.page}>
        <BackBtn onBack={goBack} title="Create Account" />
        <div style={S.card}>
          <Field lbl="First name *" val={sfFirst} onChange={setSfFirst} placeholder="e.g. Margaret" />
          <Field lbl="Last name"    val={sfLast}  onChange={setSfLast}  placeholder="e.g. Smith" />
          <Field lbl="Username *"   val={sfUser}  onChange={setSfUser}  placeholder="others will use this to call you" />
          <Field lbl="Password *" type="password" val={sfPass} onChange={setSfPass} placeholder="min 4 characters" />
          <Field lbl="Phone number" type="tel" val={sfPhone} onChange={setSfPhone} placeholder="+1 555 000 0000" />
          <Field lbl="Location"     val={sfLoc}   onChange={setSfLoc}   placeholder="City, Country" />
          <div style={{background:"rgba(14,165,233,0.08)",border:"1px solid rgba(14,165,233,0.2)",borderRadius:12,padding:"10px 14px",fontSize:13,color:"#0369a1",marginBottom:16,lineHeight:1.6}}>
            &#128161; Your <b>username</b> is how family finds you. Share it with them so they can add you as a contact and call you.
          </div>
          <button style={S.btnBlue}  onClick={doSignup}>Create Account ✓</button>
          <button style={S.btnGhost} onClick={() => { setSiUser(""); setSiPass(""); setSiErr(""); goTo("signin"); }}>Sign in instead</button>
        </div>
      </div>
    );

    case "signin": return (
      <div style={S.page}>
        <BackBtn onBack={goBack} title="Sign In" />
        <div style={{...S.card,textAlign:"center"}}>
          <img src={LOGO} style={{width:44,height:48,objectFit:"contain",display:"block",margin:"0 auto 16px"}} alt="Famtime" />
          <Field lbl="Username" val={siUser} onChange={v => { setSiUser(v); setSiErr(""); }} placeholder="your username" />
          <Field lbl="Password" type="password" val={siPass} onChange={v => { setSiPass(v); setSiErr(""); }} placeholder="your password" />
          {siErr ? <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:12,padding:"10px 14px",fontSize:14,color:"#dc2626",marginBottom:14,textAlign:"left"}}>&#9888;&#65039; {siErr}</div> : null}
          <div style={{textAlign:"right",marginBottom:14}}>
            <span style={{fontSize:13,color:"#0284c7",cursor:"pointer"}} onClick={() => showToast("Reset link sent to your phone.")}>Forgot password?</span>
          </div>
          <button style={S.btnBlue}  onClick={doLogin}>Sign in &#8594;</button>
          <button style={S.btnGhost} onClick={() => goTo("onboard")}>Create an account instead</button>
        </div>
      </div>
    );

    case "home": {
      const favs = contacts.filter(c => c.fav);
      return (
        <div style={{...S.page,display:"flex",flexDirection:"column"}}>
          <div style={S.topBar}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:12,color:"#0284c7"}}>{greet()}</div>
                <div style={{fontSize:20,fontWeight:700,color:"#0c4a6e"}}>{profile.name ? "Hello, "+profile.name+"!" : "Let's connect!"}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <img src={LOGO} style={{width:28,height:30,objectFit:"contain"}} alt="" />
                <button onClick={() => goTo("settings")} style={{background:"rgba(255,255,255,0.55)",border:CARDB,borderRadius:"50%",width:34,height:34,color:"#0369a1",fontSize:16,cursor:"pointer"}}>&#9881;</button>
              </div>
            </div>
          </div>
          <div style={{flex:1,padding:"14px 0"}}>
            {!favs.length ? (
              <div style={{textAlign:"center",padding:"50px 28px",color:"#0284c7",fontSize:15,lineHeight:2.1}}>
                <div style={{fontSize:40,marginBottom:12}}>&#11088;</div>
                No favourites yet.<br/>Go to <b style={{color:"#0c4a6e"}}>Contacts</b> and tap &#9734; to add.
              </div>
            ) : (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,padding:"0 14px"}}>
                {favs.map(c => (
                  <div key={c.id} onClick={() => goTo("contact-call-"+c.id)}
                    style={{background:CARD,backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",border:CARDB,borderRadius:22,padding:"18px 12px",textAlign:"center",cursor:"pointer",position:"relative"}}>
                    <span style={{position:"absolute",top:10,right:12,fontSize:14}}>&#11088;</span>
                    <div style={{width:62,height:62,borderRadius:"50%",background:c.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,color:"#fff",margin:"0 auto 10px"}}>{inits(c.name)}</div>
                    <div style={{fontSize:15,fontWeight:700,color:"#0c4a6e"}}>{c.name}</div>
                    <div style={{fontSize:11,color:"#0284c7",marginTop:2}}>{c.phone||c.famUser||""}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <TabBar active={activeTab} onTab={goTab} missedCount={missedCount} />
        </div>
      );
    }

    case "recents": return (
      <div style={{...S.page,display:"flex",flexDirection:"column"}}>
        <div style={S.topBar}><div style={{fontSize:20,fontWeight:700,color:"#0c4a6e"}}>Recent Calls</div></div>
        <div style={{flex:1,padding:"12px 14px"}}>
          {!recents.length ? (
            <div style={{textAlign:"center",padding:40,color:"#0284c7",fontSize:15}}>No recent calls yet</div>
          ) : recents.map((r,i) => {
            const isMissedR = r.dur === "Missed" || r.dur === "No answer";
            return (
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:13,background:isMissedR?"rgba(239,68,68,0.07)":CARD,backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",border:isMissedR?"1px solid rgba(239,68,68,0.2)":CARDB,borderRadius:16,marginBottom:10}}>
                <span style={{fontSize:24}}>{isMissedR ? "\uD83D\uDCF5" : r.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:700,color:isMissedR?"#dc2626":"#0c4a6e"}}>{r.name}</div>
                  <div style={{fontSize:12,color:isMissedR?"#ef4444":"#0284c7"}}>{r.time} · <b>{r.dur}</b></div>
                </div>
                <button onClick={() => { const c=contacts.find(x=>x.name===r.name); if(c) goTo("contact-call-"+c.id); else showToast("Add "+r.name+" to contacts first"); }}
                  style={{...S.btnBlue,width:"auto",padding:"9px 16px",fontSize:14,marginBottom:0}}>
                  {isMissedR ? "Call back" : "Call"}
                </button>
              </div>
            );
          })}
        </div>
        <TabBar active={activeTab} onTab={goTab} missedCount={missedCount} />
      </div>
    );

    case "contacts": return (
      <div style={{...S.page,display:"flex",flexDirection:"column"}}>
        <div style={S.topBar}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <div style={{fontSize:20,fontWeight:700,color:"#0c4a6e"}}>Contacts</div>
            <button style={{...S.btnBlue,width:"auto",padding:"9px 16px",fontSize:14,marginBottom:0}}
              onClick={() => { setNcName(""); setNcUser(""); setNcPhone(""); setNcNick(""); setNcFav(false); goTo("add-contact"); }}>+ Add</button>
          </div>
          <div style={{position:"relative"}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:15,pointerEvents:"none"}}>&#128269;</span>
            <input style={{...S.inp,paddingLeft:36}} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contacts..." />
          </div>
        </div>
        <div style={{flex:1,padding:"0 14px 14px"}}>
          {(() => {
            const f = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || (c.famUser||"").includes(search.toLowerCase()) || (c.phone||"").includes(search));
            if (!f.length) return <div style={{textAlign:"center",padding:"40px 20px",color:"#0284c7",fontSize:15,lineHeight:1.8}}>{contacts.length ? "No results" : "No contacts yet.\nTap + Add to get started!"}</div>;
            return f.map(c => (
              <div key={c.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid rgba(14,165,233,0.15)"}}>
                <div style={{width:46,height:46,borderRadius:"50%",background:c.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:"#fff",flexShrink:0}}>{inits(c.name)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:15,fontWeight:700,color:"#0c4a6e",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}{c.fav?" ⭐":""}</div>
                  <div style={{fontSize:11,color:"#0284c7"}}>@{c.famUser||"no username"} {c.phone ? "· "+c.phone : ""}</div>
                </div>
                <div style={{display:"flex",gap:7,flexShrink:0}}>
                  {[
                    ["&#128222;", () => goTo("contact-call-"+c.id),                                               "rgba(14,165,233,0.15)"],
                    [c.fav?"&#9733;":"&#9734;", () => toggleFav(c.id),                                            c.fav?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.55)"],
                    ["&#9998;&#65039;", () => { setEditId(c.id); setEcName(c.name); setEcUser(c.famUser||""); setEcPhone(c.phone||""); setEcFav(c.fav); goTo("edit"); }, "rgba(255,255,255,0.55)"],
                    ["&#128465;&#65039;", () => setModal(c.id),                                                    "rgba(239,68,68,0.12)"],
                  ].map(([icon,fn,bg],i) => (
                    <button key={i} onClick={fn} style={{width:35,height:35,borderRadius:"50%",border:CARDB,background:bg,fontSize:15,cursor:"pointer"}} dangerouslySetInnerHTML={{__html:icon}} />
                  ))}
                </div>
              </div>
            ));
          })()}
        </div>
        <TabBar active={activeTab} onTab={goTab} missedCount={missedCount} />
      </div>
    );

    case "more": return (
      <div style={{...S.page,display:"flex",flexDirection:"column"}}>
        <div style={S.topBar}><div style={{fontSize:20,fontWeight:700,color:"#0c4a6e"}}>More</div></div>
        <div style={{flex:1,padding:"12px 14px"}}>
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:700,color:"#0c4a6e",marginBottom:12}}>Quick Actions</div>
            <button style={S.btnTeal} onClick={() => { setSelGrp([]); goTo("group-setup"); }}>&#128222; Start Group Call</button>
            <button style={S.btnGhost} onClick={() => goTo("settings")}>&#9881;&#65039; Settings</button>
          </div>
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:700,color:"#0c4a6e",marginBottom:10}}>&#129302; AI Help</div>
            <button style={S.btnBlue} onClick={() => goTo("ai-help")}>Open AI Assistant</button>
          </div>
          <div style={S.card}>
            <div style={{fontSize:15,fontWeight:700,color:"#0c4a6e",marginBottom:10}}>&#128225; How Calling Works</div>
            <p style={{fontSize:14,color:"#0369a1",lineHeight:1.8,marginBottom:10}}>
              Calls are <b>free over Wi-Fi</b> using the same technology as WhatsApp.<br/><br/>
              To call someone:<br/>
              1. Add them as a contact with their <b>Famtime username</b><br/>
              2. Make sure they also have Famtime open<br/>
              3. Tap their name and press <b>Call</b>
            </p>
            <div style={{background:"rgba(14,165,233,0.1)",border:"1px solid rgba(14,165,233,0.2)",borderRadius:12,padding:10,fontSize:13,color:"#0284c7",lineHeight:1.9}}>
              &#10003; Free over Wi-Fi &nbsp;&#183;&nbsp; &#10003; No phone bill &nbsp;&#183;&nbsp; &#10003; Encrypted
            </div>
          </div>
          <div style={S.card}>
            <div style={{fontSize:14,color:"#0369a1",lineHeight:1.7}}>
              <b style={{color:"#0c4a6e"}}>Your Famtime username:</b><br/>
              <span style={{fontSize:18,fontWeight:700,color:"#0284c7",letterSpacing:1}}>@{profile.user||"—"}</span><br/>
              <span style={{fontSize:13}}>Share this with family so they can call you.</span>
            </div>
          </div>
        </div>
        <TabBar active={activeTab} onTab={goTab} missedCount={missedCount} />
      </div>
    );

    // ── CONTACT CALL SCREEN (pre-call) ─────────────────────────────
    default: {
      // Handle "contact-call-ID" screens
      if (screen.startsWith("contact-call-")) {
        const cid = parseInt(screen.replace("contact-call-",""));
        const c = contacts.find(x => x.id === cid);
        if (!c) return <div style={{padding:20}}>Contact not found</div>;
        return (
          <div style={{...S.page,display:"flex",flexDirection:"column"}}>
            <BackBtn onBack={goBack} title="Call" />
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 20px 20px",gap:16}}>
              <div style={{width:90,height:90,borderRadius:"50%",background:c.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,fontWeight:700,color:"#fff",border:"3px solid rgba(255,255,255,0.7)"}}>{inits(c.name)}</div>
              <div style={{fontSize:24,fontWeight:700,color:"#0c4a6e"}}>{c.name}</div>
              <div style={{fontSize:14,color:"#0284c7"}}>@{c.famUser||"no username set"}</div>
              {!c.famUser && (
                <div style={{background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.3)",borderRadius:14,padding:"12px 16px",fontSize:14,color:"#92400e",textAlign:"center",width:"100%"}}>
                  &#9888;&#65039; No Famtime username set for this contact.<br/>
                  <span style={{cursor:"pointer",color:"#d97706",fontWeight:600}} onClick={() => { setEditId(c.id); setEcName(c.name); setEcUser(c.famUser||""); setEcPhone(c.phone||""); setEcFav(c.fav); goTo("edit"); }}>Tap here to add their username &#8594;</span>
                </div>
              )}
              <div style={{display:"flex",gap:16,width:"100%"}}>
                <button onClick={() => doCall(c.id, false)} style={{...S.btnTeal,flex:1,fontSize:18,padding:18,marginBottom:0}}>&#128222; Voice</button>
                <button onClick={() => doCall(c.id, true)}  style={{...S.btnBlue,flex:1,fontSize:18,padding:18,marginBottom:0}}>&#128249; Video</button>
              </div>
            </div>
          </div>
        );
      }
      return <div style={{padding:20,color:"#0c4a6e",fontSize:16}}>Loading...</div>;
    }

    // ── ACTIVE CALL SCREEN ─────────────────────────────────────────
    case "call-active": return (
      <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0369a1,#0284c7,#0c4a6e)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:20,position:"relative"}}>
        <video ref={remoteVid} autoPlay playsInline style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",width:"100%",height:"100%",objectFit:"cover",opacity:0,transition:"opacity .5s"}} />
        <video ref={localVid}  autoPlay muted playsInline style={{position:"absolute",bottom:110,right:14,width:90,height:124,objectFit:"cover",borderRadius:12,border:"2px solid rgba(255,255,255,0.4)",display:"none",zIndex:2}} />
        <div style={{position:"relative",zIndex:3,display:"flex",flexDirection:"column",alignItems:"center",gap:14,width:"100%"}}>
          <div style={{width:104,height:104,borderRadius:"50%",background:callee?callee.color:GRAD[0],display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,fontWeight:700,color:"#fff",border:"3px solid rgba(255,255,255,0.4)",boxShadow:"0 0 0 10px rgba(255,255,255,0.1)"}}>
            {callee ? inits(callee.name) : "?"}
          </div>
          <div style={{fontSize:26,fontWeight:800,color:"#fff"}}>{callee ? callee.name : "—"}</div>
          {callActive
            ? <div style={{fontSize:20,color:"rgba(255,255,255,0.9)",fontVariantNumeric:"tabular-nums"}}>{fmtSec(callSecs)}</div>
            : <div style={{fontSize:14,color:"rgba(255,255,255,0.7)",fontStyle:"italic",textAlign:"center"}}>{callStatus}</div>
          }
          <div style={{display:"flex",gap:20}}>
            <button onClick={() => { const m=!isMuted; setIsMuted(m); if(localSt.current) localSt.current.getAudioTracks().forEach(t=>t.enabled=!m); }}
              style={{width:64,height:64,borderRadius:"50%",border:"none",fontSize:24,cursor:"pointer",background:isMuted?"rgba(59,130,246,0.5)":"rgba(255,255,255,0.18)"}}>
              {isMuted?"&#128263;":"&#127908;"}
            </button>
            <button onClick={endCall} style={{width:64,height:64,borderRadius:"50%",border:"none",fontSize:24,cursor:"pointer",background:"linear-gradient(135deg,#ef4444,#b91c1c)",boxShadow:"0 4px 20px rgba(239,68,68,0.4)"}}>
              &#128245;
            </button>
            <button style={{width:64,height:64,borderRadius:"50%",border:"none",fontSize:24,cursor:"pointer",background:"rgba(255,255,255,0.18)"}}>&#128266;</button>
            <button onClick={() => { if(localSt.current) localSt.current.getVideoTracks().forEach(t=>t.enabled=!t.enabled); }}
              style={{width:64,height:64,borderRadius:"50%",border:"none",fontSize:24,cursor:"pointer",background:"rgba(255,255,255,0.18)"}}>&#128249;</button>
          </div>
        </div>
      </div>
    );

    case "group-setup": return (
      <div style={S.page}>
        <BackBtn onBack={goBack} title="Group Call Setup" />
        <div style={S.card}>
          <p style={{fontSize:15,color:"#0369a1",marginBottom:14}}>Select people to include:</p>
          {!contacts.length && <div style={{color:"#0284c7",fontSize:14}}>No contacts yet — add some first!</div>}
          {contacts.map(c => {
            const sel = selGrp.includes(c.id);
            return (
              <div key={c.id} onClick={() => setSelGrp(g => sel?g.filter(x=>x!==c.id):[...g,c.id])}
                style={{display:"flex",alignItems:"center",gap:12,padding:12,borderRadius:14,cursor:"pointer",marginBottom:8,background:sel?"rgba(14,165,233,0.2)":CARD,border:sel?"1.5px solid #0ea5e9":CARDB,transition:"all .15s"}}>
                <div style={{width:42,height:42,borderRadius:"50%",background:c.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff"}}>{inits(c.name)}</div>
                <div style={{flex:1,fontSize:16,fontWeight:600,color:"#0c4a6e"}}>{c.name}</div>
                <div style={{width:24,height:24,borderRadius:"50%",background:sel?"#0ea5e9":"transparent",border:"1.5px solid "+(sel?"#0ea5e9":"rgba(14,165,233,0.3)"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#fff",fontWeight:700}}>{sel?"✓":""}</div>
              </div>
            );
          })}
          <button style={{...S.btnTeal,marginTop:8}} onClick={launchGroup}>Start Group Call &#128222;</button>
        </div>
      </div>
    );

    case "group-call": return (
      <div style={{background:"linear-gradient(160deg,#0369a1,#0284c7,#0c4a6e)",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"16px 18px",display:"flex",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,0.2)"}}>
          <div style={{fontSize:18,fontWeight:700,color:"#fff"}}>Group Call</div>
          <div style={{fontSize:15,color:"rgba(255,255,255,0.8)",fontVariantNumeric:"tabular-nums"}}>{fmtSec(grpSecs)}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,flex:1,padding:"10px 12px"}}>
          {[{name:"You",self:true,color:GRAD[0]},...selGrp.map(id=>contacts.find(x=>x.id===id)).filter(Boolean)].map((c,i)=>(
            <div key={i} style={{borderRadius:16,background:"rgba(255,255,255,0.15)",border:c.self?"1.5px solid rgba(255,255,255,0.5)":"1.5px solid rgba(255,255,255,0.2)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:7,aspectRatio:"1"}}>
              <div style={{width:52,height:52,borderRadius:"50%",background:c.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:700,color:"#fff"}}>{c.self?"Me":inits(c.name)}</div>
              <div style={{fontSize:13,color:"#fff",fontWeight:600}}>{c.name}</div>
              <div style={{fontSize:10,color:c.self?"#7dd3fc":"#86efac"}}>&#9679; {c.self?"You":"Joined"}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:18,justifyContent:"center",padding:20}}>
          {[["&#127908;",()=>{}],["&#128245;",()=>{clearInterval(grpTimer.current);goBack();},"linear-gradient(135deg,#ef4444,#b91c1c)"],["&#128266;",()=>{}],["&#10133;",()=>goTo("group-setup")]].map(([icon,fn,bg],i)=>(
            <button key={i} onClick={fn} style={{width:62,height:62,borderRadius:"50%",border:"none",fontSize:22,cursor:"pointer",background:bg||"rgba(255,255,255,0.2)"}} dangerouslySetInnerHTML={{__html:icon}} />
          ))}
        </div>
      </div>
    );

    case "settings": return (
      <div style={S.page}>
        <BackBtn onBack={goBack} title="Settings" />
        <div style={S.card}>
          <div style={{fontSize:15,fontWeight:700,color:"#0c4a6e",marginBottom:16}}>&#128100; Your Profile</div>
          {[["Name",(profile.name+" "+(profile.last||"")).trim()||"—"],["Username","@"+(profile.user||"—")],["Phone",profile.phone||"—"],["Location",profile.loc||"—"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid rgba(14,165,233,0.12)"}}>
              <span style={{fontSize:14,color:"#0369a1"}}>{k}</span>
              <b style={{fontSize:14,color:"#0c4a6e"}}>{v}</b>
            </div>
          ))}
          <div style={{marginTop:14,background:"rgba(14,165,233,0.08)",border:"1px solid rgba(14,165,233,0.2)",borderRadius:12,padding:"10px 14px",fontSize:13,color:"#0369a1"}}>
            &#128161; Share your username <b>@{profile.user}</b> with family so they can add you as a contact and call you.
          </div>
          <button style={{...S.btnRed,marginTop:16}} onClick={logout}>Sign out</button>
        </div>
      </div>
    );

    case "add-contact": return (
      <div style={S.page}>
        <BackBtn onBack={goBack} title="Add Contact" />
        <div style={S.card}>
          <Field lbl="Full name *"                 val={ncName}  onChange={setNcName}  placeholder="e.g. Victor Brown" />
          <Field lbl="Their Famtime username *"     val={ncUser}  onChange={setNcUser}  placeholder="ask them to check Settings" />
          <Field lbl="Phone number (optional)" type="tel" val={ncPhone} onChange={setNcPhone} placeholder="+1 555 000 0000" />
          <Field lbl="Nickname (optional)"          val={ncNick}  onChange={setNcNick}  placeholder="e.g. Dad, Sister..." />
          <label style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer",fontSize:15,color:"#0369a1",marginBottom:18}}>
            <input type="checkbox" checked={ncFav} onChange={e=>setNcFav(e.target.checked)} style={{width:20,height:20,accentColor:"#0ea5e9"}} />
            Add to Favourites &#11088;
          </label>
          <div style={{background:"rgba(14,165,233,0.08)",border:"1px solid rgba(14,165,233,0.2)",borderRadius:12,padding:"10px 14px",fontSize:13,color:"#0369a1",marginBottom:16,lineHeight:1.6}}>
            &#128161; The <b>Famtime username</b> is needed to call over Wi-Fi. Ask the person to open Famtime &#8594; More &#8594; they will see their username there.
          </div>
          <button style={S.btnBlue} onClick={addContact}>Save Contact ✓</button>
        </div>
      </div>
    );

    case "edit": return (
      <div style={S.page}>
        <BackBtn onBack={goBack} title="Edit Contact" />
        <div style={S.card}>
          <Field lbl="Full name"                  val={ecName}  onChange={setEcName} />
          <Field lbl="Their Famtime username"      val={ecUser}  onChange={setEcUser}  placeholder="their @username" />
          <Field lbl="Phone number" type="tel"    val={ecPhone} onChange={setEcPhone} />
          <label style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer",fontSize:15,color:"#0369a1",marginBottom:18}}>
            <input type="checkbox" checked={ecFav} onChange={e=>setEcFav(e.target.checked)} style={{width:20,height:20,accentColor:"#0ea5e9"}} />
            Favourite &#11088;
          </label>
          <button style={S.btnBlue}  onClick={saveEdit}>Save Changes ✓</button>
          <button style={S.btnRed}   onClick={() => setModal(editId)}>&#128465;&#65039; Delete Contact</button>
        </div>
      </div>
    );

    case "ai-help": return (
      <div style={{...S.page,display:"flex",flexDirection:"column"}}>
        <div style={{...S.topBar,display:"flex",alignItems:"center",gap:12}}>
          <button onClick={goBack} style={{background:"rgba(255,255,255,0.55)",border:CARDB,borderRadius:"50%",width:36,height:36,color:"#0369a1",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>&#8592;</button>
          <span style={{fontSize:19,fontWeight:700,color:"#0c4a6e"}}>&#129302; AI Assistant</span>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:12}}>
          {aiChat.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.who==="ai"?"flex-start":"flex-end",marginBottom:10}}>
              <div style={{maxWidth:"85%",padding:"12px 16px",borderRadius:m.who==="ai"?"4px 18px 18px 18px":"18px 4px 18px 18px",background:m.who==="ai"?CARD:"linear-gradient(135deg,#0ea5e9,#0284c7)",border:m.who==="ai"?CARDB:"none",backdropFilter:m.who==="ai"?"blur(14px)":"none",WebkitBackdropFilter:m.who==="ai"?"blur(14px)":"none",color:m.who==="ai"?"#0c4a6e":"#fff",fontSize:14,lineHeight:1.75,whiteSpace:"pre-line"}}>
                {m.txt}
              </div>
            </div>
          ))}
        </div>
        <div style={{padding:12,background:"rgba(255,255,255,0.6)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",borderTop:"1px solid rgba(255,255,255,0.7)"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:10}}>
            {["How to call?","Add a contact","Missed calls","My username","Forgot password?"].map(chip => (
              <div key={chip} onClick={() => { const key=Object.keys(AI_ANS).find(k=>chip.toLowerCase().includes(k))||"default"; setAiChat(c=>[...c,{who:"user",txt:chip},{who:"ai",txt:AI_ANS[key]}]); }}
                style={{padding:"7px 12px",borderRadius:50,background:"rgba(14,165,233,0.12)",border:"1px solid rgba(14,165,233,0.28)",color:"#0284c7",fontSize:12,cursor:"pointer",whiteSpace:"nowrap"}}>{chip}</div>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <input value={aiChatInp} onChange={e=>setAiChatInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendAiMsg()} placeholder="Ask anything..." style={{...S.inp,borderRadius:50,flex:1,fontSize:15}} />
            <button onClick={sendAiMsg} style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#0ea5e9,#0284c7)",border:"none",fontSize:20,cursor:"pointer"}}>&#10148;</button>
          </div>
        </div>
      </div>
    );

    }
  };

  // ── INCOMING CALL OVERLAY ─────────────────────────────────────────
  const IncomingCallUI = () => {
    if (!incomingCall) return null;
    const { callerName } = incomingCall;
    // Find contact by username if possible
    const c = contacts.find(x => (x.famUser||"").toLowerCase() === (incomingCall.callerUser||"").toLowerCase());
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(3,105,161,0.95)",backdropFilter:"blur(8px)",zIndex:900,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:24}}>
        <div style={{fontSize:14,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",letterSpacing:1,fontWeight:600}}>Incoming Call</div>
        <div style={{width:100,height:100,borderRadius:"50%",background:c?c.color:GRAD[1],display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,fontWeight:700,color:"#fff",border:"4px solid rgba(255,255,255,0.4)",animation:"pulse 1.5s infinite",boxShadow:"0 0 0 0 rgba(255,255,255,0.4)"}}>
          {inits(callerName)}
        </div>
        <div style={{fontSize:28,fontWeight:800,color:"#fff"}}>{callerName}</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,0.65)"}}>Famtime call</div>
        <div style={{display:"flex",gap:24,marginTop:10}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
            <button onClick={declineCall} style={{width:72,height:72,borderRadius:"50%",border:"none",background:"linear-gradient(135deg,#ef4444,#b91c1c)",fontSize:28,cursor:"pointer",boxShadow:"0 4px 20px rgba(239,68,68,0.5)"}}>&#128245;</button>
            <span style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>Decline</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
            <button onClick={() => answerCall(false)} style={{width:72,height:72,borderRadius:"50%",border:"none",background:"linear-gradient(135deg,#22c55e,#16a34a)",fontSize:28,cursor:"pointer",boxShadow:"0 4px 20px rgba(34,197,94,0.5)"}}>&#127908;</button>
            <span style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>Voice</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
            <button onClick={() => answerCall(true)} style={{width:72,height:72,borderRadius:"50%",border:"none",background:"linear-gradient(135deg,#0ea5e9,#0284c7)",fontSize:28,cursor:"pointer",boxShadow:"0 4px 20px rgba(14,165,233,0.5)"}}>&#128249;</button>
            <span style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>Video</span>
          </div>
        </div>
        <style>{`@keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,0.4)} 50%{box-shadow:0 0 0 18px rgba(255,255,255,0)} }`}</style>
      </div>
    );
  };

  return (
    <div style={{fontFamily:"system-ui,sans-serif",background:BG,minHeight:"100vh",maxWidth:430,margin:"0 auto"}}>
      {renderScreen()}
      <IncomingCallUI />
      {toast ? (
        <div style={{position:"fixed",bottom:84,left:"50%",transform:"translateX(-50%)",background:"rgba(12,74,110,0.92)",backdropFilter:"blur(12px)",color:"#fff",padding:"11px 22px",borderRadius:50,fontSize:14,whiteSpace:"nowrap",zIndex:800,pointerEvents:"none",boxShadow:"0 4px 20px rgba(12,74,110,0.4)"}}>
          {toast}
        </div>
      ) : null}
      {modal !== null ? (
        <div onClick={() => setModal(null)} style={{position:"fixed",inset:0,background:"rgba(12,74,110,0.45)",backdropFilter:"blur(4px)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"rgba(255,255,255,0.92)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:CARDB,borderRadius:"24px 24px 0 0",padding:26,width:"100%",maxWidth:430}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:36,marginBottom:10}}>&#128465;&#65039;</div>
              <div style={{fontSize:18,fontWeight:700,color:"#0c4a6e",marginBottom:8}}>Delete {contacts.find(x=>x.id===modal)?.name}?</div>
              <p style={{fontSize:14,color:"#0369a1",marginBottom:20}}>This cannot be undone.</p>
              <button style={S.btnRed}   onClick={() => delContact(modal)}>Yes, Delete</button>
              <button style={S.btnGhost} onClick={() => setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
