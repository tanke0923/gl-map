export default function assert(value: any, msg?: string) {
  if (!value) {
    throw new Error(msg || 'assert failed');
  }
}