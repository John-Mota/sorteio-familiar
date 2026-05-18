import { useState, useCallback } from 'react';
import Layout from './components/Layout/Layout';
import type { ModuleType } from './components/Layout/Header';

// Molde Alfabeto imports
import Sidebar from './components/Sidebar/Sidebar';
import PreviewArea from './components/Preview/PreviewArea';
import { useLetters } from './hooks/useLetters';
import { useGrid } from './hooks/useGrid';
import { FONTS } from './utils/constants';

// Sorteador imports
import SorteadorLayout from './modules/sorteador/components/SorteadorLayout';

const DEFAULT_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('sorteador');

  // Molde Alfabeto states
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
    <Layout activeModule={activeModule} onModuleChange={setActiveModule}>
      {activeModule === 'sorteador' ? (
        <SorteadorLayout />
      ) : (
        <div className="flex h-full w-full overflow-hidden">
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
          <main className="flex-1 flex flex-col overflow-hidden bg-bg-base">
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
      )}
    </Layout>
  );
}

export default App;
