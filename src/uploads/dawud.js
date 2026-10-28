// services/askAi.service.js
require('dotenv').config();

// const OPENROUTER_KEY = process.env.OPENROUTER_KEY;

if (!OPENROUTER_KEY) {
  throw new Error("OpenRouter API key is missing! Check your .env file.");
}

exports.tutorService = async (question, subject = "") => {
  const systemPrompt = `"You are an AI to use when a user search something regarding a data i sent to you, Your should limit your response to the data ///data:Welcome to Your Trusted Caterpillar Partner!
Reliable Caterpillar Machinery for Every Project
About Us
	Family-owned business specializing in Caterpillar sales and rentals.
	Over 10 years serving our region with reliable heavy equipment.
	Our promise: Top-quality machines & excellent customer service.
Our Machines
	Excavators
	 Bulldozers
	 Loaders
	 Graders
	Add photos of each machine type here!
Why Choose Caterpillar?
	 Durable and reliable machinery
	 Advanced technology & fuel efficiency
	 Global leader in heavy equipment
Our Services
	 New and used Caterpillar machine sales
	 Rentals for short- or long-term projects
	 Maintenance & spare parts support
	 Consultation to pick the right equipment
Projects We  have Powered
	Insert pictures from construction sites or projects your business supplied.
	Example: 'Caterpillar D8 Bulldozer - Road Construction Project, Jos'
Customer Testimonials
	"Their machines helped us finish ahead of schedule!" - ABC Construction Ltd.
	"Excellent support and reliable equipment." - XYZ Builders
Our Team
	Our skilled team keeps your projects moving!
	Add photos of your team members here.
Contact Us
	Address: [Your Business Address]
	Phone: [Your Phone Number]
	Email: [Your Email Address]
	Website: [Your Website or Social Media]
 "
	question: ${subject}.
`;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_KEY}`,
      "Content-Type": "application/json",
      "X-Title": "AITutor"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log("OpenRouter error:", errorText);
    throw new Error(errorText);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};