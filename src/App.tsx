import { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import PreviewArea from './components/Preview/PreviewArea';
import { useLetters } from './hooks/useLetters';
import { useGrid } from './hooks/useGrid';
import { FONTS } from './utils/constants';

const DEFAULT_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function App() {
  const [lettersRaw, setLettersRaw] = useState(DEFAULT_LETTERS);
  const [heightCm, setHeightCm] = useState(12);
  const [strokeWidth, setStrokeWidth] = useState(6);
  const [selectedFontIdx, setSelectedFontIdx] = useState(0);

  const letters = useLetters(lettersRaw);
  const grid = useGrid(heightCm);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const fontConfig = FONTS[selectedFontIdx];

  return (
    <div className="app-layout">
      <Sidebar
        lettersRaw={lettersRaw}
        onLettersChange={setLettersRaw}
        selectedFontIdx={selectedFontIdx}
        onFontChange={setSelectedFontIdx}
        heightCm={heightCm}
        onHeightChange={setHeightCm}
        grid={grid}
        strokeWidth={strokeWidth}
        onStrokeChange={setStrokeWidth}
        onPrint={handlePrint}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <PreviewArea
          letters={letters}
          cols={grid.cols}
          rows={grid.rows}
          perPage={grid.perPage}
          heightCm={heightCm}
          fontConfig={fontConfig}
          strokeWidth={strokeWidth}
        />
      </main>
    </div>
  );
}

export default App;
