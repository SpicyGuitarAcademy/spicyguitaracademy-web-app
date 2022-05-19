export const decodeEntities = (text: string) => {
  const temp = document.createElement('p');
  temp.innerHTML = text;
  const str = temp.textContent || temp.innerText;
  temp.remove()
  return str;
}