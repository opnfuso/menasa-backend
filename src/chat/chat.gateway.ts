import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { auth } from 'firebase-admin';
import { MessageDto } from './dto/message.dto';
import { UsePipes } from '@nestjs/common';
import { SocketValidationPipe } from 'src/pipes/wsvalidation.pipe';
import { ChatService } from './chat.service';
import { getAuth } from 'firebase-admin/auth';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  @UsePipes(new SocketValidationPipe())
  @SubscribeMessage('message')
  async findAll(@MessageBody() data: MessageDto): Promise<void> {
    let error = false;

    const res: any = await auth()
      .verifyIdToken(data.token)
      .catch((err) => {
        console.error(err);
        error = true;
        return err;
      });

    const errResponse = {
      status: 'Unauthorized',
      statusCode: 401,
    };

    if (error === false) {
      const request = {
        content: data.content,
        isImage: data.isImage,
        userId: res.uid,
      };

      this.chatService.create(request);
      const user = await getAuth().getUser(request.userId);

      const response = { ...request, user: user };
      this.server.emit('broadcast', response);
    } else {
      throw new WsException(errResponse);
    }
  }
}
