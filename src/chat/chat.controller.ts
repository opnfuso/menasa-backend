import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // @UseGuards(AuthGuard('firebase-jwt'))
  // @Post()
  // async create(@Body() createChatDto: MessageDto) {
  //   return await this.chatService.create(createChatDto);
  // }

  // @UseGuards(AuthGuard('firebase-jwt'))
  @Get()
  async findAll() {
    return await this.chatService.findAll();
  }

  // @UseGuards(AuthGuard('firebase-jwt'))
  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return await this.chatService.findOne(id);
  // }

  // @UseGuards(AuthGuard('firebase-jwt'))
  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateChatDto: UpdateChatDto,
  // ) {
  //   return await this.chatService.update(id, updateChatDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatService.remove(id);
  // }
}
