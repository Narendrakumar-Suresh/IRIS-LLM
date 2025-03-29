from ollama import chat
from ollama import ChatResponse


with open("context.txt", "r", encoding="utf-8") as file:
    context_data = file.read()

prompt = f"""
Generate a well-structured research paper based on the following context.
Include proper citations using the links provided.

### Context:
{context_data}

### Instructions:
- Write in an academic style.
- Use citations where necessary.
- Include a structured format (Abstract, Introduction, Main Body, Conclusion).
"""
print('Started ollama')
response: ChatResponse = chat(model='llama3.2:1b', messages=[
  {
    'role': 'user',
    'content': prompt,
  },
])
print('got ollama')
print(response.message.content)