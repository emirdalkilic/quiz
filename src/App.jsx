import React, { useMemo, useRef, useState } from "react";

// BACKGROUND
import bg from "./images/bg.jpg";

// QUESTION IMAGES
import p1 from "./images/person1.jpg";
import p2 from "./images/person2.jpg";
import p3 from "./images/person3.jpg";
import p4 from "./images/person4.jpg";
import p5 from "./images/person5.jpg";
import p6 from "./images/person6.jpg";
import p7 from "./images/person7.jpg";
import p8 from "./images/person8.jpg";
import p9 from "./images/person9.jpg";

const QUESTIONS = [
  { id: 1, image: p1, options: ["Kişi A","Kişi B","Kişi C","Kişi D"], correctIndex: 0 },
  { id: 2, image: p2, options: ["Kişi A","Kişi B","Kişi C","Kişi D"], correctIndex: 1 },
  { id: 3, image: p3, options: ["Kişi A","Kişi B","Kişi C","Kişi D"], correctIndex: 2 },
  { id: 4, image: p4, options: ["Kişi A","Kişi B","Kişi C","Kişi D"], correctIndex: 3 },
  { id: 5, image: p5, options: ["Kişi A","Kişi B","Kişi C","Kişi D"], correctIndex: 0 },
  { id: 6, image: p6, options: ["Kişi A","Kişi B","Kişi C","Kişi D"], correctIndex: 1 },
  { id: 7, image: p7, options: ["Kişi A","Kişi B","Kişi C","Kişi D"], correctIndex: 2 },
  { id: 8, image: p8, options: ["Kişi A","Kişi B","Kişi C","Kişi D"], correctIndex: 3 },
  { id: 9, image: p9, options: ["Kişi A","Kişi B","Kişi C","Kişi D"], correctIndex: 0 },
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

  const handlePick = (qId, idx, index) => {
    setAnswers(prev => {
      if (prev[qId] !== undefined) return prev;
      return { ...prev, [qId]: idx };
    });

    const q = QUESTIONS[index];
    const isWrong = idx !== q.correctIndex;
    const isLastQuestion = index === total - 1;
    if (isWrong && !isLastQuestion) {
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
      return base + " bg-white hover:bg-zinc-900 hover:text-white hover:border-slate-900";

    if (idx === q.correctIndex) return base + " bg-emerald-200";
    if (idx === picked) return base + " bg-rose-200";
    return base + " bg-white opacity-60";
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      {/* NET BACKGROUND (blur YOK) */}
      <div
        className="fixed inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${bg})` }}
      />
      {/* Koyu overlay */}
      <div className="fixed inset-0 bg-black/60" />

      {/* CONTENT */}
      <div className="relative z-10">
        <div className="w-screen flex justify-center px-4 py-10">
          <div className="w-full max-w-5xl">
            <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-16 text-white">
              AİLE 3 REBORN QUIZ
            </h1>

            {QUESTIONS.map((q, i) => (
              <div
                key={q.id}
                ref={el => (questionRefs.current[i] = el)}
                className="mb-20 backdrop-blur-sm rounded-3xl p-6 md:p-8"
              >
                <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-8 text-white">
                  BU KİŞİ KİMDİR?
                </h2>

                <div className="flex justify-center mb-10">
                  <img
                    src={q.image}
                    alt=""
                    className="max-h-[420px] max-w-full rounded-2xl border object-contain transition-transform duration-300 hover:scale-[1.03]"
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

        {/* WRONG ANSWER POPUP (son soruda açılmaz) */}
        {showWrongPopup && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-pointer"
            onClick={() => setShowWrongPopup(false)}
          >
            <div className="text-white text-6xl md:text-8xl font-extrabold animate-pulse">
              VAY MAL :D
            </div>
          </div>
        )}

        {/* SCORE POPUP */}
        {allDone && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-pointer"
            onClick={() => window.location.reload()}
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
