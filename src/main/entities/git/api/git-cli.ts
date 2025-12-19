import { spawnSync } from 'node:child_process';

import { GitCLIStatus, type IGitCLI } from '../model/git-cli';

class GitCLI implements IGitCLI {
  constructor() {
    // Initialize Git CLI
  }

  async health(): Promise<GitCLIStatus> {
    const result = spawnSync('git', ['--version'], { encoding: 'utf8' });

    if (result.status !== 0) {
      return GitCLIStatus.NOT_FOUND;
    }

    console.log('Git version:', result.stdout?.trim());
    return GitCLIStatus.OK;
  }
}

export default new GitCLI();
