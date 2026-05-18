const fs = require('fs');

const fixImport = (filePath, searchRegex, replacement) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(searchRegex, replacement);
    fs.writeFileSync(filePath, content);
  }
};

fixImport('src/App.tsx', /import \{ ModuleType \} from '.\/components\/Layout\/Header';/, "import type { ModuleType } from './components/Layout/Header';");
fixImport('src/components/Preview/PreviewArea.tsx', /import \{ FontConfig, LetterConfig \} from '..\/..\/utils\/constants';/, "import type { FontConfig, LetterConfig } from '../../utils/constants';");
fixImport('src/components/Sidebar/Sidebar.tsx', /import \{ GridConfig \} from '..\/..\/utils\/calcGrid';/, "import type { GridConfig } from '../../utils/calcGrid';");
fixImport('src/components/Sidebar/SidebarControls.tsx', /import \{ GridConfig \} from '..\/..\/utils\/calcGrid';/, "import type { GridConfig } from '../../utils/calcGrid';");
fixImport('src/hooks/useLetters.ts', /import \{ LetterConfig \} from '\.\.\/utils\/constants';/, "import type { LetterConfig } from '../utils/constants';");
fixImport('src/utils/drawBubbleLetter.ts', /import \{ DrawOptions \} from '\.\/constants';/, "import type { DrawOptions } from './constants';");

fixImport('src/modules/sorteador/components/InputPanel.tsx', /import \{ SorteioMode \} from '\.\.\/types\/sorteador.types';/, "import type { SorteioMode } from '../types/sorteador.types';");
fixImport('src/modules/sorteador/components/ResultList.tsx', /import \{ Entry \} from '\.\.\/types\/sorteador.types';/, "import type { Entry } from '../types/sorteador.types';");
fixImport('src/modules/sorteador/hooks/useSorteador.ts', /import \{ Entry, SorteioMode, SorteadorState \} from '\.\.\/types\/sorteador.types';/, "import type { Entry, SorteioMode, SorteadorState } from '../types/sorteador.types';");
fixImport('src/modules/sorteador/utils/parseEntries.ts', /import \{ Entry \} from '\.\.\/types\/sorteador.types';/, "import type { Entry } from '../types/sorteador.types';");

