import { checkDependencies } from '@main/features/doctor';
import { sendPong } from '@main/features/ping';

const IpcRouter = () => {
  sendPong();
  checkDependencies();
};

export default IpcRouter;
