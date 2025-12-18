import React, { useMemo, useRef, useState, useEffect } from "react";

import bg from "./images/bg.jpg";
import p1 from "./images/bugra.png";
import p2 from "./images/burhan.png";
import p3 from "./images/efe.png";
import p4 from "./images/ege.png";
import p5 from "./images/emir.png";
import p6 from "./images/nil.png";
import p7 from "./images/gultekin.png";
import p8 from "./images/safak.png";
import p9 from "./images/kubilay.png";
import p10 from "./images/eren.png";

const QUESTIONS = [
  { id: 1, image: p1, options: ["BUGRA","EGE","EREN","KUBILAY"], correctIndex: 0 },
  { id: 2, image: p2, options: ["EREN","EGE","EMIR","BURHAN"], correctIndex: 3 },
  { id: 3, image: p3, options: ["BUGRA","EFE","EGE","SAFAK"], correctIndex: 1 },
  { id: 4, image: p4, options: ["BUGRA","EMIR","BURHAN","EGE"], correctIndex: 3 },
  { id: 5, image: p5, options: ["EREN","BURHAN","EMIR","KUBILAY"], correctIndex: 2 },
  { id: 6, image: p6, options: ["SENA","NIL","TUGBA","GULBUKE"], correctIndex: 1 },
  { id: 7, image: p7, options: ["GULTEKIN","EFE","EREN","BURHAN"], correctIndex: 0 },
  { id: 8, image: p8, options: ["BUGRA","KUBILAY","EFE","SAFAK"], correctIndex: 3 },
  { id: 9, image: p9, options: ["KUBILAY","SAFAK","EREN","EMIR"], correctIndex: 0 },
  { id: 10, image: p10, options: ["BURHAN","GULTEKIN","EREN","EMIR"], correctIndex: 2 },
];

const SCORE_MESSAGES = {
  0: "BERAT MISIN LAN SEN YARRAK :D",
  1: "EGİSHKO QİYANASI GİBİ ÇİRKİNSİN :D",
  2: "ERENLE AYNI DAĞDA MI YAŞIYON BROM :D",
  3: "BERAT VE EMSALİ GİBİSİN :D",
  4: "ERENİN SIÇTIĞI SU DEPOSUNDAN Bİ FARKIN YOK BROM :D",
  5: "EGİSKO VE EDRUNUN SÖYLEDİĞİ ŞARKILAR GİBİ BİR BAŞARISIZLIK :D",
  6: "GECELERİ FİLM İZLEME ETKİNLİĞİNE DAVET ALABİLECEK KAPASİTEDESİN.",
  7: "FLEXLERDE TOPA GANK ATMAK KADAR AKILLICA SEÇİMLER YAPMIŞSIN.",
  8: "İSMAİL KARTAL SEVİYESİNE YAKIN BİR KİŞİLİKSİN.",
  9: "ORDERLARDA %100 WIN ALAN AUCHERA GİBİ HARİKASIN.",
  10: "KONGURATURLATONİS. HEPSİNİ BİLDİN DALYARAK :D",
};

export default function App() {
  const [answers, setAnswers] = useState({});
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const questionRefs = useRef([]);

  const total = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  const correctCount = useMemo(
    () => QUESTIONS.filter(q => answers[q.id] === q.correctIndex).length,
    [answers]
  );

  const allDone = answeredCount === total;

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const handlePick = (qId, idx, index) => {
    if (answers[qId] !== undefined) return;

    const q = QUESTIONS[index];
    const isWrong = idx !== q.correctIndex;
    const willFinishQuiz = answeredCount === total - 1;

    setAnswers(prev => ({ ...prev, [qId]: idx }));

    if (willFinishQuiz) {
      setShowWrongPopup(false);
    } else if (isWrong) {
      setShowWrongPopup(true);
    }

    setTimeout(() => {
      const next = questionRefs.current[index + 1];
      if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
  };

  const optionClass = (q, idx) => {
    const picked = answers[q.id];
    const answered = picked !== undefined;

    const base =
      "h-20 rounded-2xl border border-slate-900 text-slate-900 font-semibold flex items-center justify-center transition-all duration-300";

    if (!answered)
      return base + " bg-white hover:bg-zinc-700 hover:text-white hover:border-slate-900";

    if (idx === q.correctIndex) return base + " bg-emerald-200";
    if (idx === picked) return base + " bg-rose-200";
    return base + " bg-white opacity-60";
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="fixed inset-0 bg-black/60" />

      <div className="relative z-10">
        <div className="w-screen flex justify-center px-4 py-10">
          <div className="w-full max-w-5xl">
            <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-16 text-white">
              AİLE 3 REBORN QUIZ :D
            </h1>

            {QUESTIONS.map((q, i) => (
              <div
                key={q.id}
                ref={el => (questionRefs.current[i] = el)}
                className="mb-20 backdrop-blur-sm rounded-3xl p-6 md:p-8"
              >
                <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-8 text-white">
                  BU KİŞİ KİMDİR? :D
                </h2>

                <div className="flex justify-center mb-10">
                  <img
                    src={q.image}
                    alt=""
                    className="max-h-[420px] max-w-full rounded-2xl z-40 border border-black ct-contain transition-transform duration-300 hover:scale-[1.30]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={answers[q.id] !== undefined}
                      onClick={() => handlePick(q.id, idx, i)}
                      className={optionClass(q, idx)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showWrongPopup && !allDone && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-pointer"
            onClick={() => setShowWrongPopup(false)}
          >
            <div className="text-white text-6xl md:text-8xl font-extrabold animate-pulse">
              VAY MAL :D
            </div>
          </div>
        )}

        {allDone && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-pointer"
            onClick={() => {
              if ("scrollRestoration" in window.history) {
                window.history.scrollRestoration = "manual";
              }
              window.scrollTo(0, 0);
              window.location.reload();
            }}
          >
            <div className="text-white text-center px-6">
              <div className="text-5xl md:text-7xl font-extrabold mb-6">
                {correctCount}/{total} YAPTIN :D
              </div>
              <div className="text-xl md:text-2xl font-semibold max-w-3xl mx-auto">
                {SCORE_MESSAGES[correctCount]}
              </div>
              <div className="mt-8 text-sm opacity-70">
                herhangi bir yere bas :D 
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
