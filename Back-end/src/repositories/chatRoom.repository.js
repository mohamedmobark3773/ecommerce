import BaseRepository from './base.repository.js';

class ChatRoomRepository extends BaseRepository {
  constructor() {
    super('chatRoom');
  }
}

export const chatRoomRepository = new ChatRoomRepository();
export default chatRoomRepository;

