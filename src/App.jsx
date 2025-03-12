import NewsReel from './components/NewsReel';

function App() {
  return (
    <div className="flex justify-center bg-black min-h-screen">
      <div className="w-full max-w-[430px] h-screen-safe overflow-hidden relative">
        {/* Logo */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4">
          <h1 className="text-2xl font-bold text-white text-center tracking-wider text-logo">
            Snapbits
          </h1>
        </div>
        <NewsReel />
      </div>
    </div>
  );
}

export default App;