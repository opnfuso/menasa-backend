import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { auth } from 'firebase-admin';
import { MessageDto } from './dto/message.dto';
import { UsePipes } from '@nestjs/common';
import { SocketValidationPipe } from 'src/pipes/wsvalidation.pipe';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @UsePipes(new SocketValidationPipe())
  @SubscribeMessage('message')
  async findAll(@MessageBody() data: MessageDto): Promise<WsResponse<any>> {
    let error = false;

    const res = await auth()
      .verifyIdToken(data.token)
      .catch((err) => {
        console.error(err);
        error = true;
      });

    console.log(res);

    const errResponse = {
      status: 'Unauthorized',
      statusCode: 401,
    };

    if (error) {
      throw new WsException(errResponse);
    }

    return { event: 'broadcast', data };
  }
}
