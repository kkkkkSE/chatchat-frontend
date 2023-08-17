import { AutoReply } from '../../types';

const findAutoReply = (autoReplies: AutoReply[], id: number) => {
  const index = autoReplies.findIndex((autoReply: AutoReply) => id === autoReply.id);

  return autoReplies[index];
};

export default findAutoReply;
