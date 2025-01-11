// types.ts
export interface CustomError {
   response?: {
      data?: {
         error?: string;
      };
   };
   message?: string;
}
