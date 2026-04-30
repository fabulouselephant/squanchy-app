import { z } from 'zod'

export const searchInputSchema = z.string().regex(/^[1-9]\d*$/, 'Please enter a valid positive number')

export const validateSearchInput = (value: string | null): string | null => {
  const result = searchInputSchema.safeParse(value)
  return result.success ? null : result.error.issues[0].message
}
