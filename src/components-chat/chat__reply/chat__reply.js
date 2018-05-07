export default function renderChatReplay({el} = {}) {
  if(!el) throw new Error("incorrect arguments");
  
  el.classList.add('сhat__reply');

  return el;
}