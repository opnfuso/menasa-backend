import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/chat.dto';
import { Chat, ChatDocument } from './schema/chat.schema';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
  ) {}

  create(createChatDto: CreateChatDto) {
    return this.chatModel.create(createChatDto);
  }

  async findAll() {
    const users = await getAuth().listUsers();
    const chats = await this.chatModel.find().limit(100).exec();

    // chats.forEach((chat, index) => {
    //   chats[index].user = users.users.find(({ uid }) => uid === chat.userId);
    // });

    const user_chats = chats.map((chat) => {
      const user = users.users.find(({ uid }) => uid === chat.userId);

      const res = {
        userId: chat.userId,
        content: chat.content,
        isImage: chat.isImage,
        user: user,
      };

      console.log(res);

      return res;
    });

    return user_chats;
  }

  async findOne(id: string) {
    const chat = await this.chatModel.findOne({ _id: id }).exec();
    const user = await getAuth().getUser(chat.userId);
    return { ...chat, user };
  }

  // update(id: string, updateChatDto: UpdateChatDto) {
  //   return this.chatModel.updateOne({ _id: id }, updateChatDto);
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} chat`;
  // }
}
