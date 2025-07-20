'use server';

import type { ReactNode } from 'react';

import { isFailure, tryCatch } from '@pidchashyi/try-catch';

import { resend } from '@/config/email';

import { response } from '@/helpers/response';

interface SendEmailParams {
  from?: string;
  to: string;
  subject: string;
  type: 'html' | 'react';
  content: string | ReactNode;
}

interface EmailResponse {
  data: unknown;
  message: string;
  success: boolean;
}

export const sendEmail = async (params: SendEmailParams): Promise<EmailResponse> => {
  const { from = 'support@navchaylo.com', to, subject, type, content } = params;

  const result = await tryCatch(
    resend.emails.send({
      from,
      to,
      subject,
      text: content as string,
      [type]: content as typeof type extends 'html' ? string : ReactNode
    })
  );

  if (isFailure(result)) {
    return response({
      data: undefined,
      message: 'Send email: Email sent failed',
      success: false
    });
  }

  return response({
    data: result.data,
    message: 'Send email: Email sent successfully',
    success: true
  });
};
