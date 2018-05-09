export default function ChatReplay({el} = {}) {
  if(!el) throw new Error("incorrect arguments");
  this.el = el;
}

ChatReplay.prototype.render = function() {
  this.el.classList.add('сhat__reply');
  this.el.innerText = 'Reply';
}