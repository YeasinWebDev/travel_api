import z from "zod";

export const tripSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    startDate: z.string().min(3),
    endDate: z.string().min(3),
    price: z.number(),
    image: z.string().min(3),
    capacity: z.number(),
    destination: z.string().min(3),
});