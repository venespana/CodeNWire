import { parse } from 'intel-hex';

export const compileProgram = async (args: { program: string; board: string }) => {
  const fetchResponse = await fetch('http://localhost:3001/api/build', {
    method: 'POST',
    body: JSON.stringify({ code: args.program, board: args.board }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await fetchResponse.json();

  return parse(data.binary);
};
