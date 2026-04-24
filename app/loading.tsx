export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-surface">
      <div className="relative w-24 h-24 mb-8">
        {/* Organic rotating blobs */}
        <div className="absolute inset-0 bg-primary/20 organic-blob-1 animate-[spin_4s_linear_infinite]"></div>
        <div className="absolute inset-2 bg-primary/40 organic-blob-2 animate-[spin_3s_linear_infinite_reverse]"></div>
        <div className="absolute inset-4 bg-primary organic-blob-1 animate-[spin_2s_linear_infinite]"></div>
      </div>
      
      <div className="text-center space-y-4">
        <h2 className="font-headline text-3xl font-black text-primary animate-pulse tracking-tight">
          Curating...
        </h2>
        <div className="flex gap-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-secondary animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
