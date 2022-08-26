import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/chat.dto';
import { Chat, ChatDocument } from './schema/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
  ) {}

  create(createChatDto: CreateChatDto) {
    return this.chatModel.create(createChatDto);
  }

  findAll() {
    return this.chatModel.find().exec();
  }

  // findOne(id: string) {
  //   return this.chatModel.findOne({ _id: id }).exec();
  // }

  // update(id: string, updateChatDto: UpdateChatDto) {
  //   return this.chatModel.updateOne({ _id: id }, updateChatDto);
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} chat`;
  // }
}
