import programStore from '@/infrastructure/store/program.store';

const InoEditor = () => {
  const setSourceCode = programStore.use.setSourceCode();
  const sourceCode = programStore.use.sourceCode();

  return (
    <textarea
      className='flex-1 p-4 bg-gray-900 text-white resize-none'
      value={sourceCode}
      onChange={e => setSourceCode(e.target.value)}
    />
  );
};

export default InoEditor;
