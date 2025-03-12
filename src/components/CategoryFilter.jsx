import { motion } from 'framer-motion';

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="overflow-x-auto py-2 px-4">
      <div className="flex gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition-colors
              ${selected === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600'}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
} 