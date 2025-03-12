import NewsReel from './components/NewsReel';

function App() {
  return (
    <div className="flex justify-center bg-black min-h-screen">
      <div className="w-full max-w-[430px] h-screen-safe overflow-hidden">
        <NewsReel />
      </div>
    </div>
  );
}

export default App;