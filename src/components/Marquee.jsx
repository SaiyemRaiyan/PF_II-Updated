const WORDS = ['Generative AI', 'Agentic AI', 'Large Language Models', 'Bangla NLP', 'RAG', 'Vision-Language Models',
  'Explainable AI', 'Mixture of Experts', 'Transformers', 'Medical AI', 'PyTorch', 'LangChain'];

export default function Marquee() {
  const row = WORDS.map((w, i) => <span key={i}>{w}<i>✦</i></span>);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{row}{row}</div>
    </div>
  );
}
