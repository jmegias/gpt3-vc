import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
I will describe a startup idea and you will rephrase and improve it, calling it "Startup Idea -", making it cooler, and present with 3 killer features it should have.
My startup idea is: 
`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  const secondPrompt = 
  `
  Take de initial startup idea and the features below and write me a pitch to a VC for a startup with the ambition to become a unicorn that includes the problem it's solving, the solution, the unique value proposition, the business model and monetization strategy, market size, go-to-market strategy, scalability, team and and the business plan. Include a description of how are we going to spend the funds and the team. 
  startup idea:${req.body.userInput}

  features: ${basePromptOutput.text}

  pitch:
  `
  
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
		// I also increase max_tokens.
    max_tokens: 1250,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;