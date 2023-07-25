import { singleton } from 'tsyringe';

import { Action, Store } from 'usestore-ts';

import { apiService } from '../services/ApiService';

import { ChatRoomDetail, Message } from '../types';

@singleton()
@Store()
export default class ChatRoomStore {
  chatRoomId = 0;

  receiverId = 0;

  receiverName = '';

  receiverImageUrl = '';

  messages : Message[] = [];

  page = 1;

  totalPage = 1;

  loading = false;

  error = false;

  @Action()
  setTotalPage(totalPage: number) {
    this.totalPage = totalPage;
  }

  @Action()
  setMessages(messages: Message[]) {
    this.messages = [...messages, ...this.messages];
  }

  @Action()
  setChatRoomData(chatRoom: ChatRoomDetail) {
    this.chatRoomId = chatRoom.id;
    this.receiverId = chatRoom.receiverId;
    this.receiverName = chatRoom.receiverName;
    this.receiverImageUrl = chatRoom.receiverImageUrl;

    this.setMessages(chatRoom.messages);

    this.loading = false;
    this.error = false;
  }

  @Action()
  setLoading() {
    this.loading = true;
    this.error = false;
  }

  @Action()
  setError() {
    this.loading = false;
    this.error = true;
  }

  @Action()
  reset() {
    this.chatRoomId = 0;
    this.receiverId = 0;
    this.receiverName = '';
    this.receiverImageUrl = '';
    this.messages = [];

    this.page = 1;
    this.totalPage = 1;

    this.loading = false;
    this.error = false;
  }

  @Action()
  increasePage() {
    this.page += 1;
  }

  @Action()
  addMessage(newMessage: Message) {
    this.messages = [...this.messages, newMessage];
  }

  async fetchChatRoom(type: string, id: number) {
    this.setLoading();

    try {
      const { page, ...chatRoom } = await apiService.fetchChatRoom(
        { type, id, page: this.page },
      );

      this.setTotalPage(page.total);
      this.setChatRoomData(chatRoom);
    } catch (error) {
      this.setError();
    }
  }
}
