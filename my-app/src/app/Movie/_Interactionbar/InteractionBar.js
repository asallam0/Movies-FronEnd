import React from 'react';

const InteractionBar = () => {
  return (
    <div className="flex flex-wrap items-center justify-start space-x-2">
      {/* Like Button */}
      <button className="flex items-center text-white rounded-full px-3 py-1 border">
        <span>👍</span>
        <span className="ml-1">27</span>
      </button>

      {/* Dislike Button */}
      <button className="flex items-center text-white rounded-full px-3 py-1 border">
        <span>👎</span>
        <span className="ml-1">0</span>
      </button>

      {/* Emoji Button */}
      <button className="flex items-center text-white rounded-full px-3 py-1 border">
        <span>❤️</span>
        <span className="ml-1">14</span>
      </button>

      {/* Clap Button */}
      <button className="flex items-center text-white rounded-full px-3 py-1 border">
        <span>👏</span>
        <span className="ml-1">4</span>
      </button>

      {/* Star Button */}
      <button className="flex items-center text-white rounded-full px-3 py-1 border">
        <span>⭐</span>
        <span className="ml-1">4</span>
      </button>

      {/* Party Button */}
      <button className="flex items-center text-white rounded-full px-3 py-1 border">
        <span>🥳</span>
        <span className="ml-1">4</span>
      </button>
    </div>
  );
};

export default InteractionBar;