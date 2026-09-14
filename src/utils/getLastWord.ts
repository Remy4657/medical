export default function getLastWord(str: string) {
  return str?.trim().split(/\s+/).pop() || "";
}
