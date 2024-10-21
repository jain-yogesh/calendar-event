import { conformZodMessage } from "@conform-to/zod";
import {z} from 'zod'

// export function onboardingSchema = z.object({
//     fullname: z.string().min(3).max(150),
//     userName: z.string().min(3).max(150).regex(/^[a-zA-Z0-9-]+$/,{
//         message: "Usename can only contain letters, numbers and -",
//     }),
// });

export function onboardingSchemaValidation(options?: {
    isUsernameUnique: () => Promise<boolean>;
}) {
    return z.object({
        userName: z.string().min(3).max(150).regex(/^[a-zA-Z0-9-]+$/,{
            message: "Usename can only contain letters, numbers and hyphens",
        })
        .pipe(
            z.string().superRefine((_, ctx) => {
                if(typeof options?.isUsernameUnique !== "function") {
                    ctx.addIssue({
                        code: 'custom',
                        message: conformZodMessage.VALIDATION_UNDEFINED,
                        fatal: true,
                    });
                    return;
                }

                return options.isUsernameUnique().then((isUnique) => {
                    if(!isUnique){
                        ctx.addIssue({
                            code: 'custom',
                            message: "Username is already used!!",
                        });
                    }
                });
            })
        ),
        fullName: z.string().min(3).max(150),
    });
}

export const onboardingSchema = z.object({
    fullName: z.string().min(3).max(150),
    userName: z
      .string()
      .min(3)
      .max(150)
      .regex(/^[a-zA-Z0-9-]+$/, {
        message: "Username must contain only letters, numbers, and hyphens",
      }),
  });