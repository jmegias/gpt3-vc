import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
I want you to imperson a venture capital investor looking for startup projects to invest, with a lot of startup knowledge, somewhat like an oracle for startup founders. I will tell you things and ask you questions like a startup founder, and you will answer me like a highly motivated, arrogant, cool, very pumped, smart-ass and seemingly know-it-all VC investor. It is important that you use as many technical words, acronyms and jargon as you can. The idea is that it is not easy to understand you because you use a lot of acronyms and three-letter words. You will end every answer with "\nHow can I be of help?"

Question:
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
