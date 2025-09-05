import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createSelectorForStore } from '@/shared/utils/createSelectorForStore';

import { type ProgramRepository } from '../repositories/program.repository';

const programStore = create<ProgramRepository>()(
  persist(
    set => ({
      isRunning: false,
      setIsRunning: (isRunning: boolean) => set({ isRunning }),
      sourceCode: '',
      setSourceCode: (code: string) => set({ sourceCode: code }),
    }),
    {
      name: 'program',
    }
  )
);

export default createSelectorForStore(programStore);
