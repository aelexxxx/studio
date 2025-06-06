// src/ai/flows/suggest-interest-tags.ts
'use server';

/**
 * @fileOverview Provides AI-powered suggestions for user interest tags based on profile content.
 *
 * - suggestInterestTags - A function that generates interest tag suggestions.
 * - SuggestInterestTagsInput - The input type for the suggestInterestTags function, including profile content.
 * - SuggestInterestTagsOutput - The return type for the suggestInterestTags function, a list of suggested tags.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestInterestTagsInputSchema = z.object({
  profileContent: z
    .string()
    .describe('The content of the user profile, including details like bio, hobbies, and past posts.'),
});
export type SuggestInterestTagsInput = z.infer<typeof SuggestInterestTagsInputSchema>;

const SuggestInterestTagsOutputSchema = z.object({
  suggestedTags: z
    .array(z.string())
    .describe('An array of suggested interest tags based on the profile content.'),
});
export type SuggestInterestTagsOutput = z.infer<typeof SuggestInterestTagsOutputSchema>;

export async function suggestInterestTags(input: SuggestInterestTagsInput): Promise<SuggestInterestTagsOutput> {
  return suggestInterestTagsFlow(input);
}

const suggestInterestTagsPrompt = ai.definePrompt({
  name: 'suggestInterestTagsPrompt',
  input: {schema: SuggestInterestTagsInputSchema},
  output: {schema: SuggestInterestTagsOutputSchema},
  prompt: `Based on the following user profile content, suggest a list of relevant interest tags.  The tags should be short, generic, and applicable to a wide range of users.

Profile Content: {{{profileContent}}}

Suggested Tags:`,
});

const suggestInterestTagsFlow = ai.defineFlow(
  {
    name: 'suggestInterestTagsFlow',
    inputSchema: SuggestInterestTagsInputSchema,
    outputSchema: SuggestInterestTagsOutputSchema,
  },
  async input => {
    const {output} = await suggestInterestTagsPrompt(input);
    return output!;
  }
);
