import { ApiProperty } from '@nestjs/swagger';

export class JwtTokensResponse {
  @ApiProperty({ type: String })
  readonly accessToken!: string;
}
