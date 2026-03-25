const facts = [
  { label: 'Location', value: 'Celaya, Guanajuato · Parque Industrial Cuadritos' },
  { label: 'Pilot Campus', value: '15,000 m² deployed · 23 ha expansion ready' },
  { label: 'Compute', value: 'Deploying 4× NVIDIA H200 SXM5 141GB HBM3e' },
  { label: 'Energy', value: '7.3 MW trigeneración operational today' },
  { label: 'Expansion Path', value: 'Scalable to 100 MW' },
  { label: 'Gas Pipeline', value: '25 km private' },
  { label: 'Substation', value: '20 MVA own' },
  { label: 'Water', value: '3 industrial wells · PTAR 1,500 m³/day' },
  { label: 'Latency QRO', value: '5–12 ms measured' },
  { label: 'Latency CDMX', value: '18–28 ms measured' },
  { label: 'Latency Dallas', value: '42–55 ms measured' },
  { label: 'Dark Fiber Target', value: '<2 ms effective (IRU under evaluation)' },
  { label: 'IT Capacity', value: '2 MW IT Phase 1' },
  { label: 'Structure', value: 'SAPI de CV · EnergyCore · SPV' },
];

const FactsBar = () => (
  <div className="w-full bg-ignum-charcoal/60 border-y border-ignum-offwhite/10 overflow-hidden">
    <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap">
      {[...facts, ...facts].map((f, i) => (
        <div key={i} className="flex items-center gap-2 px-6 py-3 flex-shrink-0">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ignum-gray/50">{f.label}</span>
          <span className="font-mono text-xs text-ignum-copper font-medium">{f.value}</span>
          <span className="text-ignum-offwhite/10 mx-2">·</span>
        </div>
      ))}
    </div>
  </div>
);

export default FactsBar;
